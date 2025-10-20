import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import FadeInSection from '../components/FadeInSection';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

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

      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
      });


      gsap.from('.story-image', {
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.story-content', {
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
      });

      // Set initial state for value cards
      gsap.set('.value-card', { opacity: 0, y: 40 });
      
      // Animate value cards on scroll
      gsap.to('.value-card', {
        scrollTrigger: {
          trigger: '.value-card',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // Set initial state for team cards
      gsap.set('.team-card', { opacity: 0, scale: 0.9 });
      
      // Animate team cards on scroll
      gsap.to('.team-card', {
        scrollTrigger: {
          trigger: '.team-card',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.2)'
      });
    });

    return () => ctx.revert();
  }, []);


  const values = [
    {
      title: "Excellence",
      description: "Committed to delivering the highest quality guidance and support for every student's unique journey."
    },
    {
      title: "Integrity",
      description: "Building trust through honest, transparent communication and ethical practices in all our services."
    },
    {
      title: "Innovation",
      description: "Continuously evolving our approach to meet the changing needs of international education."
    },
    {
      title: "Student-Centric",
      description: "Your dreams and goals are at the heart of everything we do, guiding each decision we make."
    },
    {
      title: "Partnership",
      description: "Working alongside you as trusted advisors throughout your entire study abroad journey."
    },
    {
      title: "Impact",
      description: "Creating lasting positive change in students' lives through quality education opportunities."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      role: "Senior Counselor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "David Wilson",
      role: "Scholarship Expert",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="About Flash Overseas - Leading Study Abroad Consultants in Vizag | Our Story & Mission"
        description="Learn about Flash Overseas, the premier study abroad consultants in Visakhapatnam (Vizag). Our story, mission, values, and commitment to helping students achieve their international education dreams. 15,000+ students placed with 98% success rate."
        keywords="about flash overseas, study abroad consultants vizag, overseas education consultants vizag, study abroad consultants visakhapatnam, about study abroad consultants, flash overseas story, study abroad consultants mission, study abroad consultants values, study abroad consultants team, study abroad consultants experience, study abroad consultants success, study abroad consultants achievements, study abroad consultants history, study abroad consultants vision, study abroad consultants commitment, study abroad consultants expertise, study abroad consultants quality, study abroad consultants reputation, study abroad consultants testimonials, study abroad consultants reviews"
        url="https://flashoverseas.com/about"
        pageType="about"
      />
      {/* Hero Section */}
      <FadeInSection>
        <section ref={heroRef} className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            About <span className="font-semibold text-primary-600">Flash Overseas</span>
          </h1>

          <p className="hero-description text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            For over 15 years, we've guided thousands of students to achieve their dreams of studying at world-class universities.
          </p>

        </div>
        </section>
      </FadeInSection>

      {/* Story Section - Enhanced */}
      <FadeInSection>
        <section className="story-section py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Enhanced Image Section */}
              <FadeInSection delay={0.2} direction="left">
                <div className="story-image group">
                  <div className="relative">
                    {/* Main Image with Modern Effects */}
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                      <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                        alt="Our team collaboration"
                        className="w-full h-[650px] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-600 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">15+</span>
                    </div>
                    
                    <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-primary-600 rounded-3xl shadow-xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 flex items-center justify-center">
                      <span className="text-white font-bold text-3xl">5000+</span>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 -right-8 w-16 h-16 bg-primary-200/50 rounded-full blur-xl group-hover:bg-primary-300/70 transition-colors duration-500"></div>
                    <div className="absolute bottom-1/4 -left-8 w-12 h-12 bg-primary-200/50 rounded-full blur-lg group-hover:bg-primary-300/70 transition-colors duration-500"></div>
                  </div>
                </div>
              </FadeInSection>
              
              {/* Enhanced Content Section */}
              <FadeInSection delay={0.4} direction="right">
                <div className="story-content space-y-8">
                  {/* Title with Modern Styling */}
                  <div className="space-y-4">
                    <h2 className="text-5xl font-light text-slate-900 leading-tight">
                      Our <span className="font-bold text-primary-600">Story</span>
                    </h2>
                  </div>
                  
                  {/* Enhanced Text Content */}
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-1 h-full bg-primary-500 rounded-full"></div>
                      <p className="text-slate-600 leading-relaxed pl-6 text-lg">
                        Founded in 2009, Flash Overseas began with a simple mission: to make quality international education accessible to every deserving student. What started as a small consultancy has grown into one of India's most trusted study abroad partners.
                      </p>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed text-lg">
                      Over the years, we've witnessed countless success stories - from students securing scholarships at Ivy League universities to professionals advancing their careers through specialized programs. Our success is measured not just in numbers, but in the lives we've transformed and the futures we've shaped.
                    </p>
                    
                    <p className="text-slate-600 leading-relaxed text-lg">
                      Today, we continue to innovate and expand our services, partnering with top universities worldwide and staying ahead of changing visa policies and admission requirements. Every student's journey is unique, and we're honored to be part of their transformation.
                    </p>
                  </div>
                  
                  {/* Enhanced Stats Cards */}
                  <div className="grid grid-cols-2 gap-6 mt-12">
                    <FadeInSection delay={0.6}>
                      <div className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-primary-200">
                        <div className="absolute inset-0 bg-primary-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                          <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
                          <div className="text-slate-600 font-medium">Years of Excellence</div>
                          <div className="w-full h-1 bg-primary-500 rounded-full mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </div>
                      </div>
                    </FadeInSection>
                    
                    <FadeInSection delay={0.8}>
                      <div className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-primary-200">
                        <div className="absolute inset-0 bg-primary-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                          <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">5000+</div>
                          <div className="text-slate-600 font-medium">Dreams Realized</div>
                          <div className="w-full h-1 bg-primary-500 rounded-full mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </div>
                      </div>
                    </FadeInSection>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Values Section */}
      <FadeInSection>
        <section ref={valuesRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Our <span className="font-semibold text-primary-600">Core Values</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide our commitment to student success.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
               <div key={index} className="value-card group bg-white p-8 rounded-2xl border border-slate-200 hover:border-primary-600 hover:shadow-lg transition-all duration-300">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-1.5 h-8 bg-primary-600 rounded-full group-hover:h-12 transition-all duration-300" />
                   <h3 className="text-xl font-semibold text-slate-900">{value.title}</h3>
                 </div>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        </section>
      </FadeInSection>

      {/* Team Section */}
      <FadeInSection>
        <section ref={teamRef} className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Meet Our <span className="font-semibold text-primary-600">Expert Team</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="team-card group text-center">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to <span className="font-semibold text-primary-600">Start Your Journey?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their study abroad dreams with our expert guidance.
          </p>
          <a 
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-all duration-300"
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        </section>
      </FadeInSection>
    </div>
  );
};

export default About;
