import { useEffect, useState } from "react";
import type { Workout, ProgramWithWorkouts } from "../../../types/entities";
import { fetchRecords } from "../../../services/api";
import "../../../style/tabs/program/workoutsPanel.css";

interface WorkoutsPanelProps {
  program: ProgramWithWorkouts | null;
  onSelectWorkout?: (workout: Workout) => void;
  dbUserId: number;
}

/**
 * WorkoutsPanel
 * - Shows workouts belonging to the selected program.
 * - Fetches `programWorkouts` from backend when program changes.
 * - Displays clickable workout cards that trigger `onSelectWorkout`.
 */
export default function WorkoutsPanel({ 
  program, 
  onSelectWorkout, 
  dbUserId 
}: WorkoutsPanelProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  /**
   * Fetch workouts when the selected program changes.
   * Extracts workouts from `programWorkouts` relationship.
   */
  useEffect(() => {
    if (!program) {
      setWorkouts([]);
      return;
    }

    fetchRecords<ProgramWithWorkouts>(`programs/${program.id}?userId=${dbUserId}`)
      .then(data => {
        // Handle both single object and array responses
        const prog = Array.isArray(data) ? data[0] : data;
        
        if (!prog.programWorkouts) {
          setWorkouts([]);
          return;
        }
        
        // Extract workouts from programWorkouts relationship
        const ws = prog.programWorkouts.map(pw => pw.workout);
        setWorkouts(ws);
      })
      .catch(err => console.error("Failed to fetch workouts:", err));
  }, [program, dbUserId]);

  // Empty state - no program selected
  if (!program) {
    return (
      <div className="workouts-panel-empty">
        Select a program to see its workouts
      </div>
    );
  }

  return (
    <div className="workouts-panel-container">
      <h3>Workouts in {program.name}</h3>
      
      <div className="workouts-list">
        {workouts.length > 0 ? (
          // Clickable workout cards
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
          <div className="workout-card empty">
            No workouts for this program
          </div>
        )}
      </div>
    </div>
  );
}
