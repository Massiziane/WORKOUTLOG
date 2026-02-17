export interface CreateSetTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutExerciseId: number; 
  onCreate: (data: {
    workoutExerciseId: number;
    reps?: number;
    weight?: number;
    tempo?: string;
    type: "WARMUP" | "MAIN" | "DROPSET" | "FINISHER";
    restTime?: number
  }) => void;
}
