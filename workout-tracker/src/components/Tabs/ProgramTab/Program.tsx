import { useState } from "react";
import ProgramsSection from "../AcceuilTab/ProgramSection";
import ProgramInfoSection from "./ProgramInfoSection";
import WorkoutsPanel from "./WorkoutsPanel";
import ExercisesPanel from "./ExercisePanel";
import type { Program, Workout } from "../../../types/entities";
import "../../../style/tabs/accueil/sectionsLayout.css";
import "../../../style/tabs/program/program.css";

/**
 * ProgramDetailTab
 * - Main tab showing user's programs and program details.
 * - Three-panel layout: Programs list | Program info + workouts | Exercises.
 * - Selection cascades: Program → Workout → Exercise.
 */
export default function ProgramDetailTab({ dbUserId }: { dbUserId: number }) {
  // Selected program (for middle panel)
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  // Selected workout (for rightmost panel)
  const [selectedWorkoutId, setSelectedWorkout] = useState<Workout | null>(null);

  return (
    <div className="program-detail-tab-container">
      {/* ===== LEFT PANEL: Programs List ===== */}
      <ProgramsSection
        dbUserId={dbUserId}
        onSelectProgram={setSelectedProgram}
      />

      {/* ===== MIDDLE PANEL: Program Info + Workouts ===== */}
      <div className="program-top right-panel">
        <ProgramInfoSection program={selectedProgram} />
        <WorkoutsPanel
          program={selectedProgram}
          onSelectWorkout={setSelectedWorkout}
          dbUserId={dbUserId}
        />
      </div>

      {/* ===== RIGHT PANEL: Exercises ===== */}
      <div className="exteme right-panel">
        <ExercisesPanel
          workoutId={selectedWorkoutId?.id ?? null}
          dbUserId={dbUserId}
          onSelectExercise={(we) => {
            console.log("Selected workout exercise:", we);
          }}
        />
      </div>
    </div>
  );
}
