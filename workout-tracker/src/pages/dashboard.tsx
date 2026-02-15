import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import "../style/dashboard.css";
import CreateProgramModal from "../components/CreateProgram";
import CreateWorkoutModal from "../components/CreateWorkout";
import CreateExerciseModal from "../components/CreateExercise";
import { createRecord, fetchRecords, syncUser } from "../services/api";
import CreateSetTemplateModal from "../components/CreateSetTemplate";
import ProgramDetailsModal from "../components/details/ProgramDetails";
import WorkoutDetailsModal from "../components/details/WorkoutDetails";
import ExerciseDetailsModal from "../components/details/ExerciseDetails";
import type { Program } from "../types/entities";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Acceuil");

  // Modal states
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [isSetTemplateModalOpen, setIsSetTemplateModalOpen] = useState(false);
  // User states
  const [dbUserId, setDbUserId] = useState<number | null>(null);
  // Program states
  const [activeProgramId, setActiveProgramId] = useState<number | null>(null);
  const [activeWorkoutId, setActiveWorkoutId] = useState<number | null>(null);
  const [activeExerciseId, setActiveExerciseId] = useState<number | null>(null);
  const [activeExerciseDetailsId, setActiveExerciseDetailsId] = useState<number | null>(null);

  // Details
  const [isProgramDetailsOpen, setIsProgramDetailsOpen] = useState(false);
  const [isWorkoutDetailsOpen, setIsWorkoutDetailsOpen] = useState(false);
  const [isExerciseDetailsOpen, setIsExerciseDetailsOpen] = useState(false);

  // tabs
  const [myPrograms, setMyPrograms] = useState<Program[]>([]);

  const { user } = useUser();

  // ------------------- Hooks -------------------
  useEffect(() => {
    if (!dbUserId) return;

    const fetchMyPrograms = async () => {
      try {
        const data = await fetchRecords<Program>(`programs?userId=${dbUserId}`);
        setMyPrograms(data);
      } catch (err) {
        console.error("Failed to fetch user's programs:", err);
      }
    };

    fetchMyPrograms();
  }, [dbUserId]);


  // Sync Clerk user
  useEffect(() => {
    if (!user) return;
    const sync = async () => {
      const data = await syncUser(user);
      if (data.id) setDbUserId(data.id);
    };
    sync();
  }, [user]);

  // ------------------- Handlers -------------------

  // Create Program
  const handleCreateProgram = async (data: { name: string; description?: string }) => {
    if (!dbUserId) return console.error("DB user not synced yet");
    const { name, description } = data;

    try {
      const newProgram = await createRecord("programs", {
        userId: dbUserId,
        name,
        Desc: description || "",
      });

      console.log("Program created:", newProgram);

        setActiveProgramId(newProgram.id);
        setIsProgramModalOpen(false);
        setIsProgramDetailsOpen(true); 
    } catch (err) {
      console.error("Failed to create program:", err);
    }
  };

  // 2️Create Workout
  const handleCreateWorkout = async (data: { name: string; programId: number }) => {
    if (!dbUserId) return console.error("DB user not synced yet");
    try {
      const newWorkout = await createRecord("workouts", {
        userId: dbUserId,
        programId: data.programId,
        name: data.name,
      });

      console.log("Workout created:", newWorkout);

      setActiveWorkoutId(newWorkout.id);
      setIsWorkoutModalOpen(false);
      setIsWorkoutDetailsOpen(true);
    } catch (err) {
      console.error("Failed to create workout:", err);
    }
  };

  // Create Exercise
  const handleCreateExercise = async (data: {
    name: string;
    categoryId: number;
    muscleGroupId?: number;
    notes?: string;
    workoutId: number;
  }) => {
    try {
      const newExercise = await createRecord("exercises", {
        name: data.name,
        categoryId: data.categoryId,
        muscleGroupId: data.muscleGroupId || undefined,
        notes: data.notes || undefined,
        programId: activeProgramId!,
        workoutId: data.workoutId,
      });

      console.log("Exercise created:", newExercise);

      setActiveExerciseId(newExercise.id);
      setIsSetTemplateModalOpen(true);

      setIsExerciseModalOpen(false);
    } catch (err) {
      console.error("Failed to create exercise:", err);
    }
  };

  // Create a Set Template 
  const handleCreateSetTemplate = async (data: {
    exerciseId: number;
    reps?: number;
    weight?: number;
    tempo?: string;
    type: string;
  }) => {
    try {
      const newSetTemplate = await createRecord("setTemplates", data);
      console.log("Set Template created:", newSetTemplate);

      // Optional: keep modal open to add multiple sets
      // setIsSetTemplateModalOpen(false);
    } catch (err) {
      console.error("Failed to create Set Template:", err);
    }
  };

  const handleWorkoutClick = (workoutId: number) => {
    setActiveWorkoutId(workoutId);
    setIsWorkoutDetailsOpen(true);
  };
  const handleAddExercise = () => {
    setIsExerciseModalOpen(true);
  };
  const handleExerciseClick = (exerciseId: number) => {
    setActiveExerciseDetailsId(exerciseId);
    setIsExerciseDetailsOpen(true);
  };


  // ------------------- JSX -------------------

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">WorkoutApp</div>
        <div className="header-actions">
          <button>🌙</button>
          <UserButton />
        </div>
      </header>

      {/* Navbar */}
      <nav className="dashboard-nav">
        {["Acceuil", "My Programs", "My Progress"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main */}
      <main className="dashboard-main">
        {activeTab === "Acceuil" && (
          <div className="acceuil-tab">
            <button className="cta-btn" onClick={() => setIsProgramModalOpen(true)}>
              Create a New Program
            </button>
          </div>
        )}
      </main>

      {/* ------------------- Modals ------------------- */}

        <CreateProgramModal
          isOpen={isProgramModalOpen}
          onClose={() => setIsProgramModalOpen(false)}
          onCreate={handleCreateProgram} // this should now only open ProgramDetailsModal
        />

        {activeProgramId && (
          <ProgramDetailsModal
            isOpen={isProgramDetailsOpen}
            onClose={() => setIsProgramDetailsOpen(false)}
            programId={activeProgramId}
            onAddWorkout={() => setIsWorkoutModalOpen(true)}
            onWorkoutClick={handleWorkoutClick}
          />
        )}

      {activeProgramId && (
        <CreateWorkoutModal
          isOpen={isWorkoutModalOpen}
          onClose={() => setIsWorkoutModalOpen(false)}
          programId={activeProgramId}
          onCreate={handleCreateWorkout}
        />
      )}

      {activeWorkoutId && (
      <WorkoutDetailsModal
        isOpen={isWorkoutDetailsOpen}
        onClose={() => setIsWorkoutDetailsOpen(false)}
        workoutId={activeWorkoutId}
        onAddExercise={handleAddExercise}
        onExerciseClick={handleExerciseClick}
      />
    )}


      {activeWorkoutId && (
        <CreateExerciseModal
          isOpen={isExerciseModalOpen}
          onClose={() => setIsExerciseModalOpen(false)}
          workoutId={activeWorkoutId}
          onCreate={handleCreateExercise} 
        />
      )}
      
      {activeExerciseDetailsId && (
          <ExerciseDetailsModal
            isOpen={isExerciseDetailsOpen}
            onClose={() => setIsExerciseDetailsOpen(false)}
            exerciseId={activeExerciseDetailsId}
          />
        )}


      {activeExerciseId && (
        <CreateSetTemplateModal
          isOpen={isSetTemplateModalOpen}
          onClose={() => setIsSetTemplateModalOpen(false)}
          exerciseId={activeExerciseId}
          onCreate={handleCreateSetTemplate}
        />
      )}

    </div>
  );
}
