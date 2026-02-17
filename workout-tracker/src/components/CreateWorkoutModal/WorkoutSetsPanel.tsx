// components/CreateWorkoutModal/WorkoutSetsPanel.tsx
import type { SelectedExercise } from "./types";

interface WorkoutSetsPanelProps {
  workoutSets: SelectedExercise["workoutSets"];
}

export default function WorkoutSetsPanel({ workoutSets }: WorkoutSetsPanelProps) {
  return (
    <div className="panel workout-sets-panel scrollable-workout-sets">
      <h3>Workout Sets</h3>
      {workoutSets.length === 0 ? (
        <p>No sets added yet for this exercise.</p>
      ) : (
        <ul>
          {workoutSets.map((s, i) => (
            <li key={i}>
              {s.reps ?? "-"} reps | {s.weight ?? "-"} kg | {s.tempo ?? "-"} tempo | {s.restTime ?? "-"} sec
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
