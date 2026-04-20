import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';

const API_URL = 'http://localhost:8000';
const getAuthHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

const VerificationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Rejection modal state
    const [rejectModal, setRejectModal] = useState({ open: false, requestId: null });
    const [rejectReason, setRejectReason] = useState('');
    const [rejectLoading, setRejectLoading] = useState(false);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/verification-requests`, {
                headers: getAuthHeader()
            });
            setRequests(response.data.requests);
        } catch (error) {
            toast.error("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRequests(); }, []);

    const handleApprove = async (id) => {
        try {
            await axios.post(`${API_URL}/api/admin/verification-requests/${id}/approve`, {}, { headers: getAuthHeader() });
            toast.success("✅ Verification approved — freelancer is now verified!");
            fetchRequests();
        } catch (error) {
            toast.error("Failed to approve request");
        }
    };

    const openRejectModal = (id) => {
        setRejectModal({ open: true, requestId: id });
        setRejectReason('');
    };

    const handleReject = async () => {
        if (!rejectReason.trim() || rejectReason.trim().length < 5) {
            toast.error('Please provide a meaningful reason (min 5 characters)');
            return;
        }
        setRejectLoading(true);
        try {
            const res = await axios.post(
                `${API_URL}/api/admin/verification-requests/${rejectModal.requestId}/reject`,
                { reason: rejectReason },
                { headers: getAuthHeader() }
            );
            const count = res.data.rejection_count ?? 1;
            if (count >= 2) {
                toast.warn(`⚠️ Request rejected (2nd time). Freelancer auto-suspended. They may appeal.`);
            } else {
                toast.success(`Request rejected. Freelancer will see your reason and can resubmit.`);
            }
            setRejectModal({ open: false, requestId: null });
            fetchRequests();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reject request");
        } finally {
            setRejectLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Rejection Reason Modal */}
            {rejectModal.open && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-red-500/30 p-8 rounded-2xl w-[480px] shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-1">Reject Verification</h2>
                        <p className="text-gray-400 text-sm mb-5">
                            The freelancer will see this reason and can resubmit. After 2 rejections they will be auto-suspended.
                        </p>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Rejection Reason *</label>
                        <textarea
                            autoFocus
                            value={rejectReason}
                            onChange={e => setRejectReason(e.target.value)}
                            placeholder="e.g. The ID document is blurry or expired. Please resubmit a clear copy."
                            className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all min-h-[110px] mb-6 placeholder-gray-500"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setRejectModal({ open: false, requestId: null })}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={rejectLoading}
                                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold transition-colors disabled:opacity-50"
                            >
                                {rejectLoading ? 'Rejecting...' : 'Reject & Notify'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold text-white">Pending Verification Requests</h2>

            {requests.length === 0 ? (
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No pending verification requests.</p>
                    <p className="text-gray-600 text-sm mt-2">You'll see new requests here when freelancers submit their documents.</p>
                </div>
            ) : (
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <ul className="divide-y divide-gray-800">
                        {requests.map((request) => (
                            <li key={request.id} className="p-6 hover:bg-gray-800/30 transition-colors">
                                <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                                    <div className="flex-1 w-full">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-bold text-white">
                                                {request.freelancer_name}
                                            </h3>
                                            <span className="text-sm text-gray-400">({request.freelancer_email})</span>
                                            {(request.rejection_count >= 1) && (
                                                <span className="px-2 py-0.5 text-xs bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full font-semibold">
                                                    Attempt #{request.rejection_count + 1}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-400 mt-1 mb-4">Submitted: {new Date(request.submitted_at).toLocaleDateString()}</p>

                                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-300 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                            <div><span className="font-bold text-gray-500 block text-xs uppercase tracking-wider mb-1">Title</span> {request.freelancer_title || 'N/A'}</div>
                                            <div><span className="font-bold text-gray-500 block text-xs uppercase tracking-wider mb-1">Level</span> <span className="capitalize">{request.freelancer_level || 'N/A'}</span></div>
                                            <div><span className="font-bold text-gray-500 block text-xs uppercase tracking-wider mb-1">Phone</span> {request.phone || 'N/A'}</div>
                                        </div>

                                        {request.skills && request.skills.length > 0 && (
                                            <div className="mb-4">
                                                <span className="font-bold text-gray-500 block text-xs mb-2 uppercase tracking-wider">Key Skills</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {request.skills.map((s, i) => <span key={i} className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full text-xs font-semibold">{s}</span>)}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-6 space-y-6">
                                            <div>
                                                <span className="font-bold text-gray-500 block text-xs mb-2 uppercase tracking-wider">ID Document</span>
                                                <div className="w-full max-w-2xl h-80 border border-gray-700 rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center">
                                                    {request.id_document_url && request.id_document_url.toLowerCase().endsWith('.pdf') ? (
                                                        <iframe src={request.id_document_url} title="ID Document" className="w-full h-full border-none" />
                                                    ) : (
                                                        <img src={request.id_document_url} alt="ID Document" className="max-h-full max-w-full object-contain" />
                                                    )}
                                                </div>
                                                <a href={request.id_document_url} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 text-sm inline-flex items-center gap-1 mt-3 transition-colors">
                                                    <FaExternalLinkAlt size={10} /> Open Document Fullscreen
                                                </a>
                                            </div>

                                            {request.certificate_urls && request.certificate_urls.length > 0 && (
                                                <div className="mt-6">
                                                    <span className="font-bold text-gray-500 block text-xs mb-2 uppercase tracking-wider">Certificates</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {request.certificate_urls.map((url, idx) => (
                                                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 transition-colors">
                                                                <FaFileAlt className="mr-2" /> Certificate {idx + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {request.project_links && request.project_links.length > 0 && (
                                                <div className="mt-6">
                                                    <span className="font-bold text-gray-500 block text-xs mb-2 uppercase tracking-wider">Project Links</span>
                                                    <ul className="list-none space-y-2">
                                                        {request.project_links.map((link, idx) => (
                                                            <li key={idx}>
                                                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition-colors inline-flex items-center text-sm">
                                                                    <FaExternalLinkAlt className="mr-2 h-3 w-3" /> {link}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-48 mt-4 lg:mt-0">
                                        <button
                                            onClick={() => handleApprove(request.id)}
                                            className="w-full inline-flex justify-center items-center px-4 py-3 border border-green-500/30 rounded-xl shadow-lg text-sm font-bold text-green-400 bg-green-500/10 hover:bg-green-500/20 focus:outline-none transition-all duration-200"
                                        >
                                            <FaCheck className="mr-2" /> Approve
                                        </button>
                                        <button
                                            onClick={() => openRejectModal(request.id)}
                                            className="w-full inline-flex justify-center items-center px-4 py-3 border border-red-500/30 rounded-xl shadow-lg text-sm font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 focus:outline-none transition-all duration-200"
                                        >
                                            <FaTimes className="mr-2" /> Reject
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default VerificationRequests;
