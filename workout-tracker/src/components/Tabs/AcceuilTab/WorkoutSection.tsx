import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import "../../../style/tabs/accueil/sectionsLayout.css";
import CreateWorkoutModal from "../../CreateWorkout"; 
import type { WorkoutsSectionProps } from "./acceuil"

interface Workout {
  workoutExercises: any;
  id: number;
  name: string;
  order?: number;
  programId?: number | null;
}

export default function WorkoutsSection({ dbUserId }: WorkoutsSectionProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);



  // Fetch workouts from backend
  useEffect(() => {
    if (!dbUserId) return;
    fetchRecords<Workout>(`workouts?userId=${dbUserId}`).then(setWorkouts);
  }, [dbUserId]);


  // Filter workouts by search input
  const filteredWorkouts = workouts
    .filter(w => w.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="section workouts-section">
      <div className="section-header">
        <div className="section-header-row">
          <h2>Workouts</h2>
          <button className="cta-btn" onClick={() => setIsModalOpen(true)}>
            Create Workout
          </button>
        </div>
        <input
          type="text"
          placeholder="Search workouts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <ul className="cards-container scrollable-list">
        {filteredWorkouts.length === 0 && (
          <li className="no-results">No workouts found.</li>
        )}

        {filteredWorkouts.map((workout) => (
          <li key={workout.id} className="card">
            <h3>{workout.name}</h3>
            <p>{workout.workoutExercises?.length || 0} exercises</p>
          </li>
        ))}
      </ul>

      <CreateWorkoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programId={0} 
        userId={dbUserId}
        onCreate={async (newWorkout) => {
          const created = await createRecord("workouts", newWorkout);
          setWorkouts((prev) => [...prev, created]);
          setIsModalOpen(false);
        }}
      />
    </section>
  );
}
