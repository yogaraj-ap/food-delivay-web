// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080/api"
// });


// /* ================= AUTH ================= */

// // CUSTOMER SIGNUP
// export const signupUser = (data) =>
//   API.post("/auth/signup", data);

// // OWNER SIGNUP
// export const signupOwner = (data) =>
//   API.post("/auth/owner/signup", data);

// // COMMON LOGIN (USER & OWNER)
// export const loginUser = (data) =>
//   API.post("/auth/login", data);

// export const loginOwner = (data) =>
//   API.post("/auth/login", data);

// // FORGOT PASSWORD
// export const forgotPassword = (data) =>
//   API.post("/auth/forgot-password", data);

// /* ================= LOCATION ================= */
// export const saveLocationPermission = (data) =>
//   API.post("/location/permission", data);

// /* ================= NOTIFICATION ================= */
// export const saveNotificationPermission = (data) =>
//   API.post("/notification/permission", data);

// /* ================= ORDERS ================= */

// // ✅ CUSTOMER → PLACE ORDER
// export const placeOrder = (data) =>
//   API.post("/orders/place", data);

// // ✅ CUSTOMER → GET OWN ORDERS (FIXED URL ❗)
// export const getOrdersByEmail = (email) =>
//   API.get(`/orders/user/${email}`);

// // ✅ OWNER → GET RECEIVED ORDERS
// export const getOwnerOrders = (ownerEmail) =>
//   API.get(`/orders/owner/${ownerEmail}`);

// // ✅ OWNER → UPDATE ORDER STATUS (ACCEPT / REJECT)
// export const updateOrderStatus = (orderId, status) =>
//   API.put(`/orders/${orderId}/status`, { status });

// /* ================= FOODS ================= */

// // ✅ OWNER → ADD FOOD
// export const addFood = (food) =>
//   API.post("/foods", food);

// // ✅ CUSTOMER → GET ALL FOODS
// export const getAllFoods = () =>
//   API.get("/foods");

// // ✅ OWNER → GET OWN FOODS
// export const getOwnerFoods = (email) =>
//   API.get(`/foods/owner/${email}`);

// // ✅ OWNER → UPDATE FOOD
// export const updateFood = (id, food) =>
//   API.put(`/foods/${id}`, food);

// // ✅ OWNER → DELETE FOOD
// export const deleteFood = (id) =>
//   API.delete(`/foods/${id}`);

// // 🔔 OWNER GET ORDERS
// export const getOrdersForOwner = (email) =>
//   API.get(`/orders/owner/${email}`);


// export default API;

import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 15000, 
});



// CUSTOMER SIGNUP
export const signupUser = (data) =>
  API.post("/auth/signup", data);

// OWNER SIGNUP
export const signupOwner = (data) =>
  API.post("/auth/owner/signup", data);

// COMMON LOGIN
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const loginOwner = (data) =>
  API.post("/auth/login", data);

// FORGOT PASSWORD
export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);



// SAVE LOCATION PERMISSION
export const saveLocationPermission = (data) =>
  API.post("/location/permission", data);

// SAVE / UPDATE LIVE LOCATION
export const updateLiveLocation = ({ email, lat, lng, address }) =>
  API.post("/location/update", {
    email,
    lat,
    lng,
    address,
  });

// GET USER SAVED LOCATION
export const getUserLocation = (email) =>
  API.get(`/location/${email}`);

// BACKEND REVERSE GEOCODING
export const reverseGeocode = (lat, lon) =>
  API.get(`/location/reverse?lat=${lat}&lon=${lon}`);

// LOCATION SERVICE STATUS
export const getLocationStatus = () =>
  API.get("/location/status");



export const saveNotificationPermission = (data) =>
  API.post("/notification/permission", data);


// PLACE ORDER
export const placeOrder = (data) =>
  API.post("/orders/place", data);

// CUSTOMER ORDER HISTORY
export const getOrdersByEmail = (email) =>
  API.get(`/orders/customer/${email}`);

// OWNER ORDERS
export const getOrdersForOwner = (email) =>
  API.get(`/orders/owner/${email}`);

// OWNER → GET LIVE ORDERS
export const getNewOwnerOrders = (ownerEmail) =>
  API.get("/orders/owner/orders", {
    params: { ownerEmail },
  });

//  UPDATE ORDER STATUS (FIXED)
export const updateOrderStatus = (orderId, status) =>
  API.put(`/orders/${orderId}/status?status=${status}`);

// SINGLE ORDER
export const getOrderById = (orderId) =>
  API.get(`/orders/${orderId}`);

// UPDATE ORDER LOCATION
export const updateOrderLocation = (orderId, lat, lng) =>
  API.put(`/orders/${orderId}/location`, { lat, lng });


export const addFood = (foodFormData) =>
  API.post("/foods", foodFormData);

export const getAllFoods = () =>
  API.get("/foods");

export const getOwnerFoods = (email) =>
  API.get(`/foods/owner/${email}`);


export const getFoodsByRestaurant = (restaurantName) =>
  API.get(`/foods/restaurant/${restaurantName}`);

export const updateFood = (id, food) =>
  API.put(`/foods/${id}`, food);

export const deleteFood = (id) =>
  API.delete(`/foods/${id}`);

export const saveAddress = (data) =>
  API.post("/addresses", data);

export const getAddresses = (email) =>
  API.get(`/addresses/${email}`);


export const saveRestaurant = (formData) =>
  API.post("/restaurant/save", formData);

export const getAllRestaurants = () =>
  API.get("/restaurant/all");

export const getRestaurantByOwner = (email) =>
  API.get(`/restaurant/owner/${email}`);

export default API;
