// import React, { useEffect, useState } from "react";
// import {
//   addFood,
//   getOwnerFoods,
//   deleteFood,
//   getNewOwnerOrders,
//   updateOrderStatus,
// } from "../Service/Api";
// import { toast } from "react-toastify";
// import "./OwnerDashboard.css";
// import OrderCard from "./OrderCard";
// import OwnerEditProfile from "./OwnerEditProfile"; // ✅ ADD THIS

// function OwnerDashboard() {
//   /* ===== OWNER INFO ===== */
//   const ownerEmail = localStorage.getItem("ownerEmail");

//   /* ===== OWNER PROFILE STATE ===== */
//   const [showEditProfile, setShowEditProfile] = useState(false);

//   const ownerProfile = {
//     email: ownerEmail,
//     name: localStorage.getItem("ownerName") || "Restaurant Owner",
//     phone: localStorage.getItem("ownerPhone") || "",
//     restaurant: localStorage.getItem("restaurantName") || "",
//   };

//   /* ===== FOOD STATES ===== */
//   const [foods, setFoods] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [restaurantName, setRestaurantName] = useState(
//     ownerProfile.restaurant
//   );
//   const [imageFile, setImageFile] = useState(null);

//   /* ===== ORDER STATES ===== */
//   const [orders, setOrders] = useState([]);

//   /* ===== LOAD OWNER FOODS ===== */
//   const loadFoods = async () => {
//     try {
//       const res = await getOwnerFoods(ownerEmail);
//       setFoods(res.data || []);
//     } catch {
//       toast.error("Failed to load foods");
//     }
//   };

//   /* ===== LOAD OWNER ORDERS ===== */
//   const loadOrders = async () => {
//     try {
//       const res = await getNewOwnerOrders(ownerEmail);
//       setOrders(res.data || []);
//     } catch {
//       toast.error("Failed to load orders");
//     }
//   };

//   useEffect(() => {
//     if (!ownerEmail) {
//       toast.error("Owner not logged in");
//       return;
//     }

//     loadFoods();
//     loadOrders();

//     const interval = setInterval(loadOrders, 5000);
//     return () => clearInterval(interval);
//   }, [ownerEmail]);

//   /* ===== SAVE OWNER PROFILE ===== */
//   const saveOwnerProfile = (data) => {
//     localStorage.setItem("ownerName", data.name);
//     localStorage.setItem("ownerPhone", data.phone);
//     localStorage.setItem("restaurantName", data.restaurant);
//     setRestaurantName(data.restaurant);
//     toast.success("Profile updated ✅");
//   };

//   /* ===== ADD FOOD ===== */
//   const addFoodHandler = async () => {
//     if (!name || !price || !restaurantName || !imageFile) {
//       toast.error("All fields required");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("price", price);
//       formData.append("description", "Owner added food");
//       formData.append("restaurantName", restaurantName);
//       formData.append("ownerEmail", ownerEmail);
//       formData.append("image", imageFile);

//       await addFood(formData);

//       toast.success("Food added 🍽️");
//       setName("");
//       setPrice("");
//       setImageFile(null);
//       loadFoods();
//     } catch {
//       toast.error("Failed to add food");
//     }
//   };

//   /* ===== DELETE FOOD ===== */
//   const deleteFoodHandler = async (id) => {
//     if (!window.confirm("Delete this food?")) return;

//     try {
//       await deleteFood(id);
//       toast.success("Food deleted 🗑️");
//       loadFoods();
//     } catch {
//       toast.error("Failed to delete food");
//     }
//   };

//   /* ===== UPDATE ORDER STATUS ===== */
//   const changeStatus = async (orderId, status) => {
//     try {
//       await updateOrderStatus(orderId, status);
//       toast.success(`Order ${status}`);
//       loadOrders();
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   /* ===== LOGOUT ===== */
//   const logoutOwner = () => {
//     localStorage.clear();
//     window.location.reload();
//   };

//   return (
//     <div className="owner-dashboard">
//       <h2>🍴 Owner Dashboard</h2>

//       {/* ================= OWNER PROFILE ================= */}
//       <div className="owner-profile">
//         <div className="owner-avatar">👨‍🍳</div>

//         <div className="owner-info">
//           <h3>{ownerProfile.name}</h3>
//           <p>{ownerProfile.email}</p>
//           <span className="role-badge">Owner</span>
//         </div>

//         <div className="owner-actions">
//           <button
//             className="edit-btn"
//             onClick={() => setShowEditProfile(true)}
//           >
//             ✏ Edit Profile
//           </button>

