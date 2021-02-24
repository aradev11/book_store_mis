import React, { useState } from 'react';
import axios from 'axios';

// ERROR
import Error from '../../../../utils/error';
// Control Panel
import { ControlPanel } from '../../../../components/controlpanel/controlpanel';

import { 
    Form, 
    Button, 
    Space,
    Input,
    Row,
    Col,
    Select,
    Typography
} from 'antd';

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const CountryForm = () => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const { Title } = Typography;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }
    }

    const addNewCountry = e => {
        if(e === 'add') {
            alert("Add New")
        }
    }

    const onReset = () => {
        form.resetFields();
    }

    const onFinish = value => {
        setFormData(value);
        postHander();
    }   

    const postHander = async () => {
        try {
            const { data } = await axios.post("/api/country", formData, config);
            
            if(!data) return Error.notification.error("Data Not Added");

            onReset();
            Error.notification.success("Your Data Added Successfully")
            
        } catch (err) {
            Error.notification.error(err.response.data.error)
        }
    }


    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
      
    return (
        <>
        <Form
        {...layout} 
        layout='vertical'
        onFinish={onFinish}
        form={form}
        className='form-container'
        name='employee-f'
        >   
            <ControlPanel onReset={onReset} />

            <Row gutter={16} className='form-input-items' >
                <Col span={8}>
                    <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                    >
                        <Input  />
                    </Form.Item>

                    <Form.Item
                    label="Code"
                    name="code"
                    rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                    >
                        <Input  />
                    </Form.Item>

                </Col>
                <Col span={8}>
                <Title level={5}>Contact Information</Title>
                        
                        <Form.List name="lang" {...layout} >
                            {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8, }} >
                                    <Form.Item
                                    {...field}
                                    label="Language"
                                    rules={[{ required: true, message: 'field should not be empty!ty!' }]}
                                    >
                                        <Input placeholder="Languages" style={{ width: "100%" }} />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                            )}
                        </Form.List>
                </Col>
            </Row>    
        </Form>

        </>
    );
}


export default CountryForm;