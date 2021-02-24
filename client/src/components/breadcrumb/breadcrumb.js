import React from 'react';

import { Link, withRouter } from 'react-router-dom';

import { Breadcrumb, Row, Col, Button, Typography } from 'antd';
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons';

const Breadcrumbs = props => {
    const routeName = "Dashboard";
    const { Text } = Typography;
    const {
        history,
        location: { pathname }
    } = props;
    
    const pathnames = pathname.split("/").filter(x => x);
    return (
            <Row style={{paddingBottom: 5}}>
                <Col span={8}>
                    <Button type='link' onClick={() => window.history.back()}>
                        <ArrowLeftOutlined />
                    </Button>
                    <Text type='secondary'>
                        {routeName}
                    </Text>
                </Col>
                <Col span={8} offset={8}>
                    <Breadcrumb separator={<ArrowLeftOutlined />} style={{display:"flex", justifyItems:"flex-end", justifyContent:'flex-end', paddingRight:5}}>
                        {pathnames.length > 0 ? (
                            <Link to="" onClick={() => history.push("/dashboard")}>
                                <Breadcrumb.Item>
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                            </Link>
                        ) : (
                            <Breadcrumb.Item>
                                <HomeOutlined />
                            </Breadcrumb.Item>
                        )}
                        {pathnames.map((name, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                            const isLast = index === pathnames.length - 1;    
                            return isLast ? (
                                <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>
                            ) : (
                                <Link to="" key={name} onClick={() => {history.push(routeTo);}}>
                                    <Breadcrumb.Item>{name}</Breadcrumb.Item>
                                </Link>
                            
                            );
                        })}
                    </Breadcrumb>
                </Col>
            </Row>
    )
}
export default withRouter(Breadcrumbs);