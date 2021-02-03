import React from 'react';
// IMPORT REACT ROUTER
import { Route, Switch } from 'react-router-dom';

// IMPORT ROUTER COMPONENTS
import {
    LandingScreen,
    LoginScreen,
    RegisterScreen
} from '../screens/not__private';
// import {} from '../screens/private';

const ROUTE = [
    {
        component: LandingScreen,
        path: "/",
        exact: true
    },
    {
        component: LoginScreen,
        path: "/login",
        exact: false
    },
    {
        component: RegisterScreen,
        path: "/register",
        exact: false
    }

]

export default props => 
(
    <React.Fragment>
        <Switch>
            {ROUTE.map(value => (
                <Route exact={value.exact} path={value.path} component={value.component} />
            ))}
        </Switch>
    </React.Fragment>
)
