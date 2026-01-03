import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./FoodDetails.css";
import foodPlaceholder from "../assets/login.png";
import { getRestaurantByOwner } from "../Service/Api";

function FoodDetails({ food, setPage }) {
  const dispatch = useDispatch();

  /* ================= RESTAURANT STATE ================= */
  const [restaurant, setRestaurant] = useState(null);

  /* ===== SAFETY CHECK ===== */
  useEffect(() => {
    if (!food) {
      setPage("home");
    }
  }, [food, setPage]);

  if (!food) return null;

  /* ================= LOAD RESTAURANT ================= */
  useEffect(() => {
    if (food?.ownerEmail) {
      getRestaurantByOwner(food.ownerEmail)
        .then((res) => setRestaurant(res.data))
        .catch(() => console.log("Restaurant not found"));
    }
  }, [food]);

  /* ===== ADD TO CART ===== */
  const addItem = () => {
    dispatch(
      addToCart({
        id: food.id,
        name: food.name,
        price: Number(food.price),
        restaurant: food.restaurantName,
        ownerEmail: food.ownerEmail,
        image: food.imageUrl || food.image,
        quantity: 1,
      })
    );
  };

  return (
    <div className="food-details">

      {/* ================= HEADER (BACK BUTTON) ================= */}
      <div className="food-header">
        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          ← Back
        </button>
      </div>

      {/* ================= RESTAURANT BANNER ================= */}
      {restaurant && restaurant.bannerImageUrl && (
        <div className="restaurant-banner">
          <img
            src={restaurant.bannerImageUrl}
            alt={restaurant.name}
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/600x300?text=Restaurant")
            }
          />

          <div className="restaurant-info">
            <h2>{restaurant.name}</h2>
            {restaurant.cuisine && <p>{restaurant.cuisine}</p>}
            {restaurant.address && <p>{restaurant.address}</p>}
            {restaurant.openTime && (
              <span>{restaurant.openTime}</span>
            )}
          </div>
        </div>
      )}

      {/* ================= FOOD IMAGE ================= */}
      <img
        src={food.imageUrl || food.image || foodPlaceholder}
        alt={food.name}
        onError={(e) => (e.target.src = foodPlaceholder)}
        className="food-details-image"
      />

      {/* ================= FOOD INFO ================= */}
      <div className="food-details-content">
        <h2 className="food-title">{food.name}</h2>

        <p className="food-restaurant">
          {food.restaurantName}
        </p>

        {food.category && (
          <span className="food-category">
            {food.category}
          </span>
        )}

        <p className="food-rating">
          ⭐ {(food.rating || 4.2).toFixed(1)}
        </p>

        {food.description && (
          <p className="food-description">
            {food.description}
          </p>
        )}

        <h3 className="food-price">₹{food.price}</h3>

        {/* ================= ACTIONS ================= */}
        <div className="food-actions">
          <button className="add-cart-btn" onClick={addItem}>
            Add to Cart
          </button>

          <button
            className="buy-btn"
            onClick={() => {
              addItem();
              setPage("cart");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
