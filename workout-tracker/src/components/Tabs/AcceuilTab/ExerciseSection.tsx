import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import "../../../style/tabs/accueil/sectionsLayout.css";
import "../../../style/tabs/accueil/ExercisesSection.css";

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


    // 1. Filter & sort
    const sortedExercises = exercises
    .filter((ex) => ex.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

    // 2. Group by first letter
    const groupedExercises: Record<string, Exercise[]> = {};
    sortedExercises.forEach((ex) => {
    const firstLetter = ex.name[0].toUpperCase();
    if (!groupedExercises[firstLetter]) groupedExercises[firstLetter] = [];
    groupedExercises[firstLetter].push(ex);
    });



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

    <ul className="cards-container scrollable-list">
    {Object.keys(groupedExercises)
        .sort()
        .map((letter) => (
        <li key={letter} className="letter-group">
            <div className="letter-header">{letter}</div>
            {groupedExercises[letter].map((ex) => (
            <div className="card" key={ex.id}>
                <h3>{ex.name}</h3>
                {ex.notes && <p>{ex.notes}</p>}
            </div>
            ))}
        </li>
        ))}
    </ul>
    </section>
  );
}
