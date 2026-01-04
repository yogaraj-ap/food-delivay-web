
import React from "react";
import "./FoodCard.css";

function FoodCard({ food, onClick }) {
  return (
    <div className="food-card" onClick={onClick}>
      {/* IMAGE */}
      <div className="food-image-wrapper">
        <img
          className="food-image"
          src={food.image}
          alt={food.name}
          loading="lazy"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400x300?text=Food")
          }
        />
      </div>

      {/* CONTENT */}
      <div className="food-content">
        <h4 className="food-title">{food.name}</h4>

        {food.restaurant && (
          <p className="food-subtitle">{food.restaurant}</p>
        )}

        <div className="food-footer">
          {food.price && (
            <span className="food-price">₹{food.price}</span>
          )}

          <span className="food-rating">
            ⭐ {food.rating || 4.2}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
