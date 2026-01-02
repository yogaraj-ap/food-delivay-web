// import React from "react";
// import "./Welcome.css";
// import logo from "../assets/logo.png";

// function Welcome({ setPage }) {
//   if (!setPage) {
//     console.error("❌ setPage is not passed to Welcome component. Check App.jsx");
//     return null;
//   }

//   return (
//     <div className="welcome-container">
//       <img src={logo} alt="Mom's Kitchen" className="welcome-logo" />
//       <div className="welcome-title">Welcome to Mom’s Kitchen</div>

//       <div className="welcome-buttons">
//         <button className="welcome-btn" onClick={() => setPage("login")}>
//           Login
//         </button>

//         <button className="welcome-btn" onClick={() => setPage("signup")}>
//           Signup
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Welcome;
import React from "react";
import "./Welcome.css";
import logo from "../assets/logo.png";

function Welcome({ setPage }) {
  if (!setPage) return null;

  return (
    <div className="welcome-container">
      <img src={logo} alt="Mom's Kitchen" className="welcome-logo" />
      <div className="welcome-title">Welcome to Mom’s Kitchen</div>

      {/* CUSTOMER */}
      <div className="welcome-buttons">
        <button className="welcome-btn" onClick={() => setPage("login")}>
          Customer Login
        </button>

        <button className="welcome-btn" onClick={() => setPage("signup")}>
          Customer Signup
        </button>
      </div>

      {/* OWNER SECTION */}
      <div className="owner-section">
        <p className="owner-text">Are you a Restaurant Owner?</p>

        <button
          className="owner-btn"
          onClick={() => setPage("owner-login")}
        >
          Owner Login / Signup
        </button>
      </div>
    </div>
  );
}

export default Welcome;
