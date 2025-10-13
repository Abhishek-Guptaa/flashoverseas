import React from 'react';
import { CheckCircle, Award, Users, Globe } from 'lucide-react';

const About = () => {
  const achievements = [
    { icon: <Users className="w-6 h-6" />, number: "15,000+", label: "Students Counseled" },
    { icon: <Award className="w-6 h-6" />, number: "98%", label: "Success Rate" },
    { icon: <Globe className="w-6 h-6" />, number: "25+", label: "Countries" },
    { icon: <CheckCircle className="w-6 h-6" />, number: "15+", label: "Years Experience" }
  ];

  const features = [
    "Personalized counseling sessions",
    "Expert visa guidance",
    "Scholarship assistance",
    "Pre-departure orientation",
    "Post-arrival support",
    "Career guidance"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Us for Your Study Abroad Journey?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                With over 15 years of experience in international education consulting, we have helped 
                thousands of students achieve their dreams of studying abroad. Our expert team provides 
                personalized guidance every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 flex justify-center mb-2">
                    {achievement.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{achievement.number}</div>
                  <div className="text-sm text-gray-600">{achievement.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">What We Offer:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Study abroad consultation"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-blue-200 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;