import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CardSlider = () => {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "Profile Assessment",
      description:
        "Get your profile assessed by our expert team of counsellors to understand your best-fit options.",
    },
    {
      title: "University Selection",
      description:
        "We help you shortlist universities that match your academic background, goals, and budget.",
    },
    {
      title: "Application Guidance",
      description:
        "Step-by-step support to complete your applications and boost your chances of admission.",
    },
    {
      title: "Visa Assistance",
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
    if (!inView || isHovered) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [inView, isHovered]);

  const goTo = (idx: number) => setActive(idx);
  const prev = () => setActive((p) => (p === 0 ? steps.length - 1 : p - 1));
  const next = () => setActive((p) => (p === steps.length - 1 ? 0 : p + 1));

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full max-w-2xl mx-auto transition-opacity duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Slide area (no gradients) */}
      <div className="relative h-56 flex items-center justify-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            aria-hidden={active !== idx}
            className={`absolute inset-0 flex flex-col justify-center items-center text-center px-8 py-10 rounded-2xl bg-white border border-slate-200 transition-all duration-500 ease-out ${
              active === idx
                ? "opacity-100 z-10 scale-[1.02] shadow-lg ring-1 ring-primary-200"
                : "opacity-0 z-0 scale-[0.98] pointer-events-none"
            }`}
          >
            <span className="mb-3 inline-flex items-center rounded-full border border-primary-200 text-primary-600 text-xs font-medium px-2.5 py-1">
              Step {idx + 1}
            </span>
            <h3 className="text-2xl font-semibold text-primary-600 mb-2">{step.title}</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">{step.description}</p>
          </div>
        ))}

        {/* Controls */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous step"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-slate-200 shadow-sm grid place-items-center hover:bg-slate-50 active:scale-95 transition"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next step"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white border border-slate-200 shadow-sm grid place-items-center hover:bg-slate-50 active:scale-95 transition"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {/* Indicators (no gradients) */}
      <div className="flex justify-center mt-6 space-x-2" role="tablist" aria-label="Steps">
        {steps.map((_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={active === idx}
            aria-label={`Go to step ${idx + 1}`}
            onClick={() => goTo(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              active === idx ? "w-8 bg-primary-600" : "w-1 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
