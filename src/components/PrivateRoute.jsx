import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { kullanici } = useAuth();

  if (!kullanici) {
    return <Navigate to="/giris" replace />;
  }

  return children;
};

export default PrivateRoute;
