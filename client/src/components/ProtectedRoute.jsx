import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute Component
 * This component checks for the existence of an 'adminToken' in localStorage.
 * If the token exists, it renders the child elements (the AdminPanel).
 * If the token does NOT exist, it redirects the user to the login page.
 * * @param {object} props - Standard React props (Children are managed by Outlet in v6).
 */
function ProtectedRoute() {
  // 1. Get the token from client-side storage
  const token = localStorage.getItem("adminToken");

  // 2. Add validation here: in a real app, you might also want to check
  // if the token is expired (e.g., by decoding the JWT).
  const isAuthenticated = !!token; // True if token exists, false otherwise

  if (!isAuthenticated) {
    // If not authenticated, redirect them to the login page.
    // The 'replace' prop ensures the login page replaces the history entry.
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child component (the route element).
  return <Outlet />;
}

export default ProtectedRoute;
