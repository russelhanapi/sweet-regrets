import { Navigate } from 'react-router-dom';
import { getUserFullName } from '../features/user/userSlice';
import { useSelector } from 'react-redux';

// ProtectedRoute component that wraps around protected pages or routes
function ProtectedRoute({ children }) {
  const isUserLoggedIn = useSelector(getUserFullName);

  // If user is not logged in, redirect them to the home page
  if (!isUserLoggedIn) return <Navigate to='/' replace />;

  // If the user is logged in, render the protected content (children)
  return children;
}

export default ProtectedRoute;
