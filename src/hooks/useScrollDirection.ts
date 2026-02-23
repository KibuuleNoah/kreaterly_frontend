import { useState, useEffect, useRef } from 'react';


export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.pageYOffset;
      // Added a small threshold (10px) to prevent flickering on mobile
      if (Math.abs(currentY - prevScrollY.current) < 10) return;

      const direction = currentY > prevScrollY.current ? "down" : "up";
      if (direction !== scrollDirection) {
        setScrollDirection(direction);
      }
      prevScrollY.current = currentY > 0 ? currentY : 0;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

  return scrollDirection;
}


// export function useScrollDirection() {
//   const [scrollDirection, setScrollDirection] = useState("up");
//   const prevScrollY = useRef(0);
//
//   useEffect(() => {
//     const updateScrollDirection = () => {
//       const scrollY = window.pageYOffset;
//       // Determine direction by comparing current scroll to previous
//       const direction = scrollY > prevScrollY.current ? "down" : "up";
//
//       // Only update state if the direction actually changed
//       if (direction !== scrollDirection && (scrollY - prevScrollY.current > 5 || scrollY - prevScrollY.current < -5)) {
//         setScrollDirection(direction);
//       }
//       prevScrollY.current = scrollY > 0 ? scrollY : 0;
//     };
//
//     window.addEventListener("scroll", updateScrollDirection);
//     return () => window.removeEventListener("scroll", updateScrollDirection);
//   }, [scrollDirection]);
//
//   return scrollDirection;
// }

