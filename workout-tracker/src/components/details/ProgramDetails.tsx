import { useEffect, useState } from "react";
import { fetchRecords } from "../../services/api";
import type { Program, Workout } from "../../types/entities";
import "../../style/details/ProgramDetailsModal.css";
import type { ProgramDetailsModalProps } from "../../types/details/ProgramDetailsModalProps";

export default function ProgramDetailsModal({ isOpen, onClose, programId, onAddWorkout, onWorkoutClick }:ProgramDetailsModalProps) {
  const [program, setProgram] = useState<Program | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const [dbUserId, setDbUserId] = useState<number | null>(null);

// Fetch program details and workouts when modal opens
  useEffect(() => {
    if (!isOpen || !dbUserId) return;

    const loadProgram = async () => {
      try {
        const data = await fetchRecords<Program>(`programs/${programId}`);
        setProgram(data as unknown as Program);
      } catch (err) {
        console.error("Failed to load program:", err);
      }
    };

    const loadWorkouts = async () => {
      try {
        // Pass userId as query param to filter on backend
        const data = await fetchRecords<Workout>(
          `workouts?programId=${programId}&userId=${dbUserId}`
        );
        setWorkouts(data);
      } catch (err) {
        console.error("Failed to load workouts:", err);
      }
    };

    loadProgram();
    loadWorkouts();
  }, [isOpen, programId, dbUserId]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container large">
        <h2>Program Details</h2>

        {program && (
          <div className="program-info">
            <h3>{program.name}</h3>
            {program.Desc && <p>{program.Desc}</p>}
          </div>
        )}

        <div className="workouts-section">
          <div className="section-header">
            <h4>Workouts</h4>
            <button className="btn-submit" onClick={onAddWorkout}>
              + Add Workout
            </button>
          </div>

          {workouts.length === 0 ? (
            <p className="empty-text">No workouts yet.</p>
          ) : (
            <ul className="workout-list">
              {workouts.map((workout) => (
                <li
                  key={workout.id}
                  className="workout-item"
                  onClick={() => onWorkoutClick(workout.id)}
                >
                  {workout.name}
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
