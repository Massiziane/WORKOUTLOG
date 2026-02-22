import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import CreateProgramModal from "../../CreateProgram";
import "../../../style/tabs/accueil/section.css";
import type { Program, Workout } from "../../../types/entities";

/**
 * Props for ProgramsSection.
 * - dbUserId: The user's database ID used for API calls.
 * - onSelectProgram: Optional callback when a program card is clicked.
 */
export interface ProgramsSectionProps {
  dbUserId: number;
  onSelectProgram?: (program: Program) => void;
}

/**
 * ProgramsSection component
 * - Displays a list of programs associated with the user.
 * - Allows search, creation, and optional selection of programs.
 * - Fetches both programs and workouts to populate the modal.
 */
export default function ProgramsSection({ dbUserId, onSelectProgram }: ProgramsSectionProps) {
  // ===== State Variables =====
  const [programs, setPrograms] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  /**
   * Fetch programs for the current user.
   */
  useEffect(() => {
    if (!dbUserId) return;

    fetchRecords(`programs?userId=${dbUserId}`)
      .then(setPrograms)
      .catch(err => console.error("Failed to fetch programs:", err));
  }, [dbUserId]);

  /**
   * Fetch workouts for the current user.
   * These are used in the program creation modal for selection.
   */
  useEffect(() => {
    fetchRecords<Workout>(`workouts?userId=${dbUserId}`)
      .then(data => setWorkouts(data))
      .catch(err => console.error("Failed to fetch workouts:", err));
  }, [dbUserId]);

  /**
   * Handler for creating a new program via modal form.
   * Sends data to backend and updates local list on success.
   */
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
        Desc: data.Desc ?? null,     // Optional description
        workouts: data.workouts,     // Linked workouts
        userId: dbUserId,
      };

      console.log("Sending payload to backend:", payload);

      const newProgram = await createRecord("programs", payload);

      // Append new program to current list
      setPrograms(prev => [...prev, newProgram]);
    } catch (err) {
      console.error("Error creating program:", err);
      alert("Failed to create program");
    }
  };

  /**
   * Filter programs by search term (case-insensitive).
   */
  const filteredPrograms = programs.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section programs-section">
      {/* ===== Header (title, create button, search) ===== */}
      <div className="section-header">
        <h2>Programs</h2>

        <div className="section-header-row">
          {/* Open program creation modal */}
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            Create Program
          </button>
        </div>

        {/* Search bar */}
        <div>
          <input
            type="text"
            placeholder="Search programs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* ===== Program Cards ===== */}
      <ul className="cards-container scrollable-list">
        {/* No results fallback */}
        {filteredPrograms.length === 0 && (
          <li className="no-results">No programs found.</li>
        )}

        {/* Programs list */}
        {filteredPrograms.map(program => (
          <li
            key={program.id}
            className="card program-card"
            onClick={() => onSelectProgram?.(program)} // optional click handler
          >
            <h3>{program.name}</h3>
            <p>{program.Desc || "No description"}</p>
          </li>
        ))}
      </ul>

      {/* ===== Create Program Modal ===== */}
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
