// src/components/Faq.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Why should I choose Flash Overseas?",
    answer:
      "Flash Overseas provides end-to-end guidance for your study abroad journey, from university selection and application support to visa assistance and test preparation. Our high success rate and expert team make us a trusted choice.",
  },
  {
    question: "Do you help with visa applications?",
    answer:
      "Yes! Our team provides complete visa guidance with a strong track record of approvals. We ensure your documentation and application process is smooth and stress-free.",
  },
  {
    question: "Which countries can I study in through Flash Overseas?",
    answer:
      "We help students reach top universities in Australia, Canada, USA, UK, and over 20+ countries worldwide.",
  },
  {
    question: "Do you offer coaching for exams like IELTS or GRE?",
    answer:
      "Absolutely. We provide personalized coaching for IELTS, TOEFL, GRE, and GMAT to help you achieve the scores you need.",
  },
  {
    question: "How can I get started?",
    answer:
      "Simply fill out the contact form on our website or schedule a call with our counselors. We’ll guide you through every step of the process.",
  },
  {
  question: "Is the consultation free?",
  answer:
    "Yes, our first consultation session is completely free. We’ll assess your profile and suggest the best path for your study abroad plans.",
},
{
  question: "Do you help with scholarships?",
  answer:
    "Definitely. We guide students in finding scholarships and financial aid opportunities that suit their profile and chosen university.",
},
{
  question: "How long does the application process take?",
  answer:
    "On average, the application process takes 4–8 weeks depending on the university and country requirements. Our team ensures it’s as smooth and quick as possible.",
},
{
  question: "Can I work while studying abroad?",
  answer:
    "Yes! Many countries allow part-time work for international students. We guide you with regulations and opportunities once you’re admitted.",
},

];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // Section fade-in
    gsap.fromTo(
      sectionRef.current,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // FAQ items stagger animation
    gsap.fromTo(
      itemsRef.current,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center py-20"
    >
      <div className="max-w-5xl mx-auto px-6 w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about studying abroad with Flash Overseas
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-gray-800 font-medium hover:bg-gray-50 transition-colors"
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-primary-600" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 py-3 text-gray-600 text-sm bg-gray-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
