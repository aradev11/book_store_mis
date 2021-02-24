import { useState, useEffect } from 'react';
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';

import EmployeeForm from '../../screens/private/employee/employee-form';

export const ViewType = () => {
    const { type } = useParams();
    const { path, url } = useRouteMatch();
    const [Routes, setRoutes] = useState({
        exaxt: false,
        path: "",
        component: null
    })
  
    const CheckType = () => {
        if(`${path}/${type}` === `${url}/add`) {
            setRoutes({
                component: EmployeeForm,
                path: `${path}/add`,
                exact: false
            })
        }
        if(`${path}/${type}` === `${url}/add`) {
            console.log("helo")
        }
    }
    useEffect(() => {
        CheckType();
    }, []);
    return (
        <Switch>
            <Route {...Routes} />
        </Switch>
    )
}