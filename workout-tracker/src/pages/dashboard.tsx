import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Sun, Moon } from "lucide-react"; // Lucide icons
import "../style/dashboard.css";
import { syncUser } from "../services/api";

// tabs imports
import AcceuilTab from "../components/Tabs/AcceuilTab/acceuil";
import ProgramDetailTab from "../components/Tabs/ProgramTab/Program";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Acceuil");
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">
          <img src="/workoutlog.png" alt="WorkoutLog Logo" className="logo-image" />
        </div>
        <div className="header-actions">
          <button
            className="dark-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
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
        {activeTab === "Acceuil" && dbUserId && <AcceuilTab dbUserId={dbUserId} />}
        {activeTab === "My Programs" && dbUserId && <ProgramDetailTab dbUserId={dbUserId} />}
        {activeTab === "My Progress" && <div>Coming Soon ...</div>}
      </main>
    </div>
  );
}
