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
        // sync the Clerk user with DB
        const res = await fetch("http://localhost:3000/users/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0]?.emailAddress,
            username: user.username,
        }),
        });

        if (!res.ok) throw new Error(`Failed to sync user: ${res.statusText}`);

        const dbUser = await res.json(); 

        // create the program using the DB user id
        const newProgram = await createProgram({
        name: data.name,
        userId: dbUser.id, 
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






