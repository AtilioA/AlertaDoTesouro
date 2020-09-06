import React, { useContext } from 'react';

import { Redirect, Route as ReactDOMRoute, RouteProps as ReactDOMRouteProps } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  }

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <ReactDOMRoute
    {...rest}
    render={({ location }) => {
      return isPrivate === !!user ? (
        <Component />
      ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/login' : '/dashboard',
              state: {from: location},
            }}
          />
        );
      }}
    />
  );
};


export default Route;
