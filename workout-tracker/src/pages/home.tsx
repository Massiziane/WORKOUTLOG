import { SignInButton, SignUpButton, SignedOut, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "../style/home.css";

/**
 * Home page component.
 * - Displays a marketing landing page for the WorkoutLog app.
 * - Automatically redirects authenticated users to the dashboard.
 * - Includes dark mode toggle and sign-in/up actions.
 */
export default function Home() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  /**
   * Toggles dark mode by setting a data-theme attribute on <html>.
   * This allows global theme switching via CSS variables.
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
   * Redirects user to dashboard if they are signed in.
   */
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>
      {/* ===== Header Section ===== */}
      <header className="home-header">
        {/* Brand logo and title */}
        <div className="logo">
          <img src="/workoutlog.png" alt="WorkoutLog Logo" className="logo-image" />
          <span>WorkoutLog</span>
        </div>

        {/* Dark mode toggle + Authentication buttons */}
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

      {/* ===== Hero Section ===== */}
      <section className="hero">
        <h1>Workout Log</h1>
        <p>
          Build smarter programs. Track your progress.
          Designed for those who take growth seriously.
        </p>

        {/* Call-to-action button for new users */}
        <SignedOut>
          <SignUpButton>
            <button className="cta-btn">Create Your Program</button>
          </SignUpButton>
        </SignedOut>
      </section>

      {/* ===== Preview / Marketing Section ===== */}
      <section className="preview">
        <div className="preview-content">
          <div className="preview-text">
            <h2>Design Your Own Programs</h2>
            <p>
              Create structured workouts, add exercises and sets,
              and prepare your training with precision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
