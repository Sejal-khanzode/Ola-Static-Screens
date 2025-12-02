import { Navigate, useLocation } from 'react-router-dom';
import useAuthority from '../hooks/use-authority';
import storageService from '../services/core/storage-service';

const PrivateRoute = (props: React.PropsWithChildren) => {
  const location = useLocation();
  const isLoggedIn = !!storageService.getToken();

  const { hasRouteAuthority } = useAuthority();

  if (!isLoggedIn) {
    localStorage.setItem('redirectURL', location.pathname);
    return <Navigate to={'/auth/login'} state={{ from: location }} replace />;
  } else {
    localStorage.removeItem('redirectURL');
  }
  return hasRouteAuthority ? (
    props.children
  ) : (
    <Navigate to={'/auth/login'} state={{ from: location }} replace />
  );
};

export default PrivateRoute;
