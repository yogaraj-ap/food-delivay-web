
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./FoodDetails.css";
import foodPlaceholder from "../assets/login.png";
import { getRestaurantByOwner } from "../Service/Api";

function FoodDetails({ food, setPage }) {
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    if (!food) setPage("home");
  }, [food, setPage]);

  if (!food) return null;

  useEffect(() => {
    if (food?.ownerEmail) {
      getRestaurantByOwner(food.ownerEmail)
        .then((res) => setRestaurant(res.data))
        .catch(() => {});
    }
  }, [food]);

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
    <div className="food-details-page">
  
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back
      </button>

      <div className="food-cover">
        <img
          src={
            food.imageUrl?.startsWith("http")
              ? food.imageUrl
              : food.imageUrl
              ? `http://localhost:8080/${food.imageUrl}`
              : foodPlaceholder
          }
          alt={food.name}
          onError={(e) => (e.target.src = foodPlaceholder)}
        />
      </div>

      
      <div className="food-card">

        
        <div className="restaurant-info">
          <h2>{food.name}</h2>

          <p className="restaurant-name">
            {restaurant?.name || food.restaurantName}
            {restaurant?.cuisine && ` • ${restaurant.cuisine}`}
          </p>

          {restaurant && (
            <p className="restaurant-meta">
              {restaurant.address}
              {restaurant.openTime && ` • ${restaurant.openTime}`}
            </p>
          )}
        </div>

     
        <div className="price-rating">
          <span className="price">₹{food.price}</span>
          <span className="rating">
            ⭐ {(food.rating || 4.2).toFixed(1)}
          </span>
        </div>

   
        {food.description && (
          <p className="description">{food.description}</p>
        )}

      
        <div className="actions">
          <button className="add-btn" onClick={addItem}>
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
