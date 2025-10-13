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
    <div>
      <Hero />

      {/* Quick Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el!)}
                className="text-center p-8 bg-primary-50 rounded-xl opacity-0"
              >
                <div className="text-primary-600 flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-secondary-900 mb-2">
                  <span className="counter">0</span>
                </div>
                <div className="text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services Section */}
      <section className="p-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-secondary-600">
              Comprehensive support for your overseas journey
            </p>
          </div>
       

          <div className="grid md:grid-cols-2 gap-8">
            {quickServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-secondary-600 mb-4">{service.description}</p>
                <a
                  href={service.link}
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
            {/* More Services Icon Button */}
            <div className="flex justify-center items-center  w-full">
              <a
                href="/services"
                className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full shadow hover:bg-primary-700 transition-colors"
                title="See more services"
              >
                <ArrowRight className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 bg-white">
        <WhyChooseUs/>
      </section> 
      
      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FormSection />
        </div>
      </section>

      {/* Steps Section */}
      <section ref={stepsSectionRef} className="pt-0 pb-16 opacity-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left column: text */}
            <div>
              <h2 className="text-3xl font-medium text-black mb-4">
                Your dream future in Abroad is <br /> just 4 steps away
              </h2>
              <p className="text-gray-500 mb-8">
                Here's how we make it simple for you
              </p>
              <button className="px-6 py-2 bg-primary-600 hover:scale-95 transition-transform duration-200 text-white rounded">
                Schedule a Call
              </button>
            </div>

            {/* Right column: CardSlider */}
            <div>
              <CardSlider />
            </div>

          </div>
        </div>
      </section>
      <section>
        <Faq/>
      </section>
    </div>
  );
};

export default Home;
