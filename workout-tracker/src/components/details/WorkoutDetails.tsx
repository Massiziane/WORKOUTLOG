import { useEffect, useState } from "react";
import { fetchRecords } from "../../services/api";
import type { Exercise, Workout } from "../../types/entities";
import type { WorkoutDetailsModalProps } from "../../types/details/WorkoutDetailsModalProps";
import "../../style/details/WorkoutDetailsModdal.css";
export default function WorkoutDetailsModal({
  isOpen,
  onClose,
  workoutId,
  onAddExercise,
  onExerciseClick,
}: WorkoutDetailsModalProps) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [dbUserId, setDbUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const loadWorkout = async () => {
      const data = await fetchRecords<Workout>(`workouts/${workoutId}`);
      setWorkout(data as unknown as Workout);
    };

    const loadExercises = async () => {
      if (!dbUserId) return;
      try {
        const data = await fetchRecords<Exercise>(
          `exercises?workoutId=${workoutId}&userId=${dbUserId}`
        );
        setExercises(data);
      } catch (err) {
        console.error("Failed to load exercises:", err);
      }
    };


    loadWorkout();
    loadExercises();
  }, [isOpen, workoutId]);

  if (!isOpen) return null;

  return (
      <div className="modal-overlay">
        <div className="modal-container large">
          <h2>Workout Details</h2>

          {workout && (
            <div className="workout-info">
              <h3>{workout.name}</h3>
            </div>
          )}

          <div className="exercises-section">
            <div className="section-header">
              <h4>Exercises</h4>
              <button className="btn-submit" onClick={onAddExercise}>
                + Add Exercise
              </button>
            </div>

            {exercises.length === 0 ? (
              <p className="empty-text">No exercises yet.</p>
            ) : (
              <ul className="exercise-list">
                {exercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="exercise-item"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // Call the function passed from Dashboard to open ExerciseDetailsModal
                      if (typeof onExerciseClick === "function") {
                        onExerciseClick(exercise.id);
                      }
                    }}
                  >
                    {exercise.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="modal-actions">
            <button className="btn-cancel" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>

  );
}