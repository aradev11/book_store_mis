import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Typography } from 'antd';

const {
    Footer
} = Layout;
const { Text } = Typography;


const Copy = () => (<Text >Copyright &copy; 2020 | <a href="http://ara.dev.com">ARA.DEV</a> </Text>)
const FooterComponent = () => ( 
    <Footer style={{padding: 0}}>
        <div className='footer-container'>
            <div>
                <a href='http://facebook.com/'>Facebook</a>
                <a href='http://facebook.com/'>Instagram</a>
                <a href='http://facebook.com/'>Github</a>
                <a href='http://facebook.com/'>Twitter</a>
            </div>
            <div>
                <Copy />
            </div>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/privicy'>Privicy</Link>
                <Link to='/contact'>Contact Us</Link>
                <Link to='/dashboard'>Dashboard</Link>
            </div>
        </div>
    </Footer>
)


export default FooterComponent;