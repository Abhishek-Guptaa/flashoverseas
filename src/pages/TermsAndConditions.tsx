import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle, Users, Shield } from 'lucide-react';

const TermsAndConditions = () => {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using our website and services, you accept and agree to be bound by these terms",
        "If you do not agree to these terms, please do not use our services",
        "We reserve the right to modify these terms at any time without prior notice",
        "Your continued use of our services constitutes acceptance of any changes",
        "These terms apply to all users, including visitors, clients, and service recipients"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Services & Responsibilities",
      content: [
        "We provide study abroad consultation, university selection, and visa assistance services",
        "All information provided is for guidance purposes and does not guarantee admission or visa approval",
        "Clients are responsible for providing accurate and complete information",
        "We are not liable for decisions made by universities or government agencies",
        "Services are subject to availability and may be modified or discontinued at our discretion"
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Payment & Refund Policy",
      content: [
        "Service fees are clearly outlined in our service agreements",
        "Payment is required before services commence unless otherwise agreed",
        "Refunds are subject to our refund policy and service completion status",
        "Late payments may result in service suspension or termination",
        "All fees are non-transferable and non-refundable after service completion"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: [
        "Our liability is limited to the amount paid for our services",
        "We are not responsible for university admission decisions or visa outcomes",
        "We do not guarantee specific results or outcomes",
        "Clients assume responsibility for their study abroad decisions",
        "We are not liable for indirect, consequential, or punitive damages"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: [
        "Providing false or misleading information to us or authorities",
        "Using our services for fraudulent or illegal purposes",
        "Sharing login credentials or account access with unauthorized persons",
        "Attempting to reverse engineer or copy our proprietary systems",
        "Engaging in activities that may harm our reputation or business"
      ]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Intellectual Property",
      content: [
        "All content, materials, and intellectual property on our website are protected",
        "You may not reproduce, distribute, or modify our content without permission",
        "Our trademarks, logos, and brand elements are proprietary",
        "Client information and documents remain confidential and protected",
        "Any feedback or suggestions become our property without compensation"
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
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our services. These terms govern your relationship with Flash Overseas.
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
              Welcome to Flash Overseas. These Terms and Conditions ("Terms") govern your use of our website 
              and services. By accessing or using our services, you agree to be bound by these Terms. 
              If you disagree with any part of these terms, you may not access our services.
            </p>
          </div>

          {/* Terms Sections */}
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

          {/* Dispute Resolution */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Dispute Resolution
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Any disputes arising from these Terms or our services will be resolved through binding arbitration 
                in accordance with the rules of the American Arbitration Association. The arbitration will be 
                conducted in English and will take place in New York, NY.
              </p>
              <p>
                Before initiating arbitration, we encourage you to contact us directly to resolve any issues 
                through good faith negotiations. We are committed to resolving disputes fairly and efficiently.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of the State of New York, 
              without regard to conflict of law principles. Any legal action or proceeding arising under these 
              Terms will be brought exclusively in the courts of New York.
            </p>
          </div>

          {/* Severability */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Severability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be 
              limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain 
              in full force and effect and enforceable.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-primary-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you have any questions about these Terms and Conditions, please contact us for clarification.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">legal@flashoverseas.com</p>
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

export default TermsAndConditions;
