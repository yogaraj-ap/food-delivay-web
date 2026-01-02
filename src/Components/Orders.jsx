import React, { useEffect, useState } from "react";
import { getOrdersByEmail } from "../Service/Api";
import "./Orders.css";

function Orders({ setPage, setSelectedOrderId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get logged-in user email
  const email =
    localStorage.getItem("userEmail") || "test@gmail.com";

  useEffect(() => {
  const loadOrders = async () => {
    try {
      const res = await getOrdersByEmail(email);
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIRST LOAD
  loadOrders();

  // 🔁 AUTO REFRESH EVERY 5 SECONDS
  const interval = setInterval(loadOrders, 5000);

  // 🧹 CLEANUP
  return () => clearInterval(interval);

}, [email]);


  const getStatusClass = (status) => {
    switch (status) {
      case "NEW":
        return "status-new";
      case "ACCEPTED":
        return "status-accepted";
      case "REJECTED":
        return "status-rejected";
      case "DELIVERED":
        return "status-delivered";
      default:
        return "";
    }
  };

  return (
    <div className="orders-page">
      <h2>📦 Your Orders</h2>

      {/* ===== LOADING ===== */}
      {loading && <p>Loading orders...</p>}

      {/* ===== ERROR ===== */}
      {error && <p className="error-text">{error}</p>}

      {/* ===== EMPTY ===== */}
      {!loading && orders.length === 0 && (
        <p>No orders found 🛒</p>
      )}

      {/* ===== ORDER LIST ===== */}
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <div>
            <strong>Order ID:</strong> #{order.id}
          </div>

          <div className={`order-status ${getStatusClass(order.status)}`}>
            <strong>Status:</strong> {order.status}
          </div>

          <div>
            <strong>Total:</strong> ₹{order.totalAmount}
          </div>

          <div className="order-date">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : ""}
          </div>

          {/* 🔥 TRACK ORDER */}
          <button
            className="track-btn"
            onClick={() => {
              setSelectedOrderId(order.id);
              setPage("track-order");
            }}
          >
            Track Order 🚚
          </button>
        </div>
      ))}

      {/* ===== BACK ===== */}
      <button
        className="back-btn"
        onClick={() => setPage("home")}
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default Orders;
