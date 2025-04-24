import React, { useState } from 'react';
import { FiSearch, FiFilter, FiStar, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Freelancers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for demonstration
  const categories = ['All', 'Design', 'Development', 'Marketing', 'Writing', 'Video', 'Music'];
  const freelancers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'UI/UX Designer',
      rating: 4.9,
      hourlyRate: 85,
      location: 'San Francisco, CA',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Full Stack Developer',
      rating: 4.8,
      hourlyRate: 95,
      location: 'New York, NY',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Digital Marketing Specialist',
      rating: 4.7,
      hourlyRate: 65,
      location: 'Miami, FL',
      skills: ['SEO', 'Social Media', 'Content Strategy', 'Google Analytics'],
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Mobile App Developer',
      rating: 4.9,
      hourlyRate: 90,
      location: 'Remote',
      skills: ['React Native', 'iOS', 'Android', 'Flutter'],
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      title: 'Content Writer',
      rating: 4.8,
      hourlyRate: 55,
      location: 'London, UK',
      skills: ['Copywriting', 'Blog Writing', 'Technical Writing', 'SEO'],
      image: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
      id: 6,
      name: 'James Wilson',
      title: 'Video Editor',
      rating: 4.9,
      hourlyRate: 75,
      location: 'Los Angeles, CA',
      skills: ['Adobe Premiere', 'After Effects', 'DaVinci Resolve', 'Motion Graphics'],
      image: 'https://randomuser.me/api/portraits/men/6.jpg',
    }
  ];

  // Filter freelancers based on search query and category
  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'design' && freelancer.skills.some(skill => ['Figma', 'Adobe XD', 'UI/UX', 'User Research'].includes(skill))) ||
      (selectedCategory === 'development' && freelancer.skills.some(skill => ['React', 'Node.js', 'JavaScript', 'Python'].includes(skill))) ||
      (selectedCategory === 'marketing' && freelancer.skills.some(skill => ['SEO', 'Content Strategy', 'Social Media'].includes(skill))) ||
      (selectedCategory === 'writing' && freelancer.skills.some(skill => ['Content Writing', 'Copywriting', 'Technical Writing'].includes(skill))) ||
      (selectedCategory === 'video' && freelancer.skills.some(skill => ['Adobe Premiere', 'After Effects', 'Video Editing'].includes(skill))) ||
      (selectedCategory === 'music' && freelancer.skills.some(skill => ['Audio Production', 'Music Composition', 'Sound Design'].includes(skill)));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Find Expert Freelancers
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Connect with talented freelancers for your next project. Browse portfolios and find the perfect match for your needs.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search freelancers, skills, or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            {/* Filter Button */}
            <button className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-all duration-200 border border-gray-700">
              <FiFilter className="mr-2" />
              Filters
            </button>
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Freelancers Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelancers.map((freelancer) => (
          <div
            key={freelancer.id}
            className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <img
                src={freelancer.image}
                alt={freelancer.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                  {freelancer.name}
                </h3>
                <p className="text-gray-400">{freelancer.title}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center text-yellow-400">
                <FiStar className="mr-1" />
                <span>{freelancer.rating}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiMapPin className="mr-1" />
                <span>{freelancer.location}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiDollarSign className="mr-1" />
                <span>${freelancer.hourlyRate}/hr</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button className="mt-6 w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]">
            <Link to={`/freelancer/${freelancer.id}`}>View Profile</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Freelancers; 