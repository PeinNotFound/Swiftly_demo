import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { jobService } from '../services/jobService';

const PostJob = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: user?.company || '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    skills: '',
    jobType: 'Fixed Price',
    experienceLevel: 'Intermediate',
    projectSize: 'Medium',
    estimatedDuration: '',
    additionalDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert skills string to array
      const jobData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };

      await jobService.createJob(jobData, token);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
          <h1 className="text-3xl font-bold text-white mb-8">Post a New Job</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., Senior Full Stack Developer"
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Your company name"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-400 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., Remote, New York, NY"
                required
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-400 mb-1">
                Job Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-400 mb-1">
                Salary/Budget *
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., $80k - $120k or $50/hr"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Describe the job responsibilities and requirements..."
                required
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-400 mb-1">
                Required Skills *
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., React, Node.js, PostgreSQL (comma-separated)"
                required
              />
            </div>

            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-400 mb-1">
                Job Type *
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="Fixed Price">Fixed Price</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>

            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-400 mb-1">
                Experience Level *
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label htmlFor="projectSize" className="block text-sm font-medium text-gray-400 mb-1">
                Project Size *
              </label>
              <select
                id="projectSize"
                name="projectSize"
                value={formData.projectSize}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>

            <div>
              <label htmlFor="estimatedDuration" className="block text-sm font-medium text-gray-400 mb-1">
                Estimated Duration *
              </label>
              <input
                type="text"
                id="estimatedDuration"
                name="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., 1-3 months"
                required
              />
            </div>

            <div>
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-400 mb-1">
                Additional Details *
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Add any additional information about the job..."
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/jobs')}
                className="px-6 py-3 bg-gray-800 text-gray-300 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-medium hover:bg-yellow-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob; 