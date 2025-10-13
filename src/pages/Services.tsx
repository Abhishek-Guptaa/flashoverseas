import React from 'react';
import { GraduationCap, FileText, Globe, Users, BookOpen, Award, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "University Selection",
      description: "Expert guidance to choose the right university and program that matches your career goals and budget.",
      features: [
        "Personalized university matching",
        "Program comparison and analysis",
        "Admission requirements guidance",
        "Deadline management"
      ]
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Application Assistance",
      description: "Complete support with application forms, essays, and documentation to maximize your chances.",
      features: [
        "Application form completion",
        "Statement of Purpose writing",
        "Letter of Recommendation guidance",
        "Document verification"
      ]
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Visa Guidance",
      description: "Step-by-step visa application support with interview preparation and documentation review.",
      features: [
        "Visa application assistance",
        "Interview preparation",
        "Document checklist",
        "Embassy liaison support"
      ]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Career Counseling",
      description: "Personalized career guidance to help you choose the right path for your future success.",
      features: [
        "Career assessment tests",
        "Industry trend analysis",
        "Job market insights",
        "Professional networking guidance"
      ]
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Test Preparation",
      description: "Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, and other standardized tests.",
      features: [
        "IELTS/TOEFL preparation",
        "GRE/GMAT coaching",
        "Mock tests and practice",
        "Score improvement strategies"
      ]
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Scholarship Assistance",
      description: "Help you find and apply for scholarships and financial aid opportunities.",
      features: [
        "Scholarship research",
        "Application assistance",
        "Financial aid guidance",
        "Merit-based opportunities"
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Comprehensive support throughout your study abroad journey, from initial consultation to successful enrollment and beyond.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-secondary-100"
              >
                <div className="text-primary-600 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">{service.title}</h3>
                <p className="text-secondary-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-secondary-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Process</h2>
            <p className="text-xl text-secondary-600">Simple steps to achieve your study abroad dreams</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Free initial consultation to understand your goals" },
              { step: "02", title: "Planning", desc: "Create a personalized roadmap for your journey" },
              { step: "03", title: "Application", desc: "Complete application and documentation support" },
              { step: "04", title: "Success", desc: "Visa approval and pre-departure guidance" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{item.title}</h3>
                <p className="text-secondary-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;