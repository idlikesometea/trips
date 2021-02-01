import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth !== false
        ? <Component {...props}/>
        : <Redirect to="/" />
    )} />
);
