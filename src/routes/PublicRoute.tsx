import { Navigate, useLocation } from 'react-router-dom';
import useAuthority from '../hooks/use-authority';
import { PortalStartingRoute } from '../constants/portals';
import { useEffect, useState, useRef } from 'react';
import cookieService from '../services/core/cookie-service';

interface PublicRouteProps {
  children: React.ReactNode;
  restricted?: boolean;
}

const PublicRoute = (props: PublicRouteProps) => {
  const { portal, token, role } = useAuthority();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  const hasCleanedUp = useRef(false);

  // Clear cookies and localStorage when accessing login page
  useEffect(() => {
    if (location.pathname.includes('/auth/login') && !hasCleanedUp.current) {
      hasCleanedUp.current = true;
      // Clear everything
      cookieService.clearCookies();
      localStorage.clear();
      
      // Delay rendering to ensure cleanup is complete
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [location.pathname]);

  // Don't render until ready
  if (!isReady) {
    return null;
  }

  const isLoggedIn = !!token && !!role;

  // Allow access to public routes (like login) if not logged in
  if (!isLoggedIn) {
    return <>{props.children}</>;
  }

  // If logged in, redirect to appropriate portal
  const redirectPath =
    portal && PortalStartingRoute[portal]
      ? PortalStartingRoute[portal]
      : PortalStartingRoute['provider'];

  return <Navigate to={redirectPath} replace />;
};

export default PublicRoute;
