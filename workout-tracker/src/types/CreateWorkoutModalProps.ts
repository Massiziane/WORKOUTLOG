export interface CreateWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId: number;
  onCreate: (data: { name: string; programId: number; }) => void; // just name for now
}
