

// import React, { useState } from "react";
// import "./App.css";

// /* ===== USER FLOW ===== */
// import Welcome from "./Components/Welcome";
// import Auth from "./Components/Auth";
// import Location from "./Components/Location";
// import LocationAccuracy from "./Components/LocationAccuracy";
// import NotificationPermission from "./Components/NotificationPermission";
// import Home from "./Components/Home";
// import FoodDetails from "./Components/FoodDetails";
// import Cart from "./Components/Cart";
// import Profile from "./Components/Profile";
// import Orders from "./Components/Orders";
// import Address from "./Components/Address";
// import Payment from "./Components/Payment";
// import OrderSuccess from "./Components/OrderSuccess";
// import OrderTracking from "./Components/OrderTracking";
// import RestaurantPage from "./Components/RestaurantPage";


// /* ===== OWNER FLOW ===== */
// import OwnerAuth from "./Components/OwnerAuth";
// import OwnerDashboard from "./Components/OwnerDashboard";

// /* ===== PAGE CONSTANTS ===== */
// const PAGES = {
//   WELCOME: "welcome",
//   LOGIN: "login",
//   SIGNUP: "signup",
//   FORGOT: "forgot",

//   OWNER_LOGIN: "owner-login",
//   OWNER_SIGNUP: "owner-signup",
//   OWNER_DASHBOARD: "owner-dashboard",

//   LOCATION_ACCURACY: "location-accuracy",
//   LOCATION: "location",
//   NOTIFICATION: "notification",

//   HOME: "home",
//   RESTAURANT: "restaurant",  
//   FOOD_DETAILS: "food-details",
//   CART: "cart",
//   PROFILE: "profile",
//   ORDERS: "orders",
//   TRACK_ORDER: "track-order",

//   ADDRESS: "address",
//   PAYMENT: "payment",
//   ORDER_SUCCESS: "order-success",
// };


// function App() {
//   const [page, setPage] = useState(PAGES.WELCOME);
//   const [selectedFood, setSelectedFood] = useState(null);
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   console.log("📄 CURRENT PAGE:", page);

//   return (
//     <>
//       {/* ===== WELCOME ===== */}
//       {page === PAGES.WELCOME && <Welcome setPage={setPage} />}

//       {/* ===== USER AUTH ===== */}
//       {(page === PAGES.LOGIN ||
//         page === PAGES.SIGNUP ||
//         page === PAGES.FORGOT) && (
//         <Auth page={page} setPage={setPage} />
//       )}

//       {/* ===== OWNER AUTH ===== */}
//       {(page === PAGES.OWNER_LOGIN ||
//         page === PAGES.OWNER_SIGNUP) && (
//         <OwnerAuth page={page} setPage={setPage} />
//       )}

//       {page === PAGES.OWNER_DASHBOARD && (
//         <OwnerDashboard setPage={setPage} />
//       )}

//       {/* ===== LOCATION FLOW (🔥 FIXED) ===== */}
//       {page === PAGES.LOCATION_ACCURACY && (
//         <LocationAccuracy setPage={setPage} />
//       )}

//       {page === PAGES.LOCATION && (
//         <Location setPage={setPage} />
//       )}

//       {page === PAGES.NOTIFICATION && (
//         <NotificationPermission setPage={setPage} />
//       )}

//       {/* ===== HOME ===== */}
//       {page === PAGES.HOME && (
//   <Home
//     setPage={setPage}
//     setSelectedFood={setSelectedFood}
//     setSelectedRestaurant={setSelectedRestaurant} 
//   />
// )}

// {page === "restaurant" && selectedRestaurant && (
//   <RestaurantPage
//     restaurant={selectedRestaurant}
//     setPage={setPage}
//     setSelectedFood={setSelectedFood}
//   />
// )}


//       {/* ===== FOOD DETAILS ===== */}
// {page === PAGES.FOOD_DETAILS && selectedFood && (
//   <FoodDetails
//     food={selectedFood}
//     setPage={setPage}
//   />
// )}


//       {/* ===== CART ===== */}
//       {page === PAGES.CART && (
//         <Cart setPage={setPage} />
//       )}

//       {/* ===== PROFILE ===== */}
//       {page === PAGES.PROFILE && (
//         <Profile setPage={setPage} />
//       )}

//       {/* ===== ORDERS ===== */}
//       {page === PAGES.ORDERS && (
//         <Orders
//           setPage={setPage}
//           setSelectedOrderId={setSelectedOrderId}
//         />
//       )}

//       {/* ===== ORDER TRACKING ===== */}
//       {page === PAGES.TRACK_ORDER && (
//         <OrderTracking
//           orderId={selectedOrderId}
//           setPage={setPage}
//         />
//       )}

//       {/* ===== CHECKOUT ===== */}
//       {page === PAGES.ADDRESS && (
//         <Address setPage={setPage} />
//       )}

