import { useState } from "react";
import ProgramsSection from "../AcceuilTab/ProgramSection";
import ProgramInfoSection from "./ProgramInfoSection";
import WorkoutsPanel from "./WorkoutsPanel";
import type { Program, Workout } from "../../../types/entities";
import "../../../style/tabs/accueil/sectionsLayout.css";
import "../../../style/tabs/program/program.css";

export default function ProgramDetailTab({ dbUserId }: { dbUserId: number }) {
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [selectedWoput, setSelectedWorkout] = useState<Workout | null>(null);

  return (
    <div className="program-detail-tab-container">

      {/* Left: Programs list */}
      <div className="programs-panel">
        <ProgramsSection
          dbUserId={dbUserId}
          onSelectProgram={setSelectedProgram}
        />
      </div>

        {/* Right: Program info */}
      <ProgramInfoSection program={selectedProgram} />
        {/* Workouts list for selected program */}
        <WorkoutsPanel
          program={selectedProgram}
          onSelectWorkout={setSelectedWorkout}
          dbUserId={dbUserId}
        />

    </div>
  );
}
