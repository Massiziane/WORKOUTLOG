// src/components/Tabs/AcceuilTab/WorkoutSection.tsx

import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import "../../../style/tabs/accueil/section.css";
import CreateWorkoutModal from "../../CreateWorkoutModal"; 
import type { WorkoutsSectionProps } from "./acceuil";
import type { Workout } from "../../../types/entities";

/**
 * WorkoutsSection component
 * - Displays and manages user workouts.
 * - Fetches all workouts from the backend.
 * - Allows searching and creating new workouts via modal.
 */
export default function WorkoutsSection({ dbUserId }: WorkoutsSectionProps) {
  // ===== State Variables =====
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Fetch workouts for the user from backend API.
   */
  useEffect(() => {
    if (!dbUserId) return;
    fetchRecords<Workout>(`workouts?userId=${dbUserId}`).then(setWorkouts);
  }, [dbUserId]);

  /**
   * Filter workouts by the current search query.
   * Case-insensitive match against workout name.
   */
  const filteredWorkouts = workouts.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section workouts-section">
      {/* ===== Header (title, action, search) ===== */}
      <div className="section-header">
        <h2>Workouts</h2>

        {/* Create button */}
        <div className="section-header-row">
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            Create Workout
          </button>
        </div>

        {/* Search input */}
        <div>
          <input
            type="text"
            placeholder="Search workouts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* ===== Workouts list ===== */}
      <ul className="cards-container scrollable-list">
        {/* No results fallback */}
        {filteredWorkouts.length === 0 && (
          <li className="no-results">No workouts found.</li>
        )}

        {/* Render each workout card */}
        {filteredWorkouts.map(workout => (
          <li key={workout.id} className="card">
            <h3>{workout.name}</h3>
            <p>{workout.workoutExercises?.length || 0} exercises</p>
          </li>
        ))}
      </ul>

      {/* ===== Create Workout Modal ===== */}
      <CreateWorkoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programId={0} // Default value; not linked to a specific program here
        userId={dbUserId}
        onCreate={async (newWorkout: any) => {
          const created = await createRecord("workouts", newWorkout);
          setWorkouts(prev => [...prev, created]);
          setIsModalOpen(false);
        }}
      />
    </section>
  );
}
