export interface Program {
  id: number;
  name: string;
  Desc?: string;
}
export interface Workout {
  id: number;
  name: string;
}


export interface Exercise {
  notes: string;
  id: number;
  name: string;
}

export interface SetTemplate {
  id?: number;
  reps?: number;
  weight?: number;
  tempo?: string;
  type: "WARMUP" | "MAIN" | "DROPSET" | "FINISHER";
  exerciseId: number;
}

