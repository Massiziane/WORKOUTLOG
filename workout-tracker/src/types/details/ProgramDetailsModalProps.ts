export interface ProgramDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId: number;
  onAddWorkout: () => void;
  onWorkoutClick: (workoutId: number) => void;
}
