import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import "../style/dashboard.css";
import { syncUser } from "../services/api";


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Acceuil");

  // User states
  const [dbUserId, setDbUserId] = useState<number | null>(null);
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
            <button className="cta-btn" >
              Create a New Program
            </button>
          </div>
        )}
      </main>

    </div>
  );
}
