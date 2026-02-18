import { useState, useEffect, useMemo } from "react";
import type { CreateProgramModalProps } from "../types/CreateProgramModalProps";
import "../style/components/CreateProgramModal.css";

export default function CreateProgramModal({
  isOpen,
  onClose,
  onCreate,
  workouts
}: CreateProgramModalProps) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  // Reset modal fields when opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setDescription("");
      setSelectedWorkouts([]);
      setSearch("");
    }
  }, [isOpen]);

  // Filter workouts based on search
  const filteredWorkouts = useMemo(() => 
    workouts
      .filter(w => w.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name)),
    [workouts, search]
  );

  if (!isOpen) return null;

  const handleToggleWorkout = (id: number) => {
    setSelectedWorkouts(prev => 
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Program name is required!");
    if (selectedWorkouts.length === 0) return alert("Add at least one workout!");

    onCreate({
      name: name.trim(),
      Desc: description.trim() || undefined,
      workouts: selectedWorkouts
    });

    onClose();
  };

  return (
    <div className="program-modal-overlay">
      <div className="program-modal-container">
        <h2 className="program-modal-title">Create New Program</h2>

        <form onSubmit={handleSubmit} className="program-modal-form">

          {/* Program Name & Description */}
          <div className="form-top">
            <div className="form-group">
              <label htmlFor="program-name">Program Name*</label>
              <input
                id="program-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Push Pull Legs"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="program-desc">Description</label>
              <textarea
                id="program-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description..."
                rows={3}
              />
            </div>
          </div>

          {/* Horizontal Panels */}
          <div className="workouts-panels">

            {/* Left Panel: Available Workouts */}
            <div className="panel available-workouts">
              <h3>Available Workouts</h3>
              <input
                type="text"
                placeholder="Search workouts..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input-workout"
              />
              <div className="workout-list-container">
                {filteredWorkouts.length > 0 ? (
                  filteredWorkouts.map(w => (
                    <div
                      key={w.id}
                      className={`workout-item ${selectedWorkouts.includes(w.id) ? "selected" : ""}`}
                      onClick={() => handleToggleWorkout(w.id)}
                    >
                      {w.name}
                    </div>
                  ))
                ) : (
                  <div className="workout-item empty">No workouts found</div>
                )}
              </div>
            </div>

            {/* Right Panel: Selected Workouts */}
            <div className="panel selected-workouts-panel">
              <h3>Selected Workouts</h3>
              <div className="selected-workouts-container">
                {selectedWorkouts.length > 0 ? (
                  <ul>
                    {selectedWorkouts.map(id => {
                      const workout = workouts.find(w => w.id === id);
                      return workout ? <li key={id}>{workout.name}</li> : null;
                    })}
                  </ul>
                ) : (
                  <div className="workout-item empty">No workouts selected</div>
                )}
              </div>
            </div>

          </div>

          {/* Form Actions */}
          <div className="program-modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Program
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
