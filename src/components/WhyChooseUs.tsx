import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, Users, Globe, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <CheckCircle className="w-10 h-10 text-primary-600" />,
      title: "Expert Guidance",
      text: "Our experienced counselors provide personalized support for your study abroad journey.",
    },
    {
      icon: <Users className="w-10 h-10 text-primary-600" />,
      title: "Student-Centered",
      text: "We prioritize your goals and ensure smooth processing at every step.",
    },
    {
      icon: <Globe className="w-10 h-10 text-primary-600" />,
      title: "Global Reach",
      text: "Access top universities across USA, UK, Canada, Australia, Europe, and Asia.",
    },
    {
      icon: <Award className="w-10 h-10 text-primary-600" />,
      title: "Proven Success",
      text: "Hundreds of successful admissions backed by student testimonials.",
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".feature-card"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Why Choose <span className="text-primary-600">Us</span>?
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          We make your overseas education journey smooth, simple, and stress-free with our expert guidance.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="feature-card bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
