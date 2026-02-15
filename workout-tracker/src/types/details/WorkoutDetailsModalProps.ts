export interface WorkoutDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutId: number;
  onAddExercise: () => void;
  onExerciseClick: (exerciseId: number) => void;
}
