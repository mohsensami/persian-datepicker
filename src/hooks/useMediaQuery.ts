import { useEffect, useState } from "react";

const useMediaQuery = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1200;
  const isDesktop = windowWidth > 1460;

  return { windowWidth, isMobile, isTablet, isDesktop };
};

export default useMediaQuery;
