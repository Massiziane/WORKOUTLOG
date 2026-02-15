import { useEffect, useState } from "react";
import { fetchRecords } from "../../services/api";
import type { Exercise, SetTemplate } from "../../types/entities";
import type { ExerciseDetailsModalProps } from "../../types/details/ExerciseDetailsModalProps";

export default function ExerciseDetailsModal({
  isOpen,
  onClose,
  exerciseId,
}: ExerciseDetailsModalProps) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [setTemplates, setSetTemplates] = useState<SetTemplate[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const loadExercise = async () => {
      const data = await fetchRecords<Exercise>(`exercises/${exerciseId}`);
      setExercise(data as unknown as Exercise);
    };

    const loadSetTemplates = async () => {
      const data = await fetchRecords<SetTemplate>(`setTemplates?exerciseId=${exerciseId}`);
      setSetTemplates(data);
    };

    loadExercise();
    loadSetTemplates();
  }, [isOpen, exerciseId]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container large">
        <h2>Exercise Details</h2>

        {exercise && (
          <div className="exercise-info">
            <h3>{exercise.name}</h3>
            <p>Notes: {exercise.notes || "No notes"}</p>
          </div>
        )}

        <div className="sets-section">
          <h4>Set Templates</h4>
          {setTemplates.length === 0 ? (
            <p className="empty-text">No set templates yet.</p>
          ) : (
            <ul className="set-list">
              {setTemplates.map((set) => (
                <li key={set.id} className="set-item">
                  {set.type} — {set.reps ?? "-"} reps — {set.weight ?? "-"} kg — Tempo: {set.tempo ?? "-"}
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
