import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, FileText, Globe, Users, BookOpen, Award, ArrowRight } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial states
    gsap.set('.service-card', { y: 30, opacity: 0 });

    // Services cards animation
    if (servicesRef.current) {
      gsap.to('.service-card', {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "University Selection",
      description: "Expert guidance to choose the right university and program that matches your career goals and budget.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Application Assistance",
      description: "Complete support with application forms, essays, and documentation to maximize your chances.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Visa Guidance",
      description: "Step-by-step visa application support with interview preparation and documentation review.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Career Counseling",
      description: "Personalized career guidance to help you choose the right path for your future success.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Test Preparation",
      description: "Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, and other standardized tests.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Scholarship Assistance",
      description: "Help you find and apply for scholarships and financial aid opportunities.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section ref={servicesRef} id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 lg:text-h2-xl text-slate-900 mb-6">Our Services</h2>
          <p className="text-body-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive support throughout your study abroad journey, from initial consultation to successful enrollment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-primary-200 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-h4 text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-small text-slate-600 mb-6">
                {service.description}
              </p>
              <button className="w-full bg-slate-900 hover:bg-primary-600 text-white py-3 rounded-xl text-btn transition-all duration-300 flex items-center justify-center group/btn hover:shadow-lg hover:shadow-primary-600/25">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;