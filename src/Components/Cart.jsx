import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { placeOrder } from "../Service/Api";
import { toast } from "react-toastify";
import "./Cart.css";

function Cart({ setPage }) {
  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  /* ✅ PAYMENT METHOD */
  const [paymentMethod, setPaymentMethod] = useState("COD");

  /* ================= ADDRESS ================= */
  const savedAddress = JSON.parse(
    localStorage.getItem("selectedAddress")
  );

  const deliveryAddress = savedAddress
    ? savedAddress.address
    : null;

  /* ================= TOTALS ================= */
  const itemTotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const deliveryFee = cart.length > 0 ? 30 : 0;
  const grandTotal = itemTotal + deliveryFee;

  /* ================= PLACE ORDER ================= */
  const placeOrderHandler = async () => {
    try {
      if (cart.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      if (!deliveryAddress) {
        toast.error("Please add delivery address");
        setPage("address");
        return;
      }

      const userEmail =
        localStorage.getItem("userEmail") || "test@gmail.com";

      const ownerEmail = cart[0]?.ownerEmail;

      if (!ownerEmail) {
        toast.error("Owner email missing");
        return;
      }

      const payload = {
        email: userEmail,
        ownerEmail,
        paymentMethod: paymentMethod, // ✅ FIXED
        totalAmount: grandTotal,
        deliveryAddress,
        items: cart.map((item) => ({
          foodName: item.name,
          restaurant: item.restaurant,
          price: item.price,
          quantity: item.quantity || 1,
        })),
      };

      console.log("ORDER PAYLOAD 👉", payload);

      const res = await placeOrder(payload);

      if (res.data.success) {
        toast.success("Order created 🧾");
        setPage("payment");
      }
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Order failed");
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={() => setPage("home")}>
          ← Back
        </button>
        <h3>Your Cart</h3>
      </div>

      {/* ===== DELIVERY ADDRESS ===== */}
      <div className="delivery-address">
        <strong>Deliver to:</strong>
        <p>{deliveryAddress || "No address selected"}</p>

        {!deliveryAddress && (
          <button
            className="add-address-btn"
            onClick={() => setPage("address")}
          >
            Add Address
          </button>
        )}
      </div>

      {/* ===== CART ITEMS ===== */}
      <div className="cart-list">
        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.name} />

            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-restaurant">
                {item.restaurant}
              </div>
              <div className="cart-item-price">
                ₹{item.price}
              </div>
            </div>

            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(index))}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* ===== BILL ===== */}
      <div className="bill-box">
        <div className="bill-row">
          <span>Item total</span>
          <span>₹{itemTotal}</span>
        </div>

        <div className="bill-row">
          <span>Delivery fee</span>
          <span>₹{deliveryFee}</span>
        </div>

        <div className="bill-row total">
          <span>Grand Total</span>
          <span>₹{grandTotal}</span>
        </div>
      </div>

      {/* ===== PAYMENT METHOD ===== */}
      <div className="payment-options">
        <h4>Select Payment Method</h4>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />
          UPI
        </label>
      </div>

      {/* ===== CHECKOUT ===== */}
      <div className="checkout-bar">
        <div className="checkout-total">
          ₹{grandTotal}
        </div>
        <button
          className="checkout-btn"
          onClick={placeOrderHandler}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
