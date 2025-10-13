import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@studyabroad.com", "support@studyabroad.com"],
      description: "Send us your queries anytime"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["123 Education Street", "New York, NY 10001"],
      description: "Visit our office for consultation"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      description: "We're here when you need us"
    }
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Education Street, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "newyork@studyabroad.com"
    },
    {
      city: "Los Angeles",
      address: "456 University Ave, CA 90210",
      phone: "+1 (555) 234-5678",
      email: "losangeles@studyabroad.com"
    },
    {
      city: "Chicago",
      address: "789 College Blvd, IL 60601",
      phone: "+1 (555) 345-6789",
      email: "chicago@studyabroad.com"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Ready to start your study abroad journey? Contact us today for personalized guidance and expert advice.
          </p>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Live Chat</h3>
              <p className="text-secondary-600 mb-4">Chat with our counselors instantly</p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Start Chat
              </button>
            </div>
            
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Book Consultation</h3>
              <p className="text-secondary-600 mb-4">Schedule a free 30-minute session</p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Book Now
              </button>
            </div>
            
            <div className="text-center p-6 bg-primary-50 rounded-xl">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Group Session</h3>
              <p className="text-secondary-600 mb-4">Join our weekly information sessions</p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 mb-6">Contact Information</h2>
                <p className="text-lg text-secondary-600 mb-8">
                  We're here to help you every step of the way. Reach out to us through any of the following channels.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="text-primary-600 mt-1">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondary-900 mb-1">{info.title}</h4>
                        <p className="text-sm text-secondary-500 mb-2">{info.description}</p>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-secondary-700">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary-600 p-6 rounded-xl text-white">
                <h4 className="font-semibold mb-3">Emergency Contact</h4>
                <p className="mb-4">
                  For urgent matters outside office hours, call our emergency helpline.
                </p>
                <p className="text-xl font-bold">+1 (555) 999-0000</p>
                <p className="text-sm text-primary-100">Available 24/7</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-secondary-700 mb-2">
                      Preferred Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a country</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="germany">Germany</option>
                      <option value="newzealand">New Zealand</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="university">University Selection</option>
                    <option value="application">Application Assistance</option>
                    <option value="visa">Visa Guidance</option>
                    <option value="test-prep">Test Preparation</option>
                    <option value="scholarship">Scholarship Assistance</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your study abroad goals and any specific questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span className="font-semibold">Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Office Locations</h2>
            <p className="text-xl text-secondary-600">Visit us at any of our convenient locations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-secondary-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">{office.city} Office</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                    <p className="text-secondary-700">{office.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <p className="text-secondary-700">{office.phone}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <p className="text-secondary-700">{office.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-secondary-600">Quick answers to common questions</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How long does the application process take?",
                answer: "The application process typically takes 3-6 months, depending on the country and university requirements."
              },
              {
                question: "Do you charge for initial consultation?",
                answer: "No, we offer a free 30-minute initial consultation to understand your goals and explain our services."
              },
              {
                question: "What documents do I need to get started?",
                answer: "You'll need academic transcripts, passport, English proficiency test scores, and statement of purpose."
              },
              {
                question: "Can you help with scholarship applications?",
                answer: "Yes, we provide comprehensive scholarship assistance and help you identify the best funding opportunities."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-semibold text-secondary-900 mb-3">{faq.question}</h4>
                <p className="text-secondary-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;