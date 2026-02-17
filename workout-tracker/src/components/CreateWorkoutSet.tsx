import { useState } from "react";
import type { CreateWorkoutSetModalProps } from "../types/CreateWorkoutSetModalProps";
import "../style/components/CreateWorkoutSetModal.css";

export default function CreateWorkoutSetModal({
  isOpen,
  onClose,
  workoutExerciseId,
  onCreate
}: CreateWorkoutSetModalProps) {
  const [reps, setReps] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [tempo, setTempo] = useState("");
  const [restTime, setRestTime] = useState<number | "">("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    // Reset form
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
          <label>
            Reps
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Optional"
            />
          </label>

          <label>
            Weight : Kg
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Optional"
            />
          </label>

          <label>
            Tempo
            <input
              type="text"
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              placeholder="Optional"
            />
          </label>

          <label>
            Rest Time (seconds)
            <input
              type="number"
              value={restTime}
              onChange={(e) => setRestTime(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Optional"
            />
          </label>

          <div className="modal-actions-workoutset">
            <button type="button" className="btn-cancel-workoutset" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit-workoutset">Add Set</button>
          </div>
        </form>
      </div>
    </div>
  );
}
