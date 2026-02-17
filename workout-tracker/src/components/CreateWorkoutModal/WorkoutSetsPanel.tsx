import { Trash, Edit3 } from "lucide-react";
import type { SelectedExercise } from "./types";
import "../../style/components/WorkoutSetsPanel.css"

interface WorkoutSetsPanelProps {
  workoutSets: SelectedExercise["workoutSets"];
  onDeleteSet?: (index: number) => void;
}

export default function WorkoutSetsPanel({ workoutSets, onDeleteSet }: WorkoutSetsPanelProps) {
  return (
    <div className="panel workout-sets-panel">
      <h3>Workout Sets</h3>
      {workoutSets.length === 0 ? (
        <p>No sets added yet for this exercise.</p>
      ) : (
        <div className="table-container">
          <table className="workout-sets-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Reps</th>
                <th>Weight (kg)</th>
                <th>Tempo</th>
                <th>Rest (sec)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {workoutSets.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{s.reps ?? "-"}</td>
                  <td>{s.weight ?? "-"}</td>
                  <td>{s.tempo ?? "-"}</td>
                  <td>{s.restTime ?? "-"}</td>
                  <td className="set-actions">
                    {onDeleteSet && (
                      <button
                        className="delete-set-btn"
                        onClick={() => onDeleteSet(i)}
                        title="Delete set"
                      >
                        <Trash size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
