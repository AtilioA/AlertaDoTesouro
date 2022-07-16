import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Account from '../pages/Account';
import Notifications from '../pages/Notifications';
import ToS from '../pages/ToS';
import { AuthContext } from '../context/AuthContext';
import ConfirmAccount from '../pages/ConfirmAccount';

function PrivateRoute({ navigateTo }: { navigateTo: string }) {
  const { user } = useContext(AuthContext);
  // If autenticated context is present
  return user ? <Outlet /> : <Navigate to={navigateTo} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/esqueci-minha-senha" element={<ForgotPassword />} />
      <Route path="/redefinir-senha" element={<ResetPassword />} />
      <Route path="/confirmar-conta" element={<ConfirmAccount />} />
      <Route path="/registrar" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/conta" element={<PrivateRoute navigateTo="/login" />}>
        <Route path="" element={<Account />} />
      </Route>
      <Route path="/notificacoes" element={<Notifications />} />
      <Route
        path="/notificacoes"
        element={<PrivateRoute navigateTo="/login" />}
      />
      <Route path="/tos" element={<ToS />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}
