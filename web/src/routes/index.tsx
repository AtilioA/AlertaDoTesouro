import React from 'react';

import { Switch, Route } from "react-router-dom";

// import Dashboard from '../pages/Dashboard';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Account from '../pages/Account';

const Routes: React.FC = () => (
  <Switch>
    {/* <Route path="/" exact component={Dashboard}/> */}
    <Route path="/login" exact component={SignIn}/>
    <Route path="/registrar" exact component={SignUp}/>
    <Route path="/conta" exact component={Account}/>
  </Switch>
)

export default Routes;
