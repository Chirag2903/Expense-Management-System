import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem("authToken"));

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    } else {
        return <Component />;
    }
};

export default ProtectedRoute;
