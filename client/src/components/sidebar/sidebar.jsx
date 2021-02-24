import React from 'react';
import { Link } from 'react-router-dom';

import {data} from '../../data/layout/layout-config';

// Ant Design
import { Menu } from 'antd';
import { BlockOutlined } from '@ant-design/icons';

// IMPORT PRIVE__ROUTE
const { SubMenu } = Menu;
const { sidebar } = data;

const Sidebar = (props) => {
    return (
        <Menu
        mode={sidebar.mode}
        style={sidebar.style}
        theme={sidebar.theme}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub100']}
        >
        {sidebar.menu.map(item => {
            if(item.subMenu) {
                return <SubMenu  title={item.title} key={`sub${item.id}`} icon={item.icon ? item.icon : <BlockOutlined />}>
                {item.subMenu.map((sub) => 
                    <Menu.Item key={sub.id} onClick={props.sideHander}>
                        <Link to={`/ara-dev/${sub.href}`}>
                        {sub.title}
                        </Link>
                    </Menu.Item>    
                )}
            </SubMenu>
            } else {
                return (
                <Menu.Item onClick={props.sideHander} icon={item.icon ? item.icon : <BlockOutlined />} key={item.id}>
                    <Link to={`/ara-dev/${item.href}`}>{item.title}</Link>
                </Menu.Item> 
                )
            }
        })}
        </Menu>
    )
}


export default Sidebar;