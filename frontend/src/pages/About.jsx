import React from 'react';
import { FiTarget, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Active Freelancers', value: '50K+', icon: FiUsers },
    { label: 'Projects Completed', value: '100K+', icon: FiAward },
    { label: 'Client Satisfaction', value: '98%', icon: FiTarget },
    { label: 'Growth YoY', value: '125%', icon: FiTrendingUp },
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries to create better ways of connecting talent with opportunity.',
    },
    {
      title: 'Quality',
      description: 'We maintain high standards in every aspect of our platform and service delivery.',
    },
    {
      title: 'Integrity',
      description: 'We operate with complete transparency and honesty in all our dealings.',
    },
    {
      title: 'Community',
      description: 'We foster a supportive environment where freelancers and clients can thrive together.',
    },
  ];

  const team = [
    {
      name: 'Ahmed Hmimida',
      role: 'CEO & Co-founder',
      image: 'https://ui-avatars.com/api/?name=AH&background=fbbf24&color=000&size=128&bold=true',
    },
    {
      name: 'Zakarya Ziate',
      role: 'CTO & Co-founder',
      image: 'https://ui-avatars.com/api/?name=ZZ&background=fbbf24&color=000&size=128&bold=true',
    },
    {
      name: 'Saad Outlite',
      role: 'Head of Operations',
      image: 'https://ui-avatars.com/api/?name=SO&background=fbbf24&color=000&size=128&bold=true',
    },
    {
      name: 'Hamza Khabidi',
      role: 'Head of Product',
      image: 'https://ui-avatars.com/api/?name=HK&background=fbbf24&color=000&size=128&bold=true',
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 pb-10 bg-clip-text text-transparent">
          About Swiftly
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto">
          We're revolutionizing the way talent connects with opportunity. Our platform brings together the world's best freelancers with innovative companies.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-4">
                <stat.icon className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-400 text-lg mb-8">
            At Swiftly, we believe in creating a world where talent knows no boundaries. Our mission is to empower freelancers and businesses alike by providing a platform that makes collaboration seamless, secure, and successful. We're committed to fostering a global community where skills are valued, opportunities are abundant, and success is achievable for everyone.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 group"
            >
              <div className="relative mb-6">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto pb-[70px]">
        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a freelancer looking for exciting projects or a business seeking top talent, Swiftly is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
              >
                Join as Freelancer
              </Link>
              <Link
                to="/freelancers"
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-medium transition-all duration-200"
              >
                Find Talent
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 transform rotate-12"></div>
        </div>
      </div>
    </div>
  );
};

export default About; 