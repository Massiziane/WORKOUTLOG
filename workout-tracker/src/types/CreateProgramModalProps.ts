import type { Workout } from "./entities";

export interface CreateProgramModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; Desc?: string; workouts: number[] }) => void ;
  workouts: Workout[]
}
