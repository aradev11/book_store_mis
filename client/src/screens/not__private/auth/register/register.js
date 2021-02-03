import React from 'react';

import {
    Card,
    Form, 
    Input, 
    Button, 
    Row,
    Col,
} from 'antd';

const style = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%"
    },
    card: {
        height: "70vh",
        width: "70%",
        display: "flex",
        alignItems: 'center',
        textAlign: 'center'
    }

}
const  { container, containerWidth, card } = style;

export default () => 
(
    <div style={container}>
        <Card style={card} >
            <Row>
                <Col span={12}>
                    <Form
                        layout="horizontal"
                    >
                        <Form.Item label="Form Layout" >
                        </Form.Item>
                            <Form.Item label="Field A">
                            <Input placeholder="input placeholder" />
                        </Form.Item>
                        <Form.Item label="Field B">
                            <Input placeholder="input placeholder" />
                            </Form.Item>
                        <Form.Item>
                            <Button type="primary">Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>

                </Col>
            </Row>
        </Card>
    </div>
)