import React, { useEffect, useState } from "react";
import "./RestaurantPage.css";
import FoodCard from "./FoodCard";
import {
  getFoodsByRestaurant,
  getRestaurantByOwner,
} from "../Service/Api";

function RestaurantPage({ restaurant, setPage, setSelectedFood }) {
  const [foods, setFoods] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurant) return;

    const loadData = async () => {
      try {
        const [foodsRes, restRes] = await Promise.all([
          getFoodsByRestaurant(restaurant.name),
          getRestaurantByOwner(restaurant.ownerEmail),
        ]);

        setFoods(foodsRes.data || []);
        setRestaurantInfo(restRes.data || null);
      } catch (err) {
        console.error("Failed to load restaurant page", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [restaurant]);

  if (!restaurant) {
    setPage("home");
    return null;
  }

  return (
    <div className="restaurant-page">
 
      <div
        className="restaurant-banner"
        style={{
          backgroundImage: `url(${
            restaurantInfo?.bannerImageUrl ||
            "https://via.placeholder.com/800x400"
          })`,
        }}
      >
        <button className="back-btn" onClick={() => setPage("home")}>
          ← Back
        </button>
      </div>

      <div className="restaurant-info">
        <h2 className="restaurant-name">{restaurant.name}</h2>

        <div className="restaurant-meta">
          <span>{restaurantInfo?.cuisine || "Multi Cuisine"}</span>
          <span>•</span>
          <span>{restaurantInfo?.openTime || "Open Now"}</span>
        </div>

        {restaurantInfo?.address && (
          <p className="restaurant-address">
            📍 {restaurantInfo.address}
          </p>
        )}
      </div>

    
      <div className="restaurant-food-section">
        {loading && <p className="empty-text">Loading foods...</p>}

        {!loading && foods.length === 0 && (
          <p className="empty-text">No foods added yet 🍽️</p>
        )}

        <div className="restaurant-foods">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={{
                ...food,
                image: food.imageUrl,
                restaurant: food.restaurantName,
              }}
              onClick={() => {
                setSelectedFood(food);
                setPage("food-details");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;
