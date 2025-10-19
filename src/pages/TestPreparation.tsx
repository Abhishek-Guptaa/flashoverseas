import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  BookOpen, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  Award,
  Users,
  Phone
} from 'lucide-react';
import SEO from '../components/SEO';
import CurrencyConverter from '../components/CurrencyConverter';

gsap.registerPlugin(ScrollTrigger);

const TestPreparation = () => {
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


  const tests = [
    {
      title: 'IELTS',
      fullName: 'International English Language Testing System',
      description: 'Comprehensive preparation for the world\'s most popular English language test',
      duration: '2-3 months',
      score: 'Band 7+',
      price: '15,000',
      features: [
        'Expert instructors with 10+ years experience',
        'Mock tests and practice sessions',
        'Score improvement guarantee',
        'Speaking practice with native speakers',
        'Writing task evaluation',
        'Listening and reading strategies'
      ],
      format: 'Paper-based & Computer-delivered',
      sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
      validity: '2 years'
    },
    {
      title: 'TOEFL',
      fullName: 'Test of English as a Foreign Language',
      description: 'Computer-based English proficiency test for academic purposes',
      duration: '2-3 months',
      score: '100+',
      price: '15,000',
      features: [
        'Computer-based training',
        'Practice tests and simulations',
        'Speaking practice sessions',
        'Quick results (6 days)',
        'Integrated skills training',
        'Test-taking strategies'
      ],
      format: 'Internet-based Test (iBT)',
      sections: ['Reading', 'Listening', 'Speaking', 'Writing'],
      validity: '2 years'
    },
    {
      title: 'GRE',
      fullName: 'Graduate Record Examination',
      description: 'Standardized test for graduate school admissions worldwide',
      duration: '3-4 months',
      score: '320+',
      price: '25,000',
      features: [
        'Quantitative reasoning mastery',
        'Verbal reasoning strategies',
        'Analytical writing skills',
        'Practice tests and simulations',
        'Score improvement techniques',
        'Subject-specific preparation'
      ],
      format: 'Computer-based Test',
      sections: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
      validity: '5 years'
    },
    {
      title: 'GMAT',
      fullName: 'Graduate Management Admission Test',
      description: 'Computer-adaptive test for business school admissions',
      duration: '3-4 months',
      score: '700+',
      price: '25,000',
      features: [
        'Integrated reasoning skills',
        'Quantitative section mastery',
        'Verbal section strategies',
        'Mock exams and practice',
        'Time management techniques',
        'Business school preparation'
      ],
      format: 'Computer-adaptive Test',
      sections: ['Analytical Writing', 'Integrated Reasoning', 'Quantitative', 'Verbal'],
      validity: '5 years'
    },
    {
      title: 'PTE',
      fullName: 'Pearson Test of English',
      description: 'Computer-based English language test with quick results',
      duration: '2-3 months',
      score: '65+',
      price: '12,000',
      features: [
        'Computer-based training',
        'Speaking practice sessions',
        'Quick results (2-5 days)',
        'Score guarantee',
        'AI-powered evaluation',
        'Flexible test dates'
      ],
      format: 'Computer-based Test',
      sections: ['Speaking & Writing', 'Reading', 'Listening'],
      validity: '2 years'
    },
    {
      title: 'SAT',
      fullName: 'Scholastic Assessment Test',
      description: 'Standardized test for undergraduate admissions in the US',
      duration: '2-3 months',
      score: '1400+',
      price: '18,000',
      features: [
        'Math section mastery',
        'Evidence-based reading',
        'Writing and language skills',
        'Practice tests and drills',
        'Test-taking strategies',
        'College preparation guidance'
      ],
      format: 'Paper-based & Digital',
      sections: ['Math', 'Evidence-Based Reading', 'Writing and Language'],
      validity: 'No expiration'
    }
  ];

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Test Preparation Services | IELTS, TOEFL, GRE, GMAT, PTE, SAT Coaching | Flash Overseas"
        description="Expert test preparation services for IELTS, TOEFL, GRE, GMAT, PTE, SAT. Comprehensive coaching with 98% success rate. Flexible schedules, mock tests, and score guarantees. Book your free consultation today."
        keywords="test preparation, IELTS coaching, TOEFL coaching, GRE coaching, GMAT coaching, PTE coaching, SAT coaching, English test preparation, study abroad test prep, test coaching vizag, test preparation hyderabad"
        url="https://flashoverseas.com/test-preparation"
        pageType="test-preparation"
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
                Test <span className="font-semibold">Preparation</span>
              </h1>
              <p className="hero-description text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Master your standardized tests with our expert coaching. From IELTS to GMAT, we provide comprehensive preparation with proven results and score guarantees.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Award className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">98% Success Rate</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Flexible Schedules</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-primary-600" />
                  <span className="text-sm">Expert Instructors</span>
                </div>
              </div>

              <a href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 text-btn hover:shadow-lg hover:shadow-primary-600/25">
                Book Free Demo Class
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-slate-100 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {tests.slice(0, 4).map((test) => (
                    <div key={test.title} className="text-center p-4 bg-white rounded-xl shadow-sm">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-1">{test.title}</h3>
                      <p className="text-xs text-slate-600">{test.score}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tests Grid */}
      <section ref={servicesRef} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Available <span className="font-semibold">Tests</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of test preparation programs designed for your success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test, index) => (
              <div 
                key={index} 
                className="service-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-primary-200 group h-[600px] flex flex-col"
              >
                {/* Header Section - Fixed Height */}
                <div className="flex items-start justify-between mb-4 h-16">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{formatCurrency(test.price)}</div>
                    <div className="text-sm text-slate-500">Starting from</div>
                  </div>
                </div>
                
                {/* Title and Description - Fixed Height */}
                <div className="mb-6 h-32 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {test.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{test.fullName}</p>
                  </div>
                  <p className="text-slate-600 leading-relaxed line-clamp-2 text-sm">
                    {test.description}
                  </p>
                </div>
                
                {/* Test Details - Fixed Height */}
                <div className="space-y-3 mb-6 h-24 flex flex-col justify-center">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-medium text-slate-900">{test.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Target Score:</span>
                    <span className="font-medium text-slate-900">{test.score}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Format:</span>
                    <span className="font-medium text-slate-900 text-xs">{test.format}</span>
                  </div>
                </div>
                
                {/* Features List - Fixed Height with Scroll */}
                <div className="space-y-2 mb-6 flex-1 overflow-hidden">
                  <div className="h-32 overflow-y-auto">
                    {test.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                        <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Button - Fixed at Bottom */}
                <a href="/contact" className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium group-hover:scale-105 transform duration-300 mt-auto inline-block text-center">
                  Enroll Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Test Prep */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Why Choose Our <span className="font-semibold">Test Preparation?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We provide the most comprehensive and effective test preparation programs with proven results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-slate-50 rounded-2xl">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Score Guarantee</h3>
              <p className="text-slate-600">We guarantee score improvement or your money back. 98% of our students achieve their target scores.</p>
            </div>
            
            <div className="text-center p-8 bg-slate-50 rounded-2xl">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Expert Instructors</h3>
              <p className="text-slate-600">Learn from certified instructors with 10+ years of experience and proven track records.</p>
            </div>
            
            <div className="text-center p-8 bg-slate-50 rounded-2xl">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Flexible Schedules</h3>
              <p className="text-slate-600">Choose from morning, evening, or weekend batches to fit your schedule perfectly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to <span className="font-semibold">Ace Your Test?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their target scores with our expert guidance. Book your free demo class today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 text-btn hover:shadow-lg hover:shadow-primary-600/25">
              Book Free Demo Class
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

export default TestPreparation;
