import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FormSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={formRef} className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-3">
              Start Your Journey
            </h2>
            <p className="text-gray-500">Get expert guidance from our counselors</p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Email Address"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                >
                  <option value="">Select Destination</option>
                  <option value="australia">Australia</option>
                  <option value="canada">Canada</option>
                  <option value="usa">USA</option>
                  <option value="uk">United Kingdom</option>
                  <option value="germany">Germany</option>
                  <option value="ireland">Ireland</option>
                </select>
              </div>
              <div>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
                >
                  <option value="">Intake</option>
                  <option value="january-2025">January 2025</option>
                  <option value="september-2025">September 2025</option>
                  <option value="january-2026">January 2026</option>
                  <option value="september-2026">September 2026</option>
                </select>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <p className="text-xs text-gray-500 leading-relaxed">
                I agree to receive updates via email, phone, and WhatsApp
              </p>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-xs mt-1">{errors.consent}</p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;

