// ProgramInfoSection.tsx
import React from "react";
import type { Program } from "../../../types/entities";
import "../../../style/tabs/program/programInfo.css";

interface ProgramInfoSectionProps {
  program: Program | null;
}

export default function ProgramInfoSection({ program }: ProgramInfoSectionProps) {
  if (!program) {
    return (
      <div className="program-info-container empty">
        <p>Select a program to see details</p>
      </div>
    );
  }

  return (
    <div className="program-info-container">
      <h2>{program.name}</h2>
      <p>{program.Desc || "No description provided."}</p>
    </div>
  );
}
