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
  const [categories, setCategories] = useState<{id: number; name: string}[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<{id: number; name: string}[]>([]);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<number | "">("");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState<number | "">("");

  // Fetch exercises, categories, and muscle groups
  useEffect(() => {
    fetchRecords<Exercise>("exercises").then(setExercises);
    fetchRecords<{id: number; name: string}>("categories").then(setCategories);
    fetchRecords<{id: number; name: string}>("muscle-groups").then(setMuscleGroups);
  }, []);

  // Filter + sort exercises by search + category + muscle group
  const filteredAndSortedExercises = exercises
    .filter((ex) => ex.name.toLowerCase().includes(search.toLowerCase()))
    .filter((ex) => (categoryFilter === "" ? true : ex.categoryId === categoryFilter))
    .filter((ex) => (muscleGroupFilter === "" ? true : ex.muscleGroupId === muscleGroupFilter))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Group exercises by first letter
  const groupedExercises: Record<string, Exercise[]> = {};
  filteredAndSortedExercises.forEach((ex) => {
    const firstLetter = ex.name[0].toUpperCase();
    if (!groupedExercises[firstLetter]) groupedExercises[firstLetter] = [];
    groupedExercises[firstLetter].push(ex);
  });

  // Create exercise handler
  const handleCreateExercise = async () => {
    const name = prompt("Enter exercise name");
    if (!name) return;
    const newExercise = await createRecord("exercises", { name });
    setExercises((prev) => [...prev, newExercise]);
  };

  return (
    <section className="section exercises-section">
      <div className="section-header">
        <div className="section-header-row">
          <h2>Exercises</h2>
          <div className="section-controls">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value ? Number(e.target.value) : "")}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={muscleGroupFilter}
              onChange={(e) => setMuscleGroupFilter(e.target.value ? Number(e.target.value) : "")}
              className="filter-select"
            >
              <option value="">All Muscle Groups</option>
              {muscleGroups.map((mg) => (
                <option key={mg.id} value={mg.id}>{mg.name}</option>
              ))}
            </select>
          </div>

          <button className="cta-btn" onClick={handleCreateExercise}>
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

      <ul className="cards-container scrollable-list">
        {Object.keys(groupedExercises).length === 0 && (
          <li className="no-results">No exercises found.</li>
        )}

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
