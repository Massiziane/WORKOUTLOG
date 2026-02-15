import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import "../../../style/tabs/accueil/sectionsLayout.css";

interface Workout {
  id: number;
  name: string;
  order?: number;
  programId?: number | null;
}

export default function WorkoutsSection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [search, setSearch] = useState("");

  // Fetch workouts from backend
  useEffect(() => {
    fetchRecords<Workout>("workouts").then(setWorkouts);
  }, []);

  // Filter workouts by search input
  const filteredWorkouts = workouts.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handler for creating a new workout (placeholder)
  const handleCreateWorkout = async () => {
    const name = prompt("Enter workout name");
    if (!name) return;

    // Optionally, associate with a program later
    const newWorkout = await createRecord("workouts", { name, userId: 1 }); // replace userId with real dbUserId
    setWorkouts((prev) => [...prev, newWorkout]);
  };

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
          </div>
        ))}
      </div>
    </section>
  );
}
