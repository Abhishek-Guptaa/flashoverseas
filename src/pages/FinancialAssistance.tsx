import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  Users,
  Shield,
  Phone,
  Target,
  DollarSign
} from 'lucide-react';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const FinancialAssistance = () => {
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
      title: 'Scholarship Search',
      description: 'Comprehensive scholarship research and application support to maximize your funding opportunities',
      duration: '2-4 weeks',
      success: 'High success',
      price: '₹8,000',
      features: [
        'Extensive scholarship database access',
        'Eligibility matching and filtering',
        'Application strategy development',
        'Essay writing and review',
        'Deadline management and tracking',
        'Follow-up and renewal support'
      ],
      types: ['Merit-based', 'Need-based', 'Subject-specific', 'Country-specific']
    },
    {
      title: 'Education Loan Guidance',
      description: 'Expert assistance with education loan applications and financial planning for your studies',
      duration: '1-2 months',
      success: '95% success',
      price: '₹10,000',
      features: [
        'Bank and lender comparison',
        'Loan eligibility assessment',
        'Documentation support',
        'Interest rate negotiation',
        'Co-signer guidance',
        'Repayment planning'
      ],
      types: ['Government loans', 'Private bank loans', 'International loans', 'Secured loans']
    },
    {
      title: 'Financial Planning',
      description: 'Comprehensive financial planning and budgeting for your entire study abroad journey',
      duration: '1-2 weeks',
      success: 'Personalized',
      price: '₹5,000',
      features: [
        'Complete cost analysis',
        'Budget planning and management',
        'Currency exchange guidance',
        'Living expense planning',
        'Emergency fund planning',
        'Investment advice for students'
      ],
      types: ['Budget planning', 'Cost analysis', 'Currency guidance', 'Emergency planning']
    },
    {
      title: 'Grant Applications',
      description: 'Professional assistance with research grants and funding applications',
      duration: '3-6 weeks',
      success: '90% success',
      price: '₹12,000',
      features: [
        'Grant research and identification',
        'Proposal writing and development',
        'Application form completion',
        'Budget justification support',
        'Review and revision process',
        'Submission and follow-up'
      ],
      types: ['Research grants', 'Travel grants', 'Conference grants', 'Project grants']
    },
    {
      title: 'Work-Study Programs',
      description: 'Guidance on work-study opportunities and part-time employment options',
      duration: '2-3 weeks',
      success: 'High placement',
      price: '₹6,000',
      features: [
        'Work-study program research',
        'Application assistance',
        'Resume and cover letter writing',
        'Interview preparation',
        'Work permit guidance',
        'Career development support'
      ],
      types: ['On-campus jobs', 'Off-campus work', 'Internships', 'Co-op programs']
    },
    {
      title: 'Crowdfunding Support',
      description: 'Assistance with crowdfunding campaigns and alternative funding strategies',
      duration: '4-8 weeks',
      success: 'Variable',
      price: '₹8,000',
      features: [
        'Campaign strategy development',
        'Content creation and storytelling',
        'Platform selection and setup',
        'Marketing and promotion',
        'Donor engagement strategies',
        'Campaign management and updates'
      ],
      types: ['Crowdfunding', 'Peer-to-peer lending', 'Community fundraising', 'Social media campaigns']
    }
  ];

  const loanPartners = [
    { name: 'State Bank of India', logo: 'SBI', rate: '8.5%' },
    { name: 'HDFC Bank', logo: 'HDFC', rate: '9.2%' },
    { name: 'ICICI Bank', logo: 'ICICI', rate: '9.0%' },
    { name: 'Axis Bank', logo: 'AXIS', rate: '8.8%' },
    { name: 'Bank of Baroda', logo: 'BOB', rate: '8.3%' },
    { name: 'Canara Bank', logo: 'CANARA', rate: '8.7%' }
  ];

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Financial Assistance Services | Scholarships, Education Loans, Financial Planning | Flash Overseas"
        description="Expert financial assistance for study abroad. Scholarship search, education loan guidance, financial planning, grant applications, work-study programs. Maximize your funding opportunities. Book free consultation."
        keywords="financial assistance, scholarships, education loans, financial planning, study abroad funding, grant applications, work-study programs, crowdfunding, education finance, study abroad loans"
        url="https://flashoverseas.com/financial-assistance"
        pageType="services"
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
                Financial <span className="font-semibold text-primary-600">Assistance</span>
              </h1>
              <p className="hero-description text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Make your study abroad dreams affordable with our comprehensive financial assistance services. From scholarships to loans, we help you secure the best funding options.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 text-slate-600">
                  <DollarSign className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">₹50L+ Secured</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Award className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">500+ Scholarships</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Expert Guidance</span>
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
                        <Award className="w-6 h-6 text-primary-600" />
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
              Comprehensive financial assistance services to make your study abroad journey affordable.
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
                    <Award className="w-6 h-6 text-primary-600" />
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

      {/* Loan Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Our <span className="font-semibold">Loan Partners</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We work with leading banks and financial institutions to secure the best education loan rates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanPartners.map((partner, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary-200">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-primary-600">{partner.logo}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{partner.name}</h3>
                <p className="text-sm text-slate-600">Interest Rate: <span className="font-semibold text-primary-600">{partner.rate}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to <span className="font-semibold">Secure Your Funding?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Let our financial experts help you find the best funding options for your study abroad journey. Book your free consultation today.
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

export default FinancialAssistance;
