export interface Progress {
  id: number;
  userId: number;        // FK → User.id
  workoutId: number;     // FK → Workout.id
  totalVolume: number;   // somme poids * reps ou autre métrique
  bestSet: string;       // description du set le plus performant
  consistencyScore: number; // score sur la régularité
  createdAt: Date;
}