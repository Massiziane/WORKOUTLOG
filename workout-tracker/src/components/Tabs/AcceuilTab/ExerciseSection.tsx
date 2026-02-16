import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import CreateExerciseModal from "../../../components/CreateExercise";
import "../../../style/tabs/accueil/sectionsLayout.css";
import "../../../style/tabs/accueil/exercisesSection.css";

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

  // MODALS
  const [isModalOpen, setIsModalOpen] = useState(false);


// Filters
  const [categoryFilter, setCategoryFilter] = useState<number | "">("");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState<number | "">("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [muscleGroupOpen, setMuscleGroupOpen] = useState(false);
// Search inputs for filters
  const [categorySearch, setCategorySearch] = useState("");
  const [muscleGroupSearch, setMuscleGroupSearch] = useState("");
  const selectedCategory = categories.find(c => c.id === categoryFilter)?.name || "";
  const selectedMuscleGroup = muscleGroups.find(m => m.id === muscleGroupFilter)?.name || "";


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


  return (
    <section className="section exercises-section">
      <div className="section-header">
        <div className="section-header-row">
          <h2>Exercises</h2>
          <div className="section-controls">
            {/* Category Dropdown */}
            <div className="filter-dropdown">
                <input
                type="text"
                placeholder="Filter category..."
                value={categorySearch || selectedCategory}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="filter-input"
                onFocus={() => setCategoryOpen(true)}
                onBlur={() => setTimeout(() => setCategoryOpen(false), 150)}
                />
                {categoryOpen && (
                <ul className="filter-list">
                    {/* "All" option */}
                    <li
                    onClick={() => {
                        setCategoryFilter("");
                        setCategorySearch("");
                    }}
                    className={categoryFilter === "" ? "active" : ""}
                    >
                    All Categories
                    </li>

                    {categories
                    .filter((cat) =>
                        cat.name.toLowerCase().includes(categorySearch.toLowerCase())
                    )
                    .map((cat) => (
                        <li
                        key={cat.id}
                        onClick={() => {
                            setCategoryFilter(cat.id);
                            setCategorySearch("");
                        }}
                        className={categoryFilter === cat.id ? "active" : ""}
                        >
                        {cat.name}
                        </li>
                    ))}
                </ul>
                )}
            </div>

            {/* Muscle Group Dropdown */}
            <div className="filter-dropdown">
                <input
                type="text"
                placeholder="Filter muscle group..."
                value={muscleGroupSearch || selectedMuscleGroup}
                onChange={(e) => setMuscleGroupSearch(e.target.value)}
                className="filter-input"
                onFocus={() => setMuscleGroupOpen(true)}
                onBlur={() => setTimeout(() => setMuscleGroupOpen(false), 150)}
                />
                {muscleGroupOpen && (
                <ul className="filter-list">
                    {/* "All" option */}
                    <li
                    onClick={() => {
                        setMuscleGroupFilter("");
                        setMuscleGroupSearch("");
                    }}
                    className={muscleGroupFilter === "" ? "active" : ""}
                    >
                    All Muscle Groups
                    </li>

                    {muscleGroups
                    .filter((mg) =>
                        mg.name.toLowerCase().includes(muscleGroupSearch.toLowerCase())
                    )
                    .map((mg) => (
                        <li
                        key={mg.id}
                        onClick={() => {
                            setMuscleGroupFilter(mg.id);
                            setMuscleGroupSearch("");
                        }}
                        className={muscleGroupFilter === mg.id ? "active" : ""}
                        >
                        {mg.name}
                        </li>
                    ))}
                </ul>
                )}
            </div>
            </div>
            <button className="cta-btn" onClick={() => setIsModalOpen(true)}>
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
      
      {/* Create Exercise Modal */}
      <CreateExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={async (newExerciseData) => {
        const created = await createRecord("exercises", newExerciseData); // backend returns exerciseId
        setExercises(prev => [...prev, created]);
        }}
        />
    </section>
  );
}
