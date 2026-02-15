export interface Workout {
  id: number;
  name: string;
  userId: number;
  programId?: number; // optionnel si freestyle
  createdAt: Date;
  order?: number;
}

