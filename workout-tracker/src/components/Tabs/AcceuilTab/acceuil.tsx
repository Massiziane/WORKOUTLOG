import ProgramsSection from "./ProgramSection";
import WorkoutsSection from "./WorkoutSection";
import ExercisesSection from "./ExerciseSection";
import "../../../style/tabs/accueil/acceuil.css";

/**
 * Props type for WorkoutsSection (and AcceuilTab).
 */
export interface WorkoutsSectionProps {
  dbUserId: number;
}

/**
 * Props type for ProgramsSection.
 */
export interface ProgramsSectionProps {
  dbUserId: number;
}

/**
 * AcceuilTab component
 * - Displays the main sections of the dashboard home.
 * - Shows user's programs, workouts, and exercises.
 * - Receives `dbUserId` for user-specific data fetching.
 */
export default function AcceuilTab({ dbUserId }: WorkoutsSectionProps) {
  return (
    <div className="acceuil-tab-container">
      {/* User's program list */}
      <ProgramsSection dbUserId={dbUserId} />

      {/* User's workouts overview */}
      <WorkoutsSection dbUserId={dbUserId} />

      {/* Exercise library */}
      <ExercisesSection />
    </div>
  );
}