import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  Award,
  Users,
  Phone,
  Target
} from 'lucide-react';
import SEO from '../components/SEO';
import CurrencyConverter from '../components/CurrencyConverter';

gsap.registerPlugin(ScrollTrigger);

const AdmissionGuidance = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');
  const [exchangeRate, setExchangeRate] = useState(83.5);

  const formatCurrency = (inrAmount: string) => {
    if (currency === 'INR') {
      return `₹${inrAmount}`;
    } else {
      // Convert INR to USD using live exchange rate
      const amount = parseInt(inrAmount.replace(/,/g, ''));
      return `$${Math.round(amount / exchangeRate).toLocaleString()}`;
    }
  };

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
      title: 'University Selection',
      description: 'Expert guidance to choose the right university and program that matches your career goals and budget',
      duration: '1-2 months',
      success: '95% success',
      price: '₹10,000',
      features: [
        'Personalized university matching based on your profile',
        'Program comparison and analysis',
        'Admission requirements guidance',
        'Deadline management and tracking',
        'University ranking and reputation analysis',
        'Cost-benefit analysis for each option'
      ],
      process: [
        'Profile assessment and goal setting',
        'University research and shortlisting',
        'Program comparison and analysis',
        'Final recommendations and application strategy'
      ]
    },
    {
      title: 'Application Support',
      description: 'End-to-end application assistance to maximize your chances of admission',
      duration: '2-3 months',
      success: '98% success',
      price: '₹20,000',
      features: [
        'Complete application strategy planning',
        'Document preparation and verification',
        'Application form completion assistance',
        'Follow-up support and status tracking',
        'Interview preparation and guidance',
        'Waitlist management and appeals'
      ],
      process: [
        'Application timeline planning',
        'Document collection and verification',
        'Form completion and submission',
        'Follow-up and status tracking'
      ]
    },
    {
      title: 'Essay Writing',
      description: 'Professional essay and SOP writing services to make your application stand out',
      duration: '2-4 weeks',
      success: 'High quality',
      price: '₹8,000',
      features: [
        'Personalized content creation',
        'Multiple revisions and improvements',
        'Expert review and feedback',
        'Plagiarism check and originality guarantee',
        'Formatting and presentation',
        'Multiple essay types support'
      ],
      process: [
        'Brainstorming and outline creation',
        'First draft writing',
        'Review and revision process',
        'Final polish and submission'
      ]
    },
    {
      title: 'Interview Preparation',
      description: 'Comprehensive interview preparation for university admissions and scholarships',
      duration: '2-3 weeks',
      success: '95% success',
      price: '₹6,000',
      features: [
        'Mock interview sessions',
        'Common question preparation',
        'Body language and presentation training',
        'University-specific interview guidance',
        'Video interview preparation',
        'Confidence building techniques'
      ],
      process: [
        'Interview format analysis',
        'Mock interview sessions',
        'Feedback and improvement',
        'Final preparation and confidence building'
      ]
    },
    {
      title: 'Scholarship Applications',
      description: 'Expert assistance in finding and applying for scholarships and financial aid',
      duration: '1-2 months',
      success: 'High success',
      price: '₹8,000',
      features: [
        'Scholarship research and identification',
        'Application strategy and planning',
        'Essay writing for scholarships',
        'Deadline management',
        'Merit-based and need-based guidance',
        'Renewal and maintenance support'
      ],
      process: [
        'Scholarship research and matching',
        'Application preparation',
        'Essay writing and submission',
        'Follow-up and renewal support'
      ]
    },
    {
      title: 'Visa Documentation',
      description: 'Complete documentation support for student visa applications',
      duration: '2-4 weeks',
      success: '98% success',
      price: '₹5,000',
      features: [
        'Document checklist preparation',
        'Financial documentation support',
        'Academic transcript verification',
        'Visa application form assistance',
        'Embassy appointment scheduling',
        'Document translation services'
      ],
      process: [
        'Document requirement analysis',
        'Document collection and preparation',
        'Application form completion',
        'Submission and follow-up'
      ]
    }
  ];

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Admission Guidance Services | University Selection, Application Support, Essay Writing | Flash Overseas"
        description="Expert admission guidance services for university applications. University selection, application support, essay writing, interview preparation, scholarship applications. 98% success rate. Book free consultation."
        keywords="admission guidance, university selection, application support, essay writing, SOP writing, interview preparation, scholarship applications, university applications, study abroad applications, admission consulting"
        url="https://flashoverseas.com/admission-guidance"
        pageType="services"
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Currency Converter */}
        <div className="absolute top-8 right-8 z-10">
          <CurrencyConverter 
            currentCurrency={currency} 
            onCurrencyChange={setCurrency}
            onRateChange={setExchangeRate}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
                Admission <span className="font-semibold text-primary-600">Guidance</span>
              </h1>
              <p className="hero-description text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Navigate your university application journey with expert guidance. From university selection to essay writing, we ensure your success at every step.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Award className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">98% Success Rate</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Expert Counselors</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Target className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Personalized Approach</span>
                </div>
              </div>

              <a href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 text-btn hover:shadow-lg hover:shadow-primary-600/25">
                Get Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-slate-100 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {services.slice(0, 4).map((service) => (
                    <div key={service.title} className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <GraduationCap className="w-6 h-6 text-primary-600" />
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
              Comprehensive admission guidance services designed to maximize your chances of success.
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
                    <GraduationCap className="w-6 h-6 text-primary-600" />
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

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Our <span className="font-semibold text-primary-600">Process</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A systematic approach to ensure your successful university admission.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Profile Assessment', description: 'Comprehensive evaluation of your academic background, goals, and preferences.' },
              { step: '02', title: 'University Research', description: 'Extensive research and shortlisting of universities that match your profile.' },
              { step: '03', title: 'Application Strategy', description: 'Development of a personalized application strategy and timeline.' },
              { step: '04', title: 'Execution & Support', description: 'Complete execution with ongoing support throughout the application process.' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to <span className="font-semibold text-primary-600">Start Your Application?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Let our expert counselors guide you through your university application journey. Book your free consultation today.
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

export default AdmissionGuidance;
