import { useState } from "react";
import type { CreateSetTemplateModalProps } from "../types/CreateSetTemplateModalProps";
import "../style/components/CreateSetTemplateModal.css";

export default function CreateSetTemplateModal({ isOpen, onClose, exerciseId, onCreate }: CreateSetTemplateModalProps) {
  const [reps, setReps] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [tempo, setTempo] = useState("");
  const [type, setType] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!type.trim()) return alert("Set type is required!");

    onCreate({
      exerciseId,
      reps: reps === "" ? undefined : Number(reps),
      weight: weight === "" ? undefined : Number(weight),
      tempo: tempo.trim() || undefined,
      type: type.trim(),
    });

    // Reset form
    setReps("");
    setWeight("");
    setTempo("");
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
            Type*
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="e.g., Warmup, Working, AMRAP"
              required
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Set
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
