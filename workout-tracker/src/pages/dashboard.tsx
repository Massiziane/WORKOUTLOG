import { use, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import "../style/dashboard.css"
import CreateProgramModal from "../components/CreateProgramModal";
import { createProgram } from "../services/api";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Acceuil"); // default tab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

    const handleCreateProgram = async (data: { name: string; description?: string }) => {
    if (!user) return;

    try {
        const newProgram = await createProgram({
        name: data.name,
        userId: Number(user.id), // Clerk ID -> your DB ID
        createdAt: new Date(),
        Desc: data.description || "", 
        });

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

      {/* Modal */}
      <CreateProgramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProgram}
      />
    </div>
  );
}






