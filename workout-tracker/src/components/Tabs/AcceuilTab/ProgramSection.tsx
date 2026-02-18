import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import CreateProgramModal from "../../CreateProgram";
import "../../../style/tabs/accueil/section.css";
import type { Program, Workout } from "../../../types/entities";

export interface ProgramsSectionProps {
  dbUserId: number;
  onSelectProgram?: (program: Program) => void; // <-- new
}


export default function ProgramsSection( { dbUserId, onSelectProgram}: ProgramsSectionProps ) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  
  // Fetch programs
  useEffect(() => {
    if (!dbUserId) return;

    fetchRecords(`programs?userId=${dbUserId}`)
      .then(setPrograms)
      .catch(err => console.error("Failed to fetch programs:", err));
  }, [dbUserId]);


  // Fetch workouts
  useEffect(() => {
    fetchRecords<Workout>(`workouts?userId=${dbUserId}`)
      .then(data => setWorkouts(data))
      .catch(err => console.error("Failed to fetch workouts", err));
  }, [dbUserId]);

  // Create program handler
  const handleCreateProgram = async (data: {
    name: string;
    Desc?: string;
    workouts: number[];
    userId: number;
  }) => {
    if (!dbUserId) return alert("User ID missing!");

    try {
      const payload = {
        name: data.name,
        Desc: data.Desc ?? null,     
        workouts: data.workouts,    
        userId: dbUserId
      };

      console.log("Sending payload to backend:", payload);

      const newProgram = await createRecord("programs", payload);

      // update UI
      setPrograms(prev => [...prev, newProgram]);
    } catch (err) {
      console.error("Error creating program:", err);
      alert("Failed to create program");
    }
  };


  const filteredPrograms = programs.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <section className="section programs-section">
      <div className="section-header">
        <div className="section-header-row">
          <h2>Programs</h2>
          <button
            className="cta-btn"
            onClick={() => setIsModalOpen(true)}
          >
           Create Program
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <ul className="cards-container scrollable-list">
        {filteredPrograms.length === 0 && (
          <li className="no-results">No programs found.</li>
        )}

        {filteredPrograms.map((program) => (
          <li
            key={program.id}
            className="card program-card"
            onClick={() => onSelectProgram?.(program)}
          >
            <h3>{program.name}</h3>
            <p>{program.Desc || "No description"}</p>
          </li>
        ))}
      </ul>


      {/* Modal */}
      <CreateProgramModal
        userId={dbUserId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProgram} 
        workouts={workouts}
        />
    </section>
  );
}
