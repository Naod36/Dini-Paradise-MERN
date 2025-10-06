// useHorizontalScroll.js

import { useRef, useEffect } from "react";

// Accept a multiplier prop
export function useHorizontalScroll(speedMultiplier = 2) {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;

    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;

        e.preventDefault();

        // Apply the multiplier here to increase the scroll distance
        const scrollAmount = e.deltaY * speedMultiplier;

        el.scrollTo({
          left: el.scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      };

      el.addEventListener("wheel", onWheel);

      return () => {
        el.removeEventListener("wheel", onWheel);
      };
    }
  }, [speedMultiplier]); // IMPORTANT: Add speedMultiplier to dependency array

  return elRef;
}
