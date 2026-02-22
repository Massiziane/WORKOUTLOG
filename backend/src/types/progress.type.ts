export interface Progress {
  id: number;
  userId: number;        // FK → User.id
  workoutId: number; 
  totalVolume: number;  
  bestSetId: number;    
  consistencyScore: number; 
  createdAt: Date;
}