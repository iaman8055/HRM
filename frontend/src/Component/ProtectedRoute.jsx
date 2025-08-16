// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import decodeToken from '../util/decodeToken';

const ProtectedRoute = ({ children }) => {
  const user = decodeToken();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
