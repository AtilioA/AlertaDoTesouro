import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Account from '../pages/Account';
import Notifications from '../pages/Notifications';
import ToS from '../pages/ToS';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'registrar', element: <SignUp /> },
      { path: 'login', element: <SignIn /> },
      {
        path: 'conta',
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
      },
      { path: 'notificacoes', element: <Notifications /> },
      { path: 'tos', element: <ToS /> },
    ],
  },
];

export default function AppRoutes() {
  return (
    <Routes>
      {routes.map(props => (
        <Route {...props} path={props.path} key={props.path} />
      ))}
    </Routes>
  );
}
