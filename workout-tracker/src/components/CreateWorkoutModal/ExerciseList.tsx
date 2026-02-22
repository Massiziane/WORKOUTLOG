import type { Exercise } from "./types";

interface ExerciseListProps {
  exercises: Exercise[];
  onAdd: (exercise: Exercise) => void;
}

/**
 * ExerciseList
 * - Shows all available exercises in a scrollable panel.
 * - Lets the user add an exercise via the "Add" button.
 */
export default function ExerciseList({ exercises, onAdd }: ExerciseListProps) {
  return (
    <div className="panel exercise-list-workout scrollable-exercise-list-workout">
      <h3>All Exercises</h3>

      {/* Empty state */}
      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        exercises.map(ex => (
          <div key={ex.id} className="exercise-item-workout">
            <span>{ex.name}</span>
            <button type="button" onClick={() => onAdd(ex)}>
              Add
            </button>
          </div>
        ))
      )}
    </div>
  );
}
