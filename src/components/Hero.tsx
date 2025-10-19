import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  // ===== REFS =====
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const destinationRef = useRef<HTMLSpanElement>(null);

  // ===== CONSTANTS =====
  const destinations = [
    "Canada", 
    "Australia", 
    "United Kingdom", 
    "USA", 
    "Germany", 
    "New Zealand", 
    "Ireland", 
    "Netherlands", 
    "Denmark", 
    "Sweden"
  ];

  // ===== STATE =====
  const [currentText, setCurrentText] = useState('');

  // ===== TYPEWRITER EFFECT =====
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isDeleting = false;
    let charIndex = 0;
    let textIndex = 0;
    
    const typeWriter = () => {
      const fullText = destinations[textIndex];
      
      if (isDeleting) {
        // Deleting characters
        setCurrentText(fullText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        // Typing characters
        setCurrentText(fullText.substring(0, charIndex + 1));
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === fullText.length) {
        // Finished typing, wait then start deleting
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next text
        isDeleting = false;
        textIndex = (textIndex + 1) % destinations.length;
        typeSpeed = 500;
      }
      
      timeoutId = setTimeout(typeWriter, typeSpeed);
    };
    
    timeoutId = setTimeout(typeWriter, 100);
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // ===== SMOOTH INITIAL ANIMATION =====
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for smooth entrance
      gsap.set([headingRef.current, paraRef.current, btnsRef.current], {
        opacity: 0,
        y: 60,
        scale: 0.95
      });
      
      gsap.set(imgRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: 5
      });
      
      gsap.set(destinationRef.current, {
        opacity: 0,
        y: 20
      });
      
      // Create ultra-smooth timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out"
        }
      });
      
      // Hero entrance sequence with perfect timing
      tl.to(headingRef.current, { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      })
      .to(imgRef.current, { 
        opacity: 1, 
        scale: 1,
        rotation: 0,
        duration: 1.4,
        ease: "power3.out"
      }, "-=0.8")
      .to(paraRef.current, { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.6")
      .to(btnsRef.current, { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.4")
      .to(destinationRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.2");
      
      // Add subtle floating animation to image
      gsap.to(imgRef.current, {
        y: -10,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
      
      // Add gentle pulse to accent layers
      gsap.to(".accent-layer", {
        scale: 1.02,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    return () => ctx.revert();
  }, []);

  // ===== RENDER =====
  return (
    <section
      id="home"
      className="relative bg-white min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ===== LEFT CONTENT ===== */}
          <div className="space-y-8">

            {/* ===== HEADING ===== */}
            <div className="space-y-4">
              <h1
                ref={headingRef}
                className="text-5xl lg:text-7xl font-light text-gray-900 leading-tight"
              >
                <span className="block">Study in</span>
                <span className="h-20 flex items-center">
                  <span
                    ref={destinationRef}
                    className="text-primary-600 font-normal min-w-[280px] inline-block"
                  >
                    {currentText}
                    <span className="inline-block w-0.5 h-12 bg-primary-600 ml-1 animate-pulse"></span>
                  </span>
                </span>
              </h1>

              {/* ===== DESCRIPTION ===== */}
              <p
                ref={paraRef}
                className="text-lg text-gray-500 leading-relaxed max-w-md"
              >
                Expert guidance for your overseas education journey. Trusted by thousands of students worldwide.
              </p>
            </div>

            {/* ===== CTA BUTTONS ===== */}
            <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gray-900 text-white px-8 py-3.5 rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 group">
                <span className="font-medium">Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-gray-700 px-8 py-3.5 rounded-full hover:text-gray-900 transition-colors flex items-center justify-center space-x-2 group underline underline-offset-4">
                <span className="font-medium">Learn More</span>
              </button>
            </div>
          </div>

          {/* ===== RIGHT IMAGE ===== */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <img
                ref={imgRef}
                src="/girlimg.png"
                alt="Students studying abroad"
                className="rounded-3xl w-auto h-[450px] lg:h-[550px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
