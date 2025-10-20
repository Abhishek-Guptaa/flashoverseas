import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

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
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMemo(() => (typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)').matches : false), []);
  
  const isInView = useInView(ref, { 
    // On mobile, animate once for better performance
    once: isMobile || prefersReducedMotion,
    // Trigger a bit earlier on mobile to reduce perceived delay
    margin: isMobile ? '0px 0px -10% 0px' : '-50px 0px -50px 0px'
  });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    } else if (!isMobile && !prefersReducedMotion && fadeOut) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isInView, fadeOut, isMobile, prefersReducedMotion]);

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

  const effectiveDistance = prefersReducedMotion ? 0 : (isMobile ? Math.min(24, distance) : distance);
  const effectiveDuration = prefersReducedMotion ? 0 : (isMobile ? Math.min(0.45, duration) : duration);
  const effectiveDelay = prefersReducedMotion ? 0 : (isMobile ? Math.min(0.05, delay) : delay);
  const allowFadeOut = !isMobile && !prefersReducedMotion && fadeOut;

  return (
    <motion.div
      ref={ref}
      initial={{ ...getInitialPosition(), ...(effectiveDistance !== distance ? (direction === 'left' || direction === 'right' ? { x: (getInitialPosition() as any).x ? Math.sign((getInitialPosition() as any).x) * effectiveDistance : 0 } : { y: (getInitialPosition() as any).y ? Math.sign((getInitialPosition() as any).y) * effectiveDistance : 0 }) : {} } as any}
      animate={isVisible ? getAnimatePosition() : (allowFadeOut ? getExitPosition() : getAnimatePosition())}
      transition={{
        duration: isVisible ? effectiveDuration : effectiveDuration * 0.8,
        delay: isVisible ? effectiveDelay : 0,
        ease: isVisible 
          ? [0.25, 0.46, 0.45, 0.94] // Smooth ease-in
          : [0.55, 0.06, 0.68, 0.19], // Quick ease-out
      }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