//           <button className="logout-btn" onClick={logoutOwner}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* ================= FOOD FORM ================= */}
//       <div className="food-form">
//         <input
//           placeholder="Food name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <input
//           placeholder="Restaurant Name"
//           value={restaurantName}
//           onChange={(e) => setRestaurantName(e.target.value)}
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImageFile(e.target.files[0])}
//         />

//         <button onClick={addFoodHandler}>Add Food</button>
//       </div>

//       <hr />

//       {/* ================= OWNER ORDERS ================= */}
//       <h3>🛎️ New Orders</h3>

//       {orders.length === 0 && <p>No new orders</p>}

//       {orders.map((order) => (
//         <OrderCard
//           key={order.id}
//           order={order}
//           onStatusChange={changeStatus}
//         />
//       ))}

//       <hr />

//       {/* ================= FOOD LIST ================= */}
//       <h3>Your Foods</h3>

//       {foods.length === 0 && <p>No foods added yet</p>}

//       <div className="food-list">
//         {foods.map((food) => (
//           <div key={food.id} className="food-card">
//             <img src={food.imageUrl} alt={food.name} width="120" />
//             <h4>{food.name}</h4>
//             <p>₹{food.price}</p>
//             <p>{food.restaurantName}</p>

//             <button onClick={() => deleteFoodHandler(food.id)}>
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ================= EDIT PROFILE MODAL ================= */}
//       {showEditProfile && (
//         <OwnerEditProfile
//           owner={ownerProfile}
//           onClose={() => setShowEditProfile(false)}
//           onSave={saveOwnerProfile}
//         />
//       )}
//     </div>
//   );
// }

// export default OwnerDashboard;


import React, { useEffect, useState } from "react";
import {
  addFood,
  getOwnerFoods,
  deleteFood,
  getNewOwnerOrders,
  updateOrderStatus,
  saveRestaurant,
} from "../Service/Api";
import { toast } from "react-toastify";
import "./OwnerDashboard.css";
import OrderCard from "./OrderCard";
import OwnerEditProfile from "./OwnerEditProfile";

