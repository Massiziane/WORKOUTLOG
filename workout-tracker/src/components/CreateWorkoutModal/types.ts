export interface FilterDropdownItem {
  id: number;
  name: string;
}

export interface FilterDropdownProps {
  items: FilterDropdownItem[];
  selected: number | "";
  placeholder: string;
  onSelect: (id: number | "") => void;
}


export interface Exercise {
  id: number;
  name: string;
  categoryId?: number | null;
  muscleGroupId?: number | null;
}

export interface SelectedExercise {
  exercise: Exercise;
  sets: number;
  workoutSets: {
    reps?: number;
    weight?: number;
    tempo?: string;
    restTime?: number;
    setTemplateId?: number;
  }[];
}