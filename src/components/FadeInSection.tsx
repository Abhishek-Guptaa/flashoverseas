import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
  fadeOut?: boolean;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  className = '',
  fadeOut = true
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const isInView = useInView(ref, { 
    once: false, // Allow multiple triggers
    margin: "-50px 0px -50px 0px" // Reduced margin for earlier trigger
  });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    } else if (fadeOut) {
      // Add a small delay to make fade-out more visible
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, fadeOut]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
        return { y: 0, opacity: 1 };
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
        return { x: 0, opacity: 1 };
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  const getExitPosition = () => {
    switch (direction) {
      case 'up':
        return { y: -distance * 0.7, opacity: 0.3 }; // Less movement, partial opacity
      case 'down':
        return { y: distance * 0.7, opacity: 0.3 };
      case 'left':
        return { x: -distance * 0.7, opacity: 0.3 };
      case 'right':
        return { x: distance * 0.7, opacity: 0.3 };
      default:
        return { y: -distance * 0.7, opacity: 0.3 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isVisible ? getAnimatePosition() : (fadeOut ? getExitPosition() : getAnimatePosition())}
      transition={{
        duration: isVisible ? duration : duration * 0.8, // Faster fade-out
        delay: isVisible ? delay : 0, // No delay on fade-out
        ease: isVisible 
          ? [0.25, 0.46, 0.45, 0.94] // Smooth ease-in
          : [0.55, 0.06, 0.68, 0.19], // Quick ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
