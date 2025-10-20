import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ArrowRight, CheckCircle, X, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import { Card, CardContent } from '../components/ui/card';
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from '../components/ui/ThreeDScrollTrigger';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from '../components/ui/carousel';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { carouselRef, api, current, count } = useCarousel();

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedTestimonial !== null) {
      document.body.classList.add('body-scroll-lock');
    } else {
      document.body.classList.remove('body-scroll-lock');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('body-scroll-lock');
    };
  }, [selectedTestimonial]);

  // Auto-scroll carousel every 10 seconds (paused when hovered)
  useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
      if (api.canScrollNext) {
        api.scrollNext();
      } else {
        // Reset to first slide when reaching the end
        const carousel = carouselRef.current;
        if (carousel) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [api, isHovered]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      university: "Harvard University, USA",
      course: "MBA",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The team helped me secure admission to my dream university. Their guidance throughout the application process was invaluable. I couldn't have done it without them! The personalized attention and expert advice made all the difference.",
      fullStory: "When I first approached Flash Overseas, I was overwhelmed by the complexity of applying to top US universities. I had a good academic record but lacked confidence in my application strategy. The team at Flash Overseas transformed my entire approach. They helped me craft a compelling personal statement that truly reflected my passion for business and social impact. Their mock interview sessions were particularly valuable - I felt completely prepared when the actual interview came. The scholarship guidance they provided helped me secure a 50% tuition waiver, making my Harvard dream financially feasible. Today, I'm thriving in my MBA program and already have job offers from top consulting firms. The investment in Flash Overseas was the best decision I ever made for my career.",
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
      fullStory: "As a computer science graduate from India, I always dreamed of pursuing advanced studies in Canada. However, the visa process seemed daunting and I was worried about rejection. Flash Overseas not only helped me choose the perfect program at UofT but also guided me through every step of the visa application. Their detailed documentation support was exceptional - they even helped me prepare for the visa interview with practice sessions. When I faced a minor issue with my financial documents, their team worked overtime to resolve it within 24 hours. The post-arrival support was equally impressive - they connected me with alumni networks and helped me find accommodation. Now in my second year, I'm working as a research assistant and have already secured a co-op position at a major tech company. The ROI on their services has been incredible.",
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
      fullStory: "Coming from a traditional Chinese family, studying abroad was initially met with resistance. I was torn between family expectations and my career aspirations in engineering. Flash Overseas not only helped me choose the right program but also supported me in convincing my family about the benefits of international education. Their scholarship search was incredibly thorough - they found 8 different funding opportunities I was eligible for. The application process was seamless, and they even helped me prepare for the technical interviews. The cultural orientation sessions they provided were invaluable in helping me adapt to Australian life. Today, I'm not only excelling academically but also working part-time as a research assistant, which is helping me gain practical experience. My family is now proud of my achievements and often recommends Flash Overseas to other students.",
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
      fullStory: "Securing a PhD position at Oxford seemed like an impossible dream, especially with full funding. I had a strong academic background but lacked experience in crafting compelling research proposals and navigating the complex PhD application process. Flash Overseas' PhD guidance program was exceptional. They helped me identify research areas that aligned with my interests and current faculty research at top universities. The research proposal writing workshop was incredibly detailed - they taught me how to structure proposals, write compelling abstracts, and present my research ideas effectively. The mock interviews with current PhD students were invaluable. They also connected me with Oxford alumni who provided insights into the program and research culture. The application strategy they developed was comprehensive, covering everything from selecting recommenders to preparing for interviews. Today, I'm not only pursuing my PhD at Oxford but also working on cutting-edge physics research that has already resulted in two publications. The funding package I received covers all expenses and provides a generous stipend.",
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
      fullStory: "As a data science enthusiast from India, I always dreamed of studying at Stanford. However, the application process seemed overwhelming, especially with the competitive nature of the program. Flash Overseas transformed my entire approach. They helped me identify my unique strengths and craft compelling essays that truly reflected my passion for data science and social impact. The interview preparation was exceptional - they conducted multiple mock sessions and provided detailed feedback on my responses. The scholarship guidance they provided was invaluable, and I was able to secure partial funding. The post-admission support was equally impressive - they helped me with visa processing, accommodation, and even connected me with current students. Today, I'm not only excelling in my master's program but also working on research projects that have real-world applications. The network I've built through Flash Overseas has opened doors to incredible opportunities.",
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
      fullStory: "Germany was always my dream destination for engineering studies, but the language barrier and complex application process seemed daunting. Flash Overseas not only helped me navigate the German university system but also provided comprehensive German language training. The cultural orientation sessions were incredibly detailed, covering everything from academic culture to daily life in Germany. They helped me understand the unique requirements of German universities, including the importance of practical experience and research projects. The visa guidance was exceptional, and they even helped me prepare for the visa interview in German. The post-arrival support was equally impressive - they connected me with alumni networks and helped me find accommodation. Today, I'm not only excelling in my master's program but also working on cutting-edge research projects. The German language skills I developed through their program have opened doors to incredible opportunities in the European job market.",
      video: null,
      year: "2022"
    },
    {
      name: "Jessica Martinez",
      university: "University of Cambridge, UK",
      course: "PhD in Psychology",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "Flash Overseas made my Cambridge dream a reality. Their PhD application guidance was exceptional, and they helped me secure full funding. The research proposal assistance was invaluable.",
      fullStory: "Pursuing a PhD at Cambridge seemed like an impossible dream, especially with the competitive funding landscape. Flash Overseas not only helped me craft a compelling research proposal but also guided me through the complex application process. Their connections with current PhD students at Cambridge provided invaluable insights into the program structure and research culture. The mock interviews with faculty members were particularly helpful, and they even helped me prepare for the rigorous academic assessment. The funding guidance was exceptional - they identified multiple scholarship opportunities and helped me craft winning applications. Today, I'm not only pursuing my PhD at Cambridge but also working on groundbreaking research that has already resulted in publications. The network I've built through Flash Overseas has opened doors to incredible academic opportunities.",
      video: null,
      year: "2023"
    },
    {
      name: "Arjun Singh",
      university: "Massachusetts Institute of Technology, USA",
      course: "Masters in Computer Science",
      image: "https://images.pexels.com/photos/1040884/pexels-photo-1040884.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "Getting into MIT was a dream come true. Flash Overseas helped me with every aspect of the application, from GRE preparation to interview coaching. Their expertise made all the difference.",
      fullStory: "MIT was always my ultimate goal, but the application process seemed overwhelming. Flash Overseas not only helped me prepare for the GRE but also guided me through every step of the MIT application process. Their connections with MIT alumni provided invaluable insights into what the admissions committee looks for. The interview preparation was exceptional - they conducted multiple mock sessions and provided detailed feedback on my responses. The essay guidance was particularly helpful, and they helped me craft compelling personal statements that truly reflected my passion for computer science. Today, I'm not only excelling in my master's program at MIT but also working on cutting-edge research projects. The network I've built through Flash Overseas has opened doors to incredible opportunities in the tech industry.",
      video: null,
      year: "2023"
    },
    {
      name: "Sophie Chen",
      university: "University of Sydney, Australia",
      course: "Masters in Business Administration",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "The MBA program at Sydney was perfect for my career goals. Flash Overseas helped me with GMAT preparation and application strategy. The scholarship guidance was particularly helpful.",
      fullStory: "Pursuing an MBA at the University of Sydney was a strategic decision for my career growth. Flash Overseas not only helped me prepare for the GMAT but also guided me through the entire application process. Their connections with current MBA students provided invaluable insights into the program structure and career opportunities. The scholarship guidance was exceptional - they identified multiple funding opportunities and helped me craft winning applications. The interview preparation was particularly helpful, and they even helped me prepare for the rigorous case study assessments. Today, I'm not only excelling in my MBA program but also working on exciting business projects. The network I've built through Flash Overseas has opened doors to incredible career opportunities in Australia.",
      video: null,
      year: "2022"
    },
    {
      name: "Diego Rodriguez",
      university: "ETH Zurich, Switzerland",
      course: "Masters in Data Science",
      image: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      text: "ETH Zurich was the perfect choice for my data science career. Flash Overseas helped me with the application process and even assisted with German language preparation. The cultural guidance was invaluable.",
      fullStory: "Pursuing a master's in data science at ETH Zurich was a strategic decision for my career in AI and machine learning. Flash Overseas not only helped me navigate the complex application process but also provided comprehensive guidance on the unique requirements of Swiss universities. Their connections with current students at ETH provided invaluable insights into the program structure and research opportunities. The German language preparation was particularly helpful, and they even helped me prepare for the language proficiency requirements. The visa guidance was exceptional, and they helped me understand the Swiss education system. Today, I'm not only excelling in my master's program but also working on cutting-edge research projects in AI. The network I've built through Flash Overseas has opened doors to incredible opportunities in the European tech industry.",
      video: null,
      year: "2023"
    }
  ];



  return (
    <div>
      <SEO 
        title="Student Success Stories & Testimonials | Flash Overseas Hyderabad"
        description="Read inspiring success stories from our students who achieved their study abroad dreams. Real testimonials from students at Harvard, Stanford, Oxford, MIT, and other top universities worldwide."
        keywords="student success stories, study abroad testimonials, flash overseas reviews, student testimonials hyderabad, study abroad success stories, university admission success, visa success stories, study abroad reviews, student feedback, success stories hyderabad, study abroad experiences, university placement success"
        url="https://flashoverseas.com/testimonials"
        pageType="testimonials"
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Student <span className="font-semibold text-primary-600">Success Stories</span>
          </h1>

          <p className="hero-description text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Hear from our successful students who are now studying at top universities worldwide and building their dream careers.
          </p>
        </div>
      </section>


      {/* Featured Testimonials Carousel */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Featured <span className="font-semibold text-primary-600">Success Stories</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover how we helped these students achieve their dreams of studying at top universities.
            </p>
          </div>

          <Carousel 
            className="w-full max-w-5xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CarouselContent ref={carouselRef}>
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <CarouselItem key={index} className="w-full">
                  <div className="p-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                    >
                      <div className="p-8 lg:p-12">
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                          {/* Quote Section */}
                          <div className="flex-1 text-center lg:text-left">
                            <div className="relative mb-8">
                              <Quote className="w-16 h-16 text-primary-200 mx-auto lg:mx-0 mb-6" />
                              <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed italic font-medium">
                                "{testimonial.text}"
                              </blockquote>
                            </div>
                            
                            {/* Author Info */}
                            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                              <div className="relative">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-20 h-20 rounded-full object-cover border-4 border-primary-100 shadow-lg"
                                />
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                              </div>
                              
                              <div className="text-center lg:text-left">
                                <h3 className="text-xl font-bold text-slate-900 mb-1">
                                  {testimonial.name}
                                </h3>
                                <p className="text-primary-600 font-semibold mb-1">
                                  {testimonial.course}
                                </p>
                                <p className="text-slate-600 text-sm mb-3">
                                  {testimonial.university}
                                </p>
                                
                                <div className="flex justify-center lg:justify-start items-center gap-2 mb-3">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                  ))}
                                  <span className="text-sm text-slate-500 ml-2">Class of {testimonial.year}</span>
                                </div>
                                
                                <motion.button
                                  onClick={() => setSelectedTestimonial(index)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                                >
                                  Read Full Story
                                  <ArrowRight className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious api={api} className="left-4" />
            <CarouselNext api={api} className="right-4" />
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.slice(0, 4).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const carousel = carouselRef.current;
                    if (carousel) {
                      carousel.scrollTo({ 
                        left: index * carousel.clientWidth, 
                        behavior: 'smooth' 
                      });
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === index 
                      ? 'bg-primary-500 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </section>

      {/* More Success Stories 3D Scroll */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              More <span className="font-semibold text-primary-600">Success Stories</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every student has a unique journey to success. Here are more inspiring stories from our students.
            </p>
          </div>

          <ThreeDScrollTriggerContainer>
            <ThreeDScrollTriggerRow baseVelocity={2} direction={1}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="mx-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 w-80 sm:w-96 lg:w-[420px] h-[420px] flex-shrink-0 testimonial-card"
                  >
                    <div className="p-4 flex flex-col h-full">
                      {/* Quote Section */}
                      <div className="flex-1 mb-4">
                        <div className="relative mb-3">
                          <Quote className="w-8 h-8 text-primary-200 mb-3" />
                          <blockquote className="text-sm text-slate-700 leading-relaxed italic font-medium testimonial-text line-clamp-4">
                            "{testimonial.text}"
                          </blockquote>
                        </div>
                      </div>
                      
                      {/* Author Info */}
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary-100 shadow-md"
                          />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-slate-900 mb-1">
                            {testimonial.name}
                          </h3>
                          <p className="text-primary-600 font-semibold text-xs mb-1">
                            {testimonial.course}
                          </p>
                          <p className="text-slate-600 text-xs mb-2">
                            {testimonial.university}
                          </p>
                          
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-xs text-slate-500 ml-1">Class of {testimonial.year}</span>
                          </div>
                          
                          <motion.button
                            onClick={() => setSelectedTestimonial(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-xs transition-colors"
                          >
                            Read Full Story
                            <ArrowRight className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </ThreeDScrollTriggerRow>
          </ThreeDScrollTriggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to Write Your <span className="font-semibold text-primary-600">Success Story?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their study abroad dreams with our expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 text-btn hover:shadow-lg hover:shadow-primary-600/25">
              Start Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl max-w-4xl w-full h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.img
                      src={testimonials[selectedTestimonial].image}
                      alt={testimonials[selectedTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <div>
                      <h3 className="text-2xl font-bold">{testimonials[selectedTestimonial].name}</h3>
                      <p className="text-primary-100 font-medium">{testimonials[selectedTestimonial].course}</p>
                      <p className="text-primary-200 text-sm">{testimonials[selectedTestimonial].university}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setSelectedTestimonial(null)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center">
                    {[...Array(testimonials[selectedTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-primary-100">Class of {testimonials[selectedTestimonial].year}</span>
                </div>
          </div>
          
              {/* Modal Content */}
              <div className="p-8 flex-1 overflow-y-auto modal-scroll">
                <div className="flex items-start space-x-4 mb-6">
                  <Quote className="w-8 h-8 text-primary-200 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">Their Journey</h4>
                    <p className="text-slate-700 leading-relaxed text-base">
                      {testimonials[selectedTestimonial].fullStory}
                    </p>
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="bg-slate-50 rounded-xl p-6 mt-6">
                  <h5 className="font-semibold text-slate-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2" />
                    Key Achievements
                  </h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Successfully admitted to {testimonials[selectedTestimonial].university}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Completed {testimonials[selectedTestimonial].course} program</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Maintained {testimonials[selectedTestimonial].rating}-star rating</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Graduated in {testimonials[selectedTestimonial].year}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 px-8 py-8 border-t border-slate-200">
                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    Want to share your success story? <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Contact us</a>
                  </p>
          </div>
        </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;