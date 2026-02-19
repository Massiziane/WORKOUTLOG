import { useEffect, useState } from "react";
import type { WorkoutExercise } from "../../../types/entities";
import { fetchRecords } from "../../../services/api";
import "../../../style/tabs/program/exercisePanel.css";

interface ExercisesPanelProps {
  workoutId: number | null;
  dbUserId: number;
  onSelectExercise?: (workoutExercise: WorkoutExercise) => void;
}

export default function ExercisesPanel({ workoutId, dbUserId, onSelectExercise }: ExercisesPanelProps) {
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);

  useEffect(() => {
    if (!workoutId) {
      setWorkoutExercises([]);
      return;
    }
     
    fetchRecords(`workoutExercises?workoutId=${workoutId}&userId=${dbUserId}`)
      .then((data) => setWorkoutExercises(data as WorkoutExercise[]))
      .catch((err) => console.error("Failed to fetch workout exercises:", err));
  }, [workoutId, dbUserId]);

  if (!workoutId) return <div className="exercises-panel-empty">Select a workout to see its exercises</div>;

  return (
    <div className="exercises-panel-container">
      <h4>Exercises</h4>
      <ul className="exercises-list">
        {workoutExercises.length > 0 ? (
          workoutExercises.map((we) => (
            <li
              key={we.id}
              className="exercise-item"
              onClick={() => onSelectExercise?.(we)}
            >
              <strong>{we.exercise.name}</strong>
              {we.notes && <div className="exercise-notes">Notes: {we.notes}</div>}
            </li>
          ))
        ) : (
          <li className="exercise-item empty">No exercises found</li>
        )}
      </ul>
    </div>
  );
}
