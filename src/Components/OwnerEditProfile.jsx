import React, { useState } from "react";
import "./OwnerEditProfile.css";

function OwnerEditProfile({ owner, onClose, onSave }) {
  const [name, setName] = useState(owner.name || "");
  const [phone, setPhone] = useState(owner.phone || "");
  const [restaurant, setRestaurant] = useState(owner.restaurant || "");

  const saveProfile = () => {
    onSave({
      name,
      phone,
      restaurant,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Edit Profile</h3>

        <input
          placeholder="Owner Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Restaurant Name"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={saveProfile}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default OwnerEditProfile;