//       {page === PAGES.PAYMENT && (
//         <Payment setPage={setPage} />
//       )}

//       {page === PAGES.ORDER_SUCCESS && (
//         <OrderSuccess setPage={setPage} />
//       )}
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./App.css";

/* ===== USER FLOW ===== */
import Welcome from "./Components/Welcome";
import Auth from "./Components/Auth";
import Location from "./Components/Location";
import LocationAccuracy from "./Components/LocationAccuracy";
import NotificationPermission from "./Components/NotificationPermission";
import Home from "./Components/Home";
import FoodDetails from "./Components/FoodDetails";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";
import Orders from "./Components/Orders";
import Address from "./Components/Address";
import Payment from "./Components/Payment";
import OrderSuccess from "./Components/OrderSuccess";
import OrderTracking from "./Components/OrderTracking";
import RestaurantPage from "./Components/RestaurantPage";

/* ===== OWNER FLOW ===== */
import OwnerAuth from "./Components/OwnerAuth";
import OwnerDashboard from "./Components/OwnerDashboard";

/* ===== PAGE CONSTANTS ===== */
const PAGES = {
  WELCOME: "welcome",
  LOGIN: "login",
  SIGNUP: "signup",
  FORGOT: "forgot",

  OWNER_LOGIN: "owner-login",
  OWNER_SIGNUP: "owner-signup",
  OWNER_DASHBOARD: "owner-dashboard",

  LOCATION_ACCURACY: "location-accuracy",
  LOCATION: "location",
  NOTIFICATION: "notification",

  HOME: "home",
  RESTAURANT: "restaurant",
  FOOD_DETAILS: "food-details",
  CART: "cart",
  PROFILE: "profile",
  ORDERS: "orders",
  TRACK_ORDER: "track-order",

  ADDRESS: "address",
  PAYMENT: "payment",
  ORDER_SUCCESS: "order-success",
};

function App() {
  const [page, setPage] = useState(PAGES.WELCOME);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  /* ===== FULLSCREEN PAGES ===== */
  const isFullscreen =
    page === PAGES.WELCOME ||
    page === PAGES.LOGIN ||
    page === PAGES.SIGNUP ||
    page === PAGES.FORGOT ||
    page === PAGES.LOCATION_ACCURACY ||
    page === PAGES.LOCATION ||
    page === PAGES.NOTIFICATION ||
    page === PAGES.OWNER_LOGIN ||
    page === PAGES.OWNER_SIGNUP;

  return (
    <>
      {/* ===== FULLSCREEN SCREENS ===== */}
      {page === PAGES.WELCOME && <Welcome setPage={setPage} />}

      {(page === PAGES.LOGIN ||
        page === PAGES.SIGNUP ||
        page === PAGES.FORGOT) && (
        <Auth page={page} setPage={setPage} />
      )}

      {(page === PAGES.OWNER_LOGIN ||
        page === PAGES.OWNER_SIGNUP) && (
        <OwnerAuth page={page} setPage={setPage} />
      )}

      {page === PAGES.LOCATION_ACCURACY && (
        <LocationAccuracy setPage={setPage} />
      )}

      {page === PAGES.LOCATION && <Location setPage={setPage} />}

      {page === PAGES.NOTIFICATION && (
        <NotificationPermission setPage={setPage} />
      )}

      {/* ===== CONSTRAINED APP PAGES ===== */}
      {!isFullscreen && (
        <div className="app-container">
          {page === PAGES.HOME && (
            <Home
              setPage={setPage}
              setSelectedFood={setSelectedFood}
              setSelectedRestaurant={setSelectedRestaurant}
            />
          )}

          {page === PAGES.RESTAURANT && selectedRestaurant && (
            <RestaurantPage
              restaurant={selectedRestaurant}
              setPage={setPage}
              setSelectedFood={setSelectedFood}
            />
          )}

          {page === PAGES.FOOD_DETAILS && selectedFood && (
            <FoodDetails food={selectedFood} setPage={setPage} />
          )}

          {page === PAGES.CART && <Cart setPage={setPage} />}

          {page === PAGES.PROFILE && <Profile setPage={setPage} />}

          {page === PAGES.ORDERS && (
            <Orders
              setPage={setPage}
              setSelectedOrderId={setSelectedOrderId}
            />
          )}

          {page === PAGES.TRACK_ORDER && (
            <OrderTracking
              orderId={selectedOrderId}
              setPage={setPage}
            />
          )}

          {page === PAGES.ADDRESS && <Address setPage={setPage} />}

          {page === PAGES.PAYMENT && <Payment setPage={setPage} />}

          {page === PAGES.ORDER_SUCCESS && (
            <OrderSuccess setPage={setPage} />
          )}

          {page === PAGES.OWNER_DASHBOARD && (
            <OwnerDashboard setPage={setPage} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
