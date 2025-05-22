import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateStep = (step) => {
    const newErrors = { ...errors };
    let isValid = true;

    if (step === 1) {
      // Validate name
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        isValid = false;
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
        isValid = false;
      } else {
        newErrors.name = '';
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      } else {
        newErrors.email = '';
      }
    }

    if (step === 2) {
      // Validate password
      if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        isValid = false;
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
        isValid = false;
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
        isValid = false;
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one number';
        isValid = false;
      } else if (!/[!@#$%^&*]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least one special character (!@#$%^&*)';
        isValid = false;
      } else {
        newErrors.password = '';
      }

      // Validate password confirmation
      if (formData.password !== formData.password_confirmation) {
        newErrors.password = 'Passwords do not match';
        isValid = false;
      }
    }

    if (step === 3) {
      // Validate role
      if (!formData.role) {
        newErrors.role = 'Please select an account type';
        isValid = false;
      } else {
        newErrors.role = '';
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.register(formData);
      
      if (response.success) {
        // Redirect based on role
        const role = response.data.user.role;
        if (role === 'admin') {
          navigate('/dashboard/admin');
        } else if (role === 'freelancer') {
          navigate('/dashboard/freelancer');
        } else {
          navigate('/dashboard/client');
        }
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (error) {
      // The error object caught here is the one thrown by authService.handleError
      // It has a structure like { message: '...', errors: { ... }, status: ... }
      console.error('Registration error details:', error);

      let errorMessage = error.message || 'An unknown error occurred';

      // If there are validation errors from the backend, display them
      if (error.errors) {
        errorMessage += '\n'; // Add a newline for better formatting
        Object.keys(error.errors).forEach(field => {
          errorMessage += `${field}: ${error.errors[field].join(', ')}\n`;
        });
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-black py-20 sm:py-24 flex items-center justify-center px-4 sm:px-6 overflow-x-hidden">
      <div className="w-full max-w-[420px] space-y-6 relative mx-auto px-2">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-500/5 to-black rounded-2xl filter blur-xl opacity-50 transform rotate-12"></div>
        
        <div className="relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Create Account</h1>
            <p className="text-gray-400">Join our community of talented freelancers</p>
          </div>

          <div className="mt-8 bg-gray-900/50 backdrop-blur-xl py-8 px-6 sm:px-8 shadow-2xl rounded-2xl border border-gray-800">
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center relative">
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-800"></div>
                <div 
                  className="absolute top-4 left-0 h-1 bg-yellow-400 transition-all duration-500 ease-in-out"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>

                {[1, 2, 3].map((num) => (
                  <div key={num} className="relative z-10">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform ${
                        step >= num 
                          ? 'bg-yellow-400 text-black scale-110' 
                          : 'bg-gray-800 text-gray-400'
                      } ${step === num ? 'ring-4 ring-yellow-400/30' : ''}`}
                    >
                      {num}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input 
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.name ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg bg-gray-800/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input 
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.email ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg bg-gray-800/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <div className="mt-1">
                      <input 
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 py-2 border ${
                          errors.password ? 'border-red-500' : 'border-gray-700'
                        } rounded-lg bg-gray-800/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200`}
                        placeholder="••••••••"
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300">
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <input 
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        required
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 py-3 px-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      Select Account Type
                    </label>
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="radio"
                          id="freelancer"
                          name="role"
                          value="freelancer"
                          checked={formData.role === 'freelancer'}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="freelancer"
                          className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-yellow-500 peer-checked:bg-yellow-500/10 hover:bg-gray-800/50 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <div className="text-gray-300 font-medium">Freelancer</div>
                            <div className="text-gray-400 text-sm">I want to offer my services</div>
                          </div>
                          <div className="w-5 h-5 border-2 border-gray-700 rounded-full peer-checked:border-yellow-500 peer-checked:bg-yellow-500 flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full hidden peer-checked:block"></div>
                          </div>
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="radio"
                          id="client"
                          name="role"
                          value="client"
                          checked={formData.role === 'client'}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor="client"
                          className="flex items-center p-4 border border-gray-700 rounded-lg cursor-pointer peer-checked:border-yellow-500 peer-checked:bg-yellow-500/10 hover:bg-gray-800/50 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <div className="text-gray-300 font-medium">Client</div>
                            <div className="text-gray-400 text-sm">I want to hire freelancers</div>
                          </div>
                          <div className="w-5 h-5 border-2 border-gray-700 rounded-full peer-checked:border-yellow-500 peer-checked:bg-yellow-500 flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full hidden peer-checked:block"></div>
                          </div>
                        </label>
                      </div>
                    </div>
                    {errors.role && (
                      <p className="mt-2 text-sm text-red-500">{errors.role}</p>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 py-3 px-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 transform hover:scale-[1.02] ${
                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-yellow-500 hover:text-yellow-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 