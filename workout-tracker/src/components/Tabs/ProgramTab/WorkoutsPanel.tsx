import { useEffect, useState } from "react";
import type { Workout, ProgramWithWorkouts } from "../../../types/entities";
import { fetchRecords } from "../../../services/api";
import "../../../style/tabs/program/workoutsPanel.css";

interface WorkoutsPanelProps {
  program: ProgramWithWorkouts | null;
  onSelectWorkout?: (workout: Workout) => void;
  dbUserId: number;
}

export default function WorkoutsPanel({ program, onSelectWorkout, dbUserId }: WorkoutsPanelProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Fetch workouts when program changes
  useEffect(() => {
    if (!program) {
      setWorkouts([]);
      return;
    }

    fetchRecords<ProgramWithWorkouts>(`programs/${program.id}?userId=${dbUserId}`)
      .then((data) => {
        const prog = Array.isArray(data) ? data[0] : data;
        if (!prog.programWorkouts) {
          setWorkouts([]);
          return;
        }
        const ws = prog.programWorkouts.map(pw => pw.workout);
        setWorkouts(ws);
      })
      .catch((err) => console.error("Failed to fetch workouts:", err));
  }, [program, dbUserId]);

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
