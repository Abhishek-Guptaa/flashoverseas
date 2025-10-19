import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";
import { sendEmail } from '../services/emailService';


gsap.registerPlugin(ScrollTrigger);

const FormSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    course: '',
    studyMonth: '',
    studyYear: '',
    consent: false
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
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
      // Convert new form format to expected format for email service
      const emailData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        service: formData.course || 'General Inquiry',
        message: `Course: ${formData.course}\nPreferred Study Time: ${formData.studyMonth} ${formData.studyYear}\nConsent Given: ${formData.consent ? 'Yes' : 'No'}`
      };
      
      const result = await sendEmail(emailData);
      
      if (result.success) {
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          course: '',
          studyMonth: '',
          studyYear: '',
          consent: false
        });
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={formRef} className="bg-white rounded-3xl overflow-hidden shadow-lg">
          <div className="grid lg:grid-cols-2 min-h-[450px]">
            {/* Left Side - Image */}
            <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center p-8">
              <div className="relative w-full max-w-md">
                {/* Boy graduation image */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-gradient-to-br from-primary-100 to-white shadow-lg">
                  <img 
                    src="/boyimg.png" 
                    alt="Student success story"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div class="relative z-10 text-center text-white p-6">
                            <div class="w-24 h-24 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <div class="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-2xl">🎓</div>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">Your Success Story Starts Here</h3>
                            <p class="text-sm opacity-90">Join thousands of students who achieved their dreams</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-300/30 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-400/30 rounded-full blur-lg" />
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-light text-slate-900 mb-3">
                  Let Our <span className="font-bold text-primary-600">Team</span> Reach Out To You
                </h2>
                <p className="text-base text-slate-600">Fill out the form and we'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="group">
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1 group-focus-within:text-primary-600 transition-colors">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-slate-900 placeholder-slate-400"
                  placeholder=""
                />
              </div>
              <div className="group">
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1 group-focus-within:text-primary-600 transition-colors">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-slate-900 placeholder-slate-400"
                  placeholder=""
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1 group-focus-within:text-primary-600 transition-colors">
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-slate-900 placeholder-slate-400"
                  placeholder=""
                />
              </div>
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1 group-focus-within:text-primary-600 transition-colors">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-slate-900 placeholder-slate-400"
                  placeholder=""
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="group">
                <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1 group-focus-within:text-primary-600 transition-colors">
                  Your preferred study destination
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-slate-900"
                >
                  <option value="">Select Destination</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                  <option value="singapore">Singapore</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="group">
                <label htmlFor="course" className="block text-sm font-medium text-slate-700 mb-1 group-focus-within:text-primary-600 transition-colors">
                  Course
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-slate-900 placeholder-slate-400"
                  placeholder=""
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="group">
                <label htmlFor="studyMonth" className="block text-sm font-medium text-slate-700 mb-1 group-focus-within:text-primary-600 transition-colors">
                  When do you plan to study?
                </label>
                <select
                  id="studyMonth"
                  name="studyMonth"
                  value={formData.studyMonth}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-slate-900"
                >
                  <option value="">Select Month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
              </div>
              <div className="group">
                <label htmlFor="studyYear" className="block text-sm font-medium text-slate-700 mb-1 group-focus-within:text-primary-600 transition-colors">
                  Your preferred year
                </label>
                <select
                  id="studyYear"
                  name="studyYear"
                  value={formData.studyYear}
                  onChange={handleChange}
                  className="w-full px-3 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300 text-slate-900"
                >
                  <option value="">Select Year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                className="mt-1 w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="consent" className="text-sm text-slate-600 leading-relaxed">
                I consent to receiving Calls, WhatsApp, Email and Google RCS from Edwise to assist with this enquiry.
              </label>
            </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-primary-600/25 transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Submit</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;

