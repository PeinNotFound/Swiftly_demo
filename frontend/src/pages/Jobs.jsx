import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'web-dev', name: 'Web Development' },
    { id: 'design', name: 'Design' },
    { id: 'writing', name: 'Writing' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'mobile-dev', name: 'Mobile Development' },
    { id: 'data-science', name: 'Data Science' },
  ];

  const budgetRanges = [
    { id: 'all', name: 'All Budgets' },
    { id: 'small', name: 'Under $500' },
    { id: 'medium', name: '$500 - $1000' },
    { id: 'large', name: '$1000 - $5000' },
    { id: 'enterprise', name: 'Over $5000' },
  ];

  const jobs = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      client: 'Fashion Retail Co.',
      category: 'web-dev',
      budget: 'medium',
      budgetAmount: '$800',
      postedDate: '2023-06-15',
      description: 'Looking for a developer to create a modern e-commerce website with product catalog, shopping cart, and payment integration.',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      proposals: 12,
      clientRating: 4.8,
      clientReviews: 24,
    },
    {
      id: 2,
      title: 'Logo and Brand Identity Design',
      client: 'Tech Startup Inc.',
      category: 'design',
      budget: 'small',
      budgetAmount: '$400',
      postedDate: '2023-06-14',
      description: 'Need a professional logo and brand identity for our new tech startup. Looking for a modern, clean design that represents innovation.',
      skills: ['Logo Design', 'Branding', 'Adobe Illustrator'],
      proposals: 8,
      clientRating: 4.5,
      clientReviews: 15,
    },
    {
      id: 3,
      title: 'Content Writing for Tech Blog',
      client: 'Digital Insights',
      category: 'writing',
      budget: 'small',
      budgetAmount: '$300',
      postedDate: '2023-06-13',
      description: 'Seeking a tech-savvy writer to create engaging blog posts about the latest technology trends and innovations.',
      skills: ['Content Writing', 'SEO', 'Tech Knowledge'],
      proposals: 15,
      clientRating: 4.9,
      clientReviews: 32,
    },
    {
      id: 4,
      title: 'Social Media Marketing Campaign',
      client: 'Fitness Brand',
      category: 'marketing',
      budget: 'medium',
      budgetAmount: '$750',
      postedDate: '2023-06-12',
      description: 'Need a social media expert to create and manage a 3-month marketing campaign for our fitness brand across multiple platforms.',
      skills: ['Social Media Marketing', 'Content Creation', 'Analytics'],
      proposals: 10,
      clientRating: 4.7,
      clientReviews: 18,
    },
    {
      id: 5,
      title: 'iOS App Development',
      client: 'Health & Wellness',
      category: 'mobile-dev',
      budget: 'large',
      budgetAmount: '$2500',
      postedDate: '2023-06-11',
      description: 'Looking for an experienced iOS developer to create a health tracking app with features for workout plans, nutrition tracking, and progress monitoring.',
      skills: ['Swift', 'iOS Development', 'HealthKit', 'UI/UX Design'],
      proposals: 6,
      clientRating: 4.6,
      clientReviews: 12,
    },
    {
      id: 6,
      title: 'Data Analysis for Market Research',
      client: 'Consulting Firm',
      category: 'data-science',
      budget: 'enterprise',
      budgetAmount: '$6000',
      postedDate: '2023-06-10',
      description: 'Need a data scientist to analyze market research data and provide insights for our client in the retail sector.',
      skills: ['Python', 'Data Analysis', 'Machine Learning', 'Tableau'],
      proposals: 4,
      clientRating: 4.9,
      clientReviews: 28,
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesBudget = selectedBudget === 'all' || job.budget === selectedBudget;
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Jobs</h1>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Jobs
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by title, description, or skills"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
              Budget Range
            </label>
            <select
              id="budget"
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {budgetRanges.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    <Link to={`/job/${job.id}`} className="hover:text-blue-600">
                      {job.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600">Posted by {job.client} • Posted {formatDate(job.postedDate)}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.budgetAmount}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{job.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="flex items-center mr-4">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-medium">{job.clientRating}</span>
                    <span className="text-gray-500 ml-1">({job.clientReviews} reviews)</span>
                  </div>
                  <div className="text-gray-500">
                    {job.proposals} proposals
                  </div>
                </div>
                
                <Link
                  to={`/job/${job.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </div>
        )}
      </div>
      
      {/* Post a Job CTA */}
      <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Are you a client looking to hire?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Post your job and connect with talented freelancers who can help bring your project to life.
        </p>
        <Link
          to="/post-job"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Post a Job
        </Link>
      </div>
    </div>
  );
};

export default Jobs; 