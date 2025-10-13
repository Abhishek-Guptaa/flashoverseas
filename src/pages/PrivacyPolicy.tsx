import React from 'react';
import { Shield, Lock, Eye, Database, Users, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide when contacting us or using our services",
        "Contact details including name, email address, phone number, and address",
        "Educational background, academic records, and study preferences",
        "Visa and immigration-related documents and information",
        "Communication records and correspondence with our team"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Provide personalized study abroad consultation and guidance",
        "Process university applications and visa assistance requests",
        "Send important updates about your application status",
        "Improve our services and develop new offerings",
        "Comply with legal obligations and regulatory requirements"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Protection & Security",
      content: [
        "We implement industry-standard security measures to protect your data",
        "All personal information is encrypted and stored securely",
        "Access to your data is restricted to authorized personnel only",
        "Regular security audits and updates to maintain protection",
        "Secure data transmission using SSL encryption"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Sharing & Third Parties",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "Information may be shared with universities and educational institutions",
        "Government agencies may receive data for visa processing purposes",
        "Trusted service providers who assist in our operations",
        "Legal authorities when required by law or to protect our rights"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Your Rights & Choices",
      content: [
        "Access and review your personal information at any time",
        "Request corrections or updates to your data",
        "Opt-out of marketing communications and newsletters",
        "Request deletion of your personal information",
        "Withdraw consent for data processing activities"
      ]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Contact & Updates",
      content: [
        "Contact us at privacy@flashoverseas.com for privacy-related inquiries",
        "This policy may be updated periodically to reflect changes",
        "We will notify you of significant changes via email",
        "Continued use of our services constitutes acceptance of updates",
        "Last updated: January 2024"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Last updated: January 15, 2024
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Flash Overseas ("we," "our," or "us") is committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website or use our study abroad consultation services.
            </p>
          </div>

          {/* Policy Sections */}
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mr-4">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Cookies Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Cookies & Tracking Technologies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience, 
              analyze website traffic, and personalize content. You can control cookie settings through 
              your browser preferences.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Essential Cookies:</strong> Required for website functionality</li>
                <li>• <strong>Analytics Cookies:</strong> Help us understand website usage</li>
                <li>• <strong>Marketing Cookies:</strong> Used for targeted advertising</li>
                <li>• <strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-primary-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Questions About This Policy?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">privacy@flashoverseas.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
