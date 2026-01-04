


import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import FoodCard from "./FoodCard";
import LocationMap from "./LocationMap";
import {
  getAllFoods,
  getAllRestaurants,  
  updateLiveLocation,
  reverseGeocode,
} from "../Service/Api";

import { formatAddress } from "../utils/location";
import Footer from "./Footer";


function Home({ setPage, setSelectedFood, setSelectedRestaurant }) {
  const cart = useSelector((state) => state.cart || []);

  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [locationText, setLocationText] = useState("Detecting location...");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const scrollRef = useRef(null);

  

  const userEmail =
    localStorage.getItem("userEmail") || "test@gmail.com";
  const userName =
    localStorage.getItem("userName") || "Customer";
  const savedAddress =
    localStorage.getItem("selectedAddress");

 
  const fetchLocation = () => {
    if (!navigator.geolocation || isFetchingLocation) return;

    setIsFetchingLocation(true);
    setLocationText("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);

        try {
          const res = await reverseGeocode(latitude, longitude);
          const addressText = formatAddress(res.data);

          setLocationText(addressText);

          await updateLiveLocation({
            email: userEmail,
            lat: latitude,
            lng: longitude,
            address: addressText,
          });
        } catch {
          setLocationText("Location unavailable");
        } finally {
          setIsFetchingLocation(false);
        }
      },
      () => {
        setLocationText("Enable location");
        setIsFetchingLocation(false);
      }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const res = await getAllFoods();
        setFoods(res?.data || []);
      } catch (err) {
        console.error("Failed to load foods", err);
      } finally {
        setLoading(false);
      }
    };
    loadFoods();
  }, []);

  useEffect(() => {
  const loadRestaurants = async () => {
    try {
      const res = await getAllRestaurants();
      setRestaurants(res?.data || []);
    } catch (err) {
      console.error("Failed to load restaurants", err);
    }
  };

  loadRestaurants();
}, []);


  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollLeft += 1;
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);


  const filteredFoods = foods.filter((food) => {
    const name = food?.name?.toLowerCase() || "";
    const restaurant = food?.restaurantName?.toLowerCase() || "";
    return (
      name.includes(search.toLowerCase()) ||
      restaurant.includes(search.toLowerCase())
    );
  });

  const popularFoods = filteredFoods.slice(0, 8);
  const allFoods = filteredFoods.slice(8);

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setPage("food-details");
  };
    
    const handleRestaurantClick = (restaurant) => {
  setSelectedRestaurant(restaurant);
  setPage("restaurant");
};

 return (
  <div className="home-wrapper">
    <div className="home-page">


      <div className="z-navbar">
        <div className="nav-left">
          <div className="nav-location">
            📍 {savedAddress || locationText}
            {!savedAddress && <button onClick={fetchLocation}>⟳</button>}
          </div>

          <div className="nav-search">
            <input
              placeholder="Search for restaurant, cuisine or dish"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="nav-right">
          <button onClick={() => setPage("cart")}>
            🛒 {cart.length}
          </button>
          <button onClick={() => setPage("profile")}>
            👤 {userName}
          </button>
        </div>
      </div>

     
      <div className="z-tabs">
        <span className="active">Delivery</span>
      </div>

 
      <div className="z-filters">
        <button>Filters</button>
        <button>Biryani</button>
        <button>Pure Veg</button>
        <button>Cuisines</button>
      </div>

     
      <div className="hero-map">
        <LocationMap lat={lat} lng={lng} />
      </div>

     
      {loading && (
        <div className="food-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}

      {!loading && filteredFoods.length === 0 && (
        <p className="center">No foods found 🍽️</p>
      )}

    


{restaurants.length > 0 && (
  <section className="home-section">
    <h3 className="section-title">Restaurants near you</h3>

    <div className="restaurant-grid">
      {restaurants.map((r) => (
        <FoodCard
          key={r.id}
          food={{
            name: r.name,
            restaurant: r.cuisine,
            image: r.bannerImageUrl,
            location: r.address,
            rating: r.rating,
          }}
          onClick={() => handleRestaurantClick(r)}
        />
      ))}
    </div>
  </section>
)}



{!loading && popularFoods.length > 0 && (
  <section className="home-section">
    <h3 className="section-title">Your FOODs </h3>

    <div className="horizontal-scroll">
      {popularFoods.map((food) => (
        <FoodCard
          key={food.id}
          food={{
            name: food.name,
            restaurant: food.restaurantName,
            image: food.imageUrl,
            price: food.price,
            rating: food.rating,
          }}
          onClick={() => handleFoodClick(food)}
        />
      ))}
    </div>
  </section>
)}


    
      {!loading && allFoods.length > 0 && (
        <>
          <section className="home-section">
  <h3 className="section-title">
    Food Delivery Restaurants in Bengaluru
  </h3>

  <div className="food-grid">
    {allFoods.map((food) => (
      <FoodCard
        key={food.id}
        food={{
          name: food.name,
          restaurant: food.restaurantName,
          image: food.imageUrl,
          price: food.price,
          rating: food.rating,
        }}
        onClick={() => handleFoodClick(food)}
      />
    ))}
  </div>
</section>

        </>
      )}

     
      {cart.length > 0 && (
        <div
          className="cart-summary"
          onClick={() => setPage("cart")}
        >
          <div className="cart-left">
            {cart.length} item{cart.length > 1 ? "s" : ""} added
          </div>
          <div className="cart-right">View Cart →</div>
        </div>
      )}

      <Footer />
    </div>
  </div>
);


}

export default Home;
