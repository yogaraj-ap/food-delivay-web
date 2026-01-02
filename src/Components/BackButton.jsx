import React from "react";
import "./BackButton.css";

function BackButton({ page, setPage }) {
  const handleBack = () => {
    // Central back navigation logic
    if (page === "login" || page === "signup" || page === "forgot") {
      setPage("welcome");
    } else if (page === "mobile-auth") {
      setPage("welcome");
    } else if (page === "location") {
      setPage("welcome");
    } else if (page === "home") {
      setPage("welcome");
    }
  };

  // Don't show back button on welcome page
  if (page === "welcome") return null;

  return (
    <button className="global-back-btn" onClick={handleBack}>
      ← Back
    </button>
  );
}

export default BackButton;
