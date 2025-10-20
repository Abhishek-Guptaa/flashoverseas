import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, BookOpen, GraduationCap, FileText, Award } from "lucide-react";
import { gsap } from "gsap";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const menuIconRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const mobileServicesRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 150); // Small delay to prevent flickering
    setDropdownTimeout(timeout);
  };

  // Close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open (robust lock)
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY || window.pageYOffset;
      document.body.dataset.scrollLock = String(scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (top) {
        const y = parseInt(top || '0', 10);
        window.scrollTo(0, -y);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
            
            // Logo animation removed per request
            
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
      x: "100vw",
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(255, 255, 255, 0)",
      autoAlpha: 0,
      pointerEvents: 'none',
    });

    const isSmallScreen = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;

    if (isMenuOpen) {
      // Create a beautiful slide-in with spring physics
      const tl = gsap.timeline();
      
      tl.set(menuRef.current, { autoAlpha: 1, pointerEvents: 'auto' })
      .to(menuRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      // Avoid heavy blur on small screens for performance
      if (!isSmallScreen) {
        tl.to(menuRef.current, {
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 1)",
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4");
      } else {
        tl.to(menuRef.current, {
          backgroundColor: "rgba(255, 255, 255, 1)",
          duration: 0.4,
          ease: "power2.out",
        }, "-=0.4");
      }

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
      // Ensure mobile services section starts closed on open
      setIsMobileServicesOpen(false);
    } else {
      // Smooth slide-out
      gsap.to(menuRef.current, {
        x: "100vw",
        backdropFilter: isSmallScreen ? undefined : "blur(0px)",
        backgroundColor: "rgba(255, 255, 255, 0)",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { autoAlpha: 0, pointerEvents: 'none' });
          }
        }
      });
    }
  }, [isMenuOpen]);

  // Animate mobile services accordion
  useEffect(() => {
    if (!mobileServicesRef.current) return;
    const content = mobileServicesRef.current;
    if (isMobileServicesOpen) {
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    } else {
      gsap.to(content, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, [isMobileServicesOpen]);

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

  // Services dropdown animation
  useEffect(() => {
    if (!servicesDropdownRef.current) return;

    if (isServicesDropdownOpen) {
      gsap.fromTo(servicesDropdownRef.current, 
        { 
          opacity: 0, 
          y: -10, 
          scale: 0.95 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        }
      );
    } else {
      gsap.to(servicesDropdownRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in"
      });
    }
  }, [isServicesDropdownOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Keep a CSS variable with the header height so other components can center themselves
  useEffect(() => {
    const setHeaderHeight = () => {
      if (headerRef.current) {
        const h = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      }
    };

    setHeaderHeight();

    // Observe header size changes (logo scaling, responsive changes)
    let ro: ResizeObserver | null = null;
    try {
      ro = new ResizeObserver(setHeaderHeight);
      if (headerRef.current) ro.observe(headerRef.current);
    } catch (e) {
      // ResizeObserver may not be available in some test environments; fallback to resize event
    }

    window.addEventListener('resize', setHeaderHeight, { passive: true });
    return () => {
      window.removeEventListener('resize', setHeaderHeight);
      if (ro && headerRef.current) ro.disconnect();
    };
  }, []);

  const servicesDropdown = [
    { to: "/test-preparation", label: "Test Preparation", icon: BookOpen },
    { to: "/admission-guidance", label: "Admission Guidance", icon: GraduationCap },
    { to: "/visa-assistance", label: "Visa Assistance", icon: FileText },
    { to: "/financial-assistance", label: "Financial Assistance", icon: Award },
  ];

  const mobileLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/destinations", label: "Destinations" },
    { to: "/blog", label: "Blog" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];


  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50"
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
              className="flex items-center space-x-2"
            >
              <img
                src="/Logo.png"
                alt="Flash Overseas Logo"
                className="h-auto w-28 sm:w-32 md:w-36 max-w-none object-contain"
                style={{ display: 'block', visibility: 'visible', opacity: 1 }}
                onError={(e) => {
                  console.error('Logo failed to load:', e);
                  const target = e.target as HTMLImageElement;
                  target.style.border = '2px solid red';
                  target.style.backgroundColor = 'yellow';
                  target.alt = 'LOGO ERROR';
                }}
                onLoad={() => {
                  console.log('Logo loaded successfully');
                }}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Home Link */}
              <Link
                to="/"
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/")
                    ? "text-primary-600"
                    : "text-gray-700 hover:text-primary-600"
                }`}
              >
                Home
                {/* Simple underline animation */}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                  isActive("/") ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>

              {/* About Link */}
              <Link
                to="/about"
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive("/about")
                    ? "text-primary-600"
                    : "text-gray-700 hover:text-primary-600"
                }`}
              >
                About
                {/* Simple underline animation */}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                  isActive("/about") ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                    location.pathname.startsWith('/test-preparation') || 
                    location.pathname.startsWith('/admission-guidance') ||
                    location.pathname.startsWith('/visa-assistance') ||
                    location.pathname.startsWith('/financial-assistance')
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    isServicesDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown Menu - No gap between button and dropdown */}
                {isServicesDropdownOpen && (
                  <div
                    ref={servicesDropdownRef}
                    className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50"
                    style={{ marginTop: '0px' }}
                  >
                    {servicesDropdown.map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                        <Link
                          key={index}
                          to={service.to}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                        >
                          <IconComponent className="w-5 h-5 text-primary-600" />
                          <span>{service.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              {mobileLinks.slice(2).map((link, i) => (
                <Link
                  key={i}
                  to={link.to}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.to)
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  {link.label}
                  {/* Simple underline animation */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                    isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}

              <Link
                to="/contact"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Free Consultation
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div 
            className={`md:hidden relative w-10 h-10 rounded-lg group transition-all duration-200 z-[60] hover:scale-105 ${
              isMenuOpen ? 'bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'
            }`}
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
              className="absolute inset-0 w-full h-full focus:outline-none rounded-lg"
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
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{ 
          backdropFilter: 'blur(0px)', 
          backgroundColor: 'rgba(255, 255, 255, 1)',
          transform: 'translateX(100%)'
        }}
      >
        {/* Links */}
        <div className="flex flex-col space-y-6 mt-16">
          {/* Home and About first */}
          {mobileLinks.filter(l => l.to === "/" || l.to === "/about").map((link, i) => (
            <Link
              key={`top-${i}`}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-xl font-medium py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive(link.to)
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-800 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Services Accordion after About */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setIsMobileServicesOpen((v) => !v)}
              className="w-full flex items-center justify-between text-xl font-medium py-3 px-4 text-gray-800 border-b border-gray-200"
              aria-expanded={isMobileServicesOpen}
              aria-controls="mobile-services"
            >
              <span>Services</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              id="mobile-services"
              ref={mobileServicesRef}
              style={{ height: 0, overflow: 'hidden', opacity: 0 }}
            >
              {servicesDropdown.map((service, i) => {
                const IconComponent = service.icon;
                return (
                  <Link
                    key={i}
                    to={service.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 text-lg py-3 px-6 rounded-xl transition-all duration-200 ${
                      isActive(service.to)
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 text-primary-600" />
                    <span>{service.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Remaining links after Services */}
          {mobileLinks.filter(l => l.to !== "/" && l.to !== "/about").map((link, i) => (
            <Link
              key={`rest-${i}`}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-xl font-medium py-3 px-4 rounded-xl transition-all duration-200 ${
                isActive(link.to)
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-800 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA inside overlay */}
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 w-full bg-primary-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg text-center"
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
