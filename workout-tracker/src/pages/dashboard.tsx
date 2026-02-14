import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import "../style/dashboard.css"
import CreateProgramModal from "../components/CreateProgramModal";
import { API_URL, createRecord, syncUser } from "../services/api";
import CreateWorkoutModal from "../components/CreateWorkoutModal";
import { Link } from "react-router-dom";


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Acceuil");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dbUserId, setDbUserId] = useState<number | null>(null); // store DB user id
  const { user } = useUser();
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [activeProgramId, setActiveProgramId] = useState<number | null>(null); // program created


  // Sync Clerk user to your DB
  useEffect(() => {
    if (!user) return;

    const sync = async () => {
      const data = await syncUser(user);
      if (data.id) setDbUserId(data.id);
    };

    sync();
  }, [user]);


  // Create a new program
const handleCreateProgram = async (data: { name: string; description?: string }) => {
  if (!dbUserId) return console.error("DB user not synced yet");

  const { name, description } = data;

  try {
    const newProgram = await createRecord("programs", {
      userId: dbUserId,
      name,
      description: description || "",
    });

    // Open the workout modal and pass the program id
    setActiveProgramId(newProgram.id);
    setIsWorkoutModalOpen(true);

    console.log("Program created:", newProgram);
  } catch (err) {
    console.error("Failed to create program:", err);
  }
};

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
            <button className="cta-btn" onClick={() => setIsModalOpen(true)}>
              Create a New Program
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {/* Program */}
      <CreateProgramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProgram}
      />

      {/* Workout */}
      {activeProgramId && (
        <CreateWorkoutModal
          isOpen={isWorkoutModalOpen}
          onClose={() => setIsWorkoutModalOpen(false)}
          programId={activeProgramId}  // pass programId to modal
          onCreate={async (data) => {
            try {
              const newWorkout = await createRecord("workouts", {
                programId: data.programId,
                userId: dbUserId!,
                name: data.name,
              });
              console.log("Workout created:", newWorkout);
              setIsWorkoutModalOpen(false); // close modal after creating
            } catch (err) {
              console.error("Failed to create workout:", err);
            }
          }}
        />
      )}
    </div>
  );
}






