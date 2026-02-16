import { useState, useEffect } from "react";
import { fetchRecords } from "../services/api";
import type { CreateWorkoutModalProps } from "../types/CreateWorkoutModalProps";
import "../style/components/CreateWorkoutModal.css";
import { Trash } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  categoryId?: number | null;
  muscleGroupId?: number | null;
}

interface SelectedExercise {
  exercise: Exercise;
  sets: number;
}

export default function CreateWorkoutModal({ isOpen, onClose, onCreate, programId }: CreateWorkoutModalProps) {
  const [name, setName] = useState("");
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);
  const [search, setSearch] = useState("");

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<number | "">("");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState<number | "">("");
  const [categories, setCategories] = useState<{id: number; name: string}[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<{id: number; name: string}[]>([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [muscleGroupSearch, setMuscleGroupSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [muscleGroupOpen, setMuscleGroupOpen] = useState(false);

  const selectedCategory = categories.find(c => c.id === categoryFilter)?.name || "";
  const selectedMuscleGroup = muscleGroups.find(m => m.id === muscleGroupFilter)?.name || "";

  // Fetch exercises + filters on open
  useEffect(() => {
    if (!isOpen) return;
    fetchRecords<Exercise>("exercises").then(setAllExercises);
    fetchRecords<{id: number; name: string}>("categories").then(setCategories);
    fetchRecords<{id: number; name: string}>("muscle-groups").then(setMuscleGroups);
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter + search exercises
  const filteredExercises = allExercises
    .filter(ex => ex.name.toLowerCase().includes(search.toLowerCase()))
    .filter(ex => (categoryFilter === "" ? true : ex.categoryId === categoryFilter))
    .filter(ex => (muscleGroupFilter === "" ? true : ex.muscleGroupId === muscleGroupFilter))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleAddExercise = (exercise: Exercise) => {
    if (!selectedExercises.find(e => e.exercise.id === exercise.id)) {
      setSelectedExercises(prev => [...prev, { exercise, sets: 1 }]);
    }
  };

  const handleRemoveExercise = (exerciseId: number) => {
    setSelectedExercises(prev => prev.filter(e => e.exercise.id !== exerciseId));
  };

  const handleSetsChange = (exerciseId: number, value: number) => {
    setSelectedExercises(prev =>
      prev.map(e => e.exercise.id === exerciseId ? { ...e, sets: value } : e)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Workout name is required!");
    if (selectedExercises.length === 0) return alert("Add at least one exercise!");

    // Prepare data for creation
    const workoutData = {
      name,
      programId,
      exercises: selectedExercises.map(e => ({
        exerciseId: e.exercise.id,
        sets: e.sets
      }))
    };

    onCreate(workoutData);
    setName("");
    setSelectedExercises([]);
    onClose();
  };

  return (
<div className="modal-overlay-workout">
  <div className="modal-container-workout">
    <h2>Create a New Workout</h2>
    <form onSubmit={handleSubmit} className="modal-form-workout">
      <label>
        Workout Name*
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>

      {/* Search + Filters */}
      <div className="exercise-filters-workout">
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input-workout"
        />

        {/* Category Filter */}
        <div className="filter-dropdown-workout">
          <input
            type="text"
            placeholder="Filter category..."
            value={categorySearch || selectedCategory}
            onChange={e => setCategorySearch(e.target.value)}
            onFocus={() => setCategoryOpen(true)}
            onBlur={() => setTimeout(() => setCategoryOpen(false), 150)}
          />
          {categoryOpen && (
            <ul className="filter-list-workout">
              <li
                onClick={() => { setCategoryFilter(""); setCategorySearch(""); }}
                className={categoryFilter === "" ? "active-workout" : ""}
              >All Categories</li>
              {categories
                .filter(c => c.name.toLowerCase().includes(categorySearch.toLowerCase()))
                .map(c => (
                  <li
                    key={c.id}
                    onClick={() => { setCategoryFilter(c.id); setCategorySearch(""); }}
                    className={categoryFilter === c.id ? "active-workout" : ""}
                  >{c.name}</li>
                ))}
            </ul>
          )}
        </div>

        {/* Muscle Group Filter */}
        <div className="filter-dropdown-workout">
          <input
            type="text"
            placeholder="Filter muscle group..."
            value={muscleGroupSearch || selectedMuscleGroup}
            onChange={e => setMuscleGroupSearch(e.target.value)}
            onFocus={() => setMuscleGroupOpen(true)}
            onBlur={() => setTimeout(() => setMuscleGroupOpen(false), 150)}
          />
          {muscleGroupOpen && (
            <ul className="filter-list-workout">
              <li onClick={() => { setMuscleGroupFilter(""); setMuscleGroupSearch(""); }} className={muscleGroupFilter === "" ? "active-workout" : ""}>All Muscle Groups</li>
              {muscleGroups
                .filter(m => m.name.toLowerCase().includes(muscleGroupSearch.toLowerCase()))
                .map(m => (
                  <li
                    key={m.id}
                    onClick={() => { setMuscleGroupFilter(m.id); setMuscleGroupSearch(""); }}
                    className={muscleGroupFilter === m.id ? "active-workout" : ""}
                  >{m.name}</li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* New Flex Container for Lists */}
      <div className="modal-lists-workout">
        {/* Scrollable exercise search list */}
        <div className="exercise-list-workout scrollable-exercise-list-workout">
          <h3>Exercises</h3>
          {filteredExercises.map(ex => (
            <div key={ex.id} className="exercise-item-workout">
              <span>{ex.name}</span>
              <button type="button" onClick={() => handleAddExercise(ex)}>Add</button>
            </div>
          ))}
        </div>

        {/* Selected Exercises */}
        {selectedExercises.length > 0 && (
          <div className="selected-exercises-workout">
            <h3>Selected Exercises</h3>
            {selectedExercises.map(e => (
              <div key={e.exercise.id} className="selected-exercise-item-workout">
                <span>{e.exercise.name}</span>
                <input
                  type="number"
                  min={1}
                  value={e.sets}
                  onChange={ev => handleSetsChange(e.exercise.id, Number(ev.target.value))}
                />
                <Trash onClick={() => handleRemoveExercise(e.exercise.id)} className="trash-icon-workout"></Trash>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="modal-actions-workout">
        <button type="button" className="btn-cancel-workout" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-submit-workout">Create Workout</button>
      </div>
    </form>
  </div>
</div>
  );
}
