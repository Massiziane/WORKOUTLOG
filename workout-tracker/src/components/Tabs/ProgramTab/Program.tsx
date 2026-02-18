import { useState } from "react";
import ProgramsSection from "../AcceuilTab/ProgramSection"; // your existing section
import type { Workout, Program } from "../../../types/entities";
import "../../../style/tabs/program/program.css";

export default function ProgramDetailTab({ dbUserId }: { dbUserId: number }) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <div className="program-detail-tab-container">

      {/* Left: Programs list */}
      <div className="programs-panel">
        <ProgramsSection
          dbUserId={dbUserId}
        />
      </div>

    </div>
  );
}
