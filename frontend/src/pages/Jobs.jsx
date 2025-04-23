import React, { useState } from 'react';
import { FiSearch, FiFilter, FiClock, FiMapPin, FiDollarSign, FiBriefcase, FiStar } from 'react-icons/fi';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for demonstration
  const categories = ['All', 'Design', 'Development', 'Marketing', 'Writing', 'Video', 'Music'];
  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      posted: '2 days ago',
      description: 'We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using React and Node.js.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      logo: 'https://ui-avatars.com/api/?name=TC&background=000&color=fff',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Creative Studios',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$70k - $100k',
      posted: '3 days ago',
      description: 'Join our design team to create beautiful and intuitive user interfaces for our clients. Strong background in user-centered design principles required.',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      logo: 'https://ui-avatars.com/api/?name=CS&background=000&color=fff',
    },
    {
      id: 3,
      title: 'Digital Marketing Manager',
      company: 'Growth Marketing',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$60/hr',
      posted: '1 week ago',
      description: 'Lead our digital marketing initiatives across multiple channels. Experience with SEO, content marketing, and social media management required.',
      skills: ['SEO', 'Content Strategy', 'Social Media', 'Google Analytics'],
      logo: 'https://ui-avatars.com/api/?name=GM&background=000&color=fff',
    },
    {
      id: 4,
      title: 'Mobile App Developer',
      company: 'AppWorks',
      location: 'Remote',
      type: 'Part-time',
      salary: '$50/hr',
      posted: '5 days ago',
      description: 'Develop cross-platform mobile applications using React Native. Experience with iOS and Android development is a plus.',
      skills: ['React Native', 'iOS', 'Android', 'Firebase'],
      logo: 'https://ui-avatars.com/api/?name=AW&background=000&color=fff',
    },
    {
      id: 5,
      title: 'Content Writer',
      company: 'ContentFirst',
      location: 'Remote',
      type: 'Freelance',
      salary: '$40/hr',
      posted: '1 day ago',
      description: 'Create engaging content for technology and business blogs. Strong understanding of SEO and content marketing principles required.',
      skills: ['Content Writing', 'SEO', 'Copywriting', 'Research'],
      logo: 'https://ui-avatars.com/api/?name=CF&background=000&color=fff',
    },
    {
      id: 6,
      title: 'Video Editor',
      company: 'StreamMedia',
      location: 'Los Angeles, CA',
      type: 'Contract',
      salary: '$55/hr',
      posted: '4 days ago',
      description: 'Edit and produce high-quality video content for social media and marketing campaigns. Proficiency in Adobe Creative Suite required.',
      skills: ['Adobe Premiere', 'After Effects', 'Color Grading', 'Motion Graphics'],
      logo: 'https://ui-avatars.com/api/?name=SM&background=000&color=fff',
    }
  ];

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

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Find Your Next Project
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Browse through thousands of opportunities and find the perfect project that matches your skills and interests.
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
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-yellow-400/50 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 rounded-xl object-cover bg-gray-800"
              />
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
                    <span>{job.posted}</span>
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
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
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
              <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs; 