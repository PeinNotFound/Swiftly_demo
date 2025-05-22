import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const userData = await authService.getCurrentUser();
                if (userData.success) {
                    setUser(userData.data.user);
                    // Store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(userData.data.user));
                } else {
                    setUser(null);
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setUser(null);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            if (response.success) {
                setUser(response.data.user);
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
            }
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            if (response.success) {
                setUser(response.data.user);
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
                return Promise.resolve(response);
            }
            throw new Error(response.message || 'Registration failed');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        try {
            authService.logout();
            setUser(null);
            // Clear user data from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const updateUser = (userData) => {
        setUser(prevUser => {
            const updatedUser = {
                ...prevUser,
                ...userData
            };
            return updatedUser;
        });
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isFreelancer: user?.role === 'freelancer',
        isClient: user?.role === 'client',
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext; 