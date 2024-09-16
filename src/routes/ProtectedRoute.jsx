import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
