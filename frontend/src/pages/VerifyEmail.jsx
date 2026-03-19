import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Verifying...');

    useEffect(() => {
        const verify = async () => {
            const email = searchParams.get('email');
            const code = searchParams.get('code');

            if (!email || !code) {
                setStatus('Invalid verification link.');
                return;
            }

            try {
                const response = await authService.verifyOtp({ email, otp: code });

                if (response.success) {
                    setStatus('Verification successful! Redirecting...');
                    toast.success('Email verified successfully!');

                    // Store session
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));

                    // Redirect based on role
                    setTimeout(() => {
                        const role = response.data.user.role;
                        navigate(`/dashboard/${role}`);
                    }, 1500);
                } else {
                    setStatus(response.message || 'Verification failed.');
                }
            } catch (error) {
                console.error(error);
                setStatus(error.response?.data?.message || 'Verification failed. Link may be expired.');
            }
        };

        verify();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-lg p-8 text-center shadow-2xl">
                <h2 className="text-2xl font-bold text-yellow-500 mb-4">Email Verification</h2>
                <div className="text-gray-300 text-lg animate-pulse">
                    {status}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
