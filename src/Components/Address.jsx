// import React from "react";
// import "./Address.css";

// const addresses = [
//   {
//     id: 1,
//     type: "Home",
//     address: "12, Anna Nagar, Chennai - 600040",
//   },
//   {
//     id: 2,
//     type: "Work",
//     address: "IT Park Road, Tidel Park, Chennai - 600113",
//   },
// ];

// function Address({ setPage }) {
//   return (
//     <div className="address-page">
//       {/* HEADER */}
//       <div className="address-header">
//         <button className="back-btn" onClick={() => setPage("profile")}>
//           ← Back
//         </button>
//         <h2>Saved Addresses</h2>
//       </div>

//       {/* ADDRESS LIST */}
//       {addresses.length === 0 ? (
//         <div className="empty-address">
//           <p>No saved addresses 📍</p>
//           <button onClick={() => setPage("location")}>
//             Add New Address
//           </button>
//         </div>
//       ) : (
//         <div className="address-list">
//           {addresses.map((addr) => (
//             <div key={addr.id} className="address-card">
//               <div className="address-type">{addr.type}</div>
//               <p>{addr.address}</p>
//               <div className="address-actions">
//                 <button>Edit</button>
//                 <button className="delete">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ADD ADDRESS */}
//       <button
//         className="add-address-btn"
//         onClick={() => setPage("location")}
//       >
//         + Add New Address
//       </button>
//     </div>
//   );
// }

// export default Address;

import React, { useState } from "react";
import "./Address.css";

function Address({ setPage }) {
  const saved = JSON.parse(
    localStorage.getItem("selectedAddress")
  );

  const [address, setAddress] = useState(
    saved?.address || ""
  );

  const saveAddress = () => {
    if (!address.trim()) return;

    localStorage.setItem(
      "selectedAddress",
      JSON.stringify({
        label: "Home",
        address,
      })
    );

    setPage("home"); // ✅ GO BACK
  };

  const deleteAddress = () => {
    localStorage.removeItem("selectedAddress");
    setPage("home");
  };

  return (
    <div className="address-page">
      <h2>Saved Address</h2>

      <textarea
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={saveAddress}>
        Save Address
      </button>

      {saved && (
        <button
          className="delete-btn"
          onClick={deleteAddress}
        >
          Delete Address
        </button>
      )}
    </div>
  );
}

export default Address;
