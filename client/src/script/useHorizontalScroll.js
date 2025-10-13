// useHorizontalScroll.js

import { useRef, useEffect } from "react";

// The only way to fix this without external state is to
// make the hook's useEffect dependent on the element itself,
// but since the element is not state/props, we use an external flag.

export function useHorizontalScroll(speedMultiplier = 2, contentLoaded = true) {
  // <--- ADD A FLAG
  const elRef = useRef(null);

  useEffect(() => {
    // We only proceed if contentLoaded is true (i.e., isLoading is false)
    if (!contentLoaded) return;

    const el = elRef.current;

    if (el) {
      // ... your event listener setup ...
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

      el.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        el.removeEventListener("wheel", onWheel, { passive: false });
      };
    }
  }, [speedMultiplier, contentLoaded]); // <--- ADD contentLoaded to dependencies

  return elRef;
}
