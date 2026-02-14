import { useEffect, useState } from "react";
import type { CreateExerciseModalProps } from "../types/CreateExerciseModalProps";
import { API_URL, createRecord } from "../services/api";
import "../style/components/CreateExerciseModal.css";

export default function CreateExerciseModal({
  isOpen,
  onClose,
  workoutId,
  onCreate,
}: CreateExerciseModalProps) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<number | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch muscle groups whenever category changes
  useEffect(() => {
    if (!selectedCategory) {
      setMuscleGroups([]);
      return;
    }
    const fetchMuscles = async () => {
      try {
        const res = await fetch(`${API_URL}/muscle-groups?categoryId=${selectedCategory}`);
        const data = await res.json();
        setMuscleGroups(data);
      } catch (err) {
        console.error("Failed to fetch muscle groups:", err);
      }
    };
    fetchMuscles();
  }, [selectedCategory]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedCategory) return alert("Name and category are required!");

    onCreate({
      name,
      categoryId: selectedCategory,
      muscleGroupId: selectedMuscleGroup || undefined,
      notes: notes || undefined,
      workoutId,
    });

    // Reset fields
    setName("");
    setNotes("");
    setSelectedCategory(null);
    setSelectedMuscleGroup(null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add a New Exercise</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Exercise Name*
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Category*
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              required
            >
              <option value="" disabled>Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </label>

          <label>
            Muscle Group
            <select
              value={selectedMuscleGroup || ""}
              onChange={(e) => setSelectedMuscleGroup(Number(e.target.value))}
            >
              <option value="">None</option>
              {muscleGroups.map((muscle) => (
                <option key={muscle.id} value={muscle.id}>{muscle.name}</option>
              ))}
            </select>
          </label>

          <label>
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional"
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}