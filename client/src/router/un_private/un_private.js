import { Redirect,  Route } from 'react-router-dom';


const PrivateRoute = ( {component: Component, roles, ...rest} ) => {
    return ( 
    <Route {...rest} render={props => {
        if(localStorage.getItem('auth-token')) {
            return <Redirect to='/' />
        }
        return <Component {...props} /> 
    }} /> 
    )
}

export default PrivateRoute;