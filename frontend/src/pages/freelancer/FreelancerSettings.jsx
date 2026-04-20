import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FiAlertTriangle, FiCheckCircle, FiClock } from 'react-icons/fi';

const FreelancerSettings = () => {
    const { user, getToken, refreshUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);

    // Verification State
    const [verificationFile, setVerificationFile] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [projectLinks, setProjectLinks] = useState(['']);

    // Appeal State
    const [appealMessage, setAppealMessage] = useState('');

    // Resume State
    const [resumeFile, setResumeFile] = useState(null);

    // Computed verification context from user
    const vStatus = user?.verification_status;
    const rejectionReason = user?.verification_rejection_reason;
    const rejectionCount = user?.verification_rejection_count ?? 0;
    const isSuspended = user?.freelancer?.is_suspended;
    const appealStatus = user?.freelancer?.appeal_status;

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

    const addLinkField = () => setProjectLinks([...projectLinks, '']);
    const updateLink = (index, value) => {
        const newLinks = [...projectLinks];
        newLinks[index] = value;
        setProjectLinks(newLinks);
    };

    const handleAppealSubmit = async (e) => {
        e.preventDefault();
        if (!appealMessage.trim()) { toast.error('Please write your appeal message'); return; }
        setLoading(true);
        try {
            const token = getToken();
            await axios.post(
                'http://localhost:8000/api/freelancers/appeal',
                { appeal_message: appealMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Appeal submitted! Our team will review it shortly.');
            setAppealMessage('');
            await refreshUser(); // Update UI to show appeal pending state
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit appeal');
        } finally {
            setLoading(false);
        }
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
                        <h2 className="text-xl font-semibold text-yellow-500 mb-6">Verification Badge</h2>

                        {/* Already verified */}
                        {user?.freelancer?.is_verified && (
                            <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <FiCheckCircle className="text-green-400 text-2xl flex-shrink-0" />
                                <div>
                                    <p className="text-green-400 font-semibold">Your profile is verified!</p>
                                    <p className="text-gray-400 text-sm">Your verified badge is visible to all clients.</p>
                                </div>
                            </div>
                        )}

                        {/* Pending */}
                        {!user?.freelancer?.is_verified && vStatus === 'pending' && (
                            <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                                <FiClock className="text-yellow-400 text-2xl flex-shrink-0 animate-pulse" />
                                <div>
                                    <p className="text-yellow-400 font-semibold">Verification Pending</p>
                                    <p className="text-gray-400 text-sm">Your documents are under review. We'll notify you when a decision is made.</p>
                                </div>
                            </div>
                        )}

                        {/* Rejected (1st time) — show reason + resubmit */}
                        {!isSuspended && vStatus === 'rejected' && rejectionCount < 2 && (
                            <>
                                <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl mb-6">
                                    <FiAlertTriangle className="text-orange-400 text-xl flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-orange-400 font-semibold mb-1">Verification Rejected</p>
                                        {rejectionReason && (
                                            <p className="text-gray-300 text-sm">Reason: "<span className="italic">{rejectionReason}</span>"</p>
                                        )}
                                        <p className="text-yellow-400/80 text-xs mt-2">⚠️ You have 1 resubmission remaining. A second rejection will suspend your account.</p>
                                    </div>
                                </div>
                                <form onSubmit={handleVerificationSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">National ID / Passport <span className="text-red-500">*</span></label>
                                        <input type="file" required onChange={(e) => setVerificationFile(e.target.files[0])} className="block w-full text-sm text-gray-400 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none p-2" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Certificates (Optional)</label>
                                        <input type="file" multiple onChange={(e) => setCertificates(e.target.files)} className="block w-full text-sm text-gray-400 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none p-2" />
                                    </div>
                                    <button type="submit" disabled={loading} className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50">
                                        {loading ? 'Resubmitting...' : 'Resubmit Verification'}
                                    </button>
                                </form>
                            </>
                        )}

                        {/* Suspended after 2nd rejection — appeal form */}
                        {isSuspended && rejectionCount >= 2 && (
                            <>
                                {appealStatus === 'pending' ? (
                                    <div className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                                        <FiClock className="text-orange-400 text-2xl flex-shrink-0 animate-pulse" />
                                        <div>
                                            <p className="text-orange-400 font-semibold">Appeal Under Review</p>
                                            <p className="text-gray-400 text-sm">Our team is reviewing your appeal. Please wait for a decision.</p>
                                        </div>
                                    </div>
                                ) : appealStatus === 'rejected' ? (
                                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                        <FiAlertTriangle className="text-red-400 text-2xl flex-shrink-0" />
                                        <div>
                                            <p className="text-red-400 font-semibold">Appeal Rejected — Account Banned</p>
                                            <p className="text-gray-400 text-sm">Your appeal was denied and your email has been permanently banned.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6">
                                            <FiAlertTriangle className="text-red-400 text-xl flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-red-400 font-semibold mb-1">Account Suspended</p>
                                                <p className="text-gray-300 text-sm">Your verification was rejected twice. This is your final chance to appeal.</p>
                                                {rejectionReason && <p className="text-gray-400 text-xs mt-1 italic">Last reason: "{rejectionReason}"</p>}
                                            </div>
                                        </div>
                                        <form onSubmit={handleAppealSubmit} className="space-y-4">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Appeal Message</label>
                                            <textarea value={appealMessage} onChange={e => setAppealMessage(e.target.value)}
                                                placeholder="Explain why you believe your verification should be approved..."
                                                className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all min-h-[120px] placeholder-gray-500" />
                                            <button type="submit" disabled={loading} className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50">
                                                {loading ? 'Submitting Appeal...' : 'Submit Appeal'}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </>
                        )}

                        {/* No submission yet */}
                        {!user?.freelancer?.is_verified && !vStatus && !isSuspended && (
                            <form onSubmit={handleVerificationSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">National ID / Passport <span className="text-red-500">*</span></label>
                                    <input type="file" required onChange={(e) => setVerificationFile(e.target.files[0])} className="block w-full text-sm text-gray-400 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Certificates (Optional)</label>
                                    <input type="file" multiple onChange={(e) => setCertificates(e.target.files)} className="block w-full text-sm text-gray-400 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none p-2" />
                                    <p className="text-xs text-gray-500 mt-1">You can select multiple files.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Previous Project Links</label>
                                    {projectLinks.map((link, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <input type="url" value={link} onChange={(e) => updateLink(index, e.target.value)} placeholder="https://github.com/my-project"
                                                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none" />
                                        </div>
                                    ))}
                                    <button type="button" onClick={addLinkField} className="text-sm text-yellow-500 hover:text-yellow-400">+ Add another link</button>
                                </div>
                                <button type="submit" disabled={loading} className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50">
                                    {loading ? 'Submitting Request...' : 'Submit Verification Request'}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FreelancerSettings;

