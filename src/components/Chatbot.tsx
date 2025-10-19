import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Phone, Lightbulb, BookOpen, Globe, DollarSign, Clock, Star, RotateCcw, Minus } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
  type?: 'text' | 'info' | 'suggestion' | 'warning' | 'success';
  data?: any;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    course: '',
    budget: '',
    currentEducation: '',
    workExperience: '',
    englishLevel: '',
    timeline: ''
  });
  const [conversationContext, setConversationContext] = useState({
    isReturningUser: false,
    lastInteraction: null,
    interests: [],
    concerns: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart knowledge base
  const knowledgeBase = {
    destinations: {
      'USA': {
        universities: '4,000+ universities',
        cost: '$30,000-60,000 per year',
        duration: '4 years (Bachelor\'s), 2 years (Master\'s)',
        requirements: 'SAT/GRE, IELTS/TOEFL, SOP, LORs',
        highlights: ['World\'s top universities', 'OPT work permit', 'Diverse programs', 'Research opportunities'],
        popularCourses: ['Computer Science', 'Business', 'Engineering', 'Medicine']
      },
      'UK': {
        universities: '150+ universities',
        cost: '£15,000-35,000 per year',
        duration: '3 years (Bachelor\'s), 1 year (Master\'s)',
        requirements: 'IELTS/TOEFL, Personal Statement, References',
        highlights: ['Prestigious universities', 'Shorter duration', 'Post-study work visa', 'Rich culture'],
        popularCourses: ['Business', 'Engineering', 'Medicine', 'Arts']
      },
      'Canada': {
        universities: '200+ universities',
        cost: 'CAD 20,000-40,000 per year',
        duration: '4 years (Bachelor\'s), 2 years (Master\'s)',
        requirements: 'IELTS/TOEFL, SOP, Academic transcripts',
        highlights: ['Affordable education', 'PR pathway', 'Multicultural', 'High quality'],
        popularCourses: ['Computer Science', 'Engineering', 'Business', 'Healthcare']
      },
      'Australia': {
        universities: '43 universities',
        cost: 'AUD 25,000-45,000 per year',
        duration: '3-4 years (Bachelor\'s), 1.5-2 years (Master\'s)',
        requirements: 'IELTS/TOEFL, Academic transcripts, SOP',
        highlights: ['Beautiful country', 'Post-study work visa', 'High quality life', 'Strong economy'],
        popularCourses: ['Engineering', 'Business', 'Medicine', 'IT']
      }
    },
    courses: {
      'Engineering': {
        duration: '4 years (Bachelor\'s), 2 years (Master\'s)',
        requirements: 'Math, Physics, Chemistry background',
        career: 'Software Engineer, Mechanical Engineer, Civil Engineer',
        salary: '$60,000-120,000+'
      },
      'Business': {
        duration: '3-4 years (Bachelor\'s), 1-2 years (Master\'s)',
        requirements: 'Strong analytical skills, Leadership qualities',
        career: 'Business Analyst, Consultant, Manager',
        salary: '$50,000-100,000+'
      },
      'Medicine': {
        duration: '4-6 years (Bachelor\'s), 3-7 years (Specialization)',
        requirements: 'Biology, Chemistry, Physics, MCAT',
        career: 'Doctor, Surgeon, Specialist',
        salary: '$100,000-300,000+'
      }
    },
    commonQuestions: {
      // General Study Abroad
      'scholarship': 'Yes! There are many scholarships available including merit-based, need-based, and country-specific scholarships. Popular ones include Fulbright, Chevening, Commonwealth, and university-specific scholarships.',
      'visa': 'Visa requirements vary by country. Generally, you need: Valid passport, University acceptance letter, Financial proof, Health insurance, IELTS/TOEFL scores, and academic transcripts.',
      'work': 'Most countries allow part-time work during studies (20 hours/week) and full-time during breaks. Post-study work permits vary: USA (OPT), UK (2 years), Canada (3 years), Australia (2-4 years).',
      'cost': 'Costs include: Tuition fees ($10,000-60,000/year), Living expenses ($8,000-15,000/year), Health insurance, Travel, and miscellaneous expenses.',
      'timeline': 'Application timeline: 12-18 months before start date. This includes: Test preparation (3-6 months), University applications (6-12 months), Visa processing (2-8 weeks).',
      
      // Application Process
      'application': 'The application process includes: 1) Choose universities, 2) Prepare documents (transcripts, SOP, LORs), 3) Take required tests (IELTS/TOEFL, GRE/GMAT), 4) Submit applications, 5) Apply for visa.',
      'documents': 'Required documents: Academic transcripts, Statement of Purpose, Letters of Recommendation, IELTS/TOEFL scores, GRE/GMAT scores (if required), Passport, Financial documents.',
      'sop': 'Statement of Purpose (SOP) is a 500-1000 word essay explaining your academic background, career goals, why you chose the program/university, and how it aligns with your future plans.',
      'lor': 'Letters of Recommendation (LOR) are written by professors or employers who can vouch for your academic/professional abilities. You typically need 2-3 LORs.',
      'transcripts': 'Academic transcripts are official records of your academic performance. You need transcripts from all institutions you\'ve attended, usually with official stamps and signatures.',
      
      // Tests and Exams
      'ielts': 'IELTS (International English Language Testing System) is required for most English-speaking countries. You need a minimum band score of 6.0-7.0 depending on the program.',
      'toefl': 'TOEFL (Test of English as a Foreign Language) is accepted by US universities. Minimum score requirements range from 80-100 depending on the program.',
      'gre': 'GRE (Graduate Record Examination) is required for most graduate programs in the US. It tests verbal reasoning, quantitative reasoning, and analytical writing.',
      'gmat': 'GMAT (Graduate Management Admission Test) is required for MBA programs. It tests analytical writing, integrated reasoning, quantitative, and verbal skills.',
      'sat': 'SAT (Scholastic Assessment Test) is required for undergraduate programs in the US. It tests reading, writing, and math skills.',
      
      // Countries and Universities
      'usa': 'USA has 4,000+ universities including top-ranked institutions like Harvard, MIT, Stanford. Cost: $30,000-60,000/year. Duration: 4 years (Bachelor\'s), 2 years (Master\'s).',
      'uk': 'UK has prestigious universities like Oxford, Cambridge. Cost: £15,000-35,000/year. Duration: 3 years (Bachelor\'s), 1 year (Master\'s). Shorter programs save time and money.',
      'canada': 'Canada offers high-quality education at affordable costs. Cost: CAD 20,000-40,000/year. Duration: 4 years (Bachelor\'s), 2 years (Master\'s). Great PR pathway.',
      'australia': 'Australia has 43 universities with 8 in top 100 globally. Cost: AUD 25,000-45,000/year. Duration: 3-4 years (Bachelor\'s), 1.5-2 years (Master\'s).',
      'germany': 'Germany offers free or low-cost education at public universities. Cost: €0-20,000/year. Duration: 3-4 years. Strong engineering and technology programs.',
      
      // Financial Aspects
      'loan': 'Education loans are available from banks like SBI, HDFC, ICICI. You can borrow up to ₹50 lakhs with collateral or ₹20 lakhs without. Interest rates: 8-12%.',
      'funding': 'Funding options include: Scholarships, Education loans, Part-time work, Family savings, Sponsorships, and University financial aid.',
      'part-time': 'Part-time work options: On-campus jobs, Off-campus jobs (with restrictions), Internships, Research assistantships, Teaching assistantships.',
      'living expenses': 'Living expenses vary by country: USA ($12,000-18,000/year), UK (£10,000-15,000/year), Canada (CAD 10,000-15,000/year), Australia (AUD 12,000-18,000/year).',
      
      // Career and Jobs
      'career': 'Study abroad opens doors to global career opportunities, higher salaries, international exposure, and better job prospects in multinational companies.',
      'salary': 'Average starting salaries after study abroad: USA ($50,000-80,000), UK (£25,000-40,000), Canada (CAD 40,000-60,000), Australia (AUD 50,000-70,000).',
      'job market': 'Job markets are strong in STEM fields, business, healthcare, and technology. Countries like Canada and Australia offer easier pathways to permanent residency.',
      'internship': 'Internships provide practical experience, networking opportunities, and often lead to full-time job offers. Many universities have career services to help find internships.',
      
      // Accommodation and Living
      'accommodation': 'Accommodation options: University dormitories, Private apartments, Homestays, Shared housing. Costs vary by location and type.',
      'health insurance': 'Health insurance is mandatory in most countries. University health plans cost $1,000-3,000/year. Private insurance options are also available.',
      'banking': 'You can open a bank account with your passport, visa, and university acceptance letter. International student accounts often have lower fees.',
      'transportation': 'Public transportation is well-developed in most study destinations. Student discounts are available. Consider monthly passes for cost savings.',
      
      // Cultural and Social
      'culture shock': 'Culture shock is normal and temporary. Tips: Stay open-minded, join student clubs, make local friends, explore the city, maintain connections with home.',
      'language': 'English is widely spoken in most study destinations. However, learning basic local language phrases can help with daily life and cultural integration.',
      'food': 'Most countries have diverse food options including Indian restaurants. You can also cook at home. University meal plans are available but can be expensive.',
      'weather': 'Weather varies by country: USA (varies by state), UK (mild, rainy), Canada (cold winters), Australia (warm, sunny). Pack accordingly and buy winter clothes locally.',
      
      // Safety and Support
      'safety': 'Most study destinations are safe for international students. Universities provide safety resources, emergency contacts, and campus security services.',
      'support': 'Universities offer support services: Academic advisors, Career counseling, Mental health services, International student offices, and peer mentoring programs.',
      'emergency': 'Keep emergency contacts handy: University emergency number, Local police, Embassy contact, Family contacts, and health insurance information.',
      
      // Post-Graduation
      'pr': 'Permanent residency pathways vary by country: Canada (Express Entry), Australia (Skilled Migration), UK (Graduate Route), USA (H-1B lottery).',
      'return': 'Many students return to India with international experience, better job prospects, and higher earning potential. Some stay abroad for career opportunities.',
      'alumni': 'University alumni networks provide career opportunities, mentorship, and networking. Many successful professionals are willing to help fellow alumni.'
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Check if returning user
      const lastVisit = localStorage.getItem('chatbot_last_visit');
      const isReturning = lastVisit && (Date.now() - parseInt(lastVisit)) < 7 * 24 * 60 * 60 * 1000; // 7 days
      
      setTimeout(() => {
        if (isReturning) {
          addBotMessage("Welcome back! I remember you were interested in studying abroad. How can I help you today?", [
            "Continue my application", "Ask new questions", "Get expert help"
          ]);
        } else {
          addBotMessage("👋 Hi! I'm EduBot, your AI study abroad assistant. I can help you with:\n\n🎓 University selection\n💰 Cost estimation\n📋 Application guidance\n🎯 Career planning\n\nWhat's your name?", [
            "Browse FAQs", "Start Application", "Ask a Question"
          ], 'info');
        }
      }, 500);
      
      localStorage.setItem('chatbot_last_visit', Date.now().toString());
    }
  }, [isOpen]);

  const addMessage = (text: string, isBot: boolean, options?: string[], type: 'text' | 'info' | 'suggestion' | 'warning' | 'success' = 'text', data?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
      options,
      type,
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string, options?: string[], type: 'text' | 'info' | 'suggestion' | 'warning' | 'success' = 'text', data?: any) => {
    addMessage(text, true, options, type, data);
  };

  const addUserMessage = (text: string) => {
    addMessage(text, false);
  };

  // Smart response analyzer
  const analyzeUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Check for executive connection triggers
    const executiveTriggers = [
      'else', 'different', 'not sure', 'confused', 'help me', 'guide me',
      'executive', 'counselor', 'expert', 'human', 'person', 'talk to someone',
      'speak to', 'connect me', 'call me', 'contact me', 'reach out',
      'complex', 'complicated', 'detailed', 'specific', 'personalized',
      'don\'t know', 'unsure', 'need help', 'assistance', 'support'
    ];
    
    for (const trigger of executiveTriggers) {
      if (lowerInput.includes(trigger)) {
        return { type: 'executive', response: 'I understand you need more personalized assistance. Let me connect you with our expert counselor right away!' };
      }
    }
    
    // Check for common questions - Enhanced FAQ matching
    const faqKeywords = {
      'scholarship': ['scholarship', 'funding', 'financial aid', 'grant', 'bursary'],
      'visa': ['visa', 'immigration', 'permit', 'entry'],
      'work': ['work', 'job', 'employment', 'part-time', 'internship'],
      'cost': ['cost', 'fee', 'expensive', 'price', 'budget', 'money'],
      'timeline': ['time', 'when', 'deadline', 'duration', 'how long'],
      'application': ['application', 'apply', 'process', 'procedure'],
      'documents': ['documents', 'papers', 'certificates', 'transcripts'],
      'sop': ['sop', 'statement of purpose', 'personal statement', 'essay'],
      'lor': ['lor', 'recommendation', 'reference', 'letter'],
      'ielts': ['ielts', 'english test', 'language test'],
      'toefl': ['toefl', 'english test'],
      'gre': ['gre', 'graduate test'],
      'gmat': ['gmat', 'mba test'],
      'sat': ['sat', 'undergraduate test'],
      'usa': ['usa', 'america', 'united states'],
      'uk': ['uk', 'britain', 'england', 'united kingdom'],
      'canada': ['canada', 'canadian'],
      'australia': ['australia', 'australian'],
      'germany': ['germany', 'german'],
      'loan': ['loan', 'borrow', 'debt', 'bank'],
      'accommodation': ['accommodation', 'housing', 'hostel', 'dormitory'],
      'health insurance': ['health', 'insurance', 'medical'],
      'banking': ['bank', 'account', 'money transfer'],
      'culture shock': ['culture', 'shock', 'adapt', 'adjust'],
      'language': ['language', 'english', 'speak'],
      'food': ['food', 'eat', 'restaurant', 'cooking'],
      'weather': ['weather', 'climate', 'cold', 'hot'],
      'safety': ['safe', 'security', 'danger', 'crime'],
      'support': ['support', 'help', 'assistance', 'guidance'],
      'pr': ['pr', 'permanent', 'residency', 'citizenship'],
      'career': ['career', 'job', 'future', 'opportunity'],
      'salary': ['salary', 'income', 'earn', 'wage']
    };

    // Check for FAQ matches
    for (const [key, keywords] of Object.entries(faqKeywords)) {
      for (const keyword of keywords) {
        if (lowerInput.includes(keyword)) {
          return { type: key, response: knowledgeBase.commonQuestions[key] };
        }
      }
    }
    
    // Check for destination mentions
    const destinations = Object.keys(knowledgeBase.destinations);
    for (const dest of destinations) {
      if (lowerInput.includes(dest.toLowerCase())) {
        return { type: 'destination', destination: dest, response: `Great choice! ${dest} is an excellent study destination.` };
      }
    }
    
    // Check for course mentions
    const courses = Object.keys(knowledgeBase.courses);
    for (const course of courses) {
      if (lowerInput.includes(course.toLowerCase())) {
        return { type: 'course', course: course, response: `${course} is a popular choice!` };
      }
    }
    
    return { type: 'general', response: null };
  };

  const handleQuickReply = (option: string) => {
    addUserMessage(option);
    
    // Handle "Other" responses
    if (option === "Other") {
      setTimeout(() => {
        addBotMessage("I understand you're looking for something different! Let me help you explore your options.\n\nWhat specific area are you interested in?", [
          "Tell me more about your interests", "Browse all options", "Get expert guidance", "Ask a specific question"
        ], 'info');
      }, 1000);
      return;
    }
    
    // Handle FAQ browsing
    if (option === "Browse FAQs") {
      setTimeout(() => {
        addBotMessage("📚 **Frequently Asked Questions**\n\nChoose a category to explore:", [
          "General Study Abroad", "Application Process", "Tests & Exams", 
          "Countries & Universities", "Financial & Loans", "Career & Jobs",
          "Living & Accommodation", "Back to Main Menu"
        ], 'info');
      }, 1000);
      return;
    }
    
    // Handle FAQ categories
    if (option === "General Study Abroad") {
      setTimeout(() => {
        addBotMessage("🎓 **General Study Abroad FAQs**\n\nWhat would you like to know?", [
          "Scholarships", "Visa Requirements", "Work Permits", "Costs", "Timeline", "Back"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Application Process") {
      setTimeout(() => {
        addBotMessage("📋 **Application Process FAQs**\n\nWhat would you like to know?", [
          "Application Steps", "Required Documents", "SOP Writing", "LOR Requirements", "Back"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Tests & Exams") {
      setTimeout(() => {
        addBotMessage("📝 **Tests & Exams FAQs**\n\nWhat would you like to know?", [
          "IELTS", "TOEFL", "GRE", "GMAT", "SAT", "Back"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Countries & Universities") {
      setTimeout(() => {
        addBotMessage("🌍 **Countries & Universities FAQs**\n\nWhat would you like to know?", [
          "USA", "UK", "Canada", "Australia", "Germany", "Back"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Financial & Loans") {
      setTimeout(() => {
        addBotMessage("💰 **Financial & Loans FAQs**\n\nWhat would you like to know?", [
          "Education Loans", "Funding Options", "Part-time Work", "Living Expenses", "Back"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Career & Jobs") {
      setTimeout(() => {
        addBotMessage("💼 **Career & Jobs FAQs**\n\nWhat would you like to know?", [
          "Career Opportunities", "Salary Expectations", "Job Market", "Internships", "Back"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Living & Accommodation") {
      setTimeout(() => {
        addBotMessage("🏠 **Living & Accommodation FAQs**\n\nWhat would you like to know?", [
          "Accommodation Options", "Health Insurance", "Banking", "Culture Shock", "Back"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Back to Main Menu" || option === "Back") {
      setTimeout(() => {
        addBotMessage("👋 Hi! I'm EduBot, your AI study abroad assistant. I can help you with:\n\n🎓 University selection\n💰 Cost estimation\n📋 Application guidance\n🎯 Career planning\n\nWhat's your name?", [
          "Browse FAQs", "Start Application", "Ask a Question"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Close Chat") {
      setTimeout(() => {
        addBotMessage("👋 Thank you for chatting with EduBot! I hope I was able to help you with your study abroad questions.\n\nIf you need more assistance in the future, feel free to start a new conversation. Good luck with your study abroad journey! 🎓✨", [], 'success');
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      }, 1000);
      return;
    }
    
    // Handle "Other" follow-up options
    if (option === "Tell me more about your interests") {
      setTimeout(() => {
        addBotMessage("Great! I'd love to learn more about your specific interests. You can tell me about:\n\n• Your academic background\n• Career goals\n• Preferred study location\n• Budget considerations\n• Timeline preferences\n\nWhat would you like to share?", [], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Browse all options") {
      setTimeout(() => {
        addBotMessage("📚 **Frequently Asked Questions**\n\nChoose a category to explore:", [
          "General Study Abroad", "Application Process", "Tests & Exams", 
          "Countries & Universities", "Financial & Loans", "Career & Jobs",
          "Living & Accommodation", "Back to Main Menu"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Get expert guidance") {
      redirectToWhatsApp();
      return;
    }
    
    if (option === "Book Consultant Meeting") {
      setTimeout(() => {
        addBotMessage("📅 **Book a Consultation**\n\nFor personalized, detailed guidance, you can book a dedicated consultation with our expert consultants.\n\nThis is perfect for:\n• Complex application cases\n• Detailed university selection\n• Comprehensive planning sessions\n• One-on-one guidance\n\nChoose your preferred consultation method:", [
          "Schedule a Call", "Ask More Questions", "Close Chat"
        ], 'info');
      }, 1000);
      return;
    }
    
    if (option === "Schedule a Call") {
      setTimeout(() => {
        addBotMessage("📞 **Schedule a Call**\n\nFor a quick phone consultation, you can call us directly at:\n\n📱 **+91 80800 30349**\n\nOur consultants are available:\n• Monday to Friday: 9 AM - 6 PM\n• Saturday: 10 AM - 4 PM\n• Sunday: Closed\n\nOr you can schedule a call for a specific time.", [
          "Call Now", "Ask More Questions", "Close Chat"
        ], 'info');
      }, 1000);
      return;
    }
    
    
    if (option === "Call Now") {
      window.open('tel:+918080030349', '_self');
      setTimeout(() => {
        addBotMessage("📞 I've initiated the call for you! Our consultant will be happy to help with your study abroad questions.\n\nIs there anything else I can help you with while you're here?", [
          "Ask More Questions", "Close Chat"
        ], 'success');
      }, 1000);
      return;
    }
    
    if (option === "Ask a specific question") {
      setTimeout(() => {
        addBotMessage("Perfect! I'm here to help with any specific questions you have about studying abroad. Feel free to ask me about:\n\n• Universities and programs\n• Application requirements\n• Costs and funding\n• Visa processes\n• Career opportunities\n\nWhat would you like to know?", [], 'info');
      }, 1000);
      return;
    }
    
    handleUserResponse(option);
  };

  const handleUserResponse = (response: string) => {
    // Check for chat closing commands first
    const lowerResponse = response.toLowerCase();
    if (lowerResponse.includes('close') || lowerResponse.includes('bye') || lowerResponse.includes('goodbye') || lowerResponse.includes('exit') || lowerResponse.includes('quit')) {
      setTimeout(() => {
        addBotMessage("👋 Thank you for chatting with EduBot! I hope I was able to help you with your study abroad questions.\n\nIf you need more assistance in the future, feel free to start a new conversation. Good luck with your study abroad journey! 🎓✨", [], 'success');
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      }, 1000);
      return;
    }
    
    // First, analyze the input for smart responses
    const analysis = analyzeUserInput(response);
    
    // Handle smart responses first
    if (analysis.type !== 'general' && analysis.response) {
      setTimeout(() => {
        addBotMessage(analysis.response, [], 'info');
        
        // Handle executive connection
        if (analysis.type === 'executive') {
          setTimeout(() => {
            redirectToWhatsApp();
          }, 1500);
          return;
        }
        
        // Provide additional context based on analysis
        if (analysis.type === 'destination' && analysis.destination) {
          const destInfo = knowledgeBase.destinations[analysis.destination];
          if (destInfo) {
            setTimeout(() => {
              addBotMessage(`Here's what you should know about ${analysis.destination}:\n\n🏛️ Universities: ${destInfo.universities}\n💰 Cost: ${destInfo.cost}\n⏱️ Duration: ${destInfo.duration}\n📋 Requirements: ${destInfo.requirements}\n\n✨ Highlights: ${destInfo.highlights.join(', ')}`, [
                "Tell me more", "Compare with other countries", "Get expert help"
              ], 'suggestion');
            }, 1500);
          }
        } else if (analysis.type === 'course' && analysis.course) {
          const courseInfo = knowledgeBase.courses[analysis.course];
          if (courseInfo) {
            setTimeout(() => {
              addBotMessage(`Great choice! Here's about ${analysis.course}:\n\n⏱️ Duration: ${courseInfo.duration}\n📚 Requirements: ${courseInfo.requirements}\n💼 Career: ${courseInfo.career}\n💰 Salary: ${courseInfo.salary}`, [
                "Which universities offer this?", "What are the requirements?", "Get expert guidance"
              ], 'suggestion');
            }, 1500);
          }
        } else {
          setTimeout(() => {
            addBotMessage("Would you like me to help you with anything specific about this topic?", [
              "Tell me more", "Ask another question", "Get expert help"
            ]);
          }, 1500);
        }
      }, 1000);
      return;
    }

    // Handle structured conversation flow
    switch (currentStep) {
      case 0: // Name
        setUserData(prev => ({ ...prev, name: response }));
        setCurrentStep(1);
        setTimeout(() => {
          addBotMessage(`Nice to meet you, ${response}! 👋\n\nTo provide you with the best guidance, I'd like to know a bit more about you. What's your email address?`, [], 'info');
        }, 1000);
        break;

      case 1: // Email
        setUserData(prev => ({ ...prev, email: response }));
        setCurrentStep(2);
        setTimeout(() => {
          addBotMessage("Perfect! 📧\n\nWhat's your current education level?", [
            "12th Grade", "Bachelor's Degree", "Master's Degree", "Other"
          ], 'info');
        }, 1000);
        break;

      case 2: // Education Level
        setUserData(prev => ({ ...prev, currentEducation: response }));
        setCurrentStep(3);
        setTimeout(() => {
          addBotMessage("Great! 🎓\n\nWhich country are you most interested in studying?", [
            "USA", "UK", "Canada", "Australia", "Germany", "Singapore", "Other", "I'm not sure yet"
          ], 'info');
        }, 1000);
        break;

      case 3: // Destination
        setUserData(prev => ({ ...prev, destination: response }));
        setCurrentStep(4);
        setTimeout(() => {
          addBotMessage("Excellent choice! 🌍\n\nWhat field of study interests you most?", [
            "Engineering & Technology", "Business & Management", "Medicine & Healthcare", 
            "Arts & Humanities", "Science & Research", "Other", "I need guidance"
          ], 'info');
        }, 1000);
        break;

      case 4: // Course
        setUserData(prev => ({ ...prev, course: response }));
        setCurrentStep(5);
        setTimeout(() => {
          addBotMessage("Perfect! 📚\n\nWhat's your budget range for studying abroad?", [
            "Under ₹10 Lakhs", "₹10-20 Lakhs", "₹20-30 Lakhs", "₹30+ Lakhs", "I need guidance on costs", "Other"
          ], 'info');
        }, 1000);
        break;

      case 5: // Budget
        setUserData(prev => ({ ...prev, budget: response }));
        setCurrentStep(6);
        setTimeout(() => {
          addBotMessage("Excellent! 💰\n\nWhen are you planning to start your studies?", [
            "Next 6 months", "Next year", "In 2 years", "I'm flexible"
          ], 'info');
        }, 1000);
        break;

      case 6: // Timeline
        setUserData(prev => ({ ...prev, timeline: response }));
        setCurrentStep(7);
        setTimeout(() => {
          providePersonalizedRecommendations();
        }, 1000);
        break;

      case 7: // Recommendations provided
        if (response.toLowerCase().includes('expert') || response.toLowerCase().includes('counselor')) {
          redirectToWhatsApp();
        } else if (response.toLowerCase().includes('more') || response.toLowerCase().includes('questions')) {
          setTimeout(() => {
            addBotMessage("I'm here to help! What would you like to know more about?", [
              "University requirements", "Scholarship opportunities", "Visa process", "Cost breakdown", "Get expert help"
            ], 'suggestion');
          }, 1000);
        } else {
          handleSmartQuestion(response);
        }
        break;

      default:
        handleSmartQuestion(response);
    }
  };

  const handleSmartQuestion = (question: string) => {
    const analysis = analyzeUserInput(question);
    
    if (analysis.type !== 'general' && analysis.response) {
      setTimeout(() => {
        addBotMessage(analysis.response, [
          "Tell me more", "Ask another question", "Get expert help"
        ], 'info');
      }, 1000);
    } else {
      setTimeout(() => {
        addBotMessage("That's a great question! While I can provide general guidance, our expert counselors can give you detailed, personalized advice. Would you like to connect with them?", [
          "Yes, connect me", "Ask another question", "Get basic info"
        ], 'suggestion');
      }, 1000);
    }
  };

  const providePersonalizedRecommendations = () => {
    const destInfo = knowledgeBase.destinations[userData.destination];
    const courseInfo = knowledgeBase.courses[userData.course];
    
    let recommendations = `🎯 **Personalized Recommendations for ${userData.name}**\n\n`;
    
    recommendations += `📋 **Your Profile:**\n`;
    recommendations += `• Education: ${userData.currentEducation}\n`;
    recommendations += `• Destination: ${userData.destination}\n`;
    recommendations += `• Course: ${userData.course}\n`;
    recommendations += `• Budget: ${userData.budget}\n`;
    recommendations += `• Timeline: ${userData.timeline}\n\n`;
    
    if (destInfo) {
      recommendations += `🌍 **About ${userData.destination}:**\n`;
      recommendations += `• ${destInfo.universities}\n`;
      recommendations += `• Cost: ${destInfo.cost}\n`;
      recommendations += `• Duration: ${destInfo.duration}\n`;
      recommendations += `• Requirements: ${destInfo.requirements}\n\n`;
    }
    
    if (courseInfo) {
      recommendations += `📚 **About ${userData.course}:**\n`;
      recommendations += `• Duration: ${courseInfo.duration}\n`;
      recommendations += `• Career: ${courseInfo.career}\n`;
      recommendations += `• Salary: ${courseInfo.salary}\n\n`;
    }
    
    recommendations += `🚀 **Next Steps:**\n`;
    recommendations += `1. Prepare for required tests (IELTS/TOEFL)\n`;
    recommendations += `2. Research specific universities\n`;
    recommendations += `3. Gather required documents\n`;
    recommendations += `4. Apply before deadlines\n\n`;
    
    recommendations += `💡 **Pro Tips:**\n`;
    recommendations += `• Start applications 12-18 months early\n`;
    recommendations += `• Consider scholarship opportunities\n`;
    recommendations += `• Prepare a strong Statement of Purpose\n`;
    recommendations += `• Get recommendation letters from professors\n\n`;
    
    recommendations += `For detailed guidance and personalized assistance, I recommend speaking with our expert counselors who can help you with the entire process!`;

    setTimeout(() => {
      addBotMessage(recommendations, [
        "Get Expert Help", "Ask More Questions", "University Recommendations"
      ], 'success');
    }, 1000);
  };

  const provideBasicInfo = () => {
    const info = `Based on your preferences:

🎓 **Destination**: ${userData.destination}
📚 **Course**: ${userData.course}
💰 **Budget**: ${userData.budget}

**Basic Information:**
• Most universities require IELTS/TOEFL scores
• Application deadlines vary by country
• You'll need academic transcripts and recommendation letters
• Visa processing takes 2-8 weeks depending on country

For detailed guidance on applications, scholarships, and visa processes, I recommend speaking with our expert counselors who can provide personalized assistance.`;

    setTimeout(() => {
      addBotMessage(info, [
        "Speak to Expert", "Ask More Questions"
      ]);
    }, 1000);
  };

  const redirectToWhatsApp = () => {
    let message = `Hi! I'm interested in studying abroad.`;
    
    // Build message with only provided data
    const personalInfo = [];
    const academicInfo = [];
    
    if (userData.name) personalInfo.push(`Name: ${userData.name}`);
    if (userData.email) personalInfo.push(`Email: ${userData.email}`);
    if (userData.phone) personalInfo.push(`Phone: ${userData.phone}`);
    
    if (userData.currentEducation) academicInfo.push(`Current Education: ${userData.currentEducation}`);
    if (userData.destination) academicInfo.push(`Preferred Destination: ${userData.destination}`);
    if (userData.course) academicInfo.push(`Course Interest: ${userData.course}`);
    if (userData.budget) academicInfo.push(`Budget Range: ${userData.budget}`);
    if (userData.timeline) academicInfo.push(`Timeline: ${userData.timeline}`);
    
    // Add sections only if they have data
    if (personalInfo.length > 0) {
      message += `\n\n👤 **Personal Information:**\n${personalInfo.join('\n')}`;
    }
    
    if (academicInfo.length > 0) {
      message += `\n\n🎓 **Academic Profile:**\n${academicInfo.join('\n')}`;
    }
    
    message += `\n\nI'd like to speak with an expert counselor for personalized guidance.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918080030349?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      addBotMessage("🎉 Perfect! I've opened WhatsApp for you to connect with our expert counselors. They'll provide personalized guidance based on your profile.\n\nOur counselors will help you with:\n• University selection\n• Application process\n• Scholarship opportunities\n• Visa guidance\n• Timeline planning\n\nFor complex cases, you can also book a dedicated consultant meeting for detailed planning.", [
        "Ask More Questions", "Book Consultant Meeting", "Close Chat"
      ], 'success');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addUserMessage(inputValue);
      handleUserResponse(inputValue);
      setInputValue('');
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep(0);
    setUserData({
      name: '',
      email: '',
      phone: '',
      destination: '',
      course: '',
      budget: '',
      currentEducation: '',
      workExperience: '',
      englishLevel: '',
      timeline: ''
    });
    setConversationContext({
      isReturningUser: false,
      lastInteraction: null,
      interests: [],
      concerns: []
    });
    setTimeout(() => {
      addBotMessage("👋 Hi! I'm EduBot, your AI study abroad assistant. I can help you with:\n\n🎓 University selection\n💰 Cost estimation\n📋 Application guidance\n🎯 Career planning\n\nWhat's your name?", [], 'info');
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-primary-600 text-white rounded-t-2xl">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">EduBot</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={resetChat}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Reset Chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Close Chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.isBot 
                        ? message.type === 'info' 
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : message.type === 'suggestion'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : message.type === 'warning'
                          ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                          : message.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-800'
                        : 'bg-primary-600 text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      {message.options && (
                        <div className="mt-2 space-y-1">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(option)}
                              className={`block w-full text-left text-xs rounded-lg px-3 py-1 transition-colors ${
                                message.type === 'info' 
                                  ? 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                                  : message.type === 'suggestion'
                                  ? 'bg-green-100 hover:bg-green-200 text-green-700'
                                  : message.type === 'success'
                                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  type="submit"
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
