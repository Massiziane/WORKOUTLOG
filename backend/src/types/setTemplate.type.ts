export type SetType = "REPS_ONLY" | "WEIGHT_REPS" | "WEIGHT_TEMPO" | "TEMPO_ONLY";

export interface SetTemplate {
  id: number;
  reps?: number;
  weight?: number;
  tempo?: string;
  type: SetType;
  exerciseId: number;
}