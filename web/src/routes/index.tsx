import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Account from '../pages/Account';
import Notifications from '../pages/Notifications';
import ToS from '../pages/ToS';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({navigateTo}:{navigateTo: string;}) {
  const { user } = useContext(AuthContext);

  // If autenticated context is present
  return user ? <Outlet /> : <Navigate to={navigateTo} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="registrar" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
        <Route path="conta" element={<PrivateRoute navigateTo="/login" />}>
          <Route path="" element={<Account />} />
        </Route>
        <Route path="notificacoes" element={<PrivateRoute navigateTo="/login" />} />
        <Route path="" element={<Notifications />} />
        <Route path="tos" element={<ToS />} />
      </Route>
    </Routes>
  );
}
