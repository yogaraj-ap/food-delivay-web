// import React from "react";
// import "./FoodCard.css";

// function FoodCard({ food, onClick }) {
//   return (
// <div className="food-card" onClick={onClick}>
//   <img src={food.image} alt={food.name} className="food-image" />

//   <div className="food-info">
//     <div className="food-name">{food.name}</div>
//     <div className="food-restaurant">{food.restaurant}</div>
//     <div className="food-location">{food.location}</div>

//     <div className="food-bottom">
//       <div className="food-price">₹{food.price}</div>
//       <div className="food-rating">4.2 ⭐</div>
//     </div>
//   </div>
// </div>

//   );
// }

// export default FoodCard;


import React from "react";
import "./FoodCard.css";
import foodPlaceholder from "../assets/login.png"; // fallback image

function FoodCard({ food, onClick }) {
  return (
    <div className="food-card" onClick={onClick}>
      {/* ===== FOOD IMAGE ===== */}
      <img
        src={food.image || foodPlaceholder}
        alt={food.name || "Food"}
        className="food-image"
        onError={(e) => (e.target.src = foodPlaceholder)}
      />

      {/* ===== FOOD INFO ===== */}
      <div className="food-info">
        <div className="food-name">
          {food.name || "Unknown Food"}
        </div>

        <div className="food-restaurant">
          {food.restaurant || "Unknown Restaurant"}
        </div>

        {food.location && (
          <div className="food-location">
            📍 {food.location}
          </div>
        )}

        {/* ===== PRICE + RATING ===== */}
        <div className="food-bottom">
          <div className="food-price">
            ₹{food.price}
          </div>

          <div className="food-rating">
            {(food.rating || 4.2).toFixed(1)} ⭐
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
