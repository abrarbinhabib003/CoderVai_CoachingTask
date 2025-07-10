import { Navigate, useLocation } from "react-router";
import { useAuth } from '../api/UseAuth';

const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <progress className="progress w-56"></progress>; 
    }

    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
