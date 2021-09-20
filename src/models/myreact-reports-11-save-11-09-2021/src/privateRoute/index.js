import React from 'react';

import { Redirect, Route } from 'react-router';

const getToken = () => {
    return localStorage.getItem("JWT_REPORTS")
}

const PrivateRoute = ({ comp: Component, ...rest }) => (
    <Route
    {...rest}
    render={props => 
    getToken() !== null ? 
        <Component {...props} /> : 
            <Redirect to={{
                pathname: 'auth/login',
                state: {from: props.location},
                   }}
                   />
        
    }
    />
);

export default PrivateRoute;