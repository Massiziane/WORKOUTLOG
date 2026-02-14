export interface CreateSetTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: number; 
  onCreate: (data: {
    exerciseId: number;
    reps?: number;
    weight?: number;
    tempo?: string;
    type: string;
  }) => void;
}
