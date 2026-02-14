import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import "../style/dashboard.css";
import CreateProgramModal from "../components/CreateProgramModal";
import CreateWorkoutModal from "../components/CreateWorkoutModal";
import CreateExerciseModal from "../components/CreateExerciseModal";
import { API_URL, createRecord, syncUser } from "../services/api";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Acceuil");

  // Modal states
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);


  const [dbUserId, setDbUserId] = useState<number | null>(null);
  const [activeProgramId, setActiveProgramId] = useState<number | null>(null);
  const [activeWorkoutId, setActiveWorkoutId] = useState<number | null>(null);

  const [isSetTemplateModalOpen, setIsSetTemplateModalOpen] = useState(false);
  const [activeExerciseId, setActiveExerciseId] = useState<number | null>(null);


  const { user } = useUser();

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
      setIsWorkoutModalOpen(true); // open workout modal next
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
      setIsExerciseModalOpen(true); // open exercise modal next
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

      // Optional: keep modal open to add multiple exercises
      // setIsExerciseModalOpen(false); // close after single
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
        onCreate={handleCreateProgram}
      />

      {activeProgramId && (
        <CreateWorkoutModal
          isOpen={isWorkoutModalOpen}
          onClose={() => setIsWorkoutModalOpen(false)}
          programId={activeProgramId}
          onCreate={handleCreateWorkout}
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
    </div>
  );
}
