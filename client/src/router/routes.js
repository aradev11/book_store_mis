import React, {useState} from 'react';
// IMPORT REACT ROUTER
import { Route, Switch } from 'react-router-dom';

// Ant Design
import { Layout, Drawer } from 'antd';

// Private route component
import PrivateRoute from './private/private_route';

// un Private route Component
import UnPrivateRoute from './un_private/un_private';

// ARA>DEV ROUTES
import ARADEV from './admin/admin-routes';

// Import Navbar Component
import NavbarComponent from '../components/navbar/navbar';

// IMPORT ROUTER COMPONENTS
import LandingScreen from '../screens/not__private/auth/landing';
import LoginScreen from '../screens/not__private/auth/login/login';
import RegisterScreen from '../screens/not__private/auth/register/register';

import SidebarComponent from '../components/sidebar/sidebar';
import Breadcrumb from '../components/breadcrumb/breadcrumb';

// IMPORT PRIVE__ROUTE
const { Content } = Layout;

const Routes = () => {
    const [visible, setVisible] = useState(false);

    const sidebarHandler = () => {
        setVisible(!visible)
    }
    return (
        <React.Fragment>
            <NavbarComponent side={sidebarHandler} />
            <Switch>
                <Route exact path="/" component={LandingScreen} />
                <UnPrivateRoute path='/login' component={LoginScreen} />
                <UnPrivateRoute path='/register' component={RegisterScreen} />
                <Route path="/forgotpassword" component={LandingScreen} />
                <Layout style={{ height: "100vh" }}>
                    <Drawer 
                        title="ARA-DEV"
                        placement='left'
                        onClose={sidebarHandler}
                        visible={visible}
                    >
                        <SidebarComponent sideHander={sidebarHandler} />
                    </Drawer>
                    <Layout style={{ padding: '14px' }}>
                        <Breadcrumb />
                        <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                        >
                            <PrivateRoute 
                            roles={['admin', 'customer', 'employee']} 
                            path="/ara-dev" 
                            component={ARADEV} 
                            />
                        </Content>
                    </Layout>
                </Layout>
            </Switch>
        </React.Fragment>
    )
}

export default Routes;