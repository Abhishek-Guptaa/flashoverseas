import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar, Users, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { sendEmail } from '../services/emailService';
import FadeInSection from '../components/FadeInSection';

gsap.registerPlugin(ScrollTrigger);


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: ''
  });
  const heroRef = useRef<HTMLDivElement>(null);
  const getInTouchRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<HTMLDivElement[]>([]);

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

      // Get In Touch section animations
      if (getInTouchRef.current) {
        gsap.from('.get-in-touch-title', {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: getInTouchRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.from('.get-in-touch-subtitle', {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: getInTouchRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });

        // Stack scroll effect for contact cards
        contactCardsRef.current.forEach((card, index) => {
          if (card) {
            // Set initial stacked position
            gsap.set(card, {
              y: 50 + (index * 20), // Stack cards with increasing offset
              scale: 1 - (index * 0.05), // Each card slightly smaller
              zIndex: contactCardsRef.current.length - index, // Higher cards on top
              transformOrigin: "center center"
            });

            // Animate cards coming up as you scroll
            gsap.to(card, {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse",
                onEnter: () => {
                  // Bring this card to front when it enters
                  gsap.set(card, { zIndex: contactCardsRef.current.length + 1 });
                },
                onLeave: () => {
                  // Reset z-index when leaving
                  gsap.set(card, { zIndex: contactCardsRef.current.length - index });
                }
              }
            });

            // Hover animations
            card.addEventListener('mouseenter', () => {
              gsap.to(card, {
                y: -15,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
              });
            });

            card.addEventListener('mouseleave', () => {
              gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              });
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send email using the email service
      const result = await sendEmail(formData);
      
      if (result.success) {
        alert('Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+91-XXXXXXXXXX", "+91-XXXXXXXXXX"],
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@flashoverseas.com", "support@flashoverseas.com"],
      description: "Send us your queries anytime"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["DSL Abacus IT Park", "Industrial Development Area, Uppal", "Secunderabad, Hyderabad", "Telangana - 500039, India"],
      description: "Visit our office for consultation"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"],
      description: "We're here when you need us"
    }
  ];

  return (
    <div>
      <SEO 
        title="Contact Flash Overseas - Study Abroad Consultants in Hyderabad | Free Consultation"
        description="Contact Flash Overseas, the leading study abroad consultants in Hyderabad, Secunderabad, Telangana. Get free consultation for USA, UK, Canada, Australia, Germany, Singapore. Call, email, or visit our office at DSL Abacus IT Park, Uppal for expert guidance on your international education journey."
        keywords="contact flash overseas, study abroad consultants hyderabad contact, overseas education consultants hyderabad contact, study abroad consultants secunderabad contact, study abroad consultants telangana contact, flash overseas contact number, flash overseas email, flash overseas address, study abroad consultation hyderabad, free study abroad consultation, study abroad guidance hyderabad, study abroad counseling hyderabad, study abroad consultation telangana, study abroad consultation india, study abroad consultants near me, study abroad consultants office hyderabad, study abroad consultants location hyderabad, study abroad consultants phone number, study abroad consultants email address, study abroad consultants appointment, study abroad consultants consultation, DSL Abacus IT Park Uppal"
        url="https://flashoverseas.com/contact"
        pageType="contact"
      />
      
      {/* Hero Section */}
      <FadeInSection>
        <section ref={heroRef} className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Get In <span className="font-semibold">Touch</span>
          </h1>

          <p className="hero-description text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Ready to start your study abroad journey? Contact our expert team for personalized guidance and support.
          </p>
        </div>
        </section>
      </FadeInSection>

      {/* Contact Information Section */}
      <FadeInSection>
        <section ref={getInTouchRef} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="get-in-touch-title text-4xl font-bold text-slate-900 mb-4">
              Get In Touch
            </h2>
            <p className="get-in-touch-subtitle text-lg text-slate-600 max-w-2xl mx-auto">
              Ready to start your journey? We're here to help you every step of the way.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) contactCardsRef.current[index] = el;
                }}
                className="contact-card"
              >
                <div className="h-full bg-white rounded-3xl shadow-lg p-8 border border-slate-100 transition-transform duration-300 hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center mb-4 shadow-sm">
                      {/* render icon with inverted color */}
                      <div className="text-white">
                        {info.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {info.title}
                    </h3>

                    <p className="text-sm text-slate-500 mb-4">
                      {info.description}
                    </p>

                    <div className="mt-auto space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-slate-700 font-medium leading-tight">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      </FadeInSection>

      {/* Main Contact Section */}
      <FadeInSection>
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 rounded-3xl"></div>
              
              <div className="relative bg-white/5 backdrop-blur-sm p-8 lg:p-12 rounded-3xl border border-white/10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-semibold text-white mb-4">Contact Form</h3>
                  <p className="text-slate-300">
                    Fill out the form below and we'll get back to you within 24 hours with personalized guidance.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-primary-400 transition-colors">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-primary-400 transition-colors">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-primary-400 transition-colors">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-primary-400 transition-colors">
                        Preferred Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-white backdrop-blur-sm"
                      >
                        <option value="" className="bg-slate-800">Select Country</option>
                        <option value="usa" className="bg-slate-800">United States</option>
                        <option value="uk" className="bg-slate-800">United Kingdom</option>
                        <option value="canada" className="bg-slate-800">Canada</option>
                        <option value="australia" className="bg-slate-800">Australia</option>
                        <option value="germany" className="bg-slate-800">Germany</option>
                        <option value="singapore" className="bg-slate-800">Singapore</option>
                        <option value="other" className="bg-slate-800">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="service" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-primary-400 transition-colors">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-white backdrop-blur-sm"
                    >
                      <option value="" className="bg-slate-800">Select Service</option>
                      <option value="university-selection" className="bg-slate-800">University Selection</option>
                      <option value="visa-assistance" className="bg-slate-800">Visa Assistance</option>
                      <option value="test-preparation" className="bg-slate-800">Test Preparation</option>
                      <option value="application-guidance" className="bg-slate-800">Application Guidance</option>
                      <option value="scholarship-assistance" className="bg-slate-800">Scholarship Assistance</option>
                      <option value="general-consultation" className="bg-slate-800">General Consultation</option>
                    </select>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2 group-focus-within:text-primary-400 transition-colors">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm resize-none"
                      placeholder="Tell us about your study abroad goals and how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-primary-600/25 transform hover:scale-[1.02]"
                  >
                            <MessageCircle className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-semibold text-slate-900 mb-6">Quick Contact</h3>
                <p className="text-lg text-slate-600 mb-8">
                  Prefer to reach out directly? Use any of these methods for immediate assistance.
                </p>
              </div>
              
              <div className="space-y-6">
                <a
                  href={`https://wa.me/918080030349?text=${encodeURIComponent('Hello, I would like to chat with a counselor about studying abroad.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-600 transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-1">Live Chat</h4>
                      <p className="text-slate-600 text-sm">Chat with our counselors instantly on WhatsApp</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </a>
                
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-600 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-1">Book Consultation</h4>
                      <p className="text-slate-600 text-sm">Schedule a free 30-minute session</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-600 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-slate-900 mb-1">Group Session</h4>
                      <p className="text-slate-600 text-sm">Join our information sessions</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 p-8 rounded-2xl text-white">
                <h4 className="text-xl font-semibold mb-4">Why Choose Flash Overseas?</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">15,000+ successful students placed worldwide</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">98% success rate in university admissions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">Expert guidance for 25+ countries</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">End-to-end support from application to arrival</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </FadeInSection>

      {/* Map Section */}
      <FadeInSection>
        <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Find Us <span className="font-semibold">Here</span>
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1234567890!2d78.1234567890!3d17.1234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDA3JzI0LjQiTiA3OMKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Flash Overseas Location"
            ></iframe>
          </div>
        </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection>
        <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to Start Your <span className="font-semibold">Study Abroad Journey?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their dreams with our expert guidance. Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact-form"
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
    </div>
  );
};

export default Contact;