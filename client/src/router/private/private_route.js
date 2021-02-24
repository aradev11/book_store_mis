import { Redirect,  Route } from 'react-router-dom';


const PrivateRoute = ( {component: Component, roles, ...rest} ) => {
    return ( 
    <Route {...rest} render={props => {
        if(!localStorage.getItem('auth-token') || !roles.includes(localStorage.getItem('user-role'))) {
            return <Redirect to='/login' />
        }
        return <Component {...props} /> 
    }} /> 
    )
}

export default PrivateRoute;