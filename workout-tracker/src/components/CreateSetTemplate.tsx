import { useState } from "react";
import type { CreateSetTemplateModalProps } from "../types/CreateSetTemplateModalProps";
import "../style/components/CreateSetTemplateModal.css";

export default function CreateSetTemplateModal({ isOpen, onClose, workoutExerciseId, onCreate }: CreateSetTemplateModalProps) {
  const [reps, setReps] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [tempo, setTempo] = useState("");
  const [restTime, setRestTime] = useState<number | "">("");
  const [type, setType] = useState<"WARMUP" | "MAIN" | "DROPSET" | "FINISHER" | "">("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!type) return alert("Set type is required!");

    onCreate({
      workoutExerciseId,
      reps: reps === "" ? undefined : Number(reps),
      weight: weight === "" ? undefined : Number(weight),
      tempo: tempo.trim() || undefined,
      restTime: restTime === "" ? undefined : Number(restTime),
      type,
    });

    // Reset form
    setReps("");
    setWeight("");
    setTempo("");
    setRestTime("");
    setType("");

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add Set Template</h2>
        <form onSubmit={handleSubmit} className="modal-form">
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
            Weight
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

          <label>
            Type*
            <select value={type} onChange={(e) => setType(e.target.value as any)} required>
              <option value="">Select type</option>
              <option value="WARMUP">WARMUP</option>
              <option value="MAIN">MAIN</option>
              <option value="DROPSET">DROPSET</option>
              <option value="FINISHER">FINISHER</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Add Set</button>
          </div>
        </form>
      </div>
    </div>
  );
}
