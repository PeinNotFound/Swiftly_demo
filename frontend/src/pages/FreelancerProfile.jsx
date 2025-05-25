import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiMapPin, FiDollarSign, FiMessageSquare, FiMail, FiClock, FiCode, FiX } from 'react-icons/fi';
import { adminService } from '../services/adminService';
import authService from '../services/authService';
import Chat from '../components/chat/Chat';

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get current user from localStorage
        const storedUser = authService.getUser();
        console.log('Stored User:', storedUser);
        setCurrentUser(storedUser);

        // Fetch freelancer data
        const response = await adminService.getFreelancers();
        const found = response.freelancers.find(f => String(f.id) === String(id));
        console.log('Freelancer:', found);
        setFreelancer(found);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Check if the current user is viewing their own profile
  const isOwnProfile = () => {
    if (!currentUser || !freelancer) {
      console.log('Missing data:', { currentUser, freelancer });
      return false;
    }
    
    const currentUserId = parseInt(currentUser.id);
    const freelancerId = parseInt(freelancer.id);
    
    console.log('Comparing IDs:', {
      currentUserId,
      freelancerId,
      isEqual: currentUserId === freelancerId
    });
    
    return currentUserId === freelancerId;
  };

  const handleMessage = () => {
    if (isOwnProfile()) {
      console.log('Cannot message yourself');
      return;
    }
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setIsChatOpen(true);
  };

  const handleContact = () => {
    if (isOwnProfile()) {
      console.log('Cannot contact yourself');
      return;
    }
    window.location.href = `mailto:${freelancer.email}`;
  };

  if (loading) {
    return <div className="text-center text-yellow-400 py-12 text-xl">Loading profile...</div>;
  }
  if (error || !freelancer) {
    return <div className="text-center text-red-500 py-12 text-xl">{error || 'Freelancer not found'}</div>;
  }

  const ownProfile = isOwnProfile();
  console.log('Is own profile:', ownProfile);

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
              {!ownProfile && (
                <div className="flex gap-4">
                  <button
                    onClick={handleMessage}
                    className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    <FiMessageSquare className="inline mr-2" />
                    Message
              </button>
                <button 
                    onClick={handleContact}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <FiMail className="inline mr-2" />
                    Contact
                </button>
                </div>
              )}
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

            {/* Skills Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
              <div className="flex items-start gap-4">
                <FiCode className="text-gray-400 flex-shrink-0 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills && freelancer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
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
      {isChatOpen && currentUser && freelancer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <Chat
              userId={currentUser.id}
              freelancerId={freelancer.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerProfile; 