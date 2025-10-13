import React, { useState, useEffect, useRef } from "react";

const CardSlider = () => {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "Step 1: Profile Assessment",
      description:
        "Get your profile assessed by our expert team of counsellors to understand your best-fit options.",
    },
    {
      title: "Step 2: University Selection",
      description:
        "We help you shortlist universities that match your academic background, goals, and budget.",
    },
    {
      title: "Step 3: Application Guidance",
      description:
        "Step-by-step support to complete your applications and boost your chances of admission.",
    },
    {
      title: "Step 4: Visa Assistance",
      description:
        "Comprehensive visa support to ensure smooth approval and successful departure.",
    },
  ];

  // Observe when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { threshold: 0.4 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Auto-play only when in view
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-xl mx-auto transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative h-48 flex items-center justify-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex flex-col justify-center items-center text-center p-8 rounded-2xl bg-white border border-gray-200 transition-opacity duration-700 ease-in-out ${
              active === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <h3 className="text-xl font-normal text-gray-900 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full transition-all duration-300 ${
              active === idx ? "w-8 bg-gray-900" : "w-1 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
