// components/CreateWorkoutModal/SelectedExerciseList.tsx
import { Plus, Trash } from "lucide-react";
import type { SelectedExercise } from "./types";

interface SelectedExerciseListProps {
  selectedExercises: SelectedExercise[];
  currentExerciseId: number | null;
  onSelectExercise: (id: number) => void;
  onRemoveExercise: (id: number) => void;
  onOpenSetModal: () => void;
}

export default function SelectedExerciseList({
  selectedExercises,
  currentExerciseId,
  onSelectExercise,
  onRemoveExercise,
  onOpenSetModal
}: SelectedExerciseListProps) {
  return (
    <div className="panel selected-exercises-workout scrollable-selected-exercises">
      <h3>Selected Exercises</h3>
      {selectedExercises.length === 0 ? (
        <p>No exercises selected.</p>
      ) : (
        selectedExercises.map(e => (
          <div
            key={e.exercise.id}
            className={`selected-exercise-item-workout ${currentExerciseId === e.exercise.id ? "active" : ""}`}
            onClick={() => onSelectExercise(e.exercise.id)}
          >
            <span>{e.exercise.name}</span>
              <button type="button" onClick={onOpenSetModal} className="add-icon-workout">
                +  
              </button>
              <Trash
                onClick={(event) => { event.stopPropagation(); onRemoveExercise(e.exercise.id); }}
                className="trash-icon-workout"
              />
          </div>
        ))
      )}
    </div>
  );
}
