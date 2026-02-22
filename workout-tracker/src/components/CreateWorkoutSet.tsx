import { useState } from "react";
import type { CreateWorkoutSetModalProps } from "../types/CreateWorkoutSetModalProps";
import "../style/components/CreateWorkoutSetModal.css";

/**
 * CreateWorkoutSetModal
 * - Modal for adding a new set to a workout exercise.
 * - All fields are optional, but at least one must be filled.
 */
export default function CreateWorkoutSetModal({
  isOpen,
  onClose,
  workoutExerciseId,
  onCreate,
}: CreateWorkoutSetModalProps) {
  // Local form state (empty string = unset)
  const [reps, setReps] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [tempo, setTempo] = useState("");
  const [restTime, setRestTime] = useState<number | "">("");

  // Do not render the modal when it is closed
  if (!isOpen) return null;

  /**
   * Handle form submission:
   * - Require at least one field.
   * - Convert numeric fields from "" to undefined when not provided.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Guard: ensure at least one value is provided
    if (!reps && !weight && !tempo && !restTime) {
      return alert("Fill at least one field!");
    }

    onCreate({
      workoutExerciseId,
      reps: reps === "" ? undefined : Number(reps),
      weight: weight === "" ? undefined : Number(weight),
      tempo: tempo.trim() || undefined,
      restTime: restTime === "" ? undefined : Number(restTime),
    });

    // Reset form state after successful submit
    setReps("");
    setWeight("");
    setTempo("");
    setRestTime("");
    onClose();
  };

  return (
    <div className="modal-overlay-workoutset">
      <div className="modal-container-workoutset">
        <h2>Add Workout Set</h2>

        <form onSubmit={handleSubmit} className="modal-form-workoutset">
          {/* Reps input */}
          <label>
            Reps
            <input
              type="number"
              value={reps}
              onChange={e =>
                setReps(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Optional"
            />
          </label>

          {/* Weight input */}
          <label>
            Weight : Kg
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={e =>
                setWeight(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Optional"
            />
          </label>

          {/* Tempo input */}
          <label>
            Tempo
            <input
              type="text"
              value={tempo}
              onChange={e => setTempo(e.target.value)}
              placeholder="Optional"
            />
          </label>

          {/* Rest time input */}
          <label>
            Rest Time (seconds)
            <input
              type="number"
              value={restTime}
              onChange={e =>
                setRestTime(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Optional"
            />
          </label>

          {/* Actions */}
          <div className="modal-actions-workoutset">
            <button
              type="button"
              className="btn-cancel-workoutset"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit-workoutset">
              Add Set
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
