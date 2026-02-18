import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import CreateProgramModal from "../../CreateProgram";
import "../../../style/tabs/accueil/sectionsLayout.css";
import type { Workout } from "../../../types/entities";
import type { ProgramsSectionProps } from "./acceuil"

export default function ProgramsSection( { dbUserId }: ProgramsSectionProps) {
  const [programs, setPrograms] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  
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
  const handleCreateProgram = async (data: { name: string; Desc?: string }) => {
    if (!dbUserId) return alert("User ID missing!");

    try {
      const payload = {
        name: data.name,
        description: data.Desc ?? null, 
        userId: dbUserId,           
      };
      const newProgram = await createRecord("programs", payload);
      setPrograms(prev => [...prev, newProgram]); // instant UI update
    } catch (err) {
      console.error("Error creating program:", err);
      alert("Failed to create program");
    }
    }

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
            + Create Program
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

      <div className="cards-container">
        {filteredPrograms.map((program) => (
          <div className="card program-card" key={program.id}>
            <h3>{program.name}</h3>
            <p>{program.Desc || "No description"}</p>
          </div>
        ))}
      </div>

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
