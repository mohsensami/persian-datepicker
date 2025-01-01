import { useState, useEffect, useCallback } from "react";

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
    error: string | null;
  }>({
    latitude: null,
    longitude: null,
    error: null,
  });

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          error: error.message || "An unknown error occurred.",
        }));
      },
      options
    );
  }, [options]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return { ...location, refreshLocation: getLocation };
};

export default useCurrentLocation;
