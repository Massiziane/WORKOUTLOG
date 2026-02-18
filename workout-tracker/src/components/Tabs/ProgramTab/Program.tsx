import { useState } from "react";
import ProgramsSection from "../AcceuilTab/ProgramSection";
import ProgramInfoSection from "./ProgramInfoSection";
import WorkoutsPanel from "./WorkoutsPanel";
import ExercisesPanel from "./ExercisePanel";
import type { Program, Workout } from "../../../types/entities";
import "../../../style/tabs/accueil/sectionsLayout.css";
import "../../../style/tabs/program/program.css";

export default function ProgramDetailTab({ dbUserId }: { dbUserId: number }) {
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [selectedWorkoutId, setSelectedWorkout] = useState<Workout | null>(null);

  return (
<div className="program-detail-tab-container">
  {/* Left side: Programs list */}
  <div className="program-left-panel">
    <ProgramsSection
      dbUserId={dbUserId}
      onSelectProgram={setSelectedProgram}
    />
  </div>

  {/* Right side: Program info + workouts + exercises */}
  <div className="program-top right-panel">
    <ProgramInfoSection program={selectedProgram} />
    <WorkoutsPanel
      program={selectedProgram}
      onSelectWorkout={setSelectedWorkout}
      dbUserId={dbUserId}
    />
    </div>
    <div className="exteeme right-panel">
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
