import React from 'react';
import { GraduationCap, FileText, Globe, Users, BookOpen, Award } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "University Selection",
      description: "Expert guidance to choose the right university and program that matches your career goals and budget."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Application Assistance",
      description: "Complete support with application forms, essays, and documentation to maximize your chances."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Visa Guidance",
      description: "Step-by-step visa application support with interview preparation and documentation review."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Career Counseling",
      description: "Personalized career guidance to help you choose the right path for your future success."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Test Preparation",
      description: "Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, and other standardized tests."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Scholarship Assistance",
      description: "Help you find and apply for scholarships and financial aid opportunities."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support throughout your study abroad journey, from initial consultation to successful enrollment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group hover:border-blue-200"
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;