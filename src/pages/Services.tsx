import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  ArrowRight, 
  Clock,
  Shield,
  Phone,
  ChevronRight,
  Home
} from 'lucide-react';
import SEO from '../components/SEO';
import CurrencyConverter from '../components/CurrencyConverter';
import Chatbot from '../components/Chatbot';
import FadeInSection from '../components/FadeInSection';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
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

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Student Services', href: '/services' },
    { name: 'Test Preparation', href: '/services#test-preparation' }
  ];

  const serviceCategories = [
    {
      id: 'test-preparation',
      title: 'Test Preparation',
      description: 'Comprehensive coaching for all standardized tests',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      link: '/test-preparation',
      services: [
        {
          title: 'IELTS',
          description: 'International English Language Testing System preparation',
          duration: '2-3 months',
          score: 'Band 7+',
          features: ['Expert instructors', 'Mock tests', 'Score guarantee', 'Speaking practice'],
          price: '15,000'
        },
        {
          title: 'TOEFL',
          description: 'Test of English as a Foreign Language coaching',
          duration: '2-3 months', 
          score: '100+',
          features: ['Computer-based training', 'Practice tests', 'Speaking practice', 'Quick results'],
          price: '15,000'
        },
        {
          title: 'GRE',
          description: 'Graduate Record Examination preparation',
          duration: '3-4 months',
          score: '320+',
          features: ['Quantitative reasoning', 'Verbal reasoning', 'Analytical writing', 'Practice tests'],
          price: '25,000'
        },
        {
          title: 'GMAT',
          description: 'Graduate Management Admission Test coaching',
          duration: '3-4 months',
          score: '700+',
          features: ['Integrated reasoning', 'Quantitative section', 'Verbal section', 'Mock exams'],
          price: '25,000'
        },
        {
          title: 'PTE',
          description: 'Pearson Test of English preparation',
          duration: '2-3 months',
          score: '65+',
          features: ['Computer-based training', 'Speaking practice', 'Quick results', 'Score guarantee'],
          price: '12,000'
        },
        {
          title: 'SAT',
          description: 'Scholastic Assessment Test preparation',
          duration: '2-3 months',
          score: '1400+',
          features: ['Math section', 'Evidence-based reading', 'Writing section', 'Practice tests'],
          price: '18,000'
        }
      ]
    },
    {
      id: 'admission-guidance',
      title: 'Admission Guidance',
      description: 'Complete university application support',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-green-50 border-green-200 text-green-700',
      link: '/admission-guidance',
      services: [
        {
          title: 'University Selection',
          description: 'Expert guidance to choose the right university and program',
          duration: '1-2 months',
          score: '95% success',
          features: ['Personalized matching', 'Program analysis', 'Requirements guidance', 'Deadline management'],
          price: '10,000'
        },
        {
          title: 'Application Support',
          description: 'End-to-end application assistance',
          duration: '2-3 months',
          score: '98% success',
          features: ['Strategy planning', 'Document preparation', 'Follow-up support', 'Status tracking'],
          price: '20,000'
        },
        {
          title: 'Essay Writing',
          description: 'Professional essay and SOP writing',
          duration: '2-4 weeks',
          score: 'High quality',
          features: ['Personalized content', 'Multiple revisions', 'Expert review', 'Plagiarism check'],
          price: '8,000'
        }
      ]
    },
    {
      id: 'visa-assistance',
      title: 'Visa Assistance',
      description: 'Complete visa guidance and support',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      link: '/visa-assistance',
      services: [
        {
          title: 'Student Visa',
          description: 'F-1, J-1, and other student visa applications',
          duration: '1-2 months',
          score: '98% success',
          features: ['Document preparation', 'Interview training', 'Status tracking', 'Embassy liaison'],
          price: '15,000'
        },
        {
          title: 'Work Visa',
          description: 'H-1B, L-1, and other work visa support',
          duration: '2-3 months',
          score: '95% success',
          features: ['Employer liaison', 'Documentation', 'Compliance support', 'Renewal assistance'],
          price: '25,000'
        }
      ]
    },
    {
      id: 'financial-assistance',
      title: 'Financial Assistance',
      description: 'Scholarship and funding support',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-orange-50 border-orange-200 text-orange-700',
      link: '/financial-assistance',
      services: [
        {
          title: 'Scholarship Search',
          description: 'Identify and apply for scholarships',
          duration: '1-2 months',
          score: 'High success',
          features: ['Research assistance', 'Application support', 'Deadline management', 'Essay writing'],
          price: '8,000'
        },
        {
          title: 'Education Loans',
          description: 'Student loan guidance and support',
          duration: '2-4 weeks',
          score: 'Quick approval',
          features: ['Bank liaison', 'Documentation', 'Interest optimization', 'Repayment planning'],
          price: '5,000'
        }
      ]
    }
  ];


  return (
    <div className="overflow-hidden">
      <SEO 
        title="Study Abroad Services in Vizag | University Selection, Visa Assistance, Test Preparation | Flash Overseas"
        description="Comprehensive study abroad services in Visakhapatnam (Vizag). University selection, visa assistance, IELTS/TOEFL coaching, GRE/GMAT preparation, application guidance, scholarship assistance. Expert consultants for USA, UK, Canada, Australia, Germany, Singapore."
        keywords="study abroad services vizag, university selection vizag, visa assistance vizag, IELTS coaching vizag, TOEFL coaching vizag, GRE coaching vizag, GMAT coaching vizag, study abroad test preparation vizag, application guidance vizag, scholarship assistance vizag, study abroad consultants services, overseas education services, international education services, study abroad guidance services, university admission services, study abroad preparation services, test preparation services vizag, study abroad application services, study abroad visa services, study abroad counseling services"
        url="https://flashoverseas.com/services"
        pageType="services"
      />
      
      {/* Hero Section */}
      <FadeInSection>
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
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <Home className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <a 
                  href={crumb.href} 
                  className="hover:text-primary-600 transition-colors"
                >
                  {crumb.name}
                </a>
              </React.Fragment>
            ))}
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
                Student <span className="font-semibold">Services</span>
          </h1>
              <p className="hero-description text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Comprehensive study abroad services designed to help you achieve your international education dreams. From test preparation to visa assistance, we're your trusted partner.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Flexible Schedules</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Award className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">98% Success Rate</span>
        </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Expert Counselors</span>
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
                  {serviceCategories.slice(0, 4).map((category) => (
                    <a
                      key={category.id}
                      href={category.link}
                      className="group text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                    </div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">{category.title}</h3>
                      <p className="text-xs text-slate-600">{category.services.length} Services</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </FadeInSection>

      {/* Service Categories Navigation */}
      <FadeInSection>
        <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category) => (
              <a
                key={category.id}
                href={category.link}
                className="group flex items-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-300 bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:text-primary-600 hover:shadow-lg"
              >
                {category.icon}
                <span className="font-medium group-hover:text-primary-600">{category.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </div>
        </section>
      </FadeInSection>

      {/* Process Section */}
      <FadeInSection>
        <section ref={processRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              4 Steps to Your <span className="font-semibold">Dream Destination</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our proven process ensures your success at every step of your study abroad journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'Free initial consultation to understand your goals and requirements.' },
              { step: '02', title: 'Planning', description: 'Personalized study plan and timeline based on your profile and preferences.' },
              { step: '03', title: 'Preparation', description: 'Comprehensive preparation including tests, applications, and documentation.' },
              { step: '04', title: 'Success', description: 'Achieve your dream of studying at your preferred university abroad.' }
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
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection>
        <section ref={ctaRef} className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to <span className="font-semibold">Start Your Journey?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their dreams with our expert guidance. Get started with a free consultation today.
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
      </FadeInSection>
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Services;