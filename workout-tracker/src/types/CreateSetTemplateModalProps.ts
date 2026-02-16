export interface CreateSetTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutExerciseId: number; 
  onCreate: (data: {
    workoutExerciseId: number;
    reps?: number;
    weight?: number;
    tempo?: string;
    type: string;
    restTime?: number
  }) => void;
}
