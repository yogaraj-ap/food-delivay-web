// // import React from "react";
// // import "./Payment.css";

// // function Payment({ setCart, setPage }) {
// //   const payNow = () => {
// //     alert("Payment Successful 💳");
// //     setCart([]);              // clear cart
// //     setPage("home");          // go home
// //   };

// //   return (
// //     <div className="payment-page">
// //       <h2>Payment</h2>

// //       <button onClick={payNow}>
// //         Pay with UPI / Card
// //       </button>
// //     </div>
// //   );
// // }

// // export default Payment;


// import React, { useState } from "react";
// import "./Payment.css";

// function Payment({ setCart, setPage }) {
//   const [method, setMethod] = useState("");

//   const payNow = () => {
//     if (!method) {
//       alert("Please select a payment method ❗");
//       return;
//     }

//     // 🔜 Later: call backend place-order API here
//     alert(`Payment Successful using ${method} 🎉`);

//     setCart([]);          // clear cart
//     setPage("order-success"); // go to success page
//   };

//   return (
//     <div className="payment-page">
//       <h2>Choose Payment Method</h2>

//       {/* ===== PAYMENT OPTIONS ===== */}
//       <div className="payment-options">
//         <button
//           className={method === "UPI" ? "active" : ""}
//           onClick={() => setMethod("UPI")}
//         >
//           UPI
//         </button>

//         <button
//           className={method === "CARD" ? "active" : ""}
//           onClick={() => setMethod("CARD")}
//         >
//           Credit / Debit Card
//         </button>

//         <button
//           className={method === "COD" ? "active" : ""}
//           onClick={() => setMethod("COD")}
//         >
//           Cash on Delivery
//         </button>
//       </div>

//       {/* ===== PAY BUTTON ===== */}
//       <button className="pay-btn" onClick={payNow}>
//         Pay Now
//       </button>

//       {/* ===== BACK ===== */}
//       <button
//         className="back-btn"
//         onClick={() => setPage("cart")}
//       >
//         ← Back to Cart
//       </button>
//     </div>
//   );
// }

// export default Payment;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import "./Payment.css";

function Payment({ setPage }) {
  const dispatch = useDispatch();
  const [method, setMethod] = useState("");

  const payNow = () => {
    if (!method) {
      toast.error("Please select a payment method ❗");
      return;
    }

    // ✅ MOCK PAYMENT SUCCESS
    toast.success(`Payment Successful using ${method} 💳`);

    // ✅ Clear cart AFTER payment success
    dispatch(clearCart());

    // ✅ Go to order success page
    setTimeout(() => {
      setPage("order-success");
    }, 1000);
  };

  return (
    <div className="payment-page">
      <h2>Choose Payment Method</h2>

      {/* ===== PAYMENT OPTIONS ===== */}
      <div className="payment-options">
        <button
          className={method === "UPI" ? "active" : ""}
          onClick={() => setMethod("UPI")}
        >
          UPI
        </button>

        <button
          className={method === "CARD" ? "active" : ""}
          onClick={() => setMethod("CARD")}
        >
          Credit / Debit Card
        </button>

        <button
          className={method === "COD" ? "active" : ""}
          onClick={() => setMethod("COD")}
        >
          Cash on Delivery
        </button>
      </div>

      {/* ===== PAY BUTTON ===== */}
      <button className="pay-btn" onClick={payNow}>
        Pay Now
      </button>

      {/* ===== BACK ===== */}
      <button
        className="back-btn"
        onClick={() => setPage("cart")}
      >
        ← Back to Cart
      </button>
    </div>
  );
}

export default Payment;
