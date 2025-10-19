import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  useEffect(() => {
    const setHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const h = header.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      }
    };

    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
    return () => window.removeEventListener('resize', setHeaderHeight);
  }, []);
  return (
  <div className="min-h-[calc(100vh-var(--header-height,6rem))] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-50 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-25 rounded-full opacity-20 animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Inline styles for enhanced animations */}
      <style>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes slideInLeft { 
          from { opacity: 0; transform: translateX(-50px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes slideInRight { 
          from { opacity: 0; transform: translateX(50px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes bounceIn { 
          0% { opacity: 0; transform: scale(0.3); } 
          50% { opacity: 1; transform: scale(1.05); } 
          70% { transform: scale(0.9); } 
          100% { opacity: 1; transform: scale(1); } 
        }
        @keyframes float { 
          0%, 100% { transform: translateY(0px) rotate(0deg); } 
          33% { transform: translateY(-10px) rotate(1deg); } 
          66% { transform: translateY(-5px) rotate(-1deg); } 
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px rgba(252, 56, 97, 0.3); }
          50% { text-shadow: 0 0 20px rgba(252, 56, 97, 0.6), 0 0 30px rgba(252, 56, 97, 0.4); }
        }
        
        .fade-in-up { animation: fadeInUp 600ms ease-out forwards; opacity: 0; }
        .slide-in-left { animation: slideInLeft 600ms ease-out forwards; opacity: 0; }
        .slide-in-right { animation: slideInRight 600ms ease-out forwards; opacity: 0; }
        .bounce-in { animation: bounceIn 800ms ease-out forwards; opacity: 0; }
        .float-gentle { animation: float 4s ease-in-out infinite; }
        .glow-text { animation: glow 2s ease-in-out infinite; }
        
        .fade-in-up:nth-child(1) { animation-delay: 200ms; }
        .fade-in-up:nth-child(2) { animation-delay: 400ms; }
        .fade-in-up:nth-child(3) { animation-delay: 600ms; }
        .slide-in-left { animation-delay: 300ms; }
        .slide-in-right { animation-delay: 300ms; }
      `}</style>

      <div className="max-w-lg text-center bg-white rounded-2xl shadow-lg p-8 relative z-10">
        <h1 className="text-3xl font-normal text-slate-900 mb-3">
          Oops! Page not found
        </h1>

        <p className="text-slate-600 mb-8">
          The page you're looking for seems to have wandered off. Don't worry, let's get you back on track!
        </p>

        {/* Action buttons */}
        <div className="flex justify-center items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          
          <Link 
            to="/contact" 
            className="flex items-center gap-2 text-slate-700 border border-slate-200 px-6 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contact Us
          </Link>
        </div>

        {/* Fun animated elements removed per request */}
      </div>
    </div>
  );
};

export default NotFound;
