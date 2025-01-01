import { useState, useEffect } from "react";

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    isMobile: window.innerWidth <= 767,
    isTablet: window.innerWidth > 767 && window.innerWidth <= 1024,
    isDesktop: window.innerWidth > 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        isMobile: window.innerWidth <= 767,
        isTablet: window.innerWidth > 767 && window.innerWidth <= 1024,
        isDesktop: window.innerWidth > 1024,
      });
    };

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    // Call the handler once to set initial size
    handleResize();

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
