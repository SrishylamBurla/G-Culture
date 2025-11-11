import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { userInfo } = useSelector((state) => state.user);
  if (!userInfo) return <Navigate to="/login" />;
  return children;
}
