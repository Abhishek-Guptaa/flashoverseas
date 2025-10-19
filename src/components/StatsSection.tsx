import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useCounter from '../hooks/useCounter';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  icon: JSX.Element;
  number: number;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  className?: string;
  title?: string;
  subtitle?: string;
}

const StatItem: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => {
  const [hasStarted, setHasStarted] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(hasStarted ? stat.number : 0, 2);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none reverse none",
        },
      }
    );
  }, [index]);

  const displayValue = () => {
    if (stat.suffix) {
      return `${count}${stat.suffix}`;
    }
    return stat.label === "Success Rate" ? `${count}%` : count.toLocaleString();
  };

  return (
    <div
      ref={ref}
      className="text-center opacity-0"
    >
      <div className="text-gray-900 flex justify-center mb-3">
        {stat.icon}
      </div>
      <div className="text-4xl font-light text-gray-900 mb-2">
        {displayValue()}
      </div>
      <div className="text-sm text-gray-500 uppercase tracking-wide">
        {stat.label}
      </div>
    </div>
  );
};

const StatsSection: React.FC<StatsSectionProps> = ({ 
  stats, 
  className = "py-20 bg-white",
  title,
  subtitle 
}) => {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;