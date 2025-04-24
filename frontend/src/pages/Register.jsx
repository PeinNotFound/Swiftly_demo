import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    accountType: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    accountType: '',
  });
  const [isLoading, setIsLoading] = useState(false);

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
    }

    if (step === 3) {
      // Validate account type
      if (!formData.accountType) {
        newErrors.accountType = 'Please select an account type';
        isValid = false;
      } else {
        newErrors.accountType = '';
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Handle registration logic here
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
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-500/5 to-black rounded-2xl filter blur-xl opacity-50 transform rotate-12"></div>
        
        <div className="relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Create Account</h1>
            <p className="text-gray-400">Join our community of talented freelancers</p>
          </div>

          <div className="mt-8 bg-gray-900/50 backdrop-blur-xl py-8 px-6 sm:px-8 shadow-2xl rounded-2xl border border-gray-800">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center relative">
                {/* Progress line background */}
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-800"></div>
                {/* Animated progress line */}
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
                        autoComplete="email"
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
                </>
              )}

              {step === 2 && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
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
                  <p className="mt-2 text-sm text-gray-400">
                    Must be at least 8 characters long with uppercase, lowercase, number, and special character
                  </p>
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Choose Account Type
                  </label>
                  <div className="space-y-4">
                    {['freelancer', 'client'].map((type) => (
                      <div
                        key={type}
                        className={`relative rounded-lg border ${
                          formData.accountType === type
                            ? 'border-yellow-400 bg-yellow-400/10'
                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                        } p-4 cursor-pointer transition-all duration-200`}
                        onClick={() => handleChange({ target: { name: 'accountType', value: type } })}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`h-5 w-5 rounded-full border-2 ${
                              formData.accountType === type
                                ? 'border-yellow-400 bg-yellow-400'
                                : 'border-gray-500'
                            }`}>
                              {formData.accountType === type && (
                                <div className="h-2 w-2 mx-auto mt-1 rounded-full bg-black"></div>
                              )}
                            </div>
                            <div className="ml-3">
                              <h3 className={`text-sm font-medium ${
                                formData.accountType === type ? 'text-yellow-400' : 'text-gray-300'
                              }`}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {errors.accountType && (
                      <p className="mt-1 text-sm text-red-500">{errors.accountType}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between space-x-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-3 px-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
                  >
                    Back
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-[1.02] ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                )}
              </div>
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