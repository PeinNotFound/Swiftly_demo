import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const FreelancerSettings = () => {
    const { user, getToken } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);

    // Verification State
    const [verificationFile, setVerificationFile] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [projectLinks, setProjectLinks] = useState(['']);

    // Resume State
    const [resumeFile, setResumeFile] = useState(null);

    const handleResumeUpload = async () => {
        if (!resumeFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('resume', resumeFile);

        try {
            const token = getToken();
            const response = await axios.post(
                'http://localhost:8000/api/freelancers/resume/parse',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    } // Use axios directly or authService if updated
                }
            );

            if (response.data.success) {
                const data = response.data.data;
                toast.success("Resume parsed successfully!");
                console.log("Parsed Data:", data);
                // Here you would auto-fill the form fields
                // For now, let's just show what we found
                toast.info(`Found Skills: ${data.skills.join(', ')}`);
                toast.info(`Experience: ${data.experience_years} years`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to parse resume");
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        if (!verificationFile) {
            toast.error("Please upload your ID document");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('id_document', verificationFile);

        for (let i = 0; i < certificates.length; i++) {
            formData.append('certificates[]', certificates[i]);
        }

        // Filter empty links and add valid ones
        const validLinks = projectLinks.filter(link => link.trim() !== '');
        formData.append('project_links', JSON.stringify(validLinks));

        try {
            const token = getToken();
            const response = await axios.post(
                'http://localhost:8000/api/freelancers/verification/request',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit verification request");
        } finally {
            setLoading(false);
        }
    };

    // Helper for project links inputs
    const addLinkField = () => setProjectLinks([...projectLinks, '']);
    const updateLink = (index, value) => {
        const newLinks = [...projectLinks];
        newLinks[index] = value;
        setProjectLinks(newLinks);
    };

    return (
        <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-yellow-500 mb-8">Freelancer Settings</h1>

                {/* Tabs */}
                <div className="flex border-b border-gray-800 mb-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'profile'
                                ? 'text-yellow-500 border-b-2 border-yellow-500'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Profile & Resume
                    </button>
                    <button
                        onClick={() => setActiveTab('verification')}
                        className={`py-4 px-6 font-medium text-sm focus:outline-none ${activeTab === 'verification'
                                ? 'text-yellow-500 border-b-2 border-yellow-500'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Verification Badge
                    </button>
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                            <h2 className="text-xl font-semibold text-white mb-4">Auto-fill from Resume</h2>
                            <p className="text-gray-400 text-sm mb-4">
                                Upload your resume (PDF) to automatically allow us to find your skills and experience.
                            </p>

                            <div className="flex items-center gap-4">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                    className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-yellow-500 file:text-black
                    hover:file:bg-yellow-400
                  "
                                />
                                <button
                                    onClick={handleResumeUpload}
                                    disabled={loading || !resumeFile}
                                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                                >
                                    {loading ? 'Parsing...' : 'Fill Profile'}
                                </button>
                            </div>
                        </div>

                        {/* Placeholder for manual profile form if needed */}
                        <div className="p-4 border border-dashed border-gray-700 rounded-lg text-center text-gray-500">
                            (Manual profile fields would go here: Skills, Education, Experience input forms)
                        </div>
                    </div>
                )}

                {/* Verification Tab */}
                {activeTab === 'verification' && (
                    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                        <h2 className="text-xl font-semibold text-yellow-500 mb-6">Request Verification Badge</h2>
                        <form onSubmit={handleVerificationSubmit} className="space-y-6">

                            {/* ID Document */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    National ID / Passport <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    required
                                    onChange={(e) => setVerificationFile(e.target.files[0])}
                                    className="block w-full text-sm text-gray-400 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none p-2"
                                />
                            </div>

                            {/* Certificates */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Certificates (Optional)
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => setCertificates(e.target.files)}
                                    className="block w-full text-sm text-gray-400 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none p-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">You can select multiple files.</p>
                            </div>

                            {/* Project Links */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Previous Project Links</label>
                                {projectLinks.map((link, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="url"
                                            value={link}
                                            onChange={(e) => updateLink(index, e.target.value)}
                                            placeholder="https://github.com/my-project"
                                            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addLinkField}
                                    className="text-sm text-yellow-500 hover:text-yellow-400"
                                >
                                    + Add another link
                                </button>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Submitting Request...' : 'Submit Verification Request'}
                                </button>
                            </div>

                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FreelancerSettings;
