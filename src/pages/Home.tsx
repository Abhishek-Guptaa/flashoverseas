import React, { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import { ArrowRight, Users, Award, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardSlider from "../hooks/CardSlider";
import FormSection from "../components/FormSection";
import Faq from "../components/Faq";
import WhyChooseUs from "../components/WhyChooseUs";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  icon: JSX.Element;
  number: number;
  label: string;
}

const Home: React.FC = () => {
  const statsRef = useRef<HTMLDivElement[]>([]);
  const stepsSectionRef = useRef<HTMLDivElement>(null); // 👈 ref for steps section

  const stats: Stat[] = [
    { icon: <Users className="w-8 h-8" />, number: 15000, label: "Students Placed" },
    { icon: <Award className="w-8 h-8" />, number: 98, label: "Success Rate" },
    { icon: <Globe className="w-8 h-8" />, number: 25, label: "Countries" },
  ];

  const quickServices = [
    {
      title: "University Selection",
      description: "Find the perfect university that matches your goals and budget.",
      link: "/services",
    },
    {
      title: "Visa Assistance",
      description: "Complete visa guidance with high success rates.",
      link: "/services",
    },
    {
      title: "Test Preparation",
      description: "IELTS, TOEFL, GRE, GMAT coaching and preparation.",
      link: "/services",
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
        </div>
      </section>

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
