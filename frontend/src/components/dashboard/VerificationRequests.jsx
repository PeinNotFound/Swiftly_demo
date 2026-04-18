import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa';

const VerificationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/admin/verification-requests', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRequests(response.data.requests);
        } catch (error) {
            toast.error("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8000/api/admin/verification-requests/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Request approved");
            fetchRequests(); // Refresh
        } catch (error) {
            toast.error("Failed to approve request");
        }
    };

    const handleReject = async (id) => {
        const reason = prompt("Enter rejection reason:");
        if (!reason) return;

        const blockUser = window.confirm("Do you want to permanently block this email from signing in or registering again?");

        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8000/api/admin/verification-requests/${id}/reject`, { reason, block_user: blockUser }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Request rejected" + (blockUser ? " and user blocked" : ""));
            fetchRequests(); // Refresh
        } catch (error) {
            toast.error("Failed to reject request");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Pending Verification Requests</h2>

            {requests.length === 0 ? (
                <p className="text-gray-400">No pending requests.</p>
            ) : (
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <ul className="divide-y divide-gray-800">
                        {requests.map((request) => (
                            <li key={request.id} className="p-6 hover:bg-gray-800/30 transition-colors">
                                <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                                    <div className="flex-1 w-full">
                                        <h3 className="text-lg font-bold text-white">
                                            {request.freelancer_name} <span className="text-sm font-normal text-gray-400">({request.freelancer_email})</span>
                                        </h3>
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
                                            onClick={() => handleReject(request.id)}
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
