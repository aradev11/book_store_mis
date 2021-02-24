import React, { useEffect } from 'react';

import HeaderComponent from '../../../components/header/header.message';

import Avatoar from '../../../assests/img/avatar.jpg';

import { List, Row, Col, Button, Menu } from 'antd';
import {
    LoginOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons'



const Landing = () => {
    useEffect(() => {
        console.log(localStorage.getItem('auth-token'))
    })
    return (
        <div className='landing-container'>
            <div className='header-area'>
                <HeaderComponent />
            </div>
            <div className='body-area'>
                <section className='top-body-items'>
                    
                </section>

                <section className='artical-area'>
                    <Row className='artical-area'>
                        <Col>
                        <div className='author-container'>
                            <div className='author-img'>
                                <img src={Avatoar} alt="Avatar" />
                            </div>
                            <div className='author-dtl'>
                                <h3>Alireza Mohsini</h3>
                                <h5>| Writer</h5>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio odio nesciunt magnam perferendis eligendi distinctio ipsum labore maiores.</p>

                                <div className='author-social'>
                                    <List>
                                        <List.Item>
                                            Facebook
                                        </List.Item>
                                        <List.Item>
                                            Twitter
                                        </List.Item>
                                        <List.Item>
                                            Github
                                        </List.Item>
                                    </List>
                                </div>
                            </div>
                        </div>
                        </Col>
                        <Col>
                            <div className='artical-content-container'>
                                <div className='artical-header'>
                                    <Row className='artical-header'>
                                        <Col>
                                            <h1>Humanity is not die</h1>
                                        </Col>
                                        <Col>
                                        <Menu mode='horizontal' theme='dark'>
                                            <Menu.Item key="1" icon={<LoginOutlined />}>
                                                100
                                            </Menu.Item>
                                            <Menu.Item key="2" icon={<UserOutlined />}>
                                                499
                                            </Menu.Item>
                                            <Menu.Item  key="3" icon={<LogoutOutlined />}>
                                                8982
                                            </Menu.Item>
                                        </Menu>
                                        </Col>
                                    </Row>
                                </div>
                                <hr />
                                <div className='artical-body'>
                                    <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio odio nesciunt magnam perferendis eligendi distinctio ipsum labore maiores.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio odio nesciunt magnam perferendis eligendi distinctio ipsum labore maiores.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio odio nesciunt magnam perferendis eligendi distinctio ipsum labore maiores.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio odio nesciunt magnam perferendis eligendi distinctio ipsum labore maiores.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio odio nesciunt magnam perferendis eligendi distinctio ipsum labore maiores.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio odio nesciunt magnam perferendis eligendi distinctio ipsum labore maiores.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio odio nesciunt magnam perferendis eligendi distinctio ipsum labore maiores.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    </p>

                                    <div className='artical-body-action'>
                                        <Button type='link'>Readmore</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>


                <section className='bottom-body-items'>

                </section>
            </div>
        </div>

    );
};

export default Landing;

