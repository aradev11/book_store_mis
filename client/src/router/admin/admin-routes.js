import React from 'react';
// IMPORT REACT ROUTER
import { Route, Switch,  useRouteMatch } from 'react-router-dom';

// IMPORT PRIVE__ROUTE
import Posts from '../../screens/private/posts/post';
import Dashboard from '../../screens/private/dashboard/dashboard';

// VIEWS
import EmployeeView from '../../screens/private/employee/employee-view';
import CustomerView from '../../screens/private/customer/customer-view';
import CountryView from '../../screens/private/location/country/country-view';
import CityView from '../../screens/private/location/city/city-view';
import AuthorView from '../../screens/private/other/author/author-view';
import PublisherView from '../../screens/private/other/publisher/publisher-view';
import UnitView from '../../screens/private/other/unit/unit-view';
import TransilatorView from '../../screens/private/other/transilator/transilator-view';
import CategoryView from '../../screens/private/other/category/category-view';
// FORMS
import EmployeeForm from '../../screens/private/employee/employee-form';
import CustomerForm from '../../screens/private/customer/customer-form';
import UnitForm from '../../screens/private/other/unit/unit-form';
import CategoryForm from '../../screens/private/other/category/category-form';
import PublisherForm from '../../screens/private/other/publisher/publisher-form';
import TransilatorForm from '../../screens/private/other/transilator/transilator-form';
import AuthorForm from '../../screens/private/other/author/author-form';
import CountryForm from '../../screens/private/location/country/country-form';
import CityForm from '../../screens/private/location/city/city-from';


  

const Routes = () => {
    let { path } = useRouteMatch();
    return (
    <React.Fragment>
        <Switch>
            <Route exact path={`${path}`} component={Dashboard} />
            <Route exact path={`${path}/dashboard`} component={Dashboard} />
            <Route path={`${path}/employee`} component={EmployeeRoutes} />
            <Route path={`${path}/customer`} component={CustomerRoutes} />
            <Route path={`${path}/location/country`} component={CountryRoutes} />
            <Route path={`${path}/location/city`} component={CityRoutes} />
            <Route path={`${path}/other/publisher`} component={PublisherRoutes} />
            <Route path={`${path}/other/author`} component={AuthorRoutes} />
            <Route path={`${path}/other/unit`} component={UnitRoutes} />
            <Route path={`${path}/other/transilator`} component={TransilatorRoutes} />
            <Route path={`${path}/other/category`} component={CategoryRoutes} />
            <Route path={`${path}/setting`} component={Posts} />
        </Switch>
    </React.Fragment>
    )
}
  

const EmployeeRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
             <Route exact path={`${path}`} component={EmployeeView} />
             <Route path={`${path}/add`} component={EmployeeForm} />
             <Route path={`${path}/edit/:id`} component={EmployeeForm} />
        </Switch>
    )
}

const CustomerRoutes = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`} component={CustomerView} />
            <Route exact path={`${path}/add`} component={CustomerForm} />
            <Route exact path={`${path}/edit/:id`} component={CustomerForm} />
        </Switch>
    );
}

const CountryRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={CountryView} />
            <Route exact path={`${path}/add`} component={CountryForm} />
        </Switch>
    );
}

const CityRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={CityView} />
            <Route exact path={`${path}/add`} component={CityForm} />
        </Switch>
    );
}

const AuthorRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={AuthorView} />
            <Route exact path={`${path}/add`} component={AuthorForm} />
        </Switch>
    );
}

const PublisherRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={PublisherView} />
            <Route exact path={`${path}/add`} component={PublisherForm} />
        </Switch>
    );
}

const UnitRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={UnitView} />
            <Route path={`${path}/add`} component={UnitForm} />
        </Switch>
    );
}

const TransilatorRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={TransilatorView} />
            <Route exact path={`${path}/add`} component={TransilatorForm} />
        </Switch>
    );
}

const CategoryRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={CategoryView} />
            <Route exact path={`${path}/add`} component={CategoryForm} />
        </Switch>
    );
}

export default Routes;