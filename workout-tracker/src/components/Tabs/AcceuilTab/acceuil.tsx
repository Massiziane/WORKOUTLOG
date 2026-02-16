import ProgramsSection from "./ProgramSection";
import WorkoutsSection from "./WorkoutSection";
import ExercisesSection from "./ExerciseSection";
import "../../../style/tabs/accueil/acceuil.css";

export interface WorkoutsSectionProps {
  dbUserId: number; 
}

export default function AcceuilTab( { dbUserId }: WorkoutsSectionProps) {
  return (
    <div className="acceuil-tab-container">
      <ProgramsSection />
      <WorkoutsSection dbUserId={dbUserId as number} />
      <ExercisesSection />
    </div>
  );
}
