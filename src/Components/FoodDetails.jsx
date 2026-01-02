// import React from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartSlice";
// import "./FoodDetails.css";

// function FoodDetails({ food, setPage }) {
//   const dispatch = useDispatch();

//   if (!food) return null;

//   const addItem = () => {
//     dispatch(
//       addToCart({
//         id: food.id,
//         name: food.name,
//         price: Number(food.price),
//         restaurant: food.restaurant,
//         image: food.image,
//       })
//     );
//   };

//   return (
//     <div className="food-details">
//       <img src={food.image} alt={food.name} />

//       <h2>{food.name}</h2>
//       <p>{food.restaurant}</p>
//       <h3>₹{food.price}</h3>

//       <div className="food-actions">
//         <button onClick={addItem}>Add to Cart</button>

//         <button
//           className="buy-btn"
//           onClick={() => {
//             addItem();
//             setPage("cart");
//           }}
//         >
//           Buy Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FoodDetails;

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./FoodDetails.css";
import foodPlaceholder from "../assets/login.png";

function FoodDetails({ food, setPage }) {
  const dispatch = useDispatch();

  /* ===== SAFETY CHECK ===== */
  if (!food) {
    setPage("home");
    return null;
  }

  /* ===== ADD TO CART ===== */
  const addItem = () => {
    dispatch(
  addToCart({
    id: food.id,
    name: food.name,
    price: Number(food.price),
    restaurant: food.restaurantName || food.restaurant,
    ownerEmail: food.ownerEmail,   // ✅ ADD THIS LINE
    image: food.imageUrl || food.image,
    quantity: 1,
  })
);

  };

  return (
    <div className="food-details">
      <img
        src={food.imageUrl || food.image || foodPlaceholder}
        alt={food.name}
        onError={(e) => (e.target.src = foodPlaceholder)}
        className="food-details-image"
      />

      <h2 className="food-title">{food.name}</h2>

      <p className="food-restaurant">
        {food.restaurantName || food.restaurant}
      </p>

      <p className="food-rating">
        ⭐ {(food.rating || 4.2).toFixed(1)}
      </p>

      <h3 className="food-price">₹{food.price}</h3>

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
  );
}

export default FoodDetails;
