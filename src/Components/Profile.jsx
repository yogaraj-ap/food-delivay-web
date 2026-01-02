import React, { useEffect } from "react";
import "./Profile.css";

function Profile({ setPage }) {
  // ✅ Get logged-in user
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!userEmail) {
      setPage("welcome"); // 🔐 redirect if not logged in
    }
  }, [userEmail, setPage]);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("selectedAddress");

    setPage("welcome");
  };

  /* ================= AVATAR INITIAL ================= */
  const avatarLetter = userName
    ? userName.charAt(0).toUpperCase()
    : "👤";

  return (
    <div className="profile-page">
      {/* ===== HEADER ===== */}
      <div className="profile-header">
        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ← Back
        </button>
        <h2>My Profile</h2>
      </div>

      {/* ===== USER INFO ===== */}
      <div className="profile-card">
        <div className="avatar-circle">
          {avatarLetter}
        </div>

        <h3>{userName || "Guest User"}</h3>
        <p>{userEmail || "guest@email.com"}</p>
      </div>

      {/* ===== OPTIONS ===== */}
      <div className="profile-options">
        <div
          className="profile-item"
          onClick={() => setPage("orders")}
        >
          📦 My Orders
        </div>

        <div
          className="profile-item"
          onClick={() => setPage("address")}
        >
          📍 Saved Addresses
        </div>

        <div
          className="profile-item"
          onClick={() => setPage("payment")}
        >
          💳 Payments
        </div>

        <div className="profile-item">
          ⚙ Settings
        </div>
      </div>

      {/* ===== LOGOUT ===== */}
      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
