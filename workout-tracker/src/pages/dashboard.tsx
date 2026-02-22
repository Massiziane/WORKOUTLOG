import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Sun, Moon } from "lucide-react"; // Lucide icons for light/dark mode
import "../style/dashboard.css";
import { syncUser } from "../services/api";
import { useSearchParams } from "react-router-dom";

// Tabs imports
import AcceuilTab from "../components/Tabs/AcceuilTab/acceuil";
import ProgramDetailTab from "../components/Tabs/ProgramTab/Program";

/**
 * Dashboard page component.
 * - Displays logged-in user interface after authentication.
 * - Includes navigation tabs, theme toggle, and user management.
 * - Syncs Clerk user with backend database.
 */
export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  // Manage tab state from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "Acceuil";
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // User states
  const [dbUserId, setDbUserId] = useState<number | null>(null);
  const { user } = useUser();

  /**
   * Toggles dark mode by setting the `data-theme` attribute
   * on the <html> element, allowing global theme switching.
   */
  const toggleDarkMode = () => {
    const html = document.documentElement;

    if (html.getAttribute("data-theme") === "dark") {
      html.removeAttribute("data-theme");
      setDarkMode(false);
    } else {
      html.setAttribute("data-theme", "dark");
      setDarkMode(true);
    }
  };

  /**
   * Sync Clerk user with backend database.
   * Once synced, store user ID returned by backend.
   */
  useEffect(() => {
    if (!user) return;

    const sync = async () => {
      const data = await syncUser(user);
      if (data.id) setDbUserId(data.id);
    };

    sync();
  }, [user]);

  /**
   * Handles tab switching and updates the URL query parameter.
   */
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      {/* ===== Header ===== */}
      <header className="dashboard-header">
        {/* App logo */}
        <div className="logo">
          <img src="/workoutlog.png" alt="WorkoutLog Logo" className="logo-image" />
        </div>

        {/* Actions: Theme toggle + user menu */}
        <div className="header-actions">
          <button onClick={toggleDarkMode} className="darkmode-btn">
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <UserButton />
        </div>
      </header>

      {/* ===== Navigation Tabs ===== */}
      <nav className="dashboard-nav">
        {["Acceuil", "My Programs", "My Progress"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* ===== Main Content ===== */}
      <main className="dashboard-main">
        {activeTab === "Acceuil" && dbUserId && <AcceuilTab dbUserId={dbUserId} />}
        {activeTab === "My Programs" && dbUserId && <ProgramDetailTab dbUserId={dbUserId} />}
        {activeTab === "My Progress" && <div>Coming Soon ...</div>}
      </main>
    </div>
  );
}
