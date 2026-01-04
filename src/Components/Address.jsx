import React, { useState } from "react";
import "./Address.css";

function Address({ setPage }) {
  const saved = JSON.parse(
    localStorage.getItem("selectedAddress")
  );

  const [address, setAddress] = useState(
    saved?.address || ""
  );

  const saveAddress = () => {
    if (!address.trim()) return;

    localStorage.setItem(
      "selectedAddress",
      JSON.stringify({
        label: "Home",
        address,
      })
    );

    setPage("home");
  };

  const deleteAddress = () => {
    localStorage.removeItem("selectedAddress");
    setPage("home");
  };

  return (
    <div className="address-page">
      <h2>Saved Address</h2>
         <button className="back-btn" onClick={() => setPage("home")}>
        ← Back
      </button>
      <textarea
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={saveAddress}>
        Save Address
      </button>

      {saved && (
        <button
          className="delete-btn"
          onClick={deleteAddress}
        >
          Delete Address
        </button>
      )}
    </div>
  );
}

export default Address;
