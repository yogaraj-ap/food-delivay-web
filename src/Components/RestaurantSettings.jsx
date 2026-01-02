import React, { useState } from "react";
import "./RestaurantSettings.css";

function RestaurantSettings({ setPage }) {
  const [open, setOpen] = useState(
    localStorage.getItem("restaurantOpen") !== "false"
  );
  const [deliveryTime, setDeliveryTime] = useState(
    localStorage.getItem("deliveryTime") || "30 mins"
  );

  const saveSettings = () => {
    localStorage.setItem("restaurantOpen", open);
    localStorage.setItem("deliveryTime", deliveryTime);
    alert("Restaurant settings saved");
  };

  return (
    <div className="restaurant-settings">
      <h2>Restaurant Settings</h2>

      <div className="setting-item">
        <label>Restaurant Status</label>
        <select
          value={open ? "open" : "closed"}
          onChange={(e) => setOpen(e.target.value === "open")}
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="setting-item">
        <label>Avg Delivery Time</label>
        <input
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        />
      </div>

      <button onClick={saveSettings}>Save Settings</button>

      <button className="back-btn" onClick={() => setPage("owner-dashboard")}>
        ← Back
      </button>
    </div>
  );
}

export default RestaurantSettings;
