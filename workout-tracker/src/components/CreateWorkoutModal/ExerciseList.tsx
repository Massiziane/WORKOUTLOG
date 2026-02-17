import type { Exercise } from "./types";

interface ExerciseListProps {
  exercises: Exercise[];
  onAdd: (exercise: Exercise) => void;
}

export default function ExerciseList({ exercises, onAdd }: ExerciseListProps) {
  return (
    <div className="panel exercise-list-workout scrollable-exercise-list-workout">
      <h3>All Exercises</h3>
      {exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        exercises.map(ex => (
          <div key={ex.id} className="exercise-item-workout">
            <span>{ex.name}</span>
            <button type="button" onClick={() => onAdd(ex)}>Add</button>
          </div>
        ))
      )}
    </div>
  );
}
