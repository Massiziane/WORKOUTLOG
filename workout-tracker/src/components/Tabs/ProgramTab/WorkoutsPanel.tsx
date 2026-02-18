import { useEffect, useState } from "react";
import type { Workout, Program } from "../../../types/entities";
import { fetchRecords } from "../../../services/api";
import "../../../style/tabs/program/workoutsPanel.css";

interface WorkoutsPanelProps {
  program: Program | null;
  onSelectWorkout?: (workout: Workout) => void;
  dbUserId: number
}

export default function WorkoutsPanel({ program, onSelectWorkout, dbUserId }: WorkoutsPanelProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Fetch workouts when program changes
  useEffect(() => {
    if (!program) {
      setWorkouts([]);
      return;
    }

    fetchRecords<Workout>(`workouts?programId=${program.id}&userId=${dbUserId}`)
      .then(setWorkouts)
      .catch(err => console.error("Failed to fetch workouts:", err));
  }, [program]);

  if (!program) return <div className="workouts-panel-empty">Select a program to see its workouts</div>;

  return (
    <div className="workouts-panel-container">
      <h3>Workouts in {program.name}</h3>
      <div className="workouts-list">
        {workouts.length > 0 ? (
          workouts.map(w => (
            <div
              key={w.id}
              className="workout-card"
              onClick={() => onSelectWorkout?.(w)}
            >
              {w.name}
            </div>
          ))
        ) : (
          <div className="workout-card empty">No workouts for this program</div>
        )}
      </div>
    </div>
  );
}