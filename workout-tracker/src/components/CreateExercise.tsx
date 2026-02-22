import { useEffect, useState } from "react";
import type { CreateExerciseModalProps } from "../types/CreateExerciseModalProps";
import { fetchRecords } from "../services/api";
import "../style/components/CreateExerciseModal.css";

/**
 * CreateExerciseModal
 * - Lets the user create a new exercise.
 * - Supports category and muscle group selection via searchable dropdowns.
 * - Calls `onCreate` with the new exercise payload, then closes.
 */
export default function CreateExerciseModal({
  isOpen,
  onClose,
  workoutId,
  onCreate,
}: CreateExerciseModalProps) {
  // Basic exercise fields
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  // Category / muscle group data
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<{ id: number; name: string }[]>([]);

  // Selected category / muscle group
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<number | null>(null);

  // Search text for dropdown filters
  const [categorySearch, setCategorySearch] = useState("");
  const [muscleSearch, setMuscleSearch] = useState("");

  // Dropdown open/close state
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [muscleOpen, setMuscleOpen] = useState(false);

  /**
   * Load categories once on mount.
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchRecords<{ id: number; name: string }>("categories");
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    loadCategories();
  }, []);

  /**
   * Load muscle groups whenever selectedCategory changes.
   * If no category selected, load all muscle groups.
   */
  useEffect(() => {
    const loadMuscles = async () => {
      if (!selectedCategory) {
        const data = await fetchRecords<{ id: number; name: string }>("muscle-groups");
        setMuscleGroups(data);
        return;
      }
      const data = await fetchRecords<{ id: number; name: string }>(
        `muscle-groups?categoryId=${selectedCategory}`
      );
      setMuscleGroups(data);
    };
    loadMuscles();
  }, [selectedCategory]);

  /**
   * Close modal on ESC key press.
   */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Do not render anything if modal is closed
  if (!isOpen) return null;

  /**
   * Reset internal form state (used on submit).
   */
  const resetForm = () => {
    setName("");
    setNotes("");
    setSelectedCategory(null);
    setSelectedMuscleGroup(null);
    setCategorySearch("");
    setMuscleSearch("");
  };

  /**
   * Submit handler: validates required fields and passes payload to parent.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedCategory) return;

    onCreate({
      name,
      categoryId: selectedCategory,
      muscleGroupId: selectedMuscleGroup || undefined,
      notes: notes || undefined,
      workoutId: workoutId as number,
    });

    resetForm();
    onClose();
  };

  // Selected labels for dropdown inputs
  const selectedCategoryName =
    categories.find(c => c.id === selectedCategory)?.name || "";
  const selectedMuscleName =
    muscleGroups.find(m => m.id === selectedMuscleGroup)?.name || "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <h2>Add a New Exercise</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Exercise name */}
          <label htmlFor="exercise-name">Exercise Name*</label>
          <input
            id="exercise-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          {/* Category (searchable dropdown) */}
          <label>Category*</label>
          <div className="filter-dropdown">
            <input
              type="text"
              placeholder="Search category..."
              value={categorySearch || selectedCategoryName}
              onChange={e => setCategorySearch(e.target.value)}
              onFocus={() => setCategoryOpen(true)}
              onBlur={() => setTimeout(() => setCategoryOpen(false), 150)}
            />
            {categoryOpen && (
              <ul className="filter-list">
                <li
                  onClick={() => {
                    setSelectedCategory(null);
                    setCategorySearch("");
                  }}
                  className={selectedCategory === null ? "active" : ""}
                >
                  All Categories
                </li>
                {categories
                  .filter(cat =>
                    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
                  )
                  .map(cat => (
                    <li
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCategorySearch("");
                      }}
                      className={selectedCategory === cat.id ? "active" : ""}
                    >
                      {cat.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Muscle group (searchable dropdown) */}
          <label>Muscle Group</label>
          <div className="filter-dropdown">
            <input
              type="text"
              placeholder="Search muscle group..."
              value={muscleSearch || selectedMuscleName}
              onChange={e => setMuscleSearch(e.target.value)}
              onFocus={() => setMuscleOpen(true)}
              onBlur={() => setTimeout(() => setMuscleOpen(false), 150)}
            />
            {muscleOpen && (
              <ul className="filter-list">
                <li
                  onClick={() => {
                    setSelectedMuscleGroup(null);
                    setMuscleSearch("");
                  }}
                  className={selectedMuscleGroup === null ? "active" : ""}
                >
                  None
                </li>
                {muscleGroups
                  .filter(mg =>
                    mg.name.toLowerCase().includes(muscleSearch.toLowerCase())
                  )
                  .map(mg => (
                    <li
                      key={mg.id}
                      onClick={() => {
                        setSelectedMuscleGroup(mg.id);
                        setMuscleSearch("");
                      }}
                      className={selectedMuscleGroup === mg.id ? "active" : ""}
                    >
                      {mg.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Optional notes */}
          <label htmlFor="exercise-notes">Notes</label>
          <textarea
            id="exercise-notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Optional"
          />

          {/* Modal actions */}
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
