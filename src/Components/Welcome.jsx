
// import React from "react";
// import "./Welcome.css";
// import logo from "../assets/logo.png";

// function Welcome({ setPage }) {
//   if (!setPage) return null;

//   return (
//     <div className="welcome-container">
//       <img src={logo} alt="Mom's Kitchen" className="welcome-logo" />
//       <div className="welcome-title">Welcome to Mom’s Kitchen</div>

//       {/* CUSTOMER */}
//       <div className="welcome-buttons">
//         <button className="welcome-btn" onClick={() => setPage("login")}>
//           Customer Login
//         </button>

//         <button className="welcome-btn" onClick={() => setPage("signup")}>
//           Customer Signup
//         </button>
//       </div>

//       {/* OWNER SECTION */}
//       <div className="owner-section">
//         <p className="owner-text">Are you a Restaurant Owner?</p>

//         <button
//           className="owner-btn"
//           onClick={() => setPage("owner-login")}
//         >
//           Owner Login / Signup
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
    <div className="welcome-card">

      <img src={logo} alt="Mom's Kitchen" className="welcome-logo" />

      <div className="welcome-title">Welcome to Mom’s Kitchen</div>
      <div className="welcome-subtitle">
        Home-style food delivered fresh
      </div>

      <div className="welcome-buttons">
        <button className="welcome-btn" onClick={() => setPage("login")}>
          Customer Login
        </button>

        <button className="welcome-btn" onClick={() => setPage("signup")}>
          Customer Signup
        </button>
      </div>

      <div className="owner-section">
        <p className="owner-text">Are you a Restaurant Owner?</p>
        <button className="owner-btn" onClick={() => setPage("owner-login")}>
          Owner Login / Signup
        </button>
      </div>

    </div>
  </div>
);

}

export default Welcome;
