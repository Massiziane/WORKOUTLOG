import type { SetTemplate as EntitySetTemplate } from "../../types/entities";

export type SetTemplate = EntitySetTemplate;

export interface Exercise {
  id: number;
  name: string;
  categoryId?: number | null;
  muscleGroupId?: number | null;
  setTemplate: SetTemplate[];
}

export interface SelectedExercise {
  exercise: Exercise;
  sets: number;
  workoutSets: {
    reps?: number;
    weight?: number;
    tempo?: string;
    restTime?: number;
    setTemplateId?: number;
  }[];
}