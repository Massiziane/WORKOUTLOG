export interface CreateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutId?: number; 
  onCreate: (data: {
    name: string;
    categoryId: number;
    muscleGroupId?: number;
    notes?: string;
    workoutId: number;
  }) => void;
}
