import { useEffect, useState } from "react";
import type { WorkoutExercise } from "../../../types/entities";
import { fetchRecords } from "../../../services/api";
import "../../../style/tabs/program/exercisePanel.css";

interface ExercisesPanelProps {
  workoutId: number | null;
  dbUserId: number;
  onSelectExercise?: (workoutExercise: WorkoutExercise) => void;
}

/**
 * ExercisesPanel
 * - Shows exercises belonging to the selected workout.
 * - Fetches `workoutExercises` from backend when workout changes.
 * - Displays clickable exercise items with optional notes.
 */
export default function ExercisesPanel({ 
  workoutId, 
  onSelectExercise 
}: ExercisesPanelProps) {
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);

  /**
   * Fetch workout exercises when the selected workout changes.
   */
  useEffect(() => {
    if (!workoutId) {
      setWorkoutExercises([]);
      return;
    }

    fetchRecords(`workoutExercises/workout/${workoutId}`)
      .then(data => setWorkoutExercises(data as WorkoutExercise[]))
      .catch(err => console.error("Failed to fetch workout exercises:", err));
  }, [workoutId]);

  // Empty state - no workout selected
  if (!workoutId) {
    return (
      <div className="exercises-panel-empty">
        Select a workout to see its exercises
      </div>
    );
  }

  return (
    <div className="exercises-panel-container">
      <h4>Exercises related to this workout</h4>
      
      <ul className="exercises-list">
        {workoutExercises.length > 0 ? (
          // Clickable workout exercise items
          workoutExercises.map(we => (
            <li
              key={we.id}
              className="exercise-item"
              onClick={() => onSelectExercise?.(we)}
            >
              <strong>{we.exercise.name}</strong>
              {we.notes && (
                <div className="exercise-notes">Notes: {we.notes}</div>
              )}
            </li>
          ))
        ) : (
          <li className="exercise-item empty">No exercises found</li>
        )}
      </ul>
    </div>
  );
}
