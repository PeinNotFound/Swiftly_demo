import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const OtpVerification = ({ email, onSuccess }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendDisabled, setResendDisabled] = useState(true);
    const [countdown, setCountdown] = useState(60);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (resendDisabled && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
        }
        return () => clearInterval(timer);
    }, [resendDisabled, countdown]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            e.target.previousSibling.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(data)) return;

        const newOtp = [...otp];
        data.split('').forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            setError('Please enter a valid 6-digit code');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await authService.verifyOtp({ email, otp: otpCode });
            if (response.success) {
                if (onSuccess) {
                    onSuccess(response.data);
                } else {
                    // Default redirect logic if no success handler
                    const role = response.data.user.role;
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));

                    if (role === 'admin') {
                        navigate('/dashboard/admin');
                    } else if (role === 'freelancer') {
                        navigate('/dashboard/freelancer');
                    } else {
                        navigate('/dashboard/client');
                    }
                }
            } else {
                setError(response.message || 'Verification failed');
            }
        } catch (err) {
            setError(err.message || 'Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendDisabled) return;

        setIsLoading(true);
        setError('');

        try {
            await authService.resendOtp({ email });
            setResendDisabled(true);
            setCountdown(60);
            setError(''); // Clear any previous errors
            alert('Verification code resent!');
        } catch (err) {
            setError(err.message || 'Failed to resend code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2 text-white">Email Verification</h2>
                <p className="text-gray-400">
                    We've sent a 6-digit verification code to <br />
                    <span className="text-yellow-400 font-medium">{email}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="mb-4 text-center text-red-500 bg-red-500/10 py-2 rounded-lg border border-red-500/20 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex justify-center gap-2 mb-8">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            name="otp"
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            onFocus={(e) => e.target.select()}
                            className="w-12 h-12 text-center text-xl font-bold bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-all duration-200"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={isLoading || otp.join('').length !== 6}
                    className={`w-full py-3 px-4 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-200 transform hover:scale-[1.02] ${(isLoading || otp.join('').length !== 6) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading ? 'Verifying...' : 'Verify Email'}
                </button>

                <div className="text-center mt-6">
                    <p className="text-gray-400 text-sm">
                        Didn't receive the code?{' '}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resendDisabled}
                            className={`font-medium ${resendDisabled
                                    ? 'text-gray-600 cursor-not-allowed'
                                    : 'text-yellow-400 hover:text-yellow-300'
                                }`}
                        >
                            Resend {resendDisabled && `(${countdown}s)`}
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default OtpVerification;
