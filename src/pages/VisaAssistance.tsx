import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  Award,
  Users,
  Shield,
  Phone,
  Target,
  Globe
} from 'lucide-react';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const VisaAssistance = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);


  const services = [
    {
      title: 'Student Visa Application',
      description: 'Complete assistance for student visa applications to all major study destinations',
      duration: '2-4 weeks',
      success: '98% success',
      price: '₹15,000',
      features: [
        'Document preparation and verification',
        'Application form completion',
        'Embassy appointment scheduling',
        'Interview preparation and guidance',
        'Follow-up and status tracking',
        'Post-visa support and guidance'
      ],
      countries: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Singapore']
    },
    {
      title: 'Work Visa Guidance',
      description: 'Expert guidance for post-study work visas and employment opportunities',
      duration: '1-2 months',
      success: '95% success',
      price: '₹12,000',
      features: [
        'Work visa eligibility assessment',
        'Job search strategy and support',
        'Employer sponsorship guidance',
        'Documentation for work permits',
        'Immigration pathway planning',
        'Renewal and extension support'
      ],
      countries: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands']
    },
    {
      title: 'Family Visa Support',
      description: 'Comprehensive support for dependent and family visa applications',
      duration: '3-6 weeks',
      success: '96% success',
      price: '₹10,000',
      features: [
        'Dependent visa applications',
        'Family reunification support',
        'Documentation for family members',
        'Financial proof preparation',
        'Interview preparation for families',
        'Long-term family planning'
      ],
      countries: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Singapore']
    },
    {
      title: 'Visa Renewal Services',
      description: 'Professional assistance for visa renewals and extensions',
      duration: '2-3 weeks',
      success: '99% success',
      price: '₹8,000',
      features: [
        'Renewal application preparation',
        'Documentation updates',
        'Status change applications',
        'Extension request support',
        'Compliance monitoring',
        'Emergency renewal assistance'
      ],
      countries: ['All Countries']
    },
    {
      title: 'Visa Rejection Appeals',
      description: 'Expert assistance for visa rejection appeals and re-applications',
      duration: '4-6 weeks',
      success: '85% success',
      price: '₹20,000',
      features: [
        'Rejection analysis and review',
        'Appeal letter preparation',
        'Additional documentation support',
        'Re-application strategy',
        'Legal consultation if needed',
        'Success rate improvement'
      ],
      countries: ['All Countries']
    },
    {
      title: 'Documentation Services',
      description: 'Complete documentation support for all visa applications',
      duration: '1-2 weeks',
      success: '100% accuracy',
      price: '₹5,000',
      features: [
        'Document verification and authentication',
        'Translation services',
        'Notarization and apostille',
        'Financial document preparation',
        'Academic transcript verification',
        'Medical examination coordination'
      ],
      countries: ['All Countries']
    }
  ];

  const countries = [
    { name: 'United States', flag: '🇺🇸', visa: 'F-1 Student Visa' },
    { name: 'United Kingdom', flag: '🇬🇧', visa: 'Student Route Visa' },
    { name: 'Canada', flag: '🇨🇦', visa: 'Study Permit' },
    { name: 'Australia', flag: '🇦🇺', visa: 'Student Visa (Subclass 500)' },
    { name: 'Germany', flag: '🇩🇪', visa: 'Student Visa' },
    { name: 'Singapore', flag: '🇸🇬', visa: 'Student Pass' },
    { name: 'Ireland', flag: '🇮🇪', visa: 'Student Visa' },
    { name: 'Netherlands', flag: '🇳🇱', visa: 'Student Visa' }
  ];

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Visa Assistance Services | Student Visa, Work Visa, Family Visa Support | Flash Overseas"
        description="Expert visa assistance services for students. Student visa applications, work visa guidance, family visa support, renewals, appeals. 98% success rate. Complete documentation support. Book free consultation."
        keywords="visa assistance, student visa, work visa, family visa, visa applications, visa renewal, visa appeals, study abroad visa, immigration support, visa documentation, visa consulting"
        url="https://flashoverseas.com/visa-assistance"
        pageType="services"
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
                Visa <span className="font-semibold text-primary-600">Assistance</span>
              </h1>
              <p className="hero-description text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Navigate the complex visa process with confidence. Our expert team ensures your visa application success with comprehensive support and guidance.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Award className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">98% Success Rate</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Expert Guidance</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Globe className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">All Countries</span>
                </div>
              </div>

              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 text-btn hover:shadow-lg hover:shadow-primary-600/25">
                Get Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-slate-100 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {services.slice(0, 4).map((service) => (
                    <div key={service.title} className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-1">{service.title}</h3>
                      <p className="text-xs text-slate-600">{service.success}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Our <span className="font-semibold text-primary-600">Services</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive visa assistance services for all your immigration needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-primary-200 group h-[600px] flex flex-col"
              >
                {/* Header Section - Fixed Height */}
                <div className="flex items-start justify-between mb-4 h-16">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{service.price}</div>
                    <div className="text-sm text-slate-500">Starting from</div>
                  </div>
                </div>
                
                {/* Title and Description - Fixed Height */}
                <div className="mb-6 h-32 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed line-clamp-3 text-sm">
                    {service.description}
                  </p>
                </div>
                
                {/* Duration and Success - Fixed Height */}
                <div className="space-y-3 mb-6 h-16 flex flex-col justify-center">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-medium text-slate-900">{service.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Success Rate:</span>
                    <span className="font-medium text-slate-900">{service.success}</span>
                  </div>
                </div>
                
                {/* Features List - Fixed Height with Scroll */}
                <div className="space-y-2 mb-6 flex-1 overflow-hidden">
                  <div className="h-32 overflow-y-auto">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                        <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Button - Fixed at Bottom */}
                <button className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium group-hover:scale-105 transform duration-300 mt-auto">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Visa Support for <span className="font-semibold text-primary-600">All Countries</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We provide visa assistance for all major study destinations worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary-200">
                <div className="text-4xl mb-4">{country.flag}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{country.name}</h3>
                <p className="text-sm text-slate-600">{country.visa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to <span className="font-semibold text-primary-600">Apply for Your Visa?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Let our visa experts guide you through the application process. Book your free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 text-btn hover:shadow-lg hover:shadow-primary-600/25"
            >
              Get Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="tel:+918080030349"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-btn"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisaAssistance;
