
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import "./Home.css";
// import FoodCard from "./FoodCard";
// import { getAllFoods, updateLiveLocation } from "../Service/Api";
// import { formatAddress } from "../utils/location";


// function Home({ setPage, setSelectedFood }) {
//   const cart = useSelector((state) => state.cart || []);

//   const [foods, setFoods] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* ===== LIVE LOCATION TEXT ===== */
//   const [locationText, setLocationText] = useState(
//     "Detecting location..."
//   );

//   /* ===== AUTO DETECT + SEND LIVE LOCATION ===== */
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setLocationText("Location not supported");
//       return;
//     }

//     const watchId = navigator.geolocation.watchPosition(
//       async (pos) => {
//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;

//         //  Show on UI
//       const addressText = formatAddress(data);
// setLocationText(addressText);


//         // 🌐 Send to backend
//         try {
//           await updateLiveLocation(lat, lng);
//         } catch (err) {
//           console.error(" Location update failed", err);
//         }
//       },
//       (err) => {
//         console.error(err);
//         setLocationText("Enable location");
//       },
//       {
//         enableHighAccuracy: true,
//         maximumAge: 10000,
//         timeout: 10000,
//       }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   /* ===== LOAD FOODS ===== */
//   useEffect(() => {
//     const loadFoods = async () => {
//       try {
//         const res = await getAllFoods();
//         setFoods(res?.data || []);
//       } catch (err) {
//         console.error(" Failed to load foods", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFoods();
//   }, []);

//   /* ===== SEARCH FILTER ===== */
//   const filteredFoods = foods.filter((food) => {
//     const foodName = food?.name?.toLowerCase() || "";
//     const restaurant = food?.restaurantName?.toLowerCase() || "";

//     return (
//       foodName.includes(search.toLowerCase()) ||
//       restaurant.includes(search.toLowerCase())
//     );
//   });

//   /* ===== FOOD CLICK ===== */
//   const handleFoodClick = (food) => {
//     setSelectedFood(food);
//     setPage("food-details");
//   };

//   return (
//     <div className="home-page">
//       {/* ===== HEADER ===== */}
//       <div className="home-header">
//         <div className="location">📍 {locationText}</div>

//         <div
//           className="profile"
//           onClick={() => setPage("profile")}
//           title="Profile"
//         >
//           👤
//         </div>
//       </div>

//       {/* ===== SEARCH BAR ===== */}
//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Search food or restaurant..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* ===== LOADING ===== */}
//       {loading && <p className="center-text">Loading foods...</p>}

//       {/* ===== EMPTY STATE ===== */}
//       {!loading && filteredFoods.length === 0 && (
//         <p className="center-text">No foods found 🍽️</p>
//       )}

//       {/* ===== FOOD LIST ===== */}
//       {!loading && filteredFoods.length > 0 && (
//         <>
//           <h3 className="section-title">Available Foods</h3>

//           <div className="food-grid">
//             {filteredFoods.map((food) => (
//               <FoodCard
//                 key={food.id}
//                 food={{
//                   ...food,
//                   restaurant: food.restaurantName,
//                   image: food.imageUrl,
//                 }}
//                 onClick={() => handleFoodClick(food)}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {/* ===== FLOATING CART BUTTON ===== */}
//       {cart.length > 0 && (
//         <button
//           className="cart-fab"
//           onClick={() => setPage("cart")}
//         >
//           🛒 <span>{cart.length}</span>
//         </button>
//       )}
//     </div>
//   );
// }

// export default Home;


// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import "./Home.css";
// import FoodCard from "./FoodCard";
// import {
//   getAllFoods,
//   updateLiveLocation,
//   reverseGeocode,
// } from "../Service/Api";
// import { formatAddress } from "../utils/location";
// import LocationMap from "./LocationMap"; // ✅ STEP 4

// function Home({ setPage, setSelectedFood }) {
//   const cart = useSelector((state) => state.cart || []);

