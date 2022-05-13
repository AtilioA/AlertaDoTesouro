import React from 'react';

import { Switch } from "react-router-dom";

import Route from './Route';
import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Account from '../pages/Account';
import Notifications from '../pages/Notifications';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard}/>
    <Route path="/dashboard" component={Dashboard}/>

    <Route path="/login" component={SignIn}/>
    <Route path="/registrar" component={SignUp}/>
    <Route path="/esqueci-minha-senha" component={ForgotPassword}/>
    <Route path="/redefinir-senha" component={ResetPassword}/>
    <Route path="/conta"  component={Account} isPrivate />
    <Route path="/notificacoes" component={Notifications}/>
  </Switch>
)

export default Routes;
