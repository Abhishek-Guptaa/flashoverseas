// hooks/useCounter.ts
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const useCounter = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    gsap.to(countRef.current, {
      value: end,
      duration: duration,
      ease: "power1.out",
      onUpdate: () => setCount(Math.floor(countRef.current.value)),
    });
  }, [end, duration]);

  return count;
};

export default useCounter;
