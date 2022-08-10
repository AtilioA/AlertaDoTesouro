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
// import { AuthContext } from '../context/AuthContext';

function PrivateRoute({
  navigateTo,
  isLoggedIn,
}: {
  navigateTo: string;
  isLoggedIn: boolean;
}) {
  // const { user } = useContext(AuthContext);
  // If autenticated context is present
  return isLoggedIn ? <Outlet /> : <Navigate to={navigateTo} />;
}

export default function AppRoutes({
  setIsLoggedIn,
  isLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/esqueci-minha-senha" element={<ForgotPassword />} />
      <Route path="/redefinir-senha" element={<ResetPassword />} />
      <Route path="/registrar" element={<SignUp />} />
      <Route path="/login" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/conta"
        element={<PrivateRoute isLoggedIn={isLoggedIn} navigateTo="/login" />}
      >
        <Route path="" element={<Account setIsLoggedIn={setIsLoggedIn} />} />
      </Route>
      <Route
        path="/notificacoes"
        element={<PrivateRoute isLoggedIn={isLoggedIn} navigateTo="/login" />}
      />
      <Route path="/" element={<Notifications />} />
      <Route path="/privacidade" element={<ToS />} />
      <Route path="*" element={<p>Não tem nada aqui!</p>} />
    </Routes>
  );
}
