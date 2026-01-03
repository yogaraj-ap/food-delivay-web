import React from "react";
import { FaMapMarkerAlt, FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ onProfile, onCart }) {
  return (
    <div className="navbar">
      {/* Left */}
      <div className="nav-left">
    

        <div className="location-box">
          <FaMapMarkerAlt />
          <span>Bengaluru</span>
        </div>

        <div className="search-box">
          <FaSearch />
          <input placeholder="Search for restaurant, cuisine or a dish" />
        </div>
      </div>

      {/* Right */}
      <div className="nav-right">
        <FaShoppingCart className="nav-icon" onClick={onCart} />
        <FaUserCircle className="nav-icon" onClick={onProfile} />
      </div>
    </div>
  );
}

export default Navbar;
