import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If role is required and user doesn't have it, redirect to home
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 