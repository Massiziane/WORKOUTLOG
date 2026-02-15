import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import "../../../style/tabs/accueil/sectionsLayout.css";

interface Exercise {
  id: number;
  name: string;
  notes?: string;
  categoryId?: number | null;
  muscleGroupId?: number | null;
}

export default function ExercisesSection() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");

  // Fetch exercises from backend
  useEffect(() => {
    fetchRecords<Exercise>("exercises").then(setExercises);
  }, []);

  // Filter exercises by search
  const filteredExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handler for creating a new exercise
  const handleCreateExercise = async () => {
    const name = prompt("Enter exercise name");
    if (!name) return;

    // You can add categoryId/muscleGroupId later if needed
    const newExercise = await createRecord("exercises", { name });
    setExercises((prev) => [...prev, newExercise]);
  };

  return (
    <section className="section exercises-section">
    <div className="section-header">
         <div className="section-header-row">
        <h2>Exercises</h2>
        <div className="section-controls">
        <button className="cta-btn" >
            Create Exercise
        </button>
        </div>
        <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
        />
        </div>
    </div>

    <ul className="cards-container">
        {filteredExercises.map((ex) => (
        <li className="card" key={ex.id}>
            <h3>{ex.name}</h3>
            {ex.notes && <p>{ex.notes}</p>}
        </li>
        ))}
    </ul>
    </section>
  );
}
