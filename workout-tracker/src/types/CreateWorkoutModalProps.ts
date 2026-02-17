export interface CreateWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId: number;
  userId?: number;
  onCreate: (data: { 
    userId?: number;       // ✅ add this
    name: string; 
    programId: number; 
    exercises?: {
      exerciseId: number;
      sets?: number;        // optional if needed
      workoutSets?: {
        reps?: number;
        weight?: number;
        tempo?: string;
        restTime?: number;
        setTemplateId?: number;
      }[];
      setTemplate?: string;
    }[]
  }) => void;
}
