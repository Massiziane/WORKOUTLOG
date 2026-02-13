import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import "../style/dashboard.css"

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Acceuil"); // default tab

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo">WorkoutApp</div>
        <div className="header-actions">
          <button>🌙</button> {/* dark mode toggle placeholder */}
          <UserButton />
        </div>
      </header>

      {/* Secondary Navbar */}
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

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === "Acceuil" && (
          <div className="acceuil-tab">
            <button className="cta-btn">Create a New Program</button>
            {/* Placeholder for future workout form */}
            <div className="workout-form-placeholder">
              {/* Workout form will go here later */}
            </div>
          </div>
        )}

        {activeTab === "My Programs" && (
          <div>
            <p>My Programs content coming soon...</p>
          </div>
        )}

        {activeTab === "My Progress" && (
          <div>
            <p>My Progress content coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
