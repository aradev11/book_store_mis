import React from 'react';

import { Link } from 'react-router-dom';


import { Menu, } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';

const navMenu = {
    theme: "dark",
    mode: "horizontal",
    mainMenuItem: [
        {
            href: "/",
            icon: "",
            text: "Home"
        },
        {
            href: "/about",
            icon: "",
            text: "About"
        },
        {
            href: "/contact",
            icon: "",
            text: "Contact Us"
        },
        {
            href: "/login",
            icon: "",
            text: "Login",
        },
        {
            href: "/register",
            icon: "",
            text: "Register"
        }
    ]
}

export default () => 
(
    <React.Fragment>
        <div className="logo" />
        <Menu theme={navMenu.theme} mode={navMenu.mode}>
            {navMenu.mainMenuItem.map((items, i) => (
                <Menu.Item key={i}> <Link to={items.href}>{items.text}</Link></Menu.Item>
            ))}
        </Menu>
    </React.Fragment>
)