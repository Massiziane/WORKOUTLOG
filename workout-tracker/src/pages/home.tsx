// src/pages/Home.tsx
import { SignInButton, SignUpButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css"

export default function Home() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  const handleCreateProgram = () => {
    if (isSignedIn) {
      navigate("/dashboard"); // if signed in, go to dashboard
    }
  };

  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>
      
      {/* Header */}
      <header className="home-header">
        <div className="logo">WorkoutLog</div>

        <div className="header-actions">
          {/* Dark mode toggle placeholder */}
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Sign in / Sign up buttons */}
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Workout Log</h1>
        <p>
          Build smarter programs. Track your progress. 
          Designed for those who take growth seriously.
        </p>

        {/* Call to action */}
        <SignedOut>
          <SignUpButton>
            <button className="cta-btn">Create Your Program</button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <button className="cta-btn" onClick={handleCreateProgram}>
            Go to Dashboard
          </button>
        </SignedIn>
      </section>

      {/* Preview / Marketing Section */}
      <section className="preview">
        <div className="preview-content">
          <img
            src="/program-preview.png"
            alt="Program Preview"
            className="preview-image"
          />
          <div className="preview-text">
            <h2>Design Your Own Programs</h2>
            <p>
              Create structured workouts, define set templates, 
              and prepare your training with precision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
