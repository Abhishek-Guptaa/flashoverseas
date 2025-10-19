import { useEffect, useRef } from "react";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Why Choose <span className="font-bold text-primary-600">Us</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Expert guidance for your overseas education journey
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="feature-card text-center"
            >
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="text-lg font-normal text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
