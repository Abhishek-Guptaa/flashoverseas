import React, { useState } from 'react';
import { MapPin, Users, DollarSign, Clock, GraduationCap, Star } from 'lucide-react';

const Destinations = () => {
  const [selectedCountry, setSelectedCountry] = useState('usa');

  const destinations = {
    usa: {
      name: "United States",
      image: "https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "4,000+",
      avgCost: "$30,000-60,000",
      duration: "4 years (Bachelor's)",
      description: "Home to world's top universities with diverse programs and research opportunities.",
      highlights: [
        "World-renowned universities like Harvard, MIT, Stanford",
        "Diverse range of programs and specializations",
        "Strong research and innovation opportunities",
        "Optional Practical Training (OPT) for work experience",
        "Multicultural environment with global networking"
      ],
      topUniversities: [
        "Harvard University", "Stanford University", "MIT", "Yale University", "Princeton University"
      ],
      requirements: [
        "TOEFL/IELTS for English proficiency",
        "SAT/ACT for undergraduate programs",
        "GRE/GMAT for graduate programs",
        "Strong academic transcripts",
        "Statement of Purpose and Letters of Recommendation"
      ]
    },
    uk: {
      name: "United Kingdom",
      image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "150+",
      avgCost: "$25,000-45,000",
      duration: "3 years (Bachelor's)",
      description: "Rich academic heritage with shorter degree programs and global recognition.",
      highlights: [
        "Prestigious universities like Oxford, Cambridge, Imperial College",
        "Shorter degree duration saves time and money",
        "Rich cultural heritage and history",
        "Post-study work visa opportunities",
        "Gateway to Europe for travel and opportunities"
      ],
      topUniversities: [
        "University of Oxford", "University of Cambridge", "Imperial College London", "UCL", "King's College London"
      ],
      requirements: [
        "IELTS for English proficiency",
        "A-levels or equivalent for undergraduate",
        "Bachelor's degree for postgraduate",
        "Personal Statement",
        "Academic references"
      ]
    },
    canada: {
      name: "Canada",
      image: "https://images.pexels.com/photos/1006965/pexels-photo-1006965.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "200+",
      avgCost: "$20,000-35,000",
      duration: "4 years (Bachelor's)",
      description: "Affordable education with excellent post-study work opportunities.",
      highlights: [
        "High-quality education at affordable costs",
        "Excellent post-graduation work permits",
        "Pathway to permanent residency",
        "Safe and welcoming multicultural society",
        "Beautiful natural landscapes and outdoor activities"
      ],
      topUniversities: [
        "University of Toronto", "McGill University", "University of British Columbia", "University of Alberta", "McMaster University"
      ],
      requirements: [
        "IELTS/TOEFL for English proficiency",
        "High school diploma for undergraduate",
        "Bachelor's degree for postgraduate",
        "Statement of Purpose",
        "Academic transcripts and references"
      ]
    },
    australia: {
      name: "Australia",
      image: "https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "100+",
      avgCost: "$25,000-40,000",
      duration: "3 years (Bachelor's)",
      description: "High quality education with beautiful landscapes and multicultural environment.",
      highlights: [
        "World-class universities with strong research focus",
        "Beautiful climate and outdoor lifestyle",
        "Work opportunities during and after studies",
        "Multicultural and welcoming society",
        "Strong job market in various industries"
      ],
      topUniversities: [
        "University of Melbourne", "Australian National University", "University of Sydney", "University of Queensland", "Monash University"
      ],
      requirements: [
        "IELTS/TOEFL for English proficiency",
        "Completion of Year 12 or equivalent",
        "Bachelor's degree for postgraduate",
        "Statement of Purpose",
        "Academic transcripts"
      ]
    }
  };

  const currentDestination = destinations[selectedCountry];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            Study Destinations
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Explore top study destinations around the world and find the perfect match for your academic goals and career aspirations.
          </p>
        </div>
      </section>

      {/* Country Selection */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(destinations).map(([key, country]) => (
              <button
                key={key}
                onClick={() => setSelectedCountry(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCountry === key
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                }`}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Country Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src={currentDestination.image}
                alt={currentDestination.name}
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-secondary-900">{currentDestination.name}</h2>
              <p className="text-xl text-secondary-600 leading-relaxed">{currentDestination.description}</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-center text-primary-600 mb-2">
                    <Users className="w-5 h-5 mr-2" />
                    <span className="font-medium">Universities</span>
                  </div>
                  <div className="text-2xl font-bold text-secondary-900">{currentDestination.universities}</div>
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-center text-primary-600 mb-2">
                    <DollarSign className="w-5 h-5 mr-2" />
                    <span className="font-medium">Annual Cost</span>
                  </div>
                  <div className="text-2xl font-bold text-secondary-900">{currentDestination.avgCost}</div>
                </div>
                
                <div className="bg-primary-50 p-4 rounded-lg col-span-2">
                  <div className="flex items-center text-primary-600 mb-2">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-medium">Duration</span>
                  </div>
                  <div className="text-xl font-bold text-secondary-900">{currentDestination.duration}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-secondary-900 mb-12 text-center">Why Choose {currentDestination.name}?</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentDestination.highlights.map((highlight, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start space-x-3">
                  <Star className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <p className="text-secondary-700">{highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Universities & Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-8 flex items-center">
                <GraduationCap className="w-8 h-8 text-primary-600 mr-3" />
                Top Universities
              </h3>
              <div className="space-y-4">
                {currentDestination.topUniversities.map((university, index) => (
                  <div key={index} className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-secondary-900">{university}</h4>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-8 flex items-center">
                <MapPin className="w-8 h-8 text-primary-600 mr-3" />
                Entry Requirements
              </h3>
              <div className="space-y-4">
                {currentDestination.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-secondary-700">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;