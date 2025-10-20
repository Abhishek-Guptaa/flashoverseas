import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, GraduationCap, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import CurrencyConverter from '../components/CurrencyConverter';
import Chatbot from '../components/Chatbot';
import FadeInSection from '../components/FadeInSection';

gsap.registerPlugin(ScrollTrigger);

const Destinations = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [exchangeRate, setExchangeRate] = useState(83.5);

  const formatCurrency = (usdAmount: string) => {
    if (currency === 'USD') {
      return `$${usdAmount}`;
    } else {
      // Convert USD to INR using live exchange rate
      const [min, max] = usdAmount.split('-').map(amount => 
        Math.round(parseInt(amount.replace(/,/g, '')) * exchangeRate)
      );
      return `₹${min.toLocaleString()}-${max.toLocaleString()}`;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate hero elements, not destination cards
      gsap.from('.hero-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      });

      // Destination cards will be visible by default (no GSAP animation)
    });

    return () => ctx.revert();
  }, []);

  const destinations = [
    {
      id: "usa",
      name: "United States",
      image: "https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "4,000+",
      avgCostUSD: "30,000-60,000",
      duration: "4 years (Bachelor's)",
      description: "Home to world's top universities with diverse programs and research opportunities.",
      highlights: [
        "World-renowned universities like Harvard, MIT, Stanford",
        "Diverse range of programs and specializations",
        "Strong research and innovation opportunities",
        "Optional Practical Training (OPT) for work experience"
      ]
    },
    {
      id: "uk",
      name: "United Kingdom",
      image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "150+",
      avgCostUSD: "25,000-45,000",
      duration: "3 years (Bachelor's)",
      description: "Rich academic heritage with shorter degree programs and global recognition.",
      highlights: [
        "Prestigious universities like Oxford, Cambridge",
        "Shorter degree duration saves time and money",
        "Rich cultural heritage and history",
        "Post-study work visa opportunities"
      ]
    },
    {
      id: "canada",
      name: "Canada",
      image: "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "200+",
      avgCostUSD: "20,000-40,000",
      duration: "4 years (Bachelor's)",
      description: "High-quality education with affordable costs and excellent post-graduation opportunities.",
      highlights: [
        "Affordable tuition fees compared to US/UK",
        "Post-graduation work permit program",
        "Multicultural and welcoming environment",
        "Pathway to permanent residency"
      ]
    },
    {
      id: "australia",
      name: "Australia",
      image: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
      universities: "43",
      avgCostUSD: "25,000-45,000",
      duration: "3-4 years (Bachelor's)",
      description: "World-class education with beautiful landscapes and excellent work opportunities.",
      highlights: [
        "8 universities in top 100 globally",
        "Post-study work visa opportunities",
        "Beautiful country with great lifestyle",
        "Strong economy and job market"
      ]
    },
    {
      id: "germany",
      name: "Germany",
      image: "https://images.pexels.com/photos/2397414/pexels-photo-2397414.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "400+",
      avgCostUSD: "0-20,000",
      duration: "3-4 years (Bachelor's)",
      description: "Free or low-cost education with world-class universities and strong economy.",
      highlights: [
        "Many universities offer free education",
        "Strong engineering and technology programs",
        "Excellent job opportunities in EU",
        "Rich cultural heritage"
      ]
    },
    {
      id: "singapore",
      name: "Singapore",
      image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "6",
      avgCostUSD: "15,000-35,000",
      duration: "3-4 years (Bachelor's)",
      description: "Asian hub of education with world-class universities and multicultural environment.",
      highlights: [
        "NUS and NTU rank in top 20 globally",
        "Gateway to Asia-Pacific region",
        "Multicultural society",
        "Strong economy and job market"
      ]
    },
    {
      id: "ireland",
      name: "Ireland",
      image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "25+",
      avgCostUSD: "10,000-25,000",
      duration: "3-4 years (Bachelor's)",
      description: "English-speaking country with excellent universities and vibrant culture.",
      highlights: [
        "English-speaking environment",
        "EU member with work opportunities",
        "Strong tech and pharmaceutical sectors",
        "Rich cultural heritage"
      ]
    },
    {
      id: "france",
      name: "France",
      image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1200",
      universities: "3,500+",
      avgCostUSD: "3,000-15,000",
      duration: "3-4 years (Bachelor's)",
      description: "Rich culture, excellent education, and gateway to Europe.",
      highlights: [
        "Affordable education costs",
        "Rich cultural heritage",
        "Gateway to Europe",
        "Strong business and arts programs"
      ]
    },
    {
      id: "netherlands",
      name: "Netherlands",
      image: "https://images.pexels.com/photos/249074/pexels-photo-249074.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "50+",
      avgCostUSD: "8,000-20,000",
      duration: "3-4 years (Bachelor's)",
      description: "Innovative education system with English-taught programs.",
      highlights: [
        "Many English-taught programs",
        "Innovative teaching methods",
        "Strong international focus",
        "Excellent quality of life"
      ]
    },
    {
      id: "new-zealand",
      name: "New Zealand",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "8",
      avgCostUSD: "20,000-35,000",
      duration: "3-4 years (Bachelor's)",
      description: "Beautiful country with high-quality education and work opportunities.",
      highlights: [
        "Beautiful natural landscapes",
        "High quality of life",
        "Post-study work opportunities",
        "Safe and welcoming environment"
      ]
    },
    {
      id: "italy",
      name: "Italy",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "90+",
      avgCostUSD: "1,000-4,000",
      duration: "3-4 years (Bachelor's)",
      description: "Rich history, culture, and affordable education in Europe.",
      highlights: [
        "Very affordable tuition fees",
        "Rich cultural heritage",
        "EU member benefits",
        "Strong arts and design programs"
      ]
    }
  ];

  return (
    <div>
      <SEO 
        title="Study Abroad Destinations | USA, UK, Canada, Australia, Germany, Singapore | Flash Overseas Vizag"
        description="Explore top study abroad destinations from Vizag. USA, UK, Canada, Australia, Germany, Singapore, Ireland, France, Netherlands, New Zealand, Italy. University rankings, costs, requirements, scholarships. Expert guidance from Flash Overseas in Visakhapatnam."
        keywords="study abroad destinations, USA study abroad, UK study abroad, Canada study abroad, Australia study abroad, Germany study abroad, Singapore study abroad, Ireland study abroad, France study abroad, Netherlands study abroad, New Zealand study abroad, Italy study abroad, study abroad countries, best study abroad destinations, study abroad options, overseas education destinations, international study destinations, study abroad from vizag, study abroad from visakhapatnam, study abroad from andhra pradesh, study abroad from india, top universities abroad, study abroad rankings, study abroad costs, study abroad requirements, study abroad scholarships"
        url="https://flashoverseas.com/destinations"
        pageType="destinations"
      />
      {/* Hero Section */}
      <FadeInSection>
        <section ref={heroRef} className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Currency Converter */}
        <div className="absolute top-8 right-8 z-10">
          <CurrencyConverter 
            currentCurrency={currency} 
            onCurrencyChange={setCurrency}
            onRateChange={setExchangeRate}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Study <span className="font-semibold text-primary-600">Destinations</span>
          </h1>

          <p className="hero-description text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Explore top study destinations around the world and find the perfect match for your academic goals and career aspirations.
          </p>
        </div>
        </section>
      </FadeInSection>

      {/* Destinations Grid */}
      <FadeInSection>
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Choose Your <span className="font-semibold text-primary-600">Dream Destination</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover the perfect country for your study abroad journey with our comprehensive destination guides.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/destinations/${destination.id}`}
                  className="group relative h-96 rounded-2xl overflow-hidden border border-slate-200 hover:border-primary-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 block"
                  style={{
                    backgroundImage: `url(${destination.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20 group-hover:from-slate-900/70 group-hover:via-slate-900/30 group-hover:to-slate-900/10 transition-all duration-300" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl sm:text-3xl font-medium text-white group-hover:text-primary-600 transition-colors">
                          {destination.name}
                        </h3>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-6 h-6 text-white group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                        </motion.div>
                      </div>
                      
                      <p className="text-white leading-relaxed text-sm">
                        {destination.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
                        <motion.div 
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <GraduationCap className="w-4 h-4 text-primary-200" />
                          <span className="text-xs text-white">{destination.universities}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <DollarSign className="w-4 h-4 text-primary-200" />
                          <span className="text-xs text-white">{formatCurrency(destination.avgCostUSD)}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Clock className="w-4 h-4 text-primary-200" />
                          <span className="text-xs text-white">{destination.duration}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <MapPin className="w-4 h-4 text-primary-200" />
                          <span className="text-xs text-white">Study Abroad</span>
                        </motion.div>
                      </div>
                        
                      <div className="pt-3">
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.slice(0, 2).map((highlight, idx) => (
                            <motion.span
                              key={idx}
                              className="text-xs bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              {highlight.split(' ').slice(0, 3).join(' ')}...
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Need Help <span className="font-semibold text-primary-600">Choosing?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Our expert counselors can help you find the perfect destination based on your goals, budget, and preferences.
          </p>
          <a 
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-all duration-300"
          >
            Get Free Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        </section>
      </FadeInSection>
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Destinations;