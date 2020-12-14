import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          render={props => (
            <Suspense fallback="">
              <route.component {...props} />
            </Suspense>
          )}
          exact
        /> 
      ))}
      <Redirect from="/" to="/teams" />
      <Redirect to="/teams" />
    </Switch>
  </BrowserRouter>
);

export default Router;
