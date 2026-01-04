// // src/utils/location.js

// export const formatAddress = (data) => {
//   const address = data?.address || {};

//   return (
//     address.road ||
//     address.suburb ||
//     address.neighbourhood ||
//     address.city ||
//     address.state ||
//     "Your Location"
//   );
// };

export const formatAddress = (data) => {
  if (!data || !data.address) return "Unknown location";

  const address = data.address;

 
  return (
    address.city ||
    address.town ||
    address.village ||
    address.state ||
    "Your location"
  );
};
