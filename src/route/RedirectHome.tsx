import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectHome: React.FC = () => {
    return <Navigate to="/" />;
};

export default RedirectHome;