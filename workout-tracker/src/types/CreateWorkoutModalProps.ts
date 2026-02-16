export interface CreateWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId: number;
  onCreate: (data: { 
    name: string; 
    programId: number; 
    exercises?: { exerciseId: number; setTemplate?: string }[]
  }) => void;
}
