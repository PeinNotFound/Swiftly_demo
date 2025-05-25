import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiUser, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { jobService } from '../services/jobService';
import MessageBox from '../components/MessageBox';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [proposalText, setProposalText] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('7');
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobService.getJob(id);
        setJob(response.job);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job details. Please try again later.');
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.role !== 'freelancer') {
      alert('Only freelancers can submit proposals.');
      return;
    }
    // This would typically handle proposal submission
    console.log('Proposal submitted:', { proposalText, bidAmount, deliveryTime });
    alert('Your proposal has been submitted successfully!');
  };

  const isFreelancer = user?.role === 'freelancer';

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400">Loading job details...</div>
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

  if (!job) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400">Job not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center">
                      <FiUser className="mr-1" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center">
                      <FiMapPin className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>Posted {formatDate(job.created_at)}</span>
                    </div>
                  </div>
              </div>
                
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate('/login');
                        return;
                      }
                      setIsMessageBoxOpen(true);
                    }}
                    className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-all duration-200"
                  >
                    <FiMessageSquare className="mr-2" />
                    Message
                  </button>
                  <span className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-medium">
                    {job.salary}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            
              <div className="prose prose-invert max-w-none mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
                <p className="text-gray-400 mb-6">{job.description}</p>
              
              <div dangerouslySetInnerHTML={{ __html: job.additionalDetails }} />
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
          <div className="space-y-6">
          {/* Client Info */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">About the Client</h2>
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">{job.client?.name?.charAt(0) || job.company.charAt(0)}</span>
              </div>
              <div>
                  <h3 className="font-medium text-white">{job.client?.name || job.company}</h3>
                  <p className="text-gray-400 text-sm">{job.location}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                  <span className="text-gray-400">Job Type:</span>
                  <span className="text-white">{job.jobType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience Level:</span>
                  <span className="text-white">{job.experienceLevel}</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-gray-400">Project Size:</span>
                  <span className="text-white">{job.projectSize}</span>
              </div>
              <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{job.estimatedDuration}</span>
              </div>
            </div>
          </div>
          
            {/* Submit Proposal Form - Only show to freelancers */}
            {isFreelancer && (
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Submit a Proposal</h2>
            <form onSubmit={handleSubmitProposal}>
              <div className="mb-4">
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Bid Amount ($)
                </label>
                <input
                  type="number"
                  id="bidAmount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your bid amount"
                  required
                />
              </div>
              
              <div className="mb-4">
                  <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-400 mb-1">
                  Delivery Time (days)
                </label>
                <input
                  type="number"
                  id="deliveryTime"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter delivery time in days"
                  required
                />
              </div>
              
              <div className="mb-4">
                  <label htmlFor="proposalText" className="block text-sm font-medium text-gray-400 mb-1">
                    Proposal
                </label>
                <textarea
                  id="proposalText"
                  value={proposalText}
                  onChange={(e) => setProposalText(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    rows="4"
                    placeholder="Describe your approach and why you're the best fit for this job..."
                  required
                  />
              </div>
              
              <button
                type="submit"
                  className="w-full bg-yellow-400 text-black px-6 py-3 rounded-xl font-medium hover:bg-yellow-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Submit Proposal
              </button>
            </form>
            </div>
            )}
          </div>
        </div>
      </div>
      <MessageBox
        isOpen={isMessageBoxOpen}
        onClose={() => setIsMessageBoxOpen(false)}
        recipient={job.client || { name: job.company }}
      />
    </div>
  );
};

export default JobDetail; 