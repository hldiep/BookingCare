import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Helper/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/dang-nhap" replace />;
    }

    return children;
};

export default ProtectedRoute;