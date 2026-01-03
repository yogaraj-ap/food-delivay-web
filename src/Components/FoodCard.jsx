import React from "react";
import "./FoodCard.css";
import foodPlaceholder from "../assets/login.png";

function FoodCard({ food, onClick }) {
  return (
    <div className="food-card" onClick={onClick}>
      <div className="food-image-wrapper">
        <img
          src={food.image || foodPlaceholder}
          alt={food.name || "Food"}
          className="food-image"
          onError={(e) => (e.target.src = foodPlaceholder)}
        />
      </div>

      <div className="food-content">
        <h4 className="food-title">{food.name || food.restaurant || "Item"}</h4>

        {food.restaurant && <div className="food-subtitle">{food.restaurant}</div>}

        {food.location && <div className="food-location">📍 {food.location}</div>}

        <div className="food-footer">
          <div className="food-price">{food.price ? `₹${food.price}` : ""}</div>
          <div className="food-rating">{(food.rating || 4.2).toFixed(1)} ⭐</div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