function OwnerDashboard() {
  /* ===== OWNER INFO ===== */
  const ownerEmail = localStorage.getItem("ownerEmail");

  /* ===== OWNER PROFILE ===== */
  const [showEditProfile, setShowEditProfile] = useState(false);

  const ownerProfile = {
    email: ownerEmail,
    name: localStorage.getItem("ownerName") || "Restaurant Owner",
    phone: localStorage.getItem("ownerPhone") || "",
    restaurant: localStorage.getItem("restaurantName") || "",
  };

  /* ================= RESTAURANT STATE ================= */
const [restaurant, setRestaurant] = useState({
  name: ownerProfile.restaurant || "",
  cuisine: "",
  address: "",
  phone: "",
  openTime: "",
});
const [bannerImage, setBannerImage] = useState(null);
const [bannerPreview, setBannerPreview] = useState(null); // 👁 ADD HERE

  {bannerPreview && (
  <img
    src={bannerPreview}
    alt="Restaurant Banner Preview"
    style={{
      width: "100%",
      maxHeight: "180px",
      objectFit: "cover",
      borderRadius: "10px",
      marginTop: "10px",
    }}
  />
)}


  /* ================= FOOD STATES ================= */
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Meals");
  const [description, setDescription] = useState("");
  const [restaurantName, setRestaurantName] = useState(
    ownerProfile.restaurant
  );
  const [imageFile, setImageFile] = useState(null);

  /* ================= ORDER STATES ================= */
  const [orders, setOrders] = useState([]);

  /* ================= LOAD DATA ================= */
  const loadFoods = async () => {
    try {
      const res = await getOwnerFoods(ownerEmail);
      setFoods(res.data || []);
    } catch {
      toast.error("Failed to load foods");
    }
  };

  const loadOrders = async () => {
    try {
      const res = await getNewOwnerOrders(ownerEmail);
      setOrders(res.data || []);
    } catch {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    if (!ownerEmail) {
      toast.error("Owner not logged in");
      return;
    }

    loadFoods();
    loadOrders();

    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, [ownerEmail]);

  /* ================= SAVE RESTAURANT ================= */
  const saveRestaurantHandler = async () => {
  try {
    const formData = new FormData();

    formData.append("name", restaurant.name);
    formData.append("ownerEmail", ownerEmail);
    formData.append("cuisine", restaurant.cuisine || "");
    formData.append("address", restaurant.address || "");
    formData.append("phone", restaurant.phone || "");
    formData.append("openTime", restaurant.openTime || "");

    if (bannerImage) {
      formData.append("image", bannerImage);
    }

    await saveRestaurant(formData);
    toast.success("Restaurant saved ✅");
  } catch (err) {
    console.error(err);
    toast.error("Failed to save restaurant");
  }
};



  /* ================= ADD FOOD ================= */
  const addFoodHandler = async () => {
    if (!name || !price || !restaurantName || !imageFile) {
      toast.error("All food fields required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("restaurantName", restaurantName);
      formData.append("ownerEmail", ownerEmail);
      formData.append("image", imageFile);

      await addFood(formData);

      toast.success("Food added 🍽️");
      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
      loadFoods();
    } catch {
      toast.error("Failed to add food");
    }
  };

  /* ================= DELETE FOOD ================= */
  const deleteFoodHandler = async (id) => {
    if (!window.confirm("Delete this food?")) return;

    try {+
      await deleteFood(id);
      toast.success("Food deleted 🗑️");
      loadFoods();
    } catch {
      toast.error("Failed to delete food");
    }
  };

  /* ================= ORDER STATUS ================= */
  const changeStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success(`Order ${status}`);
      loadOrders();
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ================= LOGOUT ================= */
  const logoutOwner = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="owner-dashboard">
      <h2>🍴 Owner Dashboard</h2>

      {/* ================= OWNER PROFILE ================= */}
      <div className="owner-profile">
        <div className="owner-avatar">👨‍🍳</div>

        <div className="owner-info">
          <h3>{ownerProfile.name}</h3>
          <p>{ownerProfile.email}</p>
          <span className="role-badge">Owner</span>
        </div>

        <div className="owner-actions">
          <button onClick={() => setShowEditProfile(true)}>
            Edit Profile
          </button>
          <button onClick={logoutOwner}>Logout</button>
        </div>
      </div>

      {/* ================= RESTAURANT DETAILS (ZOMATO STYLE) ================= */}
      <h3>🏠 Restaurant Details</h3>

      <div className="food-form">
        <input
          placeholder="Restaurant Name"
          value={restaurant.name}
          onChange={(e) =>
            setRestaurant({ ...restaurant, name: e.target.value })
          }
        />

        <input
          placeholder="Cuisine (South Indian)"
          value={restaurant.cuisine}
          onChange={(e) =>
            setRestaurant({ ...restaurant, cuisine: e.target.value })
          }
        />

        <input
          placeholder="Address"
          value={restaurant.address}
          onChange={(e) =>
            setRestaurant({ ...restaurant, address: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          value={restaurant.phone}
          onChange={(e) =>
            setRestaurant({ ...restaurant, phone: e.target.value })
          }
        />

        <input
          placeholder="Open Timings (12PM – 11PM)"
          value={restaurant.openTime}
          onChange={(e) =>
            setRestaurant({ ...restaurant, openTime: e.target.value })
          }
        />

      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBannerImage(file);
    setBannerPreview(URL.createObjectURL(file));
  }}
/>
        <button onClick={saveRestaurantHandler}>
          Save Restaurant
        </button>
      </div>

      <hr />

      {/* ================= ADD FOOD ================= */}
      <h3>Add Food</h3>

      <div className="food-form">
        <input
          placeholder="Food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Meals</option>
          <option>Main Course</option>
          <option>Breads</option>
          <option>Desserts</option>
        </select>

        <textarea
          placeholder="Food description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button onClick={addFoodHandler}>Add Food</button>
      </div>

      <hr />

      {/* ================= OWNER ORDERS ================= */}
      <h3>🛎️ New Orders</h3>

      {orders.length === 0 && <p>No new orders</p>}

      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onStatusChange={changeStatus}
        />
      ))}

      <hr />

      {/* ================= FOOD LIST ================= */}
      <h3>Your Foods</h3>

      {foods.length === 0 && <p>No foods added yet</p>}

      <div className="food-list">
        {foods.map((food) => (
          <div key={food.id} className="food-card">
            <img src={food.imageUrl} alt={food.name} width="120" />
            <h4>{food.name}</h4>
            <p>₹{food.price}</p>
            <p>{food.category}</p>

            <button onClick={() => deleteFoodHandler(food.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {showEditProfile && (
        <OwnerEditProfile
          owner={ownerProfile}
          onClose={() => setShowEditProfile(false)}
          onSave={(data) => {
            localStorage.setItem("ownerName", data.name);
            localStorage.setItem("ownerPhone", data.phone);
            toast.success("Profile updated ✅");
          }}
        />
      )}
    </div>
  );
}

export default OwnerDashboard;
