export interface WorkoutExercise {
  id: number;
  workoutId: number;     // FK → Workout.id
  exerciseId: number;    // FK → Exercise.id
}