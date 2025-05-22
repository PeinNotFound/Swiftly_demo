import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiMapPin, FiDollarSign, FiMessageSquare, FiMail, FiClock, FiBook, FiGlobe, FiAward } from 'react-icons/fi';
import { adminService } from '../services/adminService';

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        setLoading(true);
        const response = await adminService.getFreelancers();
        const found = response.freelancers.find(f => String(f.id) === String(id));
        setFreelancer(found);
        setError(null);
      } catch (err) {
        setError('Failed to fetch freelancer');
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancer();
  }, [id]);

  if (loading) {
    return <div className="text-center text-yellow-400 py-12 text-xl">Loading profile...</div>;
  }
  if (error || !freelancer) {
    return <div className="text-center text-red-500 py-12 text-xl">{error || 'Freelancer not found'}</div>;
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <img
              src={freelancer.profile_picture || '/default-avatar.png'}
              alt={freelancer.name}
              className="w-32 h-32 rounded-xl object-cover border-2 border-yellow-400"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{freelancer.name}</h1>
              <p className="text-xl text-gray-400 mb-4">{freelancer.title || 'Freelancer'}</p>
              <div className="flex flex-wrap items-center gap-6 mb-4">
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
                <div className="flex items-center text-gray-400">
                  <FiClock className="mr-1" />
                  <span>{freelancer.availability || 'Available'}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {freelancer.skills && freelancer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowChat(true)}
                  className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  <FiMessageSquare className="inline mr-2" />
                  Message
                </button>
                <button
                  onClick={() => window.location.href = `mailto:${freelancer.email}`}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FiMail className="inline mr-2" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <p className="text-gray-400">{freelancer.bio || 'No bio available.'}</p>
            </div>

            {/* Experience Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
              <div className="flex items-center text-gray-400 mb-4">
                <FiAward className="mr-2" />
                <span>{freelancer.experience_years || '0'} years of experience</span>
              </div>
              <div className="flex items-center text-gray-400">
                <FiBook className="mr-2" />
                <span>{freelancer.education || 'No education information available.'}</span>
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Languages</h2>
              <div className="flex items-center text-gray-400">
                <FiGlobe className="mr-2" />
                <span>{freelancer.languages || 'No language information available.'}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Stats Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Completed Projects</span>
                  <span className="text-white font-semibold">{freelancer.completed_projects || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Member Since</span>
                  <span className="text-white font-semibold">
                    {new Date(freelancer.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile; 