//   const [foods, setFoods] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   /* ===== LOCATION STATE ===== */
//   const [locationText, setLocationText] = useState("Detecting location...");
//   const [isFetchingLocation, setIsFetchingLocation] = useState(false);

//   // ✅ STEP 4: latitude & longitude state
//   const [lat, setLat] = useState(null);
//   const [lng, setLng] = useState(null);

//   const userEmail =
//     localStorage.getItem("userEmail") || "test@gmail.com";
//     const userName =
//   localStorage.getItem("userName") || "Customer";


//     const savedAddress =
//   localStorage.getItem("selectedAddress");


//   /* ================= FETCH LOCATION ================= */
//   const fetchLocation = () => {
//     if (!navigator.geolocation || isFetchingLocation) return;

//     setIsFetchingLocation(true);
//     setLocationText("Detecting location...");

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const latitude = pos.coords.latitude;
//         const longitude = pos.coords.longitude;

//         // ✅ STEP 4: store lat/lng
//         setLat(latitude);
//         setLng(longitude);

//         try {
//           const res = await reverseGeocode(latitude, longitude);
//           const addressText = formatAddress(res.data);

//           setLocationText(addressText);

//           await updateLiveLocation({
//             email: userEmail,
//             lat: latitude,
//             lng: longitude,
//             address: addressText,
//           });
//         } catch (err) {
//           console.error("❌ Location error:", err);
//           setLocationText("Location unavailable");
//         } finally {
//           setIsFetchingLocation(false);
//         }
//       },
//       (err) => {
//         console.error("❌ Geolocation error:", err);

//         if (err.code === 1) setLocationText("Permission denied");
//         else if (err.code === 3) setLocationText("Location timeout");
//         else setLocationText("Location error");

//         setIsFetchingLocation(false);
//       },
//       {
//         enableHighAccuracy: false,
//         timeout: 20000,
//         maximumAge: 30000,
//       }
//     );
//   };

//   /* ================= AUTO FETCH ================= */
//   useEffect(() => {
//     fetchLocation();
//   }, []);

//   /* ================= LOAD FOODS ================= */
//   useEffect(() => {
//     const loadFoods = async () => {
//       try {
//         const res = await getAllFoods();
//         setFoods(res?.data || []);
//       } catch (err) {
//         console.error("❌ Failed to load foods", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadFoods();
//   }, []);

//   /* ================= SEARCH ================= */
//   const filteredFoods = foods.filter((food) => {
//     const name = food?.name?.toLowerCase() || "";
//     const restaurant = food?.restaurantName?.toLowerCase() || "";

//     return (
//       name.includes(search.toLowerCase()) ||
//       restaurant.includes(search.toLowerCase())
//     );
//   });

//   /* ================= FOOD CLICK ================= */
//   const handleFoodClick = (food) => {
//     setSelectedFood(food);
//     setPage("food-details");
//   };

//   return (
//     <div className="home-page">
//       {/* ===== HEADER ===== */}
//       <div className="home-header">
//   <div className="location-box">
//     <div className="location">
//       📍 {savedAddress || locationText}

//       {!savedAddress && (
//         <button
//           className="refresh-location"
//           onClick={fetchLocation}
//           title="Refresh location"
//         >
//           ⟳
//         </button>
//       )}
//     </div>

//     <LocationMap lat={lat} lng={lng} />
//   </div>

//   {/* ✅ PROFILE WITH USER NAME */}
//   <div
//     className="profile"
//     onClick={() => setPage("profile")}
//     title={userName}
//   >
//     👤
//   </div>
// </div>


//       {/* ===== SEARCH ===== */}
//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Search food or restaurant..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* ===== LOADING ===== */}
//       {loading && (
//         <p className="center-text">Loading foods...</p>
//       )}

//       {/* ===== EMPTY ===== */}
//       {!loading && filteredFoods.length === 0 && (
//         <p className="center-text">No foods found 🍽️</p>
//       )}

//       {/* ===== FOOD LIST ===== */}
//       {!loading && filteredFoods.length > 0 && (
//         <>
//           <h3 className="section-title">Available Foods</h3>
//           <div className="food-grid">
//             {filteredFoods.map((food) => (
//               <FoodCard
//                 key={food.id}
//                 food={{
//                   ...food,
//                   restaurant: food.restaurantName,
//                   image: food.imageUrl,
//                 }}
//                 onClick={() => handleFoodClick(food)}
//               />
//             ))}
//           </div>
//         </>
//       )}

//       {/* ===== CART ===== */}
//       {cart.length > 0 && (
//         <button
//           className="cart-fab"
//           onClick={() => setPage("cart")}
//         >
//           🛒 Cart <span>{cart.length}</span>
//         </button>
//       )}
//     </div>
//   );
// }

// export default Home;









import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import FoodCard from "./FoodCard";
import {
  getAllFoods,
  updateLiveLocation,
  reverseGeocode,
} from "../Service/Api";
import { formatAddress } from "../utils/location";
import LocationMap from "./LocationMap";

function Home({ setPage, setSelectedFood }) {
  const cart = useSelector((state) => state.cart || []);

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ===== LOCATION STATE ===== */
  const [locationText, setLocationText] = useState("Detecting location...");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const scrollRef = useRef(null); // ✅ for horizontal scroll

  const userEmail =
    localStorage.getItem("userEmail") || "test@gmail.com";
  const userName =
    localStorage.getItem("userName") || "Customer";

  const savedAddress =
    localStorage.getItem("selectedAddress");

  /* ================= FETCH LOCATION ================= */
  const fetchLocation = () => {
    if (!navigator.geolocation || isFetchingLocation) return;

    setIsFetchingLocation(true);
    setLocationText("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

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
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 30000,
      }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  /* ================= LOAD FOODS ================= */
  useEffect(() => {
    const loadFoods = async () => {
      try {
        const res = await getAllFoods();
        setFoods(res?.data || []);
      } catch {
        console.error("Failed to load foods");
      } finally {
        setLoading(false);
      }
    };
    loadFoods();
  }, []);

  /* ================= AUTO SCROLL (HORIZONTAL) ================= */
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

  /* ================= SEARCH ================= */
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

  return (
    <div className="home-page">
      {/* ===== HEADER ===== */}
      <div className="home-header">
        <div className="location-box">
          <div className="location">
            📍 {savedAddress || locationText}
            {!savedAddress && (
              <button
                className="refresh-location"
                onClick={fetchLocation}
              >
                ⟳
              </button>
            )}
          </div>
          <LocationMap lat={lat} lng={lng} />
        </div>

        <div
          className="profile"
          onClick={() => setPage("profile")}
          title={userName}
        >
          👤
        </div>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search food or restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p className="center-text">Loading foods...</p>}

      {!loading && filteredFoods.length === 0 && (
        <p className="center-text">No foods found 🍽️</p>
      )}

      {/* ===== HORIZONTAL SCROLL (POPULAR) ===== */}
      {!loading && popularFoods.length > 0 && (
        <>
          <h3 className="section-title">Popular Foods</h3>
          <div className="food-scroll-row" ref={scrollRef}>
            {popularFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={{
                  ...food,
                  restaurant: food.restaurantName,
                  image: food.imageUrl,
                }}
                onClick={() => handleFoodClick(food)}
              />
            ))}
          </div>
        </>
      )}

      {/* ===== ALL FOODS GRID ===== */}
      {!loading && allFoods.length > 0 && (
        <>
          <h3 className="section-title">All Foods</h3>
          <div className="food-grid">
            {allFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={{
                  ...food,
                  restaurant: food.restaurantName,
                  image: food.imageUrl,
                }}
                onClick={() => handleFoodClick(food)}
              />
            ))}
          </div>
        </>
      )}

      {/* ===== CART ===== */}
      {cart.length > 0 && (
        <button
          className="cart-fab"
          onClick={() => setPage("cart")}
        >
          🛒 Cart <span>{cart.length}</span>
        </button>
      )}
    </div>
  );
}

export default Home;
