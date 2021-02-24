// React Component
import React from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
// Import Layout Config file 
import data from '../../data/layout/layout-config.json';

// Ant Design Components
import { Menu, Dropdown, Button, Row, Col, Typography, Avatar, Layout } from 'antd';
// Ant Design Icons
import { 
    UserOutlined, 
    LoginOutlined, 
    LogoutOutlined, 
    GithubOutlined, 
    CheckCircleOutlined, 
    CaretRightOutlined, 
    MenuOutlined 
} from '@ant-design/icons';

const { Text } = Typography;

const { NavbarComponent } = data.HeaderItems;
const { Header } = Layout;


const Navbar = props => {

    let { url } = useRouteMatch();
    const userRole = localStorage.getItem('user-role');
    const history = useHistory();
 
    const logoutHandler = () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-role");
        history.push("/")
    }

    const menu = (
        <Menu>
        {userRole ? (
            <Menu.Item key="3" onClick={logoutHandler} icon={<LogoutOutlined />}>
                log-out
            </Menu.Item>
        ) : (
            <>
            <Menu.Item key="1" icon={<LoginOutlined />}>
                 <Link to='/register'>Sign-up</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to='/login'>Sign-in</Link>
            </Menu.Item>
            </>
        )}
        </Menu>
    );

    const lang = (
        <Menu>  
            <Menu.Item key="1" icon={<CaretRightOutlined />}>
               DARI
            </Menu.Item>
            <Menu.Item key="2" icon={<CheckCircleOutlined />}>
                ENGLISH
            </Menu.Item>
        </Menu>
    )

    const AdminMenu = (
        <Menu theme={NavbarComponent.theme}  mode={NavbarComponent.mode}>
            {NavbarComponent.itemss.map((items, i) => (
                <Menu.Item key={i}> <Link to={items.href}>{items.name}</Link></Menu.Item>
            ))}
        </Menu>
    )
    const CustomerMenu = (
        <Menu theme={NavbarComponent.theme}  mode={NavbarComponent.mode}>
            {NavbarComponent.items.map((items, i) => (
                <Menu.Item key={i}> <Link to={`${url}/${items.href}`}>{items.name}</Link></Menu.Item>
            ))}
        </Menu>
    )

    const NavbarMenu = () => {
        if(userRole === "admin") {
            return AdminMenu
        } else if (userRole === "customer") {
            return CustomerMenu 
        }
        return CustomerMenu
    }

    return (
        <React.Fragment>
           {history.location.pathname === "/login" || history.location.pathname === "/register" ? (
               <></>
           ) : (
                <Header style={{ background: "white" }}>
                <div>
                    <Row justify="space-between" >
                        <Col>
                            {localStorage.getItem('auth-token') ? (
                                <Button type="link" onClick={props.side} size='large'>
                                    <MenuOutlined />
                                </Button>  
                            ) : null}
                            <Link to='/'>
                                <Text underline strong type='success'>ARA-DEV</Text>
                            </Link>
                        </Col>
                        <Col>
                            <NavbarMenu />
                        </Col>
                        <Col>
                            <Button type="link" size='large'>
                                <GithubOutlined />
                            </Button>  
                            <Dropdown overlay={lang} trigger={['click']}>
                                <Button type="link" size='large'>
                                    Language
                                </Button> 
                            </Dropdown>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <Button type="link" size='large'>
                                    <Avatar size={25}  icon={<UserOutlined />} />
                                </Button> 
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
            </Header>
           )}
        </React.Fragment>
    )
}



export default Navbar;