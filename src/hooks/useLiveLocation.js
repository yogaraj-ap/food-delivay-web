import { useEffect, useState } from "react";

function useLiveLocation() {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    error: null,
  });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation not supported",
      }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          error: error.message,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return location;
}

export default useLiveLocation;
