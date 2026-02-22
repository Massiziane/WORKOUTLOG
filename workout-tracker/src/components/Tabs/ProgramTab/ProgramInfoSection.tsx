import type { Program } from "../../../types/entities";
import "../../../style/tabs/program/programInfo.css";

interface ProgramInfoSectionProps {
  program: Program | null;
}

/**
 * ProgramInfoSection
 * - Shows basic information about the selected program.
 * - Displays empty state when no program is selected.
 */
export default function ProgramInfoSection({ program }: ProgramInfoSectionProps) {
  // Empty state - no program selected
  if (!program) {
    return (
      <div className="program-info-container empty">
        <p>Select a program to see details</p>
      </div>
    );
  }

  // Selected program details
  return (
    <div className="program-info-container">
      <h2>{program.name}</h2>
      <p>{program.Desc || "No description provided."}</p>
    </div>
  );
}
