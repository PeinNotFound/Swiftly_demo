import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiClock, FiMapPin, FiDollarSign, FiBriefcase, FiPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { jobService } from '../services/jobService';

const Jobs = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'Design', 'Development', 'Marketing', 'Writing', 'Video', 'Music'];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getAllJobs();
        setJobs(response.jobs);
        setLoading(false);
      } catch (err) {
        console.error('Error in Jobs component:', err);
        let errorMessage = 'Failed to fetch jobs. Please try again later.';
        
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = `Error ${err.response.status}: ${err.response.data.message || 'Server error'}`;
        } else if (err.request) {
          // The request was made but no response was received
          errorMessage = 'No response from server. Please check your connection.';
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = err.message || errorMessage;
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search query and category
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'design' && job.skills.some(skill => ['Figma', 'Adobe XD', 'UI/UX', 'User Research'].includes(skill))) ||
      (selectedCategory === 'development' && job.skills.some(skill => ['React', 'Node.js', 'JavaScript', 'Python'].includes(skill))) ||
      (selectedCategory === 'marketing' && job.skills.some(skill => ['SEO', 'Content Strategy', 'Social Media'].includes(skill))) ||
      (selectedCategory === 'writing' && job.skills.some(skill => ['Content Writing', 'Copywriting', 'Technical Writing'].includes(skill))) ||
      (selectedCategory === 'video' && job.skills.some(skill => ['Adobe Premiere', 'After Effects', 'Video Editing'].includes(skill))) ||
      (selectedCategory === 'music' && job.skills.some(skill => ['Audio Production', 'Music Composition', 'Sound Design'].includes(skill)));

    return matchesSearch && matchesCategory;
  });

  const handlePostJob = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/post-job');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400">Loading jobs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Find Your Next Project
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Browse through thousands of opportunities and find the perfect project that matches your skills and interests.
            </p>
          </div>
          <button
            onClick={handlePostJob}
            className="flex items-center px-6 py-3 bg-yellow-400 text-black rounded-xl font-medium hover:bg-yellow-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            <FiPlus className="mr-2" />
            Post a Job
          </button>
        </div>
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
                placeholder="Search jobs, skills, or keywords..."
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

      {/* Jobs List */}
      <div className="max-w-7xl mx-auto space-y-6">
        {filteredJobs.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No jobs found matching your criteria.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{job.company.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-400">{job.company}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-lg text-sm">
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <FiMapPin className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FiDollarSign className="mr-1" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="mr-1" />
                      <span>{new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <FiBriefcase className="mr-1" />
                      <span>{job.type}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-400 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => navigate(`/job/${job.id}`)}
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs; 