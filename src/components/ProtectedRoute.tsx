import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute component
 * - Checks if user is authenticated using useAuth()
 * - Shows loading spinner while auth state is being determined
 * - Redirects to /login if not authenticated (preserves original route)
 * - Renders child routes via <Outlet /> if authenticated
 */
const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show loading state while auth is initializing
    if (loading) {
        return (
            <div className="protected-loading">
                <div className="protected-spinner"></div>
                <style>{`
          .protected-loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8f9fa;
          }
          .protected-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #e5e7eb;
            border-top-color: #6366f1;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    // Not authenticated - redirect to login
    // Preserve the attempted URL in location state for redirect after login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Authenticated - render the protected content
    return <Outlet />;
};

export default ProtectedRoute;
