// src/pages/Home.tsx
import { SignInButton, SignUpButton, SignedOut, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "../style/home.css"

export default function Home() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => {
  const html = document.documentElement;
  if (html.getAttribute('data-theme') === 'dark') {
    html.removeAttribute('data-theme');
    setDarkMode(false);
  } else {
    html.setAttribute('data-theme', 'dark');
    setDarkMode(true);
  }
  };

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>
      
      {/* Header */}
     <header className="home-header">
        <div className="logo">
          <img src="/workoutlog.png" alt="WorkoutLog Logo" className="logo-image" />
          <span>WorkoutLog</span>
        </div>

        <div className="header-actions-wrapper">
          <button onClick={toggleDarkMode} className="darkmode">
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <div className="header-actions">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          </div>
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
      </section>

      {/* Preview / Marketing Section */}
      <section className="preview">
        <div className="preview-content">
          <div className="preview-text">
            <h2>Design Your Own Programs</h2>
            <p>
              Create structured workouts, add exeercises and sets,
              and prepare your training with precision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
