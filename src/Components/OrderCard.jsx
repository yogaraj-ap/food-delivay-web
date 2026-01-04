
import React from "react";
import "./OrderCard.css";

function OrderCard({ order, onStatusChange }) {
  return (
    <div className="order-card">
      <div className="order-top">
        <strong>Order #{order.id}</strong>

        
        <span
          className={
            order.paymentMethod === "COD"
              ? "pay-badge cod"
              : "pay-badge upi"
          }
        >
          {order.paymentMethod}
        </span>
      </div>

      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Address:</strong> {order.deliveryAddress}</p>

      <div className="order-actions">
        <button onClick={() => onStatusChange(order.id, "ACCEPTED")}>
          Accept
        </button>
        <button onClick={() => onStatusChange(order.id, "REJECTED")}>
          Reject
        </button>
        <button onClick={() => onStatusChange(order.id, "DELIVERED")}>
          Delivered
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
