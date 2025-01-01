import React from "react";
import useWindowSize from "../hooks/useWindowSize";

const WindowSize: React.FC = () => {
  const {
    innerWidth,
    innerHeight,
    outerWidth,
    outerHeight,
    isMobile,
    isTablet,
    isDesktop,
  } = useWindowSize();

  return (
    <div>
      <h1>Enhanced useWindowSize Hook</h1>
      <p>
        <strong>Inner Window Size:</strong> {innerWidth} x {innerHeight}
      </p>
      <p>
        <strong>Outer Window Size:</strong> {outerWidth} x {outerHeight}
      </p>
      <p>
        <strong>Device Type:</strong> {isMobile && "Mobile"}
        {isTablet && "Tablet"}
        {isDesktop && "Desktop"}
      </p>
    </div>
  );
};

export default WindowSize;
