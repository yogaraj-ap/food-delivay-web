import React, { useEffect, useState } from "react";
import API from "../Service/Api";
import "./OrderTracking.css";

function OrderTracking({ orderId, setPage }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // 🔁 refresh every 5 seconds (live tracking)
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) return <p>Loading tracking...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="order-tracking-page">
      <h2>🚚 Order Tracking</h2>

      <div className="order-tracking-card">
        <p><b>Order ID:</b> #{order.id}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Total:</b> ₹{order.totalAmount}</p>

        {order.latitude && order.longitude ? (
          <>
            <p>
              📍 Location: {order.latitude}, {order.longitude}
            </p>

            {/* GOOGLE MAP */}
            <iframe
              title="map"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${order.latitude},${order.longitude}&output=embed`}
            />
          </>
        ) : (
          <p>Waiting for delivery partner 📦</p>
        )}
      </div>

      <button
        className="track-back-btn"
        onClick={() => setPage("orders")}
      >
        ← Back to Orders
      </button>
    </div>
  );
}

export default OrderTracking;
