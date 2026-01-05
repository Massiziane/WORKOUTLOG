export interface WorkoutSet {
  id: number;
  workoutExerciseId: number; // FK → WorkoutExercise.id
  reps?: number;
  weight?: number;
  tempo?: string;
  performedAt: Date;
}