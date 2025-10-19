import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600" }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" }
  ];

  const services = [
    { name: "Test Preparation", href: "/test-preparation" },
    { name: "Admission Guidance", href: "/admission-guidance" },
    { name: "Visa Assistance", href: "/visa-assistance" },
    { name: "Financial Assistance", href: "/financial-assistance" }
  ];


  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          
          {/* ===== COMPANY INFO & LOGO ===== */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <img 
                src="/Logo.png" 
                alt="Flash Overseas Logo" 
                className="h-12 w-auto brightness-0 invert"
              />
              <p className="text-slate-300 text-small max-w-md">
                Your trusted partner in international education. We provide expert guidance for studying abroad with comprehensive support throughout your journey.
              </p>
            </div>

            {/* ===== SOCIAL LINKS ===== */}
            <div className="space-y-3">
              <h4 className="text-white text-h4">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-9 h-9 rounded-full bg-transparent flex items-center justify-center transition-all duration-200 group hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ===== QUICK LINKS ===== */}
          <div className="space-y-4">
            <h4 className="text-white text-h4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-slate-300 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== SERVICES ===== */}
          <div className="space-y-4">
            <h4 className="text-white text-h4">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.href} 
                    className="text-slate-300 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== NEWSLETTER SIGNUP ===== */}
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-white text-h4">Stay Updated</h4>
              <p className="text-slate-300 text-small">
                Subscribe to our newsletter for the latest study abroad opportunities, visa updates, and educational insights.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-small"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group text-btn hover:shadow-lg hover:shadow-primary-600/25"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>

            {isSubscribed && (
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                <p className="text-green-400 text-small flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Thank you for subscribing!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-slate-400 text-small">
                © 2024 Flash Overseas. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-8">
              <Link 
                to="/privacy" 
                className="text-slate-400 hover:text-white text-small transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-slate-400 hover:text-white text-small transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <a 
                href="mailto:support@flashoverseas.com" 
                className="text-slate-400 hover:text-white text-small transition-colors duration-200"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;