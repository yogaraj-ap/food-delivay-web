
import React from "react";
import "./LocationAccuracy.css";
import { toast } from "react-toastify";
import { saveLocationPermission } from "../Service/Api";

function LocationAccuracy({ setPage }) {

  const allowAccuracy = () => {
  console.log("📍 Requesting location permission...");

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      console.log("✅ Location success", pos.coords);

      await saveLocationPermission({
        permission: "GRANTED",
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });

      toast.success("Location enabled 📍");

      
      setTimeout(() => setPage("location"), 1000);
    },
    async (error) => {
      console.error("❌ Location error:", error);

      if (error.code === 3) {
        toast.warning("Using approximate location");
        setTimeout(() => setPage("location"), 1000);
        return;
      }

      await saveLocationPermission({ permission: "DENIED" });
      toast.error("Location permission denied");
      setTimeout(() => setPage("notification"), 1000);
    },
    {
      enableHighAccuracy: false, 
      timeout: 30000,           
      maximumAge: 60000,       
    }
  );
};

  const skip = async () => {
    await saveLocationPermission({ permission: "SKIPPED" });
    toast.info("Location skipped");

    setTimeout(() => setPage("notification"), 1000);
  };

  return (
    <div className="accuracy-page">
      <div className="accuracy-card">
        <h3>Enable precise location</h3>
        <h2>Location Accuracy</h2>

        <p>📍 Device location</p>
        <p>🎯 Accurate delivery tracking</p>

        <div className="accuracy-actions">
          <button className="secondary" onClick={skip}>
            No, thanks
          </button>
          <button className="primary" onClick={allowAccuracy}>
            Turn on
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationAccuracy;
