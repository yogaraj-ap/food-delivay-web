import React from "react";
import "./OrderCard.css";

function OrderCard({ order, onStatusChange }) {
  return (
    <div className="order-card">
      <h4>Order #{order.id}</h4>

      <p><strong>Customer:</strong> {order.email}</p>
      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Payment:</strong> {order.paymentMethod}</p>
      <p><strong>Address:</strong> {order.deliveryAddress || "Live location"}</p>

      <hr />

      <div className="order-items">
        {order.items.map((item, i) => (
          <div key={i} className="order-item">
            {item.foodName} × {item.quantity}
          </div>
        ))}
      </div>

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
