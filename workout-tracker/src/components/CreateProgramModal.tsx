import { useState } from "react";
import type { CreateProgramModalProps } from "../types/CreateProgramModalProps";
import "../style/components/CreateProgramModal.css"
export default function CreateProgramModal({ isOpen, onClose, onCreate }: CreateProgramModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Program name is required!");
    onCreate({ name, description: description.trim() || undefined });
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create a New Program</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Program Name*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional"
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