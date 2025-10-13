import React from 'react';
import { MapPin, Users, DollarSign } from 'lucide-react';

const Destinations = () => {
  const destinations = [
    {
      country: "United States",
      image: "https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=800",
      universities: "4,000+",
      avgCost: "$30,000-60,000",
      description: "Home to world's top universities with diverse programs and research opportunities."
    },
    {
      country: "United Kingdom",
      image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
      universities: "150+",
      avgCost: "$25,000-45,000",
      description: "Rich academic heritage with shorter degree programs and global recognition."
    },
    {
      country: "Canada",
      image: "https://images.pexels.com/photos/1006965/pexels-photo-1006965.jpeg?auto=compress&cs=tinysrgb&w=800",
      universities: "200+",
      avgCost: "$20,000-35,000",
      description: "Affordable education with excellent post-study work opportunities."
    },
    {
      country: "Australia",
      image: "https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg?auto=compress&cs=tinysrgb&w=800",
      universities: "100+",
      avgCost: "$25,000-40,000",
      description: "High quality education with beautiful landscapes and multicultural environment."
    },
    {
      country: "Germany",
      image: "https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=800",
      universities: "400+",
      avgCost: "$10,000-20,000",
      description: "Tuition-free education at public universities with strong engineering programs."
    },
    {
      country: "New Zealand",
      image: "https://images.pexels.com/photos/552779/pexels-photo-552779.jpeg?auto=compress&cs=tinysrgb&w=800",
      universities: "40+",
      avgCost: "$22,000-35,000",
      description: "Safe environment with innovative teaching methods and stunning natural beauty."
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Study Destinations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore top study destinations around the world and find the perfect match for your academic goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.country}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{destination.country}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{destination.universities} Universities</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{destination.avgCost} per year</span>
                  </div>
                </div>
                
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;