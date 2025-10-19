import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import { ArrowRight, Users, Award, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardSlider from "../hooks/CardSlider";
import FormSection from "../components/FormSection";
import Faq from "../components/Faq";
import WhyChooseUs from "../components/WhyChooseUs";
import SEO from "../components/SEO";
import Chatbot from "../components/Chatbot";
import FadeInSection from "../components/FadeInSection";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  icon: JSX.Element;
  number: number;
  label: string;
}

const Home: React.FC = () => {
  const statsRef = useRef<HTMLDivElement[]>([]);
  const stepsSectionRef = useRef<HTMLDivElement>(null); // 👈 ref for steps section
  const servicesSectionRef = useRef<HTMLDivElement>(null); // 👈 ref for services section

  const stats: Stat[] = [
    { icon: <Users className="w-8 h-8" />, number: 15000, label: "Students Placed" },
    { icon: <Award className="w-8 h-8" />, number: 98, label: "Success Rate" },
    { icon: <Globe className="w-8 h-8" />, number: 25, label: "Countries" },
  ];

  const quickServices = [
    {
      title: "University Selection",
      description: "Find the perfect university that matches your goals and budget.",
      link: "/admission-guidance",
    },
    {
      title: "Visa Assistance",
      description: "Complete visa guidance with high success rates.",
      link: "/visa-assistance",
    },
    {
      title: "Test Preparation",
      description: "IELTS, TOEFL, GRE, GMAT coaching and preparation.",
      link: "/test-preparation",
    },
  ];

  // Animate stats with performance optimization
  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((el, index) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 80%",
              toggleActions: "play none reverse none",
            },
          }
        );

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: stats[index].number,
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            const counterEl = el.querySelector<HTMLSpanElement>(".counter");
            if (!counterEl) return;
            const current = Math.floor(counterObj.val);
            counterEl.textContent =
              stats[index].label === "Success Rate" ? `${current}%` : current.toLocaleString();
          },
        });
      });
    });

    return () => ctx.revert();
  }, [stats]);

  // Animate entire steps section with performance optimization
  useEffect(() => {
    if (!stepsSectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepsSectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Animate services section with stacking effect
  useEffect(() => {
    if (!servicesSectionRef.current) return;

    const ctx = gsap.context(() => {
      const serviceCards = servicesSectionRef.current?.querySelectorAll('.service-card');
      if (!serviceCards) return;

      // Set initial state for all cards
      gsap.set(serviceCards, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: 15
      });

      // Create stacking animation
      serviceCards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: servicesSectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Add hover animation
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
          paused: true,
          onComplete: () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white">
      <Hero />


      {/* Quick Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el!)}
                className="text-center opacity-0"
              >
                <div className="text-gray-900 flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl font-light text-gray-900 mb-2">
                  <span className="counter">0</span>
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-500">
              Everything you need for studying abroad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <h3 className="text-xl font-normal text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">{service.description}</p>
                <a
                  href={service.link}
                  className="text-gray-900 font-medium flex items-center space-x-2 text-sm group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* Core Services Section */}
      <FadeInSection>
        <section ref={servicesSectionRef} className="py-20 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <FadeInSection delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-light text-slate-900 mb-4">
                  Our <span className="font-semibold">Core Services</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Comprehensive support for your overseas journey
                </p>
              </div>
            </FadeInSection>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {quickServices.map((service, index) => (
              <FadeInSection key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="service-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 hover:border-primary-200 group"
                >
                <div className="relative">
                  {/* Icon background */}
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Service number */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {index + 1}
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <motion.a
                    href={service.link}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-2 transition-all duration-300"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          </div>
        </section>
      </FadeInSection>

      {/* Why choose us */}
      <section className="py-20 bg-white">
        <WhyChooseUs/>
      </section>

      {/* Form Section */}
      <FormSection />

      {/* Steps Section */}
      <section ref={stepsSectionRef} className="py-20 bg-white opacity-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Your journey in 4 simple steps
              </h2>
              <p className="text-gray-500 mb-8 text-lg">
                We make studying abroad simple and stress-free
              </p>
              <button className="px-8 py-3.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 font-medium">
                Get Started
              </button>
            </div>

            <div>
              <CardSlider />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <Faq/>
      </section>
    </div>
  );
};

export default Home;
