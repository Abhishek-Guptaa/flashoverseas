import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Users, 
  DollarSign, 
  Clock, 
  GraduationCap, 
  Star, 
  Globe, 
  ArrowRight,
  CheckCircle,
  BookOpen,
  Award,
  Briefcase,
  Home,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DestinationDetail = () => {
  const { country } = useParams();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Icon mapping function
  const getIcon = (iconName: string, className: string = "w-6 h-6") => {
    const icons: { [key: string]: React.ReactNode } = {
      GraduationCap: <GraduationCap className={className} />,
      DollarSign: <DollarSign className={className} />,
      Users: <Users className={className} />,
      Clock: <Clock className={className} />,
      Award: <Award className={className} />,
      BookOpen: <BookOpen className={className} />,
      Globe: <Globe className={className} />,
      Briefcase: <Briefcase className={className} />,
      Star: <Star className={className} />,
      CheckCircle: <CheckCircle className={className} />,
      Home: <Home className={className} />,
      Phone: <Phone className={className} />,
      Mail: <Mail className={className} />,
      Calendar: <Calendar className={className} />
    };
    return icons[iconName] || <div className={className} />;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate hero elements, not content sections
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

      // Content sections will be visible by default (no GSAP animation)
    });

    return () => ctx.revert();
  }, []);

  const destinationData = {
    usa: {
      name: "United States",
      flag: "🇺🇸",
      image: "https://images.pexels.com/photos/290595/pexels-photo-290595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "4,000+",
      avgCost: "$30,000-60,000",
      duration: "4 years (Bachelor's)",
      description: "Home to world's top universities with diverse programs and research opportunities.",
      stats: [
        { icon: "GraduationCap", value: "4,000+", label: "Universities" },
        { icon: "DollarSign", value: "$30k-60k", label: "Annual Tuition" },
        { icon: "Users", value: "1M+", label: "International Students" },
        { icon: "Clock", value: "3 Years", label: "OPT Work Visa" }
      ],
      whyStudy: [
        {
          title: "Prestigious Universities",
          description: "The top universities in the US are some of the world's oldest and most prestigious universities, attracting international students for centuries.",
          icon: "Award"
        },
        {
          title: "Diverse Programs",
          description: "US universities offer a wide range of programs and specializations, allowing students to explore their interests and find their passion.",
          icon: "BookOpen"
        },
        {
          title: "Research Opportunities",
          description: "Strong research and innovation opportunities with access to cutting-edge technology and world-class faculty.",
          icon: "Globe"
        },
        {
          title: "Work Experience",
          description: "Optional Practical Training (OPT) allows students to work in the US for up to 3 years after graduation.",
          icon: "Briefcase"
        }
      ],
      universities: [
        { name: "Harvard University", ranking: "2", popularFor: "Sciences & Engineering" },
        { name: "Stanford University", ranking: "3", popularFor: "Technology & Business" },
        { name: "MIT", ranking: "6", popularFor: "Engineering & Technology" },
        { name: "Yale University", ranking: "18", popularFor: "Humanities & Law" },
        { name: "Princeton University", ranking: "20", popularFor: "Liberal Arts & Sciences" }
      ],
      courses: [
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Computer Science", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Medicine", image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Law", image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Arts & Design", image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "$15,000 - $25,000" },
          { program: "Bachelor's", cost: "$20,000 - $50,000" },
          { program: "Master's", cost: "$25,000 - $60,000" },
          { program: "PhD", cost: "$30,000 - $70,000" }
        ],
        living: [
          { location: "New York", cost: "$2,500 - $4,000" },
          { location: "California", cost: "$2,000 - $3,500" },
          { location: "Texas", cost: "$1,500 - $2,500" },
          { location: "Other States", cost: "$1,200 - $2,000" }
        ]
      },
      requirements: [
        "TOEFL/IELTS for English proficiency (TOEFL: 80+, IELTS: 6.5+)",
        "SAT/ACT for undergraduate programs (SAT: 1200+, ACT: 25+)",
        "GRE/GMAT for graduate programs (GRE: 300+, GMAT: 600+)",
        "Strong academic transcripts (GPA 3.0+)",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation showing ability to pay",
        "Valid passport and student visa (F-1)"
      ],
      scholarships: [
        "Fulbright Foreign Student Program",
        "Hubert H. Humphrey Fellowship Program",
        "AAUW International Fellowships",
        "University-specific merit scholarships",
        "Need-based financial aid",
        "Graduate assistantships and research positions"
      ],
      careerProspects: [
        { sector: "Technology", description: "Silicon Valley and tech hubs offer excellent opportunities" },
        { sector: "Finance", description: "Wall Street and financial centers provide lucrative careers" },
        { sector: "Healthcare", description: "Growing demand for healthcare professionals" },
        { sector: "Engineering", description: "Strong engineering sector with high demand" },
        { sector: "Education", description: "Opportunities in academia and research" },
        { sector: "Consulting", description: "Management consulting and advisory roles" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in the USA?",
          answer: "The cost varies by university and location. Public universities cost $20,000-40,000 annually, while private universities can cost $40,000-70,000. Living expenses range from $1,200-4,000 per month depending on the city."
        },
        {
          question: "Can I study in the USA without IELTS?",
          answer: "Some universities accept alternatives like TOEFL, Duolingo, or PTE. Some also offer conditional admission with English language courses. Check with your chosen university for specific requirements."
        },
        {
          question: "What are the best universities in the USA for international students?",
          answer: "Top universities include Harvard, Stanford, MIT, Yale, Princeton, Columbia, University of Chicago, and many others. The best choice depends on your field of study and career goals."
        },
        {
          question: "How much bank balance is required for a USA student visa?",
          answer: "You need to show sufficient funds to cover tuition and living expenses for the first year. This typically ranges from $50,000-100,000 depending on the university and location."
        },
        {
          question: "How can I get started on my study abroad journey in the USA?",
          answer: "Start by researching universities and programs, take required tests (SAT/ACT, TOEFL/IELTS), prepare application materials, apply to universities, and then apply for a student visa."
        },
        {
          question: "What are the benefits of studying in the USA for international students?",
          answer: "Benefits include world-class education, diverse programs, research opportunities, cultural exposure, networking opportunities, OPT work authorization, and potential pathway to permanent residency."
        },
        {
          question: "How can Indian students apply to USA universities?",
          answer: "Indian students need to complete 12th grade, take SAT/ACT and English proficiency tests, prepare application materials, apply through Common Application or university portals, and then apply for F-1 visa."
        },
        {
          question: "What are the popular courses to study in the USA?",
          answer: "Popular courses include Business Administration, Engineering, Computer Science, Medicine, Law, Arts & Design, Psychology, and Data Science."
        },
        {
          question: "What are the requirements for a USA student visa from India?",
          answer: "Requirements include admission letter, financial documents, passport, visa application form, SEVIS fee payment, visa interview appointment, and proof of ties to home country."
        },
        {
          question: "Can international students work while studying in the USA?",
          answer: "Yes, F-1 students can work on-campus up to 20 hours per week during the semester and full-time during breaks. Off-campus work requires authorization."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in the USA?",
          answer: "Undergraduate programs typically take 4 years, master's programs take 1-2 years, and PhD programs take 4-7 years depending on the field of study."
        },
        {
          question: "Are there any post-study work opportunities in the USA?",
          answer: "Yes, OPT (Optional Practical Training) allows F-1 students to work for up to 12 months (or 24 months for STEM fields) after graduation. H-1B visa is another option for long-term work."
        }
      ]
    },
    uk: {
      name: "United Kingdom",
      flag: "🇬🇧",
      image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "150+",
      avgCost: "$25,000-45,000",
      duration: "3 years (Bachelor's)",
      description: "Rich academic heritage with shorter degree programs and global recognition.",
      stats: [
        { icon: "GraduationCap", value: "150+", label: "Universities" },
        { icon: "DollarSign", value: "£11k-35k", label: "Annual Tuition" },
        { icon: "Users", value: "600k+", label: "International Students" },
        { icon: "Clock", value: "2 Years", label: "Graduate Visa" }
      ],
      whyStudy: [
        {
          title: "Prestigious Universities",
          description: "The UK is home to some of the world's oldest and most prestigious universities, including Oxford and Cambridge.",
          icon: "Award"
        },
        {
          title: "Shorter Degrees",
          description: "UK degrees are typically shorter - 3 years for Bachelor's and 1 year for Master's, saving time and money.",
          icon: "Clock"
        },
        {
          title: "Rich Heritage",
          description: "Experience centuries of academic tradition and cultural heritage in a modern, diverse society.",
          icon: "BookOpen"
        },
        {
          title: "Gateway to Europe",
          description: "Easy access to other European countries for travel, work, and further study opportunities.",
          icon: "Globe"
        }
      ],
      universities: [
        { name: "University of Oxford", ranking: "2", popularFor: "Humanities & Sciences" },
        { name: "University of Cambridge", ranking: "3", popularFor: "Sciences & Engineering" },
        { name: "Imperial College London", ranking: "6", popularFor: "Engineering & Medicine" },
        { name: "UCL", ranking: "8", popularFor: "Arts & Humanities" },
        { name: "King's College London", ranking: "35", popularFor: "Health & Life Sciences" }
      ],
      courses: [
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Law", image: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Medicine", image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Arts & Design", image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Computer Science", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "£10,000 - £20,000" },
          { program: "Bachelor's", cost: "£15,000 - £35,000" },
          { program: "Master's", cost: "£15,000 - £40,000" },
          { program: "PhD", cost: "£20,000 - £45,000" }
        ],
        living: [
          { location: "London", cost: "£1,200 - £2,000" },
          { location: "Manchester", cost: "£800 - £1,200" },
          { location: "Birmingham", cost: "£700 - £1,100" },
          { location: "Other Cities", cost: "£600 - £1,000" }
        ]
      },
      requirements: [
        "IELTS for English proficiency (6.0-7.5 depending on university)",
        "A-levels or equivalent for undergraduate programs",
        "Bachelor's degree for postgraduate programs",
        "Personal Statement",
        "Academic references",
        "Financial documentation",
        "Valid passport and student visa (Tier 4)"
      ],
      scholarships: [
        "Chevening Scholarships",
        "Commonwealth Scholarships",
        "Rhodes Scholarships",
        "University-specific scholarships",
        "Government scholarships",
        "Research council funding"
      ],
      careerProspects: [
        { sector: "Finance", description: "London is a global financial center with excellent opportunities" },
        { sector: "Technology", description: "Growing tech sector with startups and established companies" },
        { sector: "Healthcare", description: "NHS and private healthcare sector opportunities" },
        { sector: "Education", description: "Universities and research institutions" },
        { sector: "Media & Arts", description: "Creative industries and cultural sector" },
        { sector: "Consulting", description: "Management consulting and professional services" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in the UK?",
          answer: "Tuition fees range from £10,000-40,000 annually depending on the university and program. Living costs are £600-2,000 per month depending on location."
        },
        {
          question: "Can I study in the UK without IELTS?",
          answer: "Some universities accept alternatives like TOEFL, PTE, or Cambridge English tests. Some also offer pre-sessional English courses."
        },
        {
          question: "What are the best universities in the UK for international students?",
          answer: "Top universities include Oxford, Cambridge, Imperial College London, UCL, King's College London, and many others across the country."
        },
        {
          question: "How much bank balance is required for a UK student visa?",
          answer: "You need to show £1,334 per month for living costs (up to 9 months) plus tuition fees. This typically ranges from £20,000-50,000 depending on the program."
        },
        {
          question: "How can I get started on my study abroad journey in the UK?",
          answer: "Research universities and programs, take IELTS, prepare application materials, apply through UCAS or directly, and then apply for a Tier 4 student visa."
        },
        {
          question: "What are the benefits of studying in the UK for international students?",
          answer: "Benefits include world-class education, shorter degree programs, cultural diversity, English language environment, post-study work opportunities, and global recognition."
        },
        {
          question: "How can Indian students apply to UK universities?",
          answer: "Indian students need to complete 12th grade, take IELTS, prepare application materials, apply through UCAS or directly, and then apply for a Tier 4 visa."
        },
        {
          question: "What are the popular courses to study in the UK?",
          answer: "Popular courses include Business, Engineering, Medicine, Law, Arts & Design, Computer Science, and Social Sciences."
        },
        {
          question: "What are the requirements for a UK student visa from India?",
          answer: "Requirements include CAS letter, financial documents, passport, visa application, TB test certificate, and proof of English proficiency."
        },
        {
          question: "Can international students work while studying in the UK?",
          answer: "Yes, Tier 4 students can work up to 20 hours per week during term time and full-time during holidays. Some restrictions apply."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in the UK?",
          answer: "Undergraduate programs typically take 3 years, master's programs take 1 year, and PhD programs take 3-4 years."
        },
        {
          question: "Are there any post-study work opportunities in the UK?",
          answer: "Yes, the Graduate Route allows international students to work in the UK for up to 2 years (3 years for PhD graduates) after completing their studies."
        }
      ]
    },
    canada: {
      name: "Canada",
      flag: "🇨🇦",
      image: "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "200+",
      avgCost: "$20,000-40,000",
      duration: "4 years (Bachelor's)",
      description: "High-quality education with affordable costs and excellent post-graduation opportunities.",
      stats: [
        { icon: "GraduationCap", value: "200+", label: "Universities" },
        { icon: "DollarSign", value: "$20k-40k", label: "Annual Tuition" },
        { icon: "Users", value: "642k+", label: "International Students" },
        { icon: "Clock", value: "3 Years", label: "PGWP" }
      ],
      whyStudy: [
        {
          title: "Affordable Education",
          description: "High-quality education at affordable costs compared to US/UK, making it accessible for international students.",
          icon: "DollarSign"
        },
        {
          title: "Post-Graduation Work",
          description: "Post-graduation work permit program allows students to work in Canada for up to 3 years after graduation.",
          icon: "Briefcase"
        },
        {
          title: "Multicultural Society",
          description: "Safe and welcoming multicultural environment with diverse communities and excellent quality of life.",
          icon: "Users"
        },
        {
          title: "Permanent Residency",
          description: "Clear pathway to permanent residency through various immigration programs for international graduates.",
          icon: "Home"
        }
      ],
      universities: [
        { name: "University of Toronto", ranking: "18", popularFor: "Research & Innovation" },
        { name: "McGill University", ranking: "31", popularFor: "Medicine & Law" },
        { name: "University of British Columbia", ranking: "34", popularFor: "Engineering & Business" },
        { name: "University of Alberta", ranking: "111", popularFor: "Engineering & Sciences" },
        { name: "McMaster University", ranking: "152", popularFor: "Health Sciences" }
      ],
      courses: [
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Computer Science", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Medicine", image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Environmental Science", image: "https://images.pexels.com/photos/1070533/pexels-photo-1070533.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Arts & Design", image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "$15,000 - $25,000" },
          { program: "Bachelor's", cost: "$20,000 - $40,000" },
          { program: "Master's", cost: "$25,000 - $45,000" },
          { program: "PhD", cost: "$20,000 - $35,000" }
        ],
        living: [
          { location: "Toronto", cost: "$1,500 - $2,500" },
          { location: "Vancouver", cost: "$1,800 - $2,800" },
          { location: "Montreal", cost: "$1,200 - $2,000" },
          { location: "Other Cities", cost: "$1,000 - $1,800" }
        ]
      },
      requirements: [
        "IELTS/TOEFL for English proficiency (IELTS: 6.0-7.0, TOEFL: 80-100)",
        "High school diploma for undergraduate programs",
        "Bachelor's degree for postgraduate programs",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation showing ability to pay",
        "Medical examination and police clearance",
        "Valid passport and study permit"
      ],
      scholarships: [
        "Vanier Canada Graduate Scholarships",
        "Banting Postdoctoral Fellowships",
        "University-specific merit scholarships",
        "Provincial government scholarships",
        "Research council funding",
        "International student bursaries"
      ],
      careerProspects: [
        { sector: "Technology", description: "Growing tech sector with opportunities in AI, software development" },
        { sector: "Healthcare", description: "High demand for healthcare professionals across provinces" },
        { sector: "Engineering", description: "Strong engineering sector with infrastructure projects" },
        { sector: "Finance", description: "Major financial centers in Toronto and Vancouver" },
        { sector: "Natural Resources", description: "Oil, gas, and mining industries offer excellent opportunities" },
        { sector: "Education", description: "Opportunities in universities and research institutions" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in Canada?",
          answer: "Tuition fees range from $20,000-40,000 annually for international students. Living costs are $1,000-2,800 per month depending on the city."
        },
        {
          question: "Can I work while studying in Canada?",
          answer: "Yes, international students can work up to 20 hours per week during studies and full-time during breaks without a work permit."
        },
        {
          question: "What are the best universities in Canada for international students?",
          answer: "Top universities include University of Toronto, McGill University, UBC, University of Alberta, and McMaster University."
        },
        {
          question: "How much bank balance is required for a Canadian study permit?",
          answer: "You need to show $10,000 CAD plus tuition fees for the first year. This typically ranges from $25,000-50,000 CAD."
        },
        {
          question: "How can I get started on my study abroad journey in Canada?",
          answer: "Research universities and programs, take IELTS/TOEFL, prepare application materials, apply to universities, and then apply for a study permit."
        },
        {
          question: "What are the benefits of studying in Canada for international students?",
          answer: "Benefits include affordable education, post-graduation work permits, multicultural environment, pathway to permanent residency, and high quality of life."
        },
        {
          question: "How can Indian students apply to Canadian universities?",
          answer: "Indian students need to complete 12th grade, take IELTS/TOEFL, prepare application materials, apply directly to universities, and then apply for a study permit."
        },
        {
          question: "What are the popular courses to study in Canada?",
          answer: "Popular courses include Business, Engineering, Computer Science, Medicine, Environmental Science, and Arts & Design."
        },
        {
          question: "What are the requirements for a Canadian study permit from India?",
          answer: "Requirements include acceptance letter, financial documents, passport, study permit application, medical examination, and proof of ties to home country."
        },
        {
          question: "Can international students work after graduation in Canada?",
          answer: "Yes, the Post-Graduation Work Permit (PGWP) allows international students to work in Canada for up to 3 years after graduation."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in Canada?",
          answer: "Undergraduate programs typically take 4 years, master's programs take 1-2 years, and PhD programs take 4-6 years."
        },
        {
          question: "Are there any post-study work opportunities in Canada?",
          answer: "Yes, the PGWP program allows graduates to work for up to 3 years, and there are various pathways to permanent residency through Express Entry."
        }
      ]
    },
    australia: {
      name: "Australia",
      flag: "🇦🇺",
      image: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
      universities: "43",
      avgCost: "$25,000-45,000",
      duration: "3-4 years (Bachelor's)",
      description: "World-class education with beautiful landscapes and excellent work opportunities.",
      stats: [
        { icon: "GraduationCap", value: "43", label: "Universities" },
        { icon: "DollarSign", value: "$25k-45k", label: "Annual Tuition" },
        { icon: "Users", value: "700k+", label: "International Students" },
        { icon: "Clock", value: "2-4 Years", label: "Post-Study Work" }
      ],
      whyStudy: [
        {
          title: "World-Class Universities",
          description: "8 universities rank in the top 100 globally, offering world-class education and research opportunities.",
          icon: "Award"
        },
        {
          title: "Post-Study Work",
          description: "Post-study work visa opportunities allow students to work in Australia for 2-4 years after graduation.",
          icon: "Briefcase"
        },
        {
          title: "Beautiful Lifestyle",
          description: "Beautiful country with great climate, outdoor lifestyle, and high quality of life.",
          icon: "Globe"
        },
        {
          title: "Strong Economy",
          description: "Strong economy and job market with opportunities in various industries and sectors.",
          icon: "DollarSign"
        }
      ],
      universities: [
        { name: "University of Melbourne", ranking: "14", popularFor: "Research & Innovation" },
        { name: "University of Sydney", ranking: "19", popularFor: "Medicine & Law" },
        { name: "Australian National University", ranking: "34", popularFor: "Sciences & Engineering" },
        { name: "University of Queensland", ranking: "43", popularFor: "Business & Health" },
        { name: "Monash University", ranking: "44", popularFor: "Engineering & IT" }
      ],
      courses: [
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Medicine", image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Computer Science", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Environmental Science", image: "https://images.pexels.com/photos/1070533/pexels-photo-1070533.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Tourism & Hospitality", image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "$15,000 - $25,000" },
          { program: "Bachelor's", cost: "$25,000 - $45,000" },
          { program: "Master's", cost: "$30,000 - $50,000" },
          { program: "PhD", cost: "$25,000 - $40,000" }
        ],
        living: [
          { location: "Sydney", cost: "$1,800 - $2,800" },
          { location: "Melbourne", cost: "$1,600 - $2,600" },
          { location: "Brisbane", cost: "$1,400 - $2,200" },
          { location: "Other Cities", cost: "$1,200 - $2,000" }
        ]
      },
      requirements: [
        "IELTS/TOEFL for English proficiency (IELTS: 6.0-7.0, TOEFL: 80-100)",
        "Completion of Year 12 or equivalent for undergraduate",
        "Bachelor's degree for postgraduate programs",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation showing ability to pay",
        "Health insurance (OSHC) and medical examination",
        "Valid passport and student visa (Subclass 500)"
      ],
      scholarships: [
        "Australia Awards Scholarships",
        "Endeavour Postgraduate Scholarship Awards",
        "University-specific merit scholarships",
        "Research Training Program (RTP) scholarships",
        "International student bursaries",
        "Industry-sponsored scholarships"
      ],
      careerProspects: [
        { sector: "Technology", description: "Growing tech sector with opportunities in fintech, AI, and software development" },
        { sector: "Healthcare", description: "High demand for healthcare professionals across all states" },
        { sector: "Mining & Resources", description: "Strong mining sector with excellent career opportunities" },
        { sector: "Tourism & Hospitality", description: "Major tourism industry with diverse career options" },
        { sector: "Education", description: "Opportunities in universities and research institutions" },
        { sector: "Finance", description: "Major financial centers in Sydney and Melbourne" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in Australia?",
          answer: "Tuition fees range from $25,000-45,000 annually for international students. Living costs are $1,200-2,800 per month depending on the city."
        },
        {
          question: "Can I study in Australia without IELTS?",
          answer: "Some universities accept alternatives like TOEFL, PTE, or Cambridge English tests. Some also offer pre-sessional English courses."
        },
        {
          question: "What are the best universities in Australia for international students?",
          answer: "Top universities include University of Melbourne, University of Sydney, ANU, University of Queensland, and Monash University."
        },
        {
          question: "How much bank balance is required for an Australian student visa?",
          answer: "You need to show $21,041 AUD for living costs plus tuition fees. This typically ranges from $30,000-60,000 AUD."
        },
        {
          question: "How can I get started on my study abroad journey in Australia?",
          answer: "Research universities and programs, take IELTS/TOEFL, prepare application materials, apply to universities, and then apply for a student visa."
        },
        {
          question: "What are the benefits of studying in Australia for international students?",
          answer: "Benefits include world-class education, post-study work opportunities, beautiful lifestyle, multicultural environment, and strong job market."
        },
        {
          question: "How can Indian students apply to Australian universities?",
          answer: "Indian students need to complete 12th grade, take IELTS/TOEFL, prepare application materials, apply directly to universities, and then apply for a student visa."
        },
        {
          question: "What are the popular courses to study in Australia?",
          answer: "Popular courses include Business, Engineering, Medicine, Computer Science, Environmental Science, and Tourism & Hospitality."
        },
        {
          question: "What are the requirements for an Australian student visa from India?",
          answer: "Requirements include COE letter, financial documents, passport, visa application, health insurance, and proof of English proficiency."
        },
        {
          question: "Can international students work while studying in Australia?",
          answer: "Yes, student visa holders can work up to 40 hours per fortnight during studies and unlimited hours during breaks."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in Australia?",
          answer: "Undergraduate programs typically take 3-4 years, master's programs take 1-2 years, and PhD programs take 3-4 years."
        },
        {
          question: "Are there any post-study work opportunities in Australia?",
          answer: "Yes, the Temporary Graduate Visa allows international students to work in Australia for 2-4 years after graduation depending on the qualification level."
        }
      ]
    },
    germany: {
      name: "Germany",
      flag: "🇩🇪",
      image: "https://images.pexels.com/photos/2397414/pexels-photo-2397414.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "400+",
      avgCost: "€0-20,000",
      duration: "3-4 years (Bachelor's)",
      description: "Free or low-cost education with world-class universities and strong economy.",
      stats: [
        { icon: "GraduationCap", value: "400+", label: "Universities" },
        { icon: "DollarSign", value: "€0-20k", label: "Annual Tuition" },
        { icon: "Users", value: "350k+", label: "International Students" },
        { icon: "Clock", value: "18 Months", label: "Job Search Visa" }
      ],
      whyStudy: [
        {
          title: "Free Education",
          description: "Many universities offer free education for international students, making it highly affordable.",
          icon: "DollarSign"
        },
        {
          title: "Strong Engineering",
          description: "World-renowned engineering and technology programs with excellent industry connections.",
          icon: "Award"
        },
        {
          title: "EU Opportunities",
          description: "Gateway to Europe with excellent job opportunities across the European Union.",
          icon: "Globe"
        },
        {
          title: "Rich Culture",
          description: "Rich cultural heritage, history, and vibrant student life in major cities.",
          icon: "BookOpen"
        }
      ],
      universities: [
        { name: "Technical University of Munich", ranking: "37", popularFor: "Engineering & Technology" },
        { name: "Ludwig Maximilian University", ranking: "59", popularFor: "Medicine & Sciences" },
        { name: "Heidelberg University", ranking: "65", popularFor: "Medicine & Research" },
        { name: "Karlsruhe Institute of Technology", ranking: "131", popularFor: "Engineering & IT" },
        { name: "Humboldt University Berlin", ranking: "120", popularFor: "Humanities & Social Sciences" }
      ],
      courses: [
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Computer Science", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Medicine", image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Automotive Engineering", image: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Environmental Science", image: "https://images.pexels.com/photos/1070533/pexels-photo-1070533.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "€0 - €5,000" },
          { program: "Bachelor's", cost: "€0 - €20,000" },
          { program: "Master's", cost: "€0 - €25,000" },
          { program: "PhD", cost: "€0 - €15,000" }
        ],
        living: [
          { location: "Munich", cost: "€1,200 - €1,800" },
          { location: "Berlin", cost: "€1,000 - €1,500" },
          { location: "Hamburg", cost: "€1,100 - €1,600" },
          { location: "Other Cities", cost: "€800 - €1,300" }
        ]
      },
      requirements: [
        "German language proficiency (TestDaF, DSH) or English proficiency (IELTS/TOEFL)",
        "Abitur equivalent for undergraduate programs",
        "Bachelor's degree for postgraduate programs",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation (€10,332 per year)",
        "Health insurance and visa documentation",
        "Valid passport and student visa"
      ],
      scholarships: [
        "DAAD Scholarships",
        "Erasmus+ Program",
        "University-specific scholarships",
        "Government scholarships",
        "Industry-sponsored scholarships",
        "Research funding opportunities"
      ],
      careerProspects: [
        { sector: "Automotive", description: "World-leading automotive industry with BMW, Mercedes, Volkswagen" },
        { sector: "Engineering", description: "Strong engineering sector with excellent career opportunities" },
        { sector: "Technology", description: "Growing tech sector with startups and established companies" },
        { sector: "Healthcare", description: "Advanced healthcare system with research opportunities" },
        { sector: "Finance", description: "Major financial center with banking and fintech opportunities" },
        { sector: "Research", description: "World-class research institutions and opportunities" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in Germany?",
          answer: "Most public universities offer free education. Private universities cost €5,000-25,000 annually. Living costs are €800-1,800 per month."
        },
        {
          question: "Can I study in Germany without German language?",
          answer: "Yes, many programs are offered in English, especially at master's level. However, learning German is beneficial for daily life and job opportunities."
        },
        {
          question: "What are the best universities in Germany for international students?",
          answer: "Top universities include TU Munich, LMU Munich, Heidelberg University, KIT, and Humboldt University Berlin."
        },
        {
          question: "How much bank balance is required for a German student visa?",
          answer: "You need to show €10,332 per year in a blocked account. This covers living expenses for one year."
        },
        {
          question: "How can I get started on my study abroad journey in Germany?",
          answer: "Research universities and programs, take language tests, prepare application materials, apply through uni-assist or directly, and then apply for a student visa."
        },
        {
          question: "What are the benefits of studying in Germany for international students?",
          answer: "Benefits include free/low-cost education, world-class universities, strong economy, EU opportunities, and excellent research facilities."
        },
        {
          question: "How can Indian students apply to German universities?",
          answer: "Indian students need to complete 12th grade, take language tests, prepare application materials, apply through uni-assist, and then apply for a student visa."
        },
        {
          question: "What are the popular courses to study in Germany?",
          answer: "Popular courses include Engineering, Computer Science, Medicine, Business, Automotive Engineering, and Environmental Science."
        },
        {
          question: "What are the requirements for a German student visa from India?",
          answer: "Requirements include admission letter, financial documents, passport, visa application, health insurance, and proof of language proficiency."
        },
        {
          question: "Can international students work while studying in Germany?",
          answer: "Yes, international students can work up to 120 full days or 240 half days per year without a work permit."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in Germany?",
          answer: "Undergraduate programs typically take 3-4 years, master's programs take 1-2 years, and PhD programs take 3-5 years."
        },
        {
          question: "Are there any post-study work opportunities in Germany?",
          answer: "Yes, graduates can apply for an 18-month job search visa and then transition to work permits or EU Blue Card for long-term employment."
        }
      ]
    },
    singapore: {
      name: "Singapore",
      flag: "🇸🇬",
      image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "6",
      avgCost: "$15,000-35,000",
      duration: "3-4 years (Bachelor's)",
      description: "Asian hub of education with world-class universities and multicultural environment.",
      stats: [
        { icon: "GraduationCap", value: "6", label: "Universities" },
        { icon: "DollarSign", value: "$15k-35k", label: "Annual Tuition" },
        { icon: "Users", value: "65k+", label: "International Students" },
        { icon: "Clock", value: "1 Year", label: "Work Pass" }
      ],
      whyStudy: [
        {
          title: "Top Global Rankings",
          description: "NUS and NTU rank in the top 20 globally, offering world-class education in Asia.",
          icon: "Award"
        },
        {
          title: "Gateway to Asia",
          description: "Strategic location as gateway to Asia-Pacific region with excellent business opportunities.",
          icon: "Globe"
        },
        {
          title: "Multicultural Society",
          description: "Diverse multicultural society with English as the main language of instruction.",
          icon: "Users"
        },
        {
          title: "Strong Economy",
          description: "Strong economy and job market with opportunities in finance, technology, and trade.",
          icon: "DollarSign"
        }
      ],
      universities: [
        { name: "National University of Singapore", ranking: "8", popularFor: "Engineering & Business" },
        { name: "Nanyang Technological University", ranking: "19", popularFor: "Engineering & Technology" },
        { name: "Singapore Management University", ranking: "511-520", popularFor: "Business & Finance" },
        { name: "Singapore University of Technology", ranking: "801-1000", popularFor: "Technology & Design" },
        { name: "Singapore Institute of Technology", ranking: "1001+", popularFor: "Applied Sciences" }
      ],
      courses: [
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Computer Science", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Finance", image: "https://images.pexels.com/photos/159106/pexels-photo-159106.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Maritime Studies", image: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Tourism & Hospitality", image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "$15,000 - $25,000" },
          { program: "Bachelor's", cost: "$20,000 - $35,000" },
          { program: "Master's", cost: "$25,000 - $40,000" },
          { program: "PhD", cost: "$20,000 - $30,000" }
        ],
        living: [
          { location: "Singapore", cost: "$1,200 - $2,000" },
          { location: "Campus Housing", cost: "$800 - $1,500" },
          { location: "Private Housing", cost: "$1,500 - $2,500" },
          { location: "Shared Housing", cost: "$1,000 - $1,800" }
        ]
      },
      requirements: [
        "IELTS/TOEFL for English proficiency (IELTS: 6.0-7.0, TOEFL: 80-100)",
        "High school completion for undergraduate programs",
        "Bachelor's degree for postgraduate programs",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation showing ability to pay",
        "Medical examination and visa documentation",
        "Valid passport and student pass"
      ],
      scholarships: [
        "Singapore Government Scholarships",
        "ASEAN Scholarships",
        "University-specific merit scholarships",
        "Industry-sponsored scholarships",
        "Research scholarships",
        "International student bursaries"
      ],
      careerProspects: [
        { sector: "Finance", description: "Major financial hub with opportunities in banking, fintech, and investment" },
        { sector: "Technology", description: "Growing tech sector with startups and established companies" },
        { sector: "Maritime", description: "World's busiest port with excellent maritime career opportunities" },
        { sector: "Tourism", description: "Major tourism destination with hospitality and service opportunities" },
        { sector: "Education", description: "Opportunities in universities and research institutions" },
        { sector: "Healthcare", description: "Advanced healthcare system with research and clinical opportunities" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in Singapore?",
          answer: "Tuition fees range from $15,000-35,000 annually for international students. Living costs are $1,200-2,000 per month."
        },
        {
          question: "Can I study in Singapore without IELTS?",
          answer: "Some universities accept alternatives like TOEFL, PTE, or Cambridge English tests. Some also offer pre-sessional English courses."
        },
        {
          question: "What are the best universities in Singapore for international students?",
          answer: "Top universities include NUS, NTU, SMU, SUTD, and SIT, with NUS and NTU ranking in the top 20 globally."
        },
        {
          question: "How much bank balance is required for a Singapore student pass?",
          answer: "You need to show sufficient funds to cover tuition and living expenses. This typically ranges from $30,000-60,000 SGD."
        },
        {
          question: "How can I get started on my study abroad journey in Singapore?",
          answer: "Research universities and programs, take IELTS/TOEFL, prepare application materials, apply to universities, and then apply for a student pass."
        },
        {
          question: "What are the benefits of studying in Singapore for international students?",
          answer: "Benefits include world-class education, multicultural environment, gateway to Asia, strong economy, and excellent job opportunities."
        },
        {
          question: "How can Indian students apply to Singapore universities?",
          answer: "Indian students need to complete 12th grade, take IELTS/TOEFL, prepare application materials, apply directly to universities, and then apply for a student pass."
        },
        {
          question: "What are the popular courses to study in Singapore?",
          answer: "Popular courses include Business, Engineering, Computer Science, Finance, Maritime Studies, and Tourism & Hospitality."
        },
        {
          question: "What are the requirements for a Singapore student pass from India?",
          answer: "Requirements include acceptance letter, financial documents, passport, student pass application, medical examination, and proof of English proficiency."
        },
        {
          question: "Can international students work while studying in Singapore?",
          answer: "Yes, international students can work up to 16 hours per week during studies with permission from the university."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in Singapore?",
          answer: "Undergraduate programs typically take 3-4 years, master's programs take 1-2 years, and PhD programs take 3-5 years."
        },
        {
          question: "Are there any post-study work opportunities in Singapore?",
          answer: "Yes, graduates can apply for a 1-year work pass to seek employment, and then transition to employment passes for long-term work."
        }
      ]
    },
    ireland: {
      name: "Ireland",
      flag: "🇮🇪",
      image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "25+",
      avgCost: "€10,000-25,000",
      duration: "3-4 years (Bachelor's)",
      description: "English-speaking country with excellent universities and vibrant culture.",
      stats: [
        { icon: "GraduationCap", value: "25+", label: "Universities" },
        { icon: "DollarSign", value: "€10k-25k", label: "Annual Tuition" },
        { icon: "Users", value: "35k+", label: "International Students" },
        { icon: "Clock", value: "2 Years", label: "Graduate Visa" }
      ],
      whyStudy: [
        {
          title: "English-Speaking",
          description: "Ireland is an English-speaking country, making it easier for international students to adapt and communicate.",
          icon: "BookOpen"
        },
        {
          title: "EU Opportunities",
          description: "As an EU member, students can work and travel freely across Europe after graduation.",
          icon: "Globe"
        },
        {
          title: "Tech Hub",
          description: "Dublin is a major tech hub with companies like Google, Facebook, and Microsoft having European headquarters.",
          icon: "Award"
        },
        {
          title: "Rich Culture",
          description: "Vibrant culture, friendly people, and beautiful landscapes make Ireland an attractive study destination.",
          icon: "Users"
        }
      ],
      universities: [
        { name: "Trinity College Dublin", ranking: "101", popularFor: "Arts & Humanities" },
        { name: "University College Dublin", ranking: "181", popularFor: "Business & Engineering" },
        { name: "National University of Ireland", ranking: "201-250", popularFor: "Sciences & Medicine" },
        { name: "Dublin City University", ranking: "401-500", popularFor: "Technology & Business" },
        { name: "University of Limerick", ranking: "501-600", popularFor: "Engineering & IT" }
      ],
      courses: [
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Computer Science", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Medicine", image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Arts & Humanities", image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Pharmaceutical Sciences", image: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "€8,000 - €15,000" },
          { program: "Bachelor's", cost: "€10,000 - €25,000" },
          { program: "Master's", cost: "€12,000 - €30,000" },
          { program: "PhD", cost: "€8,000 - €20,000" }
        ],
        living: [
          { location: "Dublin", cost: "€1,200 - €1,800" },
          { location: "Cork", cost: "€900 - €1,400" },
          { location: "Galway", cost: "€800 - €1,300" },
          { location: "Other Cities", cost: "€700 - €1,200" }
        ]
      },
      requirements: [
        "IELTS/TOEFL for English proficiency (IELTS: 6.0-7.0, TOEFL: 80-100)",
        "High school completion for undergraduate programs",
        "Bachelor's degree for postgraduate programs",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation showing ability to pay",
        "Medical insurance and visa documentation",
        "Valid passport and student visa"
      ],
      scholarships: [
        "Government of Ireland Scholarships",
        "Trinity College Dublin Scholarships",
        "University-specific merit scholarships",
        "Research council funding",
        "International student bursaries",
        "Industry-sponsored scholarships"
      ],
      careerProspects: [
        { sector: "Technology", description: "Major tech hub with Google, Facebook, Microsoft European headquarters" },
        { sector: "Pharmaceuticals", description: "Strong pharmaceutical industry with major companies" },
        { sector: "Finance", description: "Dublin is a major European financial center" },
        { sector: "Education", description: "Opportunities in universities and research institutions" },
        { sector: "Healthcare", description: "Advanced healthcare system with research opportunities" },
        { sector: "Tourism", description: "Major tourism industry with hospitality opportunities" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in Ireland?",
          answer: "Tuition fees range from €10,000-25,000 annually for international students. Living costs are €700-1,800 per month depending on the city."
        },
        {
          question: "Can I study in Ireland without IELTS?",
          answer: "Some universities accept alternatives like TOEFL, PTE, or Cambridge English tests. Some also offer pre-sessional English courses."
        },
        {
          question: "What are the best universities in Ireland for international students?",
          answer: "Top universities include Trinity College Dublin, UCD, NUI Galway, DCU, and University of Limerick."
        },
        {
          question: "How much bank balance is required for an Irish student visa?",
          answer: "You need to show €7,000 per year for living costs plus tuition fees. This typically ranges from €20,000-40,000 EUR."
        },
        {
          question: "How can I get started on my study abroad journey in Ireland?",
          answer: "Research universities and programs, take IELTS/TOEFL, prepare application materials, apply to universities, and then apply for a student visa."
        },
        {
          question: "What are the benefits of studying in Ireland for international students?",
          answer: "Benefits include English-speaking environment, EU opportunities, tech hub location, rich culture, and post-study work opportunities."
        },
        {
          question: "How can Indian students apply to Irish universities?",
          answer: "Indian students need to complete 12th grade, take IELTS/TOEFL, prepare application materials, apply directly to universities, and then apply for a student visa."
        },
        {
          question: "What are the popular courses to study in Ireland?",
          answer: "Popular courses include Business, Computer Science, Engineering, Medicine, Arts & Humanities, and Pharmaceutical Sciences."
        },
        {
          question: "What are the requirements for an Irish student visa from India?",
          answer: "Requirements include acceptance letter, financial documents, passport, visa application, medical insurance, and proof of English proficiency."
        },
        {
          question: "Can international students work while studying in Ireland?",
          answer: "Yes, international students can work up to 20 hours per week during studies and full-time during breaks."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in Ireland?",
          answer: "Undergraduate programs typically take 3-4 years, master's programs take 1-2 years, and PhD programs take 3-4 years."
        },
        {
          question: "Are there any post-study work opportunities in Ireland?",
          answer: "Yes, graduates can apply for a 2-year graduate visa to work in Ireland after completing their studies."
        }
      ]
    },
    france: {
      name: "France",
      flag: "🇫🇷",
      image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1200",
      universities: "3,500+",
      avgCost: "€3,000-15,000",
      duration: "3-4 years (Bachelor's)",
      description: "Rich culture, excellent education, and gateway to Europe.",
      stats: [
        { icon: "GraduationCap", value: "3,500+", label: "Universities" },
        { icon: "DollarSign", value: "€3k-15k", label: "Annual Tuition" },
        { icon: "Users", value: "300k+", label: "International Students" },
        { icon: "Clock", value: "2 Years", label: "Post-Study Work" }
      ],
      whyStudy: [
        {
          title: "Affordable Education",
          description: "Public universities offer very affordable tuition fees, making quality education accessible.",
          icon: "DollarSign"
        },
        {
          title: "Rich Culture",
          description: "Rich cultural heritage, art, history, and vibrant student life in major cities.",
          icon: "BookOpen"
        },
        {
          title: "Gateway to Europe",
          description: "Strategic location in Europe with easy access to other European countries.",
          icon: "Globe"
        },
        {
          title: "Strong Programs",
          description: "Excellent programs in business, arts, engineering, and culinary studies.",
          icon: "Award"
        }
      ],
      universities: [
        { name: "Sorbonne University", ranking: "83", popularFor: "Arts & Humanities" },
        { name: "École Polytechnique", ranking: "95", popularFor: "Engineering & Sciences" },
        { name: "PSL University", ranking: "46", popularFor: "Research & Innovation" },
        { name: "Sciences Po", ranking: "242", popularFor: "Social Sciences" },
        { name: "HEC Paris", ranking: "95", popularFor: "Business & Management" }
      ],
      courses: [
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Culinary Arts", image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Fashion Design", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Arts & Design", image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "International Relations", image: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "€3,000 - €8,000" },
          { program: "Bachelor's", cost: "€3,000 - €15,000" },
          { program: "Master's", cost: "€4,000 - €20,000" },
          { program: "PhD", cost: "€3,000 - €12,000" }
        ],
        living: [
          { location: "Paris", cost: "€1,200 - €2,000" },
          { location: "Lyon", cost: "€800 - €1,400" },
          { location: "Marseille", cost: "€700 - €1,200" },
          { location: "Other Cities", cost: "€600 - €1,100" }
        ]
      },
      requirements: [
        "French language proficiency (DELF/DALF) or English proficiency (IELTS/TOEFL)",
        "High school completion for undergraduate programs",
        "Bachelor's degree for postgraduate programs",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation showing ability to pay",
        "Health insurance and visa documentation",
        "Valid passport and student visa"
      ],
      scholarships: [
        "Eiffel Excellence Scholarships",
        "Erasmus+ Program",
        "Campus France Scholarships",
        "University-specific scholarships",
        "Government scholarships",
        "Research funding opportunities"
      ],
      careerProspects: [
        { sector: "Luxury & Fashion", description: "World capital of luxury and fashion with major brands" },
        { sector: "Culinary Arts", description: "Renowned culinary industry and hospitality sector" },
        { sector: "Aerospace", description: "Major aerospace industry with Airbus and other companies" },
        { sector: "Tourism", description: "World's most visited country with tourism opportunities" },
        { sector: "Technology", description: "Growing tech sector with startups and established companies" },
        { sector: "Arts & Culture", description: "Rich cultural sector with museums, galleries, and events" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in France?",
          answer: "Public universities cost €3,000-15,000 annually for international students. Private institutions cost more. Living costs are €600-2,000 per month depending on the city."
        },
        {
          question: "Can I study in France without French language?",
          answer: "Yes, many programs are offered in English, especially at master's level. However, learning French is beneficial for daily life and job opportunities."
        },
        {
          question: "What are the best universities in France for international students?",
          answer: "Top universities include Sorbonne University, École Polytechnique, PSL University, Sciences Po, and HEC Paris."
        },
        {
          question: "How much bank balance is required for a French student visa?",
          answer: "You need to show €615 per month for living costs. This typically ranges from €7,380-14,760 per year."
        },
        {
          question: "How can I get started on my study abroad journey in France?",
          answer: "Research universities and programs, take language tests, prepare application materials, apply through Campus France or directly, and then apply for a student visa."
        },
        {
          question: "What are the benefits of studying in France for international students?",
          answer: "Benefits include affordable education, rich culture, gateway to Europe, excellent programs, and post-study work opportunities."
        },
        {
          question: "How can Indian students apply to French universities?",
          answer: "Indian students need to complete 12th grade, take language tests, prepare application materials, apply through Campus France, and then apply for a student visa."
        },
        {
          question: "What are the popular courses to study in France?",
          answer: "Popular courses include Business, Culinary Arts, Fashion Design, Engineering, Arts & Design, and International Relations."
        },
        {
          question: "What are the requirements for a French student visa from India?",
          answer: "Requirements include acceptance letter, financial documents, passport, visa application, health insurance, and proof of language proficiency."
        },
        {
          question: "Can international students work while studying in France?",
          answer: "Yes, international students can work up to 20 hours per week during studies and full-time during breaks."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in France?",
          answer: "Undergraduate programs typically take 3-4 years, master's programs take 1-2 years, and PhD programs take 3-4 years."
        },
        {
          question: "Are there any post-study work opportunities in France?",
          answer: "Yes, graduates can apply for a 2-year post-study work permit to work in France after completing their studies."
        }
      ]
    },
    netherlands: {
      name: "Netherlands",
      flag: "🇳🇱",
      image: "https://images.pexels.com/photos/249074/pexels-photo-249074.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "50+",
      avgCost: "€8,000-20,000",
      duration: "3-4 years (Bachelor's)",
      description: "Innovative education system with English-taught programs.",
      stats: [
        { icon: "GraduationCap", value: "50+", label: "Universities" },
        { icon: "DollarSign", value: "€8k-20k", label: "Annual Tuition" },
        { icon: "Users", value: "122k+", label: "International Students" },
        { icon: "Clock", value: "1 Year", label: "Orientation Year" }
      ],
      whyStudy: [
        {
          title: "English Programs",
          description: "Many programs are taught in English, making it accessible for international students.",
          icon: "BookOpen"
        },
        {
          title: "Innovative Teaching",
          description: "Innovative teaching methods and interactive learning environment.",
          icon: "Award"
        },
        {
          title: "International Focus",
          description: "Strong international focus with diverse student population.",
          icon: "Globe"
        },
        {
          title: "Quality of Life",
          description: "Excellent quality of life, safety, and work-life balance.",
          icon: "Users"
        }
      ],
      universities: [
        { name: "University of Amsterdam", ranking: "58", popularFor: "Social Sciences" },
        { name: "Delft University of Technology", ranking: "61", popularFor: "Engineering & Technology" },
        { name: "Utrecht University", ranking: "112", popularFor: "Research & Innovation" },
        { name: "Erasmus University Rotterdam", ranking: "197", popularFor: "Business & Economics" },
        { name: "Leiden University", ranking: "131", popularFor: "Arts & Humanities" }
      ],
      courses: [
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Computer Science", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "International Relations", image: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Environmental Science", image: "https://images.pexels.com/photos/1070533/pexels-photo-1070533.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Arts & Design", image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "€6,000 - €12,000" },
          { program: "Bachelor's", cost: "€8,000 - €20,000" },
          { program: "Master's", cost: "€10,000 - €25,000" },
          { program: "PhD", cost: "€8,000 - €18,000" }
        ],
        living: [
          { location: "Amsterdam", cost: "€1,000 - €1,600" },
          { location: "Rotterdam", cost: "€900 - €1,400" },
          { location: "Utrecht", cost: "€800 - €1,300" },
          { location: "Other Cities", cost: "€700 - €1,200" }
        ]
      },
      requirements: [
        "IELTS/TOEFL for English proficiency (IELTS: 6.0-7.0, TOEFL: 80-100)",
        "High school completion for undergraduate programs",
        "Bachelor's degree for postgraduate programs",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation showing ability to pay",
        "Health insurance and visa documentation",
        "Valid passport and student visa"
      ],
      scholarships: [
        "Holland Scholarship",
        "Orange Tulip Scholarship",
        "Erasmus+ Program",
        "University-specific scholarships",
        "Government scholarships",
        "Research funding opportunities"
      ],
      careerProspects: [
        { sector: "Technology", description: "Growing tech sector with startups and established companies" },
        { sector: "Logistics", description: "Major logistics hub with Rotterdam port" },
        { sector: "Finance", description: "Strong financial sector with Amsterdam as major center" },
        { sector: "Agriculture", description: "Advanced agricultural technology and innovation" },
        { sector: "Healthcare", description: "Advanced healthcare system with research opportunities" },
        { sector: "Creative Industries", description: "Strong creative and design sectors" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in the Netherlands?",
          answer: "Tuition fees range from €8,000-20,000 annually for international students. Living costs are €700-1,600 per month depending on the city."
        },
        {
          question: "Can I study in the Netherlands without Dutch language?",
          answer: "Yes, many programs are taught in English, especially at master's level. Dutch language is not required for most programs."
        },
        {
          question: "What are the best universities in the Netherlands for international students?",
          answer: "Top universities include University of Amsterdam, TU Delft, Utrecht University, Erasmus University Rotterdam, and Leiden University."
        },
        {
          question: "How much bank balance is required for a Dutch student visa?",
          answer: "You need to show €10,800 per year for living costs plus tuition fees. This typically ranges from €20,000-35,000 EUR."
        },
        {
          question: "How can I get started on my study abroad journey in the Netherlands?",
          answer: "Research universities and programs, take IELTS/TOEFL, prepare application materials, apply to universities, and then apply for a student visa."
        },
        {
          question: "What are the benefits of studying in the Netherlands for international students?",
          answer: "Benefits include English-taught programs, innovative teaching, international focus, excellent quality of life, and post-study work opportunities."
        },
        {
          question: "How can Indian students apply to Dutch universities?",
          answer: "Indian students need to complete 12th grade, take IELTS/TOEFL, prepare application materials, apply directly to universities, and then apply for a student visa."
        },
        {
          question: "What are the popular courses to study in the Netherlands?",
          answer: "Popular courses include Business, Engineering, Computer Science, International Relations, Environmental Science, and Arts & Design."
        },
        {
          question: "What are the requirements for a Dutch student visa from India?",
          answer: "Requirements include acceptance letter, financial documents, passport, visa application, health insurance, and proof of English proficiency."
        },
        {
          question: "Can international students work while studying in the Netherlands?",
          answer: "Yes, international students can work up to 16 hours per week during studies and full-time during breaks."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in the Netherlands?",
          answer: "Undergraduate programs typically take 3-4 years, master's programs take 1-2 years, and PhD programs take 3-4 years."
        },
        {
          question: "Are there any post-study work opportunities in the Netherlands?",
          answer: "Yes, graduates can apply for a 1-year orientation year visa to work in the Netherlands after completing their studies."
        }
      ]
    },
    "new-zealand": {
      name: "New Zealand",
      flag: "🇳🇿",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "8",
      avgCost: "$20,000-35,000",
      duration: "3-4 years (Bachelor's)",
      description: "Beautiful country with high-quality education and work opportunities.",
      stats: [
        { icon: "GraduationCap", value: "8", label: "Universities" },
        { icon: "DollarSign", value: "$20k-35k", label: "Annual Tuition" },
        { icon: "Users", value: "50k+", label: "International Students" },
        { icon: "Clock", value: "3 Years", label: "Post-Study Work" }
      ],
      whyStudy: [
        {
          title: "Beautiful Landscapes",
          description: "Stunning natural landscapes, outdoor lifestyle, and adventure opportunities.",
          icon: "Globe"
        },
        {
          title: "High Quality of Life",
          description: "Excellent quality of life, safety, and work-life balance.",
          icon: "Users"
        },
        {
          title: "Post-Study Work",
          description: "Post-study work visa opportunities allow students to work for up to 3 years.",
          icon: "Briefcase"
        },
        {
          title: "Safe Environment",
          description: "Safe and welcoming environment with friendly people.",
          icon: "Award"
        }
      ],
      universities: [
        { name: "University of Auckland", ranking: "68", popularFor: "Research & Innovation" },
        { name: "University of Otago", ranking: "217", popularFor: "Medicine & Health" },
        { name: "Victoria University of Wellington", ranking: "223", popularFor: "Arts & Humanities" },
        { name: "University of Canterbury", ranking: "270", popularFor: "Engineering & Sciences" },
        { name: "Massey University", ranking: "292", popularFor: "Agriculture & Veterinary" }
      ],
      courses: [
        { name: "Environmental Science", image: "https://images.pexels.com/photos/1070533/pexels-photo-1070533.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Tourism & Hospitality", image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Agriculture", image: "https://images.pexels.com/photos/1070533/pexels-photo-1070533.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Computer Science", image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "$15,000 - $25,000" },
          { program: "Bachelor's", cost: "$20,000 - $35,000" },
          { program: "Master's", cost: "$25,000 - $40,000" },
          { program: "PhD", cost: "$20,000 - $30,000" }
        ],
        living: [
          { location: "Auckland", cost: "$1,200 - $1,800" },
          { location: "Wellington", cost: "$1,000 - $1,600" },
          { location: "Christchurch", cost: "$900 - $1,400" },
          { location: "Other Cities", cost: "$800 - $1,300" }
        ]
      },
      requirements: [
        "IELTS/TOEFL for English proficiency (IELTS: 6.0-7.0, TOEFL: 80-100)",
        "High school completion for undergraduate programs",
        "Bachelor's degree for postgraduate programs",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation showing ability to pay",
        "Health insurance and visa documentation",
        "Valid passport and student visa"
      ],
      scholarships: [
        "New Zealand Excellence Awards",
        "University-specific merit scholarships",
        "Government scholarships",
        "Research scholarships",
        "International student bursaries",
        "Industry-sponsored scholarships"
      ],
      careerProspects: [
        { sector: "Tourism", description: "Major tourism industry with hospitality and service opportunities" },
        { sector: "Agriculture", description: "Advanced agricultural sector with innovation and technology" },
        { sector: "Technology", description: "Growing tech sector with startups and established companies" },
        { sector: "Healthcare", description: "High-quality healthcare system with research opportunities" },
        { sector: "Education", description: "Opportunities in universities and research institutions" },
        { sector: "Environmental", description: "Strong focus on environmental sustainability and conservation" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in New Zealand?",
          answer: "Tuition fees range from $20,000-35,000 annually for international students. Living costs are $800-1,800 per month depending on the city."
        },
        {
          question: "Can I study in New Zealand without IELTS?",
          answer: "Some universities accept alternatives like TOEFL, PTE, or Cambridge English tests. Some also offer pre-sessional English courses."
        },
        {
          question: "What are the best universities in New Zealand for international students?",
          answer: "Top universities include University of Auckland, University of Otago, Victoria University of Wellington, University of Canterbury, and Massey University."
        },
        {
          question: "How much bank balance is required for a New Zealand student visa?",
          answer: "You need to show $15,000 NZD for living costs plus tuition fees. This typically ranges from $35,000-55,000 NZD."
        },
        {
          question: "How can I get started on my study abroad journey in New Zealand?",
          answer: "Research universities and programs, take IELTS/TOEFL, prepare application materials, apply to universities, and then apply for a student visa."
        },
        {
          question: "What are the benefits of studying in New Zealand for international students?",
          answer: "Benefits include beautiful landscapes, high quality of life, post-study work opportunities, safe environment, and excellent education system."
        },
        {
          question: "How can Indian students apply to New Zealand universities?",
          answer: "Indian students need to complete 12th grade, take IELTS/TOEFL, prepare application materials, apply directly to universities, and then apply for a student visa."
        },
        {
          question: "What are the popular courses to study in New Zealand?",
          answer: "Popular courses include Environmental Science, Tourism & Hospitality, Agriculture, Engineering, Business, and Computer Science."
        },
        {
          question: "What are the requirements for a New Zealand student visa from India?",
          answer: "Requirements include acceptance letter, financial documents, passport, visa application, health insurance, and proof of English proficiency."
        },
        {
          question: "Can international students work while studying in New Zealand?",
          answer: "Yes, international students can work up to 20 hours per week during studies and full-time during breaks."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in New Zealand?",
          answer: "Undergraduate programs typically take 3-4 years, master's programs take 1-2 years, and PhD programs take 3-4 years."
        },
        {
          question: "Are there any post-study work opportunities in New Zealand?",
          answer: "Yes, graduates can apply for a 3-year post-study work visa to work in New Zealand after completing their studies."
        }
      ]
    },
    italy: {
      name: "Italy",
      flag: "🇮🇹",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
      universities: "90+",
      avgCost: "€1,000-4,000",
      duration: "3-4 years (Bachelor's)",
      description: "Rich history, culture, and affordable education in Europe.",
      stats: [
        { icon: "GraduationCap", value: "90+", label: "Universities" },
        { icon: "DollarSign", value: "€1k-4k", label: "Annual Tuition" },
        { icon: "Users", value: "32k+", label: "International Students" },
        { icon: "Clock", value: "1 Year", label: "Post-Study Work" }
      ],
      whyStudy: [
        {
          title: "Affordable Tuition",
          description: "Very affordable tuition fees, especially at public universities.",
          icon: "DollarSign"
        },
        {
          title: "Rich Heritage",
          description: "Rich cultural heritage, art, history, and architecture.",
          icon: "BookOpen"
        },
        {
          title: "EU Benefits",
          description: "EU member with access to European job market and travel.",
          icon: "Globe"
        },
        {
          title: "Arts & Design",
          description: "World-renowned programs in arts, design, and fashion.",
          icon: "Award"
        }
      ],
      universities: [
        { name: "University of Bologna", ranking: "160", popularFor: "Arts & Humanities" },
        { name: "Sapienza University of Rome", ranking: "171", popularFor: "Medicine & Sciences" },
        { name: "University of Milan", ranking: "301-350", popularFor: "Business & Economics" },
        { name: "Politecnico di Milano", ranking: "142", popularFor: "Engineering & Design" },
        { name: "University of Florence", ranking: "401-500", popularFor: "Arts & Culture" }
      ],
      courses: [
        { name: "Fashion Design", image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Culinary Arts", image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Arts & Design", image: "https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Architecture", image: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Engineering", image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400" },
        { name: "Business Management", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400" }
      ],
      costs: {
        tuition: [
          { program: "Foundation Program", cost: "€1,000 - €3,000" },
          { program: "Bachelor's", cost: "€1,000 - €4,000" },
          { program: "Master's", cost: "€1,500 - €5,000" },
          { program: "PhD", cost: "€1,000 - €3,000" }
        ],
        living: [
          { location: "Milan", cost: "€800 - €1,400" },
          { location: "Rome", cost: "€700 - €1,300" },
          { location: "Florence", cost: "€600 - €1,200" },
          { location: "Other Cities", cost: "€500 - €1,000" }
        ]
      },
      requirements: [
        "Italian language proficiency (CELI, CILS) or English proficiency (IELTS/TOEFL)",
        "High school completion for undergraduate programs",
        "Bachelor's degree for postgraduate programs",
        "Statement of Purpose and Letters of Recommendation",
        "Financial documentation showing ability to pay",
        "Health insurance and visa documentation",
        "Valid passport and student visa"
      ],
      scholarships: [
        "Italian Government Scholarships",
        "Erasmus+ Program",
        "University-specific scholarships",
        "Regional scholarships",
        "Research scholarships",
        "International student bursaries"
      ],
      careerProspects: [
        { sector: "Fashion & Design", description: "World capital of fashion with major brands and design houses" },
        { sector: "Culinary Arts", description: "Renowned culinary industry and hospitality sector" },
        { sector: "Tourism", description: "Major tourism destination with hospitality opportunities" },
        { sector: "Arts & Culture", description: "Rich cultural sector with museums, galleries, and events" },
        { sector: "Engineering", description: "Strong engineering sector with automotive and manufacturing" },
        { sector: "Business", description: "Growing business sector with international opportunities" }
      ],
      faqs: [
        {
          question: "What is the cost of studying in Italy?",
          answer: "Public universities cost €1,000-4,000 annually for international students. Private institutions cost more. Living costs are €500-1,400 per month depending on the city."
        },
        {
          question: "Can I study in Italy without Italian language?",
          answer: "Yes, many programs are offered in English, especially at master's level. However, learning Italian is beneficial for daily life and job opportunities."
        },
        {
          question: "What are the best universities in Italy for international students?",
          answer: "Top universities include University of Bologna, Sapienza University of Rome, University of Milan, Politecnico di Milano, and University of Florence."
        },
        {
          question: "How much bank balance is required for an Italian student visa?",
          answer: "You need to show €5,000-6,000 per year for living costs plus tuition fees. This typically ranges from €8,000-12,000 EUR."
        },
        {
          question: "How can I get started on my study abroad journey in Italy?",
          answer: "Research universities and programs, take language tests, prepare application materials, apply to universities, and then apply for a student visa."
        },
        {
          question: "What are the benefits of studying in Italy for international students?",
          answer: "Benefits include affordable education, rich cultural heritage, EU benefits, world-renowned arts programs, and post-study work opportunities."
        },
        {
          question: "How can Indian students apply to Italian universities?",
          answer: "Indian students need to complete 12th grade, take language tests, prepare application materials, apply to universities, and then apply for a student visa."
        },
        {
          question: "What are the popular courses to study in Italy?",
          answer: "Popular courses include Fashion Design, Culinary Arts, Arts & Design, Architecture, Engineering, and Business Management."
        },
        {
          question: "What are the requirements for an Italian student visa from India?",
          answer: "Requirements include acceptance letter, financial documents, passport, visa application, health insurance, and proof of language proficiency."
        },
        {
          question: "Can international students work while studying in Italy?",
          answer: "Yes, international students can work up to 20 hours per week during studies and full-time during breaks."
        },
        {
          question: "What is the duration of undergraduate and postgraduate courses in Italy?",
          answer: "Undergraduate programs typically take 3-4 years, master's programs take 1-2 years, and PhD programs take 3-4 years."
        },
        {
          question: "Are there any post-study work opportunities in Italy?",
          answer: "Yes, graduates can apply for a 1-year post-study work permit to work in Italy after completing their studies."
        }
      ]
    }
  };

  const destination = destinationData[country as keyof typeof destinationData];

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Destination Not Found</h1>
          <p className="text-slate-600 mb-8">The destination you're looking for doesn't exist.</p>
          <Link to="/destinations" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Study in <span className="font-semibold">{destination.name}</span>
            <span className="text-4xl ml-4">{destination.flag}</span>
          </h1>

          <p className="hero-description text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            {destination.description}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {destination.stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-600 mb-4 mx-auto">
                  {getIcon(stat.icon)}
                </div>
                <div className="text-2xl font-semibold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Study Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Why Study in <span className="font-semibold">{destination.name}?</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover the unique advantages and opportunities that make {destination.name} an excellent choice for international students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {destination.whyStudy.map((item, index) => (
              <div key={index} className="group bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(item.icon, "w-8 h-8")}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Top Universities in <span className="font-semibold">{destination.name}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore some of the world's most prestigious universities and find the perfect match for your academic goals.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.universities.map((university, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">{university.name}</h3>
                  <div className="flex items-center space-x-2 text-primary-600">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">#{university.ranking}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">{university.popularFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Popular Courses in <span className="font-semibold">{destination.name}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose from a wide range of programs designed to prepare you for success in your chosen field.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.courses.map((course, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {course.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Cost of Studying in <span className="font-semibold">{destination.name}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Plan your budget with our comprehensive breakdown of tuition fees and living expenses.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                {getIcon("DollarSign", "w-6 h-6 text-primary-600 mr-3")}
                Tuition Fees (Average per annum)
              </h3>
              <div className="space-y-4">
                {destination.costs.tuition.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-700">{item.program}</span>
                    <span className="font-semibold text-slate-900">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
                {getIcon("Home", "w-6 h-6 text-primary-600 mr-3")}
                Living Expenses (Average per month)
              </h3>
              <div className="space-y-4">
                {destination.costs.living.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
                    <span className="text-slate-700">{item.location}</span>
                    <span className="font-semibold text-slate-900">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Requirements to Study in <span className="font-semibold">{destination.name}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ensure you meet all the necessary requirements for a successful application.
            </p>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <div className="grid md:grid-cols-2 gap-6">
              {destination.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {getIcon("CheckCircle", "w-5 h-5 text-primary-600 flex-shrink-0 mt-1")}
                  <span className="text-slate-700">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Scholarships in <span className="font-semibold">{destination.name}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore various scholarship opportunities to help fund your education.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.scholarships.map((scholarship, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3">
                  {getIcon("Award", "w-6 h-6 text-primary-600")}
                  <span className="font-semibold text-slate-900">{scholarship}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Prospects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Career Prospects in <span className="font-semibold">{destination.name}</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover the diverse career opportunities available after graduation.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.careerProspects.map((career, index) => (
              <div key={index} className="group bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  {getIcon("Briefcase", "w-6 h-6 text-primary-600")}
                  <h3 className="font-semibold text-slate-900">{career.sector}</h3>
                </div>
                <p className="text-slate-600 text-sm">{career.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-4">
              Frequently Asked <span className="font-semibold">Questions</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions about studying in {destination.name}.
            </p>
          </div>
          
          <div className="space-y-4">
            {destination.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-semibold text-slate-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Ready to Study in <span className="font-semibold">{destination.name}?</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Get expert guidance and support throughout your application process with our experienced counselors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Book Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="tel:8080030349"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
