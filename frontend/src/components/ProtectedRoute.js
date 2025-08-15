import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import MainLayout from './MainLayout';

const ProtectedRoute = () => {
  const { authToken } = useContext(AuthContext);

  return authToken ? <MainLayout /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
