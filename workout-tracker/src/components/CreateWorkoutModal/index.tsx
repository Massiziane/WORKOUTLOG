// components/CreateWorkoutModal/index.tsx
import { useState, useEffect, useMemo } from "react";
import type { CreateWorkoutModalProps } from "../../types/CreateWorkoutModalProps";
import type { Exercise, SelectedExercise } from "./types";
import { fetchRecords } from "../../services/api";
import FilterDropdown from "./FilterDropdown";
import ExerciseList from "./ExerciseList";
import SelectedExerciseList from "./SelectedExerciseList";
import WorkoutSetsPanel from "./WorkoutSetsPanel";
import CreateWorkoutSetModal from "../CreateWorkoutSet";
import "../../style/components/CreateWorkoutModal.css";

export default function CreateWorkoutModal({
  isOpen,
  onClose,
  onCreate,
  programId,
  userId
}: CreateWorkoutModalProps) {
  // ------------------ STATE ------------------
  const [name, setName] = useState("");
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);
  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState<number | "">("");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState<number | "">("");
  const [categories, setCategories] = useState<{id: number; name: string}[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<{id: number; name: string}[]>([]);

  const [isSetModalOpen, setIsSetModalOpen] = useState(false);
  const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(null);

  // ------------------ EFFECTS ------------------
  useEffect(() => {
    if (!isOpen) return;
    fetchRecords<Exercise>("exercises").then(setAllExercises);
    fetchRecords<{id:number;name:string}>("categories").then(setCategories);
    fetchRecords<{id:number;name:string}>("muscle-groups").then(setMuscleGroups);
  }, [isOpen]);


  // ------------------ MEMO ------------------
  const currentExercise = useMemo(
    () => selectedExercises.find(e => e.exercise.id === currentExerciseId) || null,
    [selectedExercises, currentExerciseId]
  );

  const filteredExercises = useMemo(() => 
    allExercises
      .filter(ex => ex.name.toLowerCase().includes(search.toLowerCase()))
      .filter(ex => (categoryFilter === "" ? true : ex.categoryId === categoryFilter))
      .filter(ex => (muscleGroupFilter === "" ? true : ex.muscleGroupId === muscleGroupFilter))
      .sort((a, b) => a.name.localeCompare(b.name)),
    [allExercises, search, categoryFilter, muscleGroupFilter]
  );

if (!isOpen) return null;

  // ------------------ HANDLERS ------------------
  const handleAddExercise = (exercise: Exercise) => {
    if (!selectedExercises.find(e => e.exercise.id === exercise.id)) {
      setSelectedExercises(prev => [...prev, { exercise, sets: 1, workoutSets: [] }]);
    }
  };
  const handleRemoveExercise = (exerciseId: number) => {
    setSelectedExercises(prev => prev.filter(e => e.exercise.id !== exerciseId));
  };
  const handleAddWorkoutSet = (exerciseId: number, newSet: SelectedExercise["workoutSets"][0]) => {
    setSelectedExercises(prev =>
      prev.map(e => e.exercise.id === exerciseId
        ? { ...e, workoutSets: [...e.workoutSets, newSet] }
        : e
      )
    );
  };
  const handleSetsChange = (exerciseId: number, sets: number) => {
    setSelectedExercises(prev =>
      prev.map(e => e.exercise.id === exerciseId ? { ...e, sets } : e)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Workout name is required!");
    if (selectedExercises.length === 0) return alert("Add at least one exercise!");

    onCreate({
      userId,
      name,
      programId,
      exercises: selectedExercises.map(e => ({
        exerciseId: e.exercise.id,
        sets: e.sets,
        workoutSets: e.workoutSets
      }))
    });

    setName("");
    setSelectedExercises([]);
    onClose();
  };

  // ------------------ JSX ------------------
  return (
    <div className="modal-overlay-workout">
      <div className="modal-container-workout">
        <h2>Create a New Workout</h2>
        <form onSubmit={handleSubmit} className="modal-form-workout">
          <label>
            Workout Name*
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </label>

          {/* Filters */}
          <div className="exercise-filters-workout">
            <input
              type="text"
              placeholder="Search exercises..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input-workout"
            />
            <FilterDropdown
              items={categories}
              selected={categoryFilter}
              placeholder="Filter category..."
              onSelect={setCategoryFilter}
            />
            <FilterDropdown
              items={muscleGroups}
              selected={muscleGroupFilter}
              placeholder="Filter muscle group..."
              onSelect={setMuscleGroupFilter}
            />
          </div>

          {/* Panels */}
          <div className="modal-lists-workout three-panel-container">
            <ExerciseList exercises={filteredExercises} onAdd={handleAddExercise} />
            <SelectedExerciseList
              selectedExercises={selectedExercises}
              currentExerciseId={currentExerciseId}
              onSelectExercise={setCurrentExerciseId}
              onRemoveExercise={handleRemoveExercise}
              onOpenSetModal={() => setIsSetModalOpen(true)}
            />
            <WorkoutSetsPanel workoutSets={currentExercise?.workoutSets || []} />
          </div>

          {/* Actions */}
          <div className="modal-actions-workout">
            <button type="button" className="btn-cancel-workout" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit-workout">Create Workout</button>
          </div>
        </form>

        {/* Nested WorkoutSet modal */}
        {currentExerciseId && (
          <CreateWorkoutSetModal
            isOpen={isSetModalOpen}
            onClose={() => setIsSetModalOpen(false)}
            workoutExerciseId={currentExerciseId}
            existingTemplates={currentExercise?.exercise.setTemplate}
            onCreate={(newSet) => {
              handleAddWorkoutSet(currentExerciseId, newSet);
              setIsSetModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
