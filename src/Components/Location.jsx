import React from "react";
import "./Location.css";
import { toast } from "react-toastify";

function Location({ setPage }) {
  const allowLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        toast.success("Location enabled 📍");

        // ✅ IMPORTANT FIX: go to Location Accuracy page
        // setTimeout(() => setPage("location-accuracy"), 1500);
             setTimeout(() => setPage("notification"), 1500);
      },
      () => {
        toast.error("Location permission denied");

        // ✅ Still move forward (like Swiggy/Zomato)
        // setTimeout(() => setPage("location-accuracy"), 1500);
                // ✅ GO TO NOTIFICATION PAGE (NOT HOME)
        setTimeout(() => setPage("notification"), 1500);
      }
    );
  };

  return (
  <div className="location-page">

  {/* ===== HEADER ===== */}
  <div className="location-header">
    <h2>Select Your Location</h2>

    <div className="location-header-content">
      <input
        className="location-search"
        placeholder="Search an area or address"
      />

      <button
        className="location-enable-btn"
        onClick={allowLocation}
      >
        Enable
      </button>
    </div>
  </div>

  {/* ===== CENTER / BOTTOM MESSAGE ===== */}
  <div className="location-locked">
    <div className="lock-icon">🔒</div>
    <p>Looks like you're logged out</p>
    <strong>Please log in to see saved addresses</strong>
  </div>

</div>

  );
}

export default Location;


