import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import CreateExerciseModal from "../../../components/CreateExercise";
import type { Exercise } from "../../../types/entities";
import "../../../style/tabs/accueil/section.css";

/**
 * ExercisesSection component
 * - Displays a searchable, filterable list of exercises.
 * - Allows filtering by category and muscle group.
 * - Supports exercise creation through a modal.
 */
export default function ExercisesSection() {
  // ===== State: Data storage =====
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<{ id: number; name: string }[]>([]);

  // ===== State: Search and filters =====
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | "">("");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState<number | "">("");

  // ===== Dropdown open/close tracking =====
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [muscleGroupOpen, setMuscleGroupOpen] = useState(false);

  // ===== Dropdown search inputs =====
  const [categorySearch, setCategorySearch] = useState("");
  const [muscleGroupSearch, setMuscleGroupSearch] = useState("");

  // ===== Modal state =====
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine selected names for display
  const selectedCategory = categories.find(c => c.id === categoryFilter)?.name || "";
  const selectedMuscleGroup = muscleGroups.find(m => m.id === muscleGroupFilter)?.name || "";

  /**
   * Fetch all exercises, categories, and muscle groups from the backend.
   * Runs once when the component mounts.
   */
  useEffect(() => {
    fetchRecords<Exercise>("exercises").then(setExercises);
    fetchRecords<{ id: number; name: string }>("categories").then(setCategories);
    fetchRecords<{ id: number; name: string }>("muscle-groups").then(setMuscleGroups);
  }, []);

  /**
   * Compute visible exercises after filtering and sorting.
   */
  const filteredAndSortedExercises = exercises
    .filter(ex => ex.name.toLowerCase().includes(search.toLowerCase()))
    .filter(ex => (categoryFilter === "" ? true : ex.categoryId === categoryFilter))
    .filter(ex => (muscleGroupFilter === "" ? true : ex.muscleGroupId === muscleGroupFilter))
    .sort((a, b) => a.name.localeCompare(b.name));

  /**
   * Group exercises alphabetically by first letter.
   * Example: { A: [Abs, Arnold Press], B: [Bench Press, Barbell Row], ... }
   */
  const groupedExercises: Record<string, Exercise[]> = {};
  filteredAndSortedExercises.forEach(ex => {
    const firstLetter = ex.name[0].toUpperCase();
    if (!groupedExercises[firstLetter]) groupedExercises[firstLetter] = [];
    groupedExercises[firstLetter].push(ex);
  });

  return (
    <section className="exercises-section-unique">
      {/* ===== Header (filters, search, and create) ===== */}
      <div className="exercises-header-unique">
        <div className="exercises-header-row-unique">
          <h2>Exercises</h2>

          {/* Control section: filters and search */}
          <div className="exercises-controls-unique">
            {/* ----- Category filter dropdown ----- */}
            <div className="filter-dropdown-unique">
              <input
                type="text"
                placeholder="Filter category..."
                value={categorySearch || selectedCategory}
                onChange={e => setCategorySearch(e.target.value)}
                className="filter-input-unique"
                onFocus={() => setCategoryOpen(true)}
                onBlur={() => setTimeout(() => setCategoryOpen(false), 150)}
              />
              {categoryOpen && (
                <ul className="filter-list-unique">
                  <li
                    onClick={() => {
                      setCategoryFilter("");
                      setCategorySearch("");
                    }}
                    className={categoryFilter === "" ? "active-unique" : ""}
                  >
                    All Categories
                  </li>
                  {categories
                    .filter(cat =>
                      cat.name.toLowerCase().includes(categorySearch.toLowerCase())
                    )
                    .map(cat => (
                      <li
                        key={cat.id}
                        onClick={() => {
                          setCategoryFilter(cat.id);
                          setCategorySearch("");
                        }}
                        className={categoryFilter === cat.id ? "active-unique" : ""}
                      >
                        {cat.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* ----- Muscle group filter dropdown ----- */}
            <div className="filter-dropdown-unique">
              <input
                type="text"
                placeholder="Filter muscle group..."
                value={muscleGroupSearch || selectedMuscleGroup}
                onChange={e => setMuscleGroupSearch(e.target.value)}
                className="filter-input-unique"
                onFocus={() => setMuscleGroupOpen(true)}
                onBlur={() => setTimeout(() => setMuscleGroupOpen(false), 150)}
              />
              {muscleGroupOpen && (
                <ul className="filter-list-unique">
                  <li
                    onClick={() => {
                      setMuscleGroupFilter("");
                      setMuscleGroupSearch("");
                    }}
                    className={muscleGroupFilter === "" ? "active-unique" : ""}
                  >
                    All Muscle Groups
                  </li>
                  {muscleGroups
                    .filter(mg =>
                      mg.name.toLowerCase().includes(muscleGroupSearch.toLowerCase())
                    )
                    .map(mg => (
                      <li
                        key={mg.id}
                        onClick={() => {
                          setMuscleGroupFilter(mg.id);
                          setMuscleGroupSearch("");
                        }}
                        className={muscleGroupFilter === mg.id ? "active-unique" : ""}
                      >
                        {mg.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* Create Exercise button */}
          <button className="cta-btn-unique" onClick={() => setIsModalOpen(true)}>
            Create Exercise
          </button>

          {/* Text search input */}
          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input-unique"
          />
        </div>
      </div>

      {/* ===== Exercise list ===== */}
      <ul className="cards-container-unique scrollable-list-unique">
        {/* Show message if no exercises match */}
        {Object.keys(groupedExercises).length === 0 && (
          <li className="no-results-unique">No exercises found.</li>
        )}

        {/* Grouped alphabetically */}
        {Object.keys(groupedExercises)
          .sort()
          .map(letter => (
            <li key={letter} className="letter-group-unique">
              <div className="letter-header-unique">{letter}</div>
              {groupedExercises[letter].map(ex => (
                <div className="card-unique" key={ex.id}>
                  <h3>{ex.name}</h3>
                  {ex.notes && <p>{ex.notes}</p>}
                </div>
              ))}
            </li>
          ))}
      </ul>

      {/* ===== Create Exercise Modal ===== */}
      <CreateExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={async newExerciseData => {
          const created = await createRecord("exercises", newExerciseData);
          setExercises(prev => [...prev, created]);
        }}
      />
    </section>
  );
}