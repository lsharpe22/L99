import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute({ children, isAuthenticated }) {
  useEffect(() => {
    /* Added accessibility feature: Announce navigation changes to screen readers */
    if (!isAuthenticated) {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.textContent = 'Redirecting to login page. Authentication required.';
      announcement.className = 'visually-hidden';
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;