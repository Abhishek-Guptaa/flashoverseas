import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      university: "Harvard University, USA",
      course: "MBA",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The team helped me secure admission to my dream university. Their guidance throughout the application process was invaluable. I couldn't have done it without them! The personalized attention and expert advice made all the difference.",
      video: null,
      year: "2023"
    },
    {
      name: "Raj Patel",
      university: "University of Toronto, Canada",
      course: "Computer Science",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "From university selection to visa approval, everything was handled professionally. The counselors were always available to answer my questions and concerns. They even helped me find accommodation and prepare for life in Canada.",
      video: null,
      year: "2023"
    },
    {
      name: "Emma Chen",
      university: "University of Melbourne, Australia",
      course: "Masters in Engineering",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "Excellent service! They not only helped with admissions but also guided me through scholarship applications. I received a 50% scholarship thanks to their support. The financial guidance was particularly helpful for my family.",
      video: null,
      year: "2022"
    },
    {
      name: "Michael Brown",
      university: "Oxford University, UK",
      course: "PhD in Physics",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The personalized approach and attention to detail made all the difference. They understood my goals and helped me choose the perfect program. The research proposal guidance was exceptional.",
      video: null,
      year: "2022"
    },
    {
      name: "Priya Sharma",
      university: "Stanford University, USA",
      course: "Masters in Data Science",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "I was overwhelmed by the application process, but the team made it so much easier. They helped me craft compelling essays and prepared me thoroughly for interviews. Now I'm living my dream at Stanford!",
      video: null,
      year: "2023"
    },
    {
      name: "Ahmed Hassan",
      university: "Technical University of Munich, Germany",
      course: "Masters in Mechanical Engineering",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The guidance for German universities was exceptional. They helped me understand the unique requirements and even assisted with learning German. The cultural preparation was invaluable.",
      video: null,
      year: "2022"
    }
  ];

  const stats = [
    { number: "15,000+", label: "Success Stories" },
    { number: "98%", label: "Visa Success Rate" },
    { number: "500+", label: "Partner Universities" },
    { number: "25+", label: "Countries" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            Student Success Stories
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Hear from our successful students who are now studying at top universities worldwide and building their dream careers.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-primary-50 rounded-xl">
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-secondary-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 relative">
            <Quote className="absolute top-8 right-8 w-16 h-16 text-primary-200" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0 mb-6"
                />
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-primary-600 font-medium mb-1">
                  {testimonials[currentTestimonial].course}
                </p>
                <p className="text-secondary-600 mb-4">
                  {testimonials[currentTestimonial].university}
                </p>
                <div className="flex justify-center lg:justify-start mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-secondary-500">Class of {testimonials[currentTestimonial].year}</p>
              </div>
              
              <div>
                <p className="text-xl text-secondary-700 leading-relaxed italic mb-8">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="text-sm text-secondary-500">
                    {currentTestimonial + 1} of {testimonials.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">More Success Stories</h2>
            <p className="text-xl text-secondary-600">Every student has a unique journey to success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative border-2 ${
                  index === currentTestimonial ? 'border-primary-200' : 'border-transparent'
                }`}
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-200" />
                
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-secondary-900">{testimonial.name}</h4>
                    <p className="text-sm text-primary-600">{testimonial.course}</p>
                    <p className="text-xs text-secondary-500">{testimonial.university}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-secondary-700 text-sm leading-relaxed italic">
                  "{testimonial.text.substring(0, 150)}..."
                </p>
                
                <button
                  onClick={() => setCurrentTestimonial(index)}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Read Full Story
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Video Testimonials</h2>
            <p className="text-xl text-secondary-600">Coming Soon - Hear directly from our students</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative bg-secondary-200 h-48 flex items-center justify-center">
                  <Play className="w-16 h-16 text-primary-600" />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    Coming Soon
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-secondary-900 mb-2">Student Success Story #{item}</h4>
                  <p className="text-sm text-secondary-600">Video testimonial coming soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;