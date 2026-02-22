import { Trash } from "lucide-react";
import type { SelectedExercise } from "./types";

interface SelectedExerciseListProps {
  selectedExercises: SelectedExercise[];
  currentExerciseId: number | null;
  onSelectExercise: (id: number) => void;
  onRemoveExercise: (id: number) => void;
  onOpenSetModal: () => void;
}

/**
 * SelectedExerciseList
 * - Shows exercises that have been added to the workout.
 * - Clicking an exercise selects it (highlights + shows sets in right panel).
 * - Each item has Add Sets (+ button) and Remove (trash) actions.
 */
export default function SelectedExerciseList({
  selectedExercises,
  currentExerciseId,
  onSelectExercise,
  onRemoveExercise,
  onOpenSetModal,
}: SelectedExerciseListProps) {
  return (
    <div className="panel selected-exercises-workout scrollable-selected-exercises">
      <h3>Selected Exercises</h3>

      {/* Empty state */}
      {selectedExercises.length === 0 ? (
        <p>No exercises selected.</p>
      ) : (
        selectedExercises.map(e => (
          <div
            key={e.exercise.id}
            className={`selected-exercise-item-workout ${
              currentExerciseId === e.exercise.id ? "active" : ""
            }`}
            onClick={() => onSelectExercise(e.exercise.id)}
          >
            {/* Exercise name */}
            <span>{e.exercise.name}</span>

            {/* Add sets button (opens set modal) */}
            <button
              type="button"
              onClick={onOpenSetModal}
              className="add-icon-workout"
            >
              + 
            </button>

            {/* Remove exercise button */}
            <Trash
              onClick={event => {
                event.stopPropagation(); // Prevent triggering parent click
                onRemoveExercise(e.exercise.id);
              }}
              className="trash-icon-workout"
            />
          </div>
        ))
      )}
    </div>
  );
}