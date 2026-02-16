import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import "../../../style/tabs/accueil/sectionsLayout.css";
import type { WorkoutsSectionProps } from "./acceuil"
interface Workout {
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
            <button className="cta-btn">Create Workout</button>
        </div>
        <div className="section-controls">
          <input
            type="text"
            placeholder="Search workouts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="cards-container">
        {filteredWorkouts.map(workout => (
          <div key={workout.id} className="card">
            <h3>{workout.name}</h3>
            {workout.order && <p>Day {workout.order}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
