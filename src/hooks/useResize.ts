import { useEffect } from "react";

type WindowSize = {
  width: number;
  height: number;
};

type WindowResizeCallback = (windowSize: WindowSize) => void;

function useWindowResize(callback: WindowResizeCallback) {
  useEffect(() => {
    // Function to handle the resize event
    const handleResize = () => {
      const windowSize: WindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      callback(windowSize);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback]);
}
