import { useContext } from 'react';
import {
  // Location, // FIXME
  Navigate,
} from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({ children }: RouteProps) {
  const { user } = useContext(AuthContext);

  // If autenticated context is present
  return user ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: '/login',
        // state: { from: location },
      }}
    />
  );
}
