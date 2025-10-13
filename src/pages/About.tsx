import React from 'react';
import { CheckCircle, Award, Users, Globe, Target, Heart, Lightbulb } from 'lucide-react';
import ScrollReveal from '@/hooks/ScrollReveal';
import useCounter from '@/hooks/useCounter';

const About = () => {
  const achievements = [
  { icon: <Users className="w-8 h-8" />, number: 15000, suffix: "+", label: "Students Counseled" },
  { icon: <Award className="w-8 h-8" />, number: 98, suffix: "%", label: "Success Rate" },
  { icon: <Globe className="w-8 h-8" />, number: 25, suffix: "+", label: "Countries" },
  { icon: <CheckCircle className="w-8 h-8" />, number: 15, suffix: "+", label: "Years Experience" }
];


  const values = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, ensuring the highest quality guidance for our students."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Integrity",
      description: "We maintain the highest standards of honesty and transparency in all our interactions with students and partners."
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Innovation",
      description: "We continuously innovate our processes and services to provide the best possible experience for our students."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      position: "Founder & CEO",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      experience: "15+ years in international education",
      education: "PhD in Education, Harvard University"
    },
    {
      name: "Michael Chen",
      position: "Director of Counseling",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      experience: "12+ years in student counseling",
      education: "Masters in Psychology, Oxford University"
    },
    {
      name: "Emily Rodriguez",
      position: "Visa Specialist",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      experience: "10+ years in visa processing",
      education: "LLB in Immigration Law, University of Toronto"
    },
    {
      name: "David Kumar",
      position: "Test Prep Coordinator",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      experience: "8+ years in test preparation",
      education: "Masters in English Literature, Cambridge"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className=" py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            About US
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Your trusted partner in international education with over 15 years of experience helping students achieve their dreams of studying abroad.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-regular text-secondary-900">Our Story</h2>
           

<ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
>
  Flash Overseas is a trusted and dedicated
   consultancy committed to guiding students, 
   professionals, and aspiring migrants toward 
   their dreams of studying and working abroad. 
   With a strong focus on personalized support, 
   we ensure every client receives expert guidance 
   tailored to their unique goals, whether it’s securing admission in top universities, obtaining visas, or exploring global career opportunities.
</ScrollReveal>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg"
                alt="Our story"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 px-40 bg-secondary-50">
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {achievements.map((achievement, index) => {
    const count = useCounter(achievement.number, 2); // Animate to number in 2 seconds
    return (
      <div key={index} className="text-center p-8 bg-white rounded-xl shadow-sm">
        <div className="text-primary-600 flex justify-center mb-4">
          {achievement.icon}
        </div>
        <div className="text-3xl font-bold text-secondary-900 mb-2">
          {count}{achievement.label.includes("%") ? "%" : "+"}
        </div>
        <div className="text-secondary-600">{achievement.label}</div>
      </div>
    );
  })}
</div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Values</h2>
            <p className="text-xl text-secondary-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-primary-600 flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">{value.title}</h3>
                <p className="text-secondary-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-secondary-600">Experienced professionals dedicated to your success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                  <p className="text-sm text-secondary-600 mb-2">{member.experience}</p>
                  <p className="text-sm text-secondary-500">{member.education}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-primary-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">Our Mission</h3>
              <p className="text-lg text-secondary-600 leading-relaxed">
                To empower students with the knowledge, guidance, and support they need to successfully pursue their educational dreams abroad, while ensuring they make informed decisions that align with their career goals and personal aspirations.
              </p>
            </div>
            
            <div className="bg-secondary-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">Our Vision</h3>
              <p className="text-lg text-secondary-600 leading-relaxed">
                To be the world's most trusted and comprehensive study abroad consultancy, recognized for our commitment to student success, innovative approach, and the positive impact we create in the lives of students and their families.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;