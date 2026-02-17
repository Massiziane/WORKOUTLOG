import type { SetTemplate } from "./entities";

export interface CreateWorkoutSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutExerciseId: number;
  existingTemplates?: SetTemplate[];
  initialData?: {
    reps?: number;
    weight?: number;
    tempo?: string;
    restTime?: number;
    setTemplateId?: number;
  };
  onCreate: (newSet: {
    workoutExerciseId: number;
    reps?: number;
    weight?: number;
    tempo?: string;
    restTime?: number;
    setTemplateId?: number;
  }) => void;
}
