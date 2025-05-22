import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiMapPin, FiDollarSign, FiMessageSquare, FiMail } from 'react-icons/fi';
import { adminService } from '../services/adminService';

const FreelancerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <img
              src={freelancer.profile_picture || '/default-avatar.png'}
              alt={freelancer.name}
              className="w-32 h-32 rounded-xl object-cover border-2 border-yellow-400"
            />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{freelancer.name}</h1>
              <p className="text-xl text-gray-400 mb-4">{freelancer.title || 'Freelancer'}</p>
              <div className="flex items-center space-x-6 mb-4">
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
              {/* Add more details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile; 