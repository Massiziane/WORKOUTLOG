export interface Workout {
  id: number;
  
  name: string;
  order?: number;
  frequency?: number;
}

export interface ProgramWorkout {
  workout: Workout;
  order: number;
}

export interface Program {
  id: number;
  name: string;
  Desc?: string;
  programWorkouts: ProgramWorkout[];
  userId: number;
}

export interface ProgramWithWorkouts extends Program {
  programWorkouts: ProgramWorkout[];
}

export interface Exercise {
  notes: string;
  id: number;
  name: string;
}

export interface SetTemplate {
  id: number;
  reps?: number;
  weight?: number;
  tempo?: string;
  type: "WARMUP" | "MAIN" | "DROPSET" | "FINISHER";
  exerciseId: number;
}
// components/CreateWorkoutModal/types.ts

export interface WorkoutSet {
  reps?: number;
  weight?: number;
  tempo?: string;
  restTime?: number;
}

export interface SelectedExercise {
  exercise: {
    id: number;
    name: string;
    setTemplate?: WorkoutSet[];
    // add other exercise fields if needed
  };
  sets: number;
  workoutSets: WorkoutSet[];
}

export interface Exercise {
  id: number;
  name: string;
  categoryId: number;
  muscleGroupId: number;
  setTemplate?: WorkoutSet[];
}


export interface WorkoutExercise {
  id: number;               // the DB id of this workout-exercise relation
  workoutId: number;        // the workout this exercise belongs to
  exerciseId: number;       // the exercise id
  notes?: string | null;    // optional notes
  exercise: Exercise;       // the full Exercise object for display
  // optionally you can add workoutSets?: WorkoutSet[] if needed later
}