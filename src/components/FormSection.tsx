import React from "react";

const FormSection: React.FC = () => {
  return (
    <section className="bg-primary-200 pt-16 pb-16 rounded-2xl">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">
        {/* Left: Image */}
        <div className="order-2 md:order-1">
          <img
            src="/boyimg.png"
            alt="Graduates"
            className="w-full max-w-md mx-auto object-contain"
          />
        </div>

        {/* Right: Form */}
        <div className="order-1 md:order-2 bg-white text-black rounded-2xl p-8 shadow-xl">
          <form className="w-full space-y-5">
            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Let our experts connect with you</h2>
              <p className="text-sm text-gray-600">Get personalized guidance for your study abroad journey</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>

              {/* Study Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Study Destination</label>
                  <select 
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Study Timeline</label>
                  <select 
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Timeline</option>
                    <option value="january-2025">January 2025</option>
                    <option value="september-2025">September 2025</option>
                    <option value="january-2026">January 2026</option>
                    <option value="september-2026">September 2026</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start space-x-3 pt-2">
              <input 
                type="checkbox" 
                required
                className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" 
              />
              <p className="text-xs text-gray-600 leading-relaxed">
                I consent to receiving calls, WhatsApp messages, and emails from Flash Overseas to assist with this enquiry.
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Get Free Consultation
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
