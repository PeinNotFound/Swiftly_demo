import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiMapPin, FiDollarSign, FiClock, FiBook, FiAward } from 'react-icons/fi';
import { authService } from '../services/authService';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await authService.getProfile();
        setProfile(response);
        setEditedProfile(response);
        setError(null);
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validateProfile = () => {
    const errors = {};
    
    if (!editedProfile.title?.trim()) {
      errors.title = 'Professional title is required';
    }
    
    if (!editedProfile.hourly_rate || editedProfile.hourly_rate < 0) {
      errors.hourly_rate = 'Please enter a valid hourly rate';
    }
    
    if (!editedProfile.location?.trim()) {
      errors.location = 'Location is required';
    }
    
    if (!editedProfile.skills?.length) {
      errors.skills = 'At least one skill is required';
    }
    
    if (!editedProfile.experience_years || editedProfile.experience_years < 0) {
      errors.experience_years = 'Please enter a valid number of years';
    }
    
    if (!editedProfile.education?.trim()) {
      errors.education = 'Education is required';
    }
    
    if (!editedProfile.bio?.trim()) {
      errors.bio = 'Bio is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateProfile()) {
      return;
    }
    
    try {
      await authService.updateProfile(editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
      setValidationErrors({});
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setValidationErrors({});
  };

  if (loading) {
    return <div className="text-center text-yellow-400 py-12 text-xl">Loading profile...</div>;
  }
  if (error || !profile) {
    return <div className="text-center text-red-500 py-12 text-xl">{error || 'Profile not found'}</div>;
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <img
              src={profile.profile_picture || '/default-avatar.png'}
              alt={profile.name}
              className="w-32 h-32 rounded-xl object-cover border-2 border-yellow-400"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={editedProfile.title || ''}
                      onChange={(e) => setEditedProfile({...editedProfile, title: e.target.value})}
                      className={`w-full bg-gray-800 text-white rounded-lg p-2 border ${
                        validationErrors.title ? 'border-red-500' : 'border-gray-700'
                      } focus:border-yellow-400 focus:outline-none`}
                      placeholder="e.g., Senior Web Developer"
                    />
                    {validationErrors.title && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Hourly Rate ($)</label>
                      <input
                        type="number"
                        value={editedProfile.hourly_rate || ''}
                        onChange={(e) => setEditedProfile({...editedProfile, hourly_rate: e.target.value})}
                        className={`w-full bg-gray-800 text-white rounded-lg p-2 border ${
                          validationErrors.hourly_rate ? 'border-red-500' : 'border-gray-700'
                        } focus:border-yellow-400 focus:outline-none`}
                        placeholder="Enter hourly rate"
                        min="0"
                      />
                      {validationErrors.hourly_rate && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.hourly_rate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Location</label>
                      <input
                        type="text"
                        value={editedProfile.location || ''}
                        onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                        className={`w-full bg-gray-800 text-white rounded-lg p-2 border ${
                          validationErrors.location ? 'border-red-500' : 'border-gray-700'
                        } focus:border-yellow-400 focus:outline-none`}
                        placeholder="e.g., New York, USA"
                      />
                      {validationErrors.location && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.location}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Availability</label>
                    <select
                      value={editedProfile.availability || 'Available'}
                      onChange={(e) => setEditedProfile({...editedProfile, availability: e.target.value})}
                      className="w-full bg-gray-800 text-white rounded-lg p-2 border border-gray-700 focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="Available">Available</option>
                      <option value="Busy">Busy</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Skills</label>
                    <input
                      type="text"
                      value={editedProfile.skills ? editedProfile.skills.join(', ') : ''}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        skills: e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
                      })}
                      className={`w-full bg-gray-800 text-white rounded-lg p-2 border ${
                        validationErrors.skills ? 'border-red-500' : 'border-gray-700'
                      } focus:border-yellow-400 focus:outline-none`}
                      placeholder="Enter skills (separate with commas)"
                    />
                    <p className="text-gray-500 text-sm mt-1">Separate skills with commas</p>
                    {validationErrors.skills && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.skills}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Years of Experience</label>
                    <input
                      type="number"
                      value={editedProfile.experience_years || 0}
                      onChange={(e) => setEditedProfile({...editedProfile, experience_years: e.target.value})}
                      className={`w-full bg-gray-800 text-white rounded-lg p-2 border ${
                        validationErrors.experience_years ? 'border-red-500' : 'border-gray-700'
                      } focus:border-yellow-400 focus:outline-none`}
                      placeholder="Enter years of experience"
                      min="0"
                    />
                    {validationErrors.experience_years && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.experience_years}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Education</label>
                    <input
                      type="text"
                      value={editedProfile.education || ''}
                      onChange={(e) => setEditedProfile({...editedProfile, education: e.target.value})}
                      className={`w-full bg-gray-800 text-white rounded-lg p-2 border ${
                        validationErrors.education ? 'border-red-500' : 'border-gray-700'
                      } focus:border-yellow-400 focus:outline-none`}
                      placeholder="Enter your education"
                    />
                    {validationErrors.education && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.education}</p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xl text-gray-400 mb-4">{profile.title || 'Freelancer'}</p>
                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    <div className="flex items-center text-yellow-400">
                      <FiStar className="mr-1" />
                      <span>{profile.rating || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FiMapPin className="mr-1" />
                      <span>{profile.location || 'Remote'}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FiDollarSign className="mr-1" />
                      <span>${profile.hourly_rate || 'N/A'}/hr</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FiClock className="mr-1" />
                      <span>{profile.availability || 'Available'}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {profile.skills && profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {isEditing && (
                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
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
              {isEditing ? (
                <div>
                  <textarea
                    value={editedProfile.bio || ''}
                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                    className={`w-full h-32 bg-gray-800 text-white rounded-lg p-4 border ${
                      validationErrors.bio ? 'border-red-500' : 'border-gray-700'
                    } focus:border-yellow-400 focus:outline-none`}
                    placeholder="Write something about yourself..."
                  />
                  {validationErrors.bio && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.bio}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-400">{profile.bio || 'No bio available.'}</p>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Experience</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <FiAward className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="block text-gray-400 text-sm mb-1">Years of Experience</label>
                      <input
                        type="number"
                        value={editedProfile.experience_years || 0}
                        onChange={(e) => setEditedProfile({...editedProfile, experience_years: e.target.value})}
                        className={`w-full bg-gray-800 text-white rounded-lg p-2 border ${
                          validationErrors.experience_years ? 'border-red-500' : 'border-gray-700'
                        } focus:border-yellow-400 focus:outline-none`}
                        placeholder="Enter years of experience"
                        min="0"
                      />
                      {validationErrors.experience_years && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.experience_years}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <FiBook className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="block text-gray-400 text-sm mb-1">Education</label>
                      <input
                        type="text"
                        value={editedProfile.education || ''}
                        onChange={(e) => setEditedProfile({...editedProfile, education: e.target.value})}
                        className={`w-full bg-gray-800 text-white rounded-lg p-2 border ${
                          validationErrors.education ? 'border-red-500' : 'border-gray-700'
                        } focus:border-yellow-400 focus:outline-none`}
                        placeholder="Enter your education"
                      />
                      {validationErrors.education && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.education}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center text-gray-400 mb-4">
                    <FiAward className="mr-2" />
                    <span>{profile.experience_years || '0'} years of experience</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FiBook className="mr-2" />
                    <span>{profile.education || 'No education information available.'}</span>
                  </div>
                </>
              )}
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
                  <span className="text-white font-semibold">{profile.completed_projects || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Member Since</span>
                  <span className="text-white font-semibold">
                    {new Date(profile.created_at).toLocaleDateString()}
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

export default Profile; 