import { useState } from "react";
import type { CreateWorkoutModalProps } from "../types/CreateWorkoutModalProps";
import "../style/components/CreateWorkoutModal.css";

export default function CreateWorkoutModal({ isOpen, onClose, onCreate, programId }: CreateWorkoutModalProps) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Workout name is required!");

    // call the onCreate prop, passing name and programId
    onCreate({ name, programId });

    setName("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create a New Workout</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Workout Name*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
