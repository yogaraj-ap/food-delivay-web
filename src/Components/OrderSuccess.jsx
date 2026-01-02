import React from "react";
import "./OrderSuccess.css";

function OrderSuccess({ setPage }) {
  const savedAddress = JSON.parse(
    localStorage.getItem("selectedAddress")
  );

  return (
    <div className="order-success-page">
      <h2>🎉 Order Placed Successfully!</h2>

      <p>Your food is on the way 🚴‍♂️</p>

      {/* ✅ DELIVERY ADDRESS */}
      <div className="success-address">
        <strong>Delivery Address:</strong>
        <p>
          {savedAddress
            ? savedAddress.address
            : "Live Location"}
        </p>
      </div>

      <button onClick={() => setPage("orders")}>
        View My Orders
      </button>

      <button onClick={() => setPage("home")}>
        Back to Home
      </button>
    </div>
  );
}

export default OrderSuccess;
