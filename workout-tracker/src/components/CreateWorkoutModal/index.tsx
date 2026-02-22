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

/**
 * CreateWorkoutModal
 * - Modal to create a new workout.
 * - Lets the user pick exercises, filter them, and define sets.
 * - On submit, calls `onCreate` with a fully structured payload.
 */
export default function CreateWorkoutModal({
  isOpen,
  onClose,
  onCreate,
  programId,
  userId,
}: CreateWorkoutModalProps) {
  // ------------------ STATE ------------------
  const [name, setName] = useState("");
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);
  const [search, setSearch] = useState("");

  // Filters and filter data
  const [categoryFilter, setCategoryFilter] = useState<number | "">("");
  const [muscleGroupFilter, setMuscleGroupFilter] = useState<number | "">("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<{ id: number; name: string }[]>([]);

  // Nested set modal state
  const [isSetModalOpen, setIsSetModalOpen] = useState(false);
  const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(null);

  // ------------------ EFFECTS ------------------
  /**
   * Load exercises, categories, and muscle groups whenever the modal opens.
   */
  useEffect(() => {
    if (!isOpen) return;
    fetchRecords<Exercise>("exercises").then(setAllExercises);
    fetchRecords<{ id: number; name: string }>("categories").then(setCategories);
    fetchRecords<{ id: number; name: string }>("muscle-groups").then(setMuscleGroups);
  }, [isOpen]);

  // ------------------ MEMO ------------------
  /**
   * Currently selected exercise (for the right-hand sets panel).
   */
  const currentExercise = useMemo(
    () => selectedExercises.find(e => e.exercise.id === currentExerciseId) || null,
    [selectedExercises, currentExerciseId]
  );

  /**
   * Filtered list of exercises by search, category, and muscle group.
   */
  const filteredExercises = useMemo(
    () =>
      allExercises
        .filter(ex => ex.name.toLowerCase().includes(search.toLowerCase()))
        .filter(ex => (categoryFilter === "" ? true : ex.categoryId === categoryFilter))
        .filter(ex => (muscleGroupFilter === "" ? true : ex.muscleGroupId === muscleGroupFilter))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [allExercises, search, categoryFilter, muscleGroupFilter]
  );

  // Do not render when modal is closed
  if (!isOpen) return null;

  // ------------------ HANDLERS ------------------
  /**
   * Add an exercise to the selected list if not already present.
   */
  const handleAddExercise = (exercise: Exercise) => {
    if (!selectedExercises.find(e => e.exercise.id === exercise.id)) {
      setSelectedExercises(prev => [...prev, { exercise, sets: 1, workoutSets: [] }]);
    }
  };

  /**
   * Remove an exercise (and all its sets) from the selected list.
   */
  const handleRemoveExercise = (exerciseId: number) => {
    setSelectedExercises(prev => prev.filter(e => e.exercise.id !== exerciseId));
  };

  /**
   * Add a workout set to a given selected exercise.
   */
  const handleAddWorkoutSet = (
    exerciseId: number,
    newSet: SelectedExercise["workoutSets"][0]
  ) => {
    setSelectedExercises(prev =>
      prev.map(e =>
        e.exercise.id === exerciseId
          ? { ...e, workoutSets: [...e.workoutSets, newSet] }
          : e
      )
    );
  };

  /**
   * Remove a specific workout set (by index) from an exercise.
   */
  const handleRemoveWorkoutSet = (exerciseId: number, setIndex: number) => {
    setSelectedExercises(prev =>
      prev.map(e =>
        e.exercise.id === exerciseId
          ? { ...e, workoutSets: e.workoutSets.filter((_, i) => i !== setIndex) }
          : e
      )
    );
  };

  /**
   * Submit handler: validate and send workout payload upward.
   */
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
        workoutSets: e.workoutSets,
      })),
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
          {/* Workout name */}
          <label>
            Workout Name*
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
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

          {/* Panels: available, selected, sets */}
          <div className="modal-lists-workout three-panel-container">
            <ExerciseList exercises={filteredExercises} onAdd={handleAddExercise} />

            <SelectedExerciseList
              selectedExercises={selectedExercises}
              currentExerciseId={currentExerciseId}
              onSelectExercise={setCurrentExerciseId}
              onRemoveExercise={handleRemoveExercise}
              onOpenSetModal={() => setIsSetModalOpen(true)}
            />

            <WorkoutSetsPanel
              workoutSets={currentExercise?.workoutSets || []}
              onDeleteSet={index =>
                handleRemoveWorkoutSet(currentExerciseId!, index)
              }
            />
          </div>

          {/* Actions */}
          <div className="modal-actions-workout">
            <button
              type="button"
              className="btn-cancel-workout"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit-workout">
              Create Workout
            </button>
          </div>
        </form>

        {/* Nested WorkoutSet modal for the currently selected exercise */}
        {currentExerciseId && (
          <CreateWorkoutSetModal
            isOpen={isSetModalOpen}
            onClose={() => setIsSetModalOpen(false)}
            workoutExerciseId={currentExerciseId}
            onCreate={newSet => {
              handleAddWorkoutSet(currentExerciseId, newSet);
              setIsSetModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}