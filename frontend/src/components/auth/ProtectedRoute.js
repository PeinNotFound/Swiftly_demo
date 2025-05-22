import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation();
    const user = authService.getCurrentUser();

    if (!authService.isAuthenticated()) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        // Redirect to home if user doesn't have required role
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 