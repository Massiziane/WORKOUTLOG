import ProgramsSection from "./ProgramSection";
import WorkoutsSection from "./WorkoutSection";
import ExercisesSection from "./ExerciseSection";
import "../../../style/tabs/accueil/acceuil.css";


export default function AcceuilTab() {
  return (
    <div className="acceuil-tab-container">
      <ProgramsSection />
      <WorkoutsSection />
      <ExercisesSection />
    </div>
  );
}
