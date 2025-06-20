import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiStar, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { freelancerService } from '../services/freelancerService';

const Freelancers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real freelancers from backend
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const response = await freelancerService.getFreelancers();
        console.log('Freelancers response:', response); // Debug log
        
        if (!response || !response.freelancers) {
          console.error('Invalid response format:', response);
          setError('Invalid response format from server');
          return;
        }

        if (!Array.isArray(response.freelancers)) {
          console.error('Freelancers data is not an array:', response.freelancers);
          setError('Invalid freelancers data format');
          return;
        }

        setFreelancers(response.freelancers);
        setError(null);
      } catch (err) {
        console.error('Error fetching freelancers:', err);
        setError(err.message || 'Failed to fetch freelancers');
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  // Demo categories (can be dynamic if you want)
  const categories = ['All', 'Design', 'Development', 'Marketing', 'Writing', 'Video', 'Music'];

  // Filter freelancers based on search query and category
  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (freelancer.title && freelancer.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (freelancer.skills && freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())));

    // You can enhance this to match categories if you store them in the DB
    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'design' && freelancer.skills && freelancer.skills.some(skill => ['Figma', 'Adobe XD', 'UI/UX', 'User Research'].includes(skill))) ||
      (selectedCategory === 'development' && freelancer.skills && freelancer.skills.some(skill => ['React', 'Node.js', 'JavaScript', 'Python'].includes(skill))) ||
      (selectedCategory === 'marketing' && freelancer.skills && freelancer.skills.some(skill => ['SEO', 'Content Strategy', 'Social Media'].includes(skill))) ||
      (selectedCategory === 'writing' && freelancer.skills && freelancer.skills.some(skill => ['Content Writing', 'Copywriting', 'Technical Writing'].includes(skill))) ||
      (selectedCategory === 'video' && freelancer.skills && freelancer.skills.some(skill => ['Adobe Premiere', 'After Effects', 'Video Editing'].includes(skill))) ||
      (selectedCategory === 'music' && freelancer.skills && freelancer.skills.some(skill => ['Audio Production', 'Music Composition', 'Sound Design'].includes(skill)));

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

      {/* Loading/Error States */}
      {loading && (
        <div className="text-center text-yellow-400 py-12 text-xl">Loading freelancers...</div>
      )}
      {error && (
        <div className="text-center text-red-500 py-12 text-xl">{error}</div>
      )}

      {/* Freelancers Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((freelancer) => (
            <div
              key={freelancer.id}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={freelancer.profile_picture || '/default-avatar.png'}
                  alt={freelancer.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                    {freelancer.name}
                  </h3>
                  <p className="text-gray-400">{freelancer.title || 'Freelancer'}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center text-yellow-400">
                  <FiStar className="mr-1" />
                  <span>{freelancer.rating || 'N/A'}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FiMapPin className="mr-1" />
                  <span>{freelancer.location || 'Remote'}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FiDollarSign className="mr-1" />
                  <span>${freelancer.hourly_rate || 'N/A'}/hr</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(freelancer.skills) ? (
                    freelancer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm">
                      No skills listed
                    </span>
                  )}
                </div>
              </div>

              <Link to={`/freelancer/${freelancer.id}`} className="mt-6 w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] block text-center">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Freelancers; 