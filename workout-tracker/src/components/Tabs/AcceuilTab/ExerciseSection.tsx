import { useState, useEffect } from "react";
import { fetchRecords, createRecord } from "../../../services/api";
import CreateExerciseModal from "../../../components/CreateExercise";

import "../../../style/tabs/accueil/section.css";



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
    <section className="exercises-section-unique">
      <div className="exercises-header-unique">
        <div className="exercises-header-row-unique">
          <h2>Exercises</h2>
          <div className="exercises-controls-unique">
            {/* Category Dropdown */}
            <div className="filter-dropdown-unique">
              <input
                type="text"
                placeholder="Filter category..."
                value={categorySearch || selectedCategory}
                onChange={(e) => setCategorySearch(e.target.value)}
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
                        className={categoryFilter === cat.id ? "active-unique" : ""}
                      >
                        {cat.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Muscle Group Dropdown */}
            <div className="filter-dropdown-unique">
              <input
                type="text"
                placeholder="Filter muscle group..."
                value={muscleGroupSearch || selectedMuscleGroup}
                onChange={(e) => setMuscleGroupSearch(e.target.value)}
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
                        className={muscleGroupFilter === mg.id ? "active-unique" : ""}
                      >
                        {mg.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          <button className="cta-btn-unique" onClick={() => setIsModalOpen(true)}>
            Create Exercise
          </button>

          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input-unique"
          />
        </div>
      </div>

      <ul className="cards-container-unique scrollable-list-unique">
        {Object.keys(groupedExercises).length === 0 && (
          <li className="no-results-unique">No exercises found.</li>
        )}

        {Object.keys(groupedExercises)
          .sort()
          .map((letter) => (
            <li key={letter} className="letter-group-unique">
              <div className="letter-header-unique">{letter}</div>
              {groupedExercises[letter].map((ex) => (
                <div className="card-unique" key={ex.id}>
                  <h3>{ex.name}</h3>
                  {ex.notes && <p>{ex.notes}</p>}
                </div>
              ))}
            </li>
          ))}
      </ul>

      <CreateExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={async (newExerciseData) => {
          const created = await createRecord("exercises", newExerciseData);
          setExercises((prev) => [...prev, created]);
        }}
      />
    </section>
  );
}
