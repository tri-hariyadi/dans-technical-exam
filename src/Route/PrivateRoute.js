import React from 'react';
import { Redirect, Route } from 'react-router';
import { AuthConsumer } from '../Auth/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
      <AuthConsumer>
        {({ isAuth }) => {
          console.log(isAuth);
          return (
            <Route
              {...rest}
              render={props =>
                isAuth ? <Component {...props} /> : <Redirect to={{
                  pathname: '/',
                  state: { from: props.location }
              }} />
              }
            />
          )
        }}
      </AuthConsumer>
    );
  }