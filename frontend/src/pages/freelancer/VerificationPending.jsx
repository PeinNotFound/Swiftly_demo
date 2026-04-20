import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiCheckCircle, FiAlertTriangle, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const VerificationPending = ({ status, rejectionReason, rejectionCount, appealStatus }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Rejected and suspended (2nd rejection) — show appeal form redirect
    if (status === 'rejected' && rejectionCount >= 2) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="max-w-lg w-full bg-gray-900/80 border border-red-500/30 rounded-2xl p-10 shadow-2xl text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                        <FiAlertTriangle className="text-red-400 text-3xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">Account Suspended</h1>
                    <p className="text-gray-400 mb-4">
                        Your verification was rejected twice. Your account has been automatically suspended.
                    </p>
                    {rejectionReason && (
                        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 mb-6 text-left">
                            <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">Last Rejection Reason</p>
                            <p className="text-gray-300 text-sm">"{rejectionReason}"</p>
                        </div>
                    )}
                    {appealStatus === 'none' || !appealStatus ? (
                        <>
                            <p className="text-gray-400 text-sm mb-6">
                                You may submit an appeal to have your suspension reviewed. This is your final chance.
                            </p>
                            <button
                                onClick={() => navigate('/freelancer/settings')}
                                className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors mb-3"
                            >
                                Submit Appeal →
                            </button>
                        </>
                    ) : appealStatus === 'pending' ? (
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
                            <p className="text-orange-400 font-semibold">⏳ Your appeal is under review.</p>
                            <p className="text-gray-400 text-sm mt-1">Please wait for our team to respond.</p>
                        </div>
                    ) : (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                            <p className="text-red-400 font-semibold">❌ Your appeal was rejected.</p>
                            <p className="text-gray-400 text-sm mt-1">Your account has been permanently suspended.</p>
                        </div>
                    )}
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 mx-auto text-gray-500 hover:text-gray-300 text-sm transition-colors">
                        <FiLogOut /> Log Out
                    </button>
                </div>
            </div>
        );
    }

    // Rejected (1st time) — can resubmit
    if (status === 'rejected') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="max-w-lg w-full bg-gray-900/80 border border-orange-500/30 rounded-2xl p-10 shadow-2xl text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
                        <FiAlertTriangle className="text-orange-400 text-3xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">Verification Rejected</h1>
                    <p className="text-gray-400 mb-4">
                        Your verification request was not approved. You can fix the issues and resubmit once more.
                    </p>
                    {rejectionReason && (
                        <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 mb-6 text-left">
                            <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-1">Reason from Admin</p>
                            <p className="text-gray-300 text-sm">"{rejectionReason}"</p>
                        </div>
                    )}
                    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 mb-6">
                        <p className="text-yellow-400 text-xs font-semibold">⚠️ Warning: You have 1 resubmission remaining. A second rejection will suspend your account.</p>
                    </div>
                    <button
                        onClick={() => navigate('/freelancer/settings')}
                        className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors mb-3"
                    >
                        Resubmit Verification →
                    </button>
                    <button onClick={handleLogout} className="flex items-center justify-center gap-2 mx-auto text-gray-500 hover:text-gray-300 text-sm transition-colors">
                        <FiLogOut /> Log Out
                    </button>
                </div>
            </div>
        );
    }

    // Pending — waiting for review
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-gray-900/80 border border-yellow-500/20 rounded-2xl p-10 shadow-2xl text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-6">
                    <FiClock className="text-yellow-400 text-3xl animate-pulse" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-3">Verification Pending</h1>
                <p className="text-gray-400 mb-6">
                    Your documents have been submitted and are currently under review by our team. 
                    This typically takes 1–2 business days. You'll have access to your dashboard once approved.
                </p>
                <div className="space-y-3 text-left mb-8">
                    {['Documents Submitted', 'Admin Review In Progress', 'Verification Decision'].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${i === 0 ? 'bg-green-500/20 border border-green-500/30' : i === 1 ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-gray-800 border border-gray-700'}`}>
                                {i === 0 ? <FiCheckCircle className="text-green-400 text-xs" /> : i === 1 ? <FiClock className="text-yellow-400 text-xs animate-pulse" /> : <span className="text-gray-600 text-xs">3</span>}
                            </div>
                            <span className={`text-sm ${i === 0 ? 'text-green-400' : i === 1 ? 'text-yellow-400' : 'text-gray-600'}`}>{step}</span>
                        </div>
                    ))}
                </div>
                <button onClick={handleLogout} className="flex items-center justify-center gap-2 mx-auto text-gray-500 hover:text-gray-300 text-sm transition-colors">
                    <FiLogOut /> Log Out
                </button>
            </div>
        </div>
    );
};

export default VerificationPending;
