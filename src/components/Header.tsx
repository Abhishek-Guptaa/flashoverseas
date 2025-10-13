import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const menuIconRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Optimized scroll detection for navbar effects
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          
          // Only update if scroll position changed significantly
          if (Math.abs(scrollTop - lastScrollY) > 5) {
            const scrollProgress = Math.min(scrollTop / 100, 1);
            
            setIsScrolled(scrollTop > 20);
            
            // Smooth logo animation with spring physics
            if (logoRef.current) {
              gsap.to(logoRef.current, {
                scale: 1 - (scrollProgress * 0.1),
                y: scrollProgress * -2,
                duration: 0.6,
                ease: "power2.out"
              });
            }
            
            // Smooth header background animation
            if (headerRef.current) {
              gsap.to(headerRef.current, {
                backgroundColor: `rgba(255, 255, 255, ${0.95 + (scrollProgress * 0.05)})`,
                backdropFilter: `blur(${8 + (scrollProgress * 12)}px)`,
                boxShadow: `0 4px ${6 + (scrollProgress * 20)}px rgba(0, 0, 0, ${0.05 + (scrollProgress * 0.1)})`,
                duration: 0.3,
                ease: "power2.out"
              });
            }
            
            lastScrollY = scrollTop;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Beautiful GSAP Animation for Mobile Menu
  useEffect(() => {
    if (!menuRef.current) return;

    // Initialize menu position with smooth setup
    gsap.set(menuRef.current, {
      x: "100%",
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(255, 255, 255, 0)"
    });

    if (isMenuOpen) {
      // Create a beautiful slide-in with spring physics
      const tl = gsap.timeline();
      
      tl.to(menuRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(menuRef.current, {
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");

      // Beautiful staggered link animations with spring physics
      gsap.fromTo(
        linkRefs.current,
        { 
          y: 60, 
          opacity: 0, 
          scale: 0.7,
          rotationX: 90
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.7,
          ease: "back.out(1.4)",
          stagger: {
            amount: 0.3,
            from: "start"
          },
          delay: 0.4,
        }
      );
    } else {
      // Smooth slide-out
      gsap.to(menuRef.current, {
        x: "100%",
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(255, 255, 255, 0)",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isMenuOpen]);

  // Beautiful GSAP Animation for Burger ↔ Close icon
  useEffect(() => {
    if (!menuIconRef.current || !closeIconRef.current) return;

    if (isMenuOpen) {
      // Create a beautiful morphing animation
      const tl = gsap.timeline();
      
      tl.to(menuIconRef.current, { 
        opacity: 0, 
        rotate: 90, 
        scale: 0.8,
        duration: 0.4,
        ease: "power2.inOut"
      })
      .fromTo(closeIconRef.current, {
        opacity: 0,
        rotate: -90,
        scale: 0.8
      }, {
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      }, "-=0.2");
    } else {
      // Smooth reverse animation
      const tl = gsap.timeline();
      
      tl.to(closeIconRef.current, { 
        opacity: 0, 
        rotate: 90, 
        scale: 0.8,
        duration: 0.4,
        ease: "power2.inOut"
      })
      .fromTo(menuIconRef.current, {
        opacity: 0,
        rotate: -90,
        scale: 0.8
      }, {
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      }, "-=0.2");
    }
  }, [isMenuOpen]);

  const mobileLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/destinations", label: "Destinations" },
    { to: "/about", label: "About" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];


  return (
    <header 
      ref={headerRef}
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              ref={logoRef}
              to="/" 
              className="flex items-center space-x-2 group"
              onMouseEnter={() => {
                if (logoRef.current) {
                  gsap.to(logoRef.current, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }}
              onMouseLeave={() => {
                if (logoRef.current) {
                  gsap.to(logoRef.current, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }}
            >
              <img
                src="/Logo.png"
                alt="Flash Overseas Logo"
                className="h-auto w-36"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {mobileLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  className={`relative px-3 py-2 text-sm font-medium group ${
                    isActive(link.to)
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                  onMouseEnter={(e) => {
                    const underline = e.currentTarget.querySelector('.underline');
                    const background = e.currentTarget.querySelector('.hover-bg');
                    
                    gsap.to(underline, {
                      width: '100%',
                      duration: 0.4,
                      ease: "power2.out"
                    });
                    
                    gsap.to(background, {
                      scale: 1,
                      duration: 0.3,
                      ease: "back.out(1.7)"
                    });
                  }}
                  onMouseLeave={(e) => {
                    const underline = e.currentTarget.querySelector('.underline');
                    const background = e.currentTarget.querySelector('.hover-bg');
                    
                    if (!isActive(link.to)) {
                      gsap.to(underline, {
                        width: '0%',
                        duration: 0.3,
                        ease: "power2.out"
                      });
                    }
                    
                    gsap.to(background, {
                      scale: 0,
                      duration: 0.2,
                      ease: "power2.out"
                    });
                  }}
                >
                  {link.label}
                  {/* Beautiful underline animation */}
                  <span className={`underline absolute bottom-0 left-0 h-0.5 bg-primary-600 ${
                    isActive(link.to) ? 'w-full' : 'w-0'
                  }`}></span>
                  {/* Hover background effect */}
                  <span className="hover-bg absolute inset-0 bg-primary-50 rounded-lg scale-0 -z-10"></span>
                </Link>
              ))}
              <button 
                className="relative bg-primary-600 text-white px-6 py-2 rounded-lg group overflow-hidden"
                onMouseEnter={(e) => {
                  const button = e.currentTarget;
                  const overlay = button.querySelector('.button-overlay');
                  const text = button.querySelector('.button-text');
                  
                  gsap.to(button, {
                    scale: 1.05,
                    boxShadow: '0 8px 25px rgba(252, 56, 97, 0.3)',
                    duration: 0.3,
                    ease: "power2.out"
                  });
                  
                  gsap.to(overlay, {
                    scaleX: 1,
                    duration: 0.4,
                    ease: "power2.out"
                  });
                  
                  gsap.to(text, {
                    y: -2,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  const button = e.currentTarget;
                  const overlay = button.querySelector('.button-overlay');
                  const text = button.querySelector('.button-text');
                  
                  gsap.to(button, {
                    scale: 1,
                    boxShadow: '0 4px 15px rgba(252, 56, 97, 0.2)',
                    duration: 0.3,
                    ease: "power2.out"
                  });
                  
                  gsap.to(overlay, {
                    scaleX: 0,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                  
                  gsap.to(text, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                <span className="button-text relative z-10">Free Consultation</span>
                <span className="button-overlay absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 scale-x-0 origin-left"></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div 
            className={`md:hidden relative w-10 h-10 rounded-lg group transition-all duration-300 z-[60] ${
              isMenuOpen ? 'bg-primary-100' : 'bg-gray-50'
            }`}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                backgroundColor: isMenuOpen ? '#fce7eb' : '#f3f4f6',
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                backgroundColor: isMenuOpen ? '#fce7eb' : '#f9fafb',
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
          >
            {/* Burger icon */}
            <div
              ref={menuIconRef}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Menu className={`w-6 h-6 transition-colors duration-300 ${
                isMenuOpen ? 'text-primary-600' : 'text-gray-700'
              }`} />
            </div>
            {/* Close icon */}
            <div
              ref={closeIconRef}
              className="absolute inset-0 flex items-center justify-center opacity-0 rotate-[-90deg]"
            >
              <X className={`w-6 h-6 transition-colors duration-300 ${
                isMenuOpen ? 'text-primary-600' : 'text-gray-700'
              }`} />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="absolute inset-0 w-full h-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            />
          </div>
        </div>
      </nav>

      {/* Modern Mobile Menu (GSAP Animated) */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-screen z-50 p-6 md:hidden overflow-y-auto"
        style={{ 
          backdropFilter: 'blur(0px)', 
          backgroundColor: 'rgba(255, 255, 255, 0)',
          transform: 'translateX(100%)'
        }}
      >
        {/* Links */}
        <div className="flex flex-col space-y-6 mt-16">
          {mobileLinks.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              ref={(el) => {
                if (el) linkRefs.current[i] = el;
              }}
              onClick={() => setIsMenuOpen(false)}
              className={`relative block text-xl font-medium py-3 px-4 rounded-xl group ${
                isActive(link.to)
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-800 hover:text-primary-600 hover:bg-gray-50"
              }`}
              onMouseEnter={(e) => {
                const link = e.currentTarget;
                const background = link.querySelector('.mobile-hover-bg');
                
                gsap.to(link, {
                  scale: 1.02,
                  duration: 0.3,
                  ease: "power2.out"
                });
                
                gsap.to(background, {
                  scale: 1,
                  duration: 0.3,
                  ease: "back.out(1.7)"
                });
              }}
              onMouseLeave={(e) => {
                const link = e.currentTarget;
                const background = link.querySelector('.mobile-hover-bg');
                
                gsap.to(link, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
                
                gsap.to(background, {
                  scale: 0,
                  duration: 0.2,
                  ease: "power2.out"
                });
              }}
            >
              {link.label}
              {/* Beautiful hover effect */}
              <span className="mobile-hover-bg absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent rounded-xl scale-0 -z-10"></span>
            </Link>
          ))}

          <button 
            className="mt-8 w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-xl font-medium relative overflow-hidden group"
            onMouseEnter={(e) => {
              const button = e.currentTarget;
              const overlay = button.querySelector('.mobile-button-overlay');
              const text = button.querySelector('.mobile-button-text');
              
              gsap.to(button, {
                scale: 1.02,
                boxShadow: '0 8px 25px rgba(252, 56, 97, 0.3)',
                duration: 0.3,
                ease: "power2.out"
              });
              
              gsap.to(overlay, {
                scaleX: 1,
                duration: 0.4,
                ease: "power2.out"
              });
              
              gsap.to(text, {
                y: -1,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
            onMouseLeave={(e) => {
              const button = e.currentTarget;
              const overlay = button.querySelector('.mobile-button-overlay');
              const text = button.querySelector('.mobile-button-text');
              
              gsap.to(button, {
                scale: 1,
                boxShadow: '0 4px 15px rgba(252, 56, 97, 0.2)',
                duration: 0.3,
                ease: "power2.out"
              });
              
              gsap.to(overlay, {
                scaleX: 0,
                duration: 0.3,
                ease: "power2.out"
              });
              
              gsap.to(text, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }}
          >
            <span className="mobile-button-text relative z-10">Free Consultation</span>
            <span className="mobile-button-overlay absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 scale-x-0 origin-left"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
