import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Error
import Error from '../../../../utils/error';

// Control Panel
import { ControlPanel } from '../../../../components/controlpanel/controlpanel';

// ANT
import { 
    Form, 
    Button, 
    Space,
    Input,
    Row,
    Col,
    InputNumber,
    Select,
    Typography,
    Empty
} from 'antd';

import {PlusOutlined, MinusCircleOutlined, } from '@ant-design/icons';

const PublisherForm = ({history}) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [privateData, setPrivateData] = useState([]);
    const [city, setCity] = useState([]);
    const { Title } = Typography;
    const { Option } = Select;

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }
    }

    const fetchData = async () => {
        try {
            const { data } = await axios.get('/api/country?dtl=show', config);
            if(data || data.data) setPrivateData(data.data);

        } catch (error) {
            Error.notification.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [history])

    const onReset = () => {
        form.resetFields();
    }

    const onFinish = value => {
        setFormData(value);
        postHander();
    }   

    const postHander = async () => {
        try {
            const { data } = await axios.post("/api/publisher", formData, config);
            
            if(!data) return Error.notification.error("Data Not Added");

            onReset();
            Error.notification.success("Your Data Added Successfully")
            
        } catch (err) {
            Error.notification.error(err.response.data.error)
        }
    }

    const setCityData = e => {
        privateData.filter(item => {
            if(item._id === e) {
                setCity(item.cities)
            }
        })
    }

    const layout = {
        labelCol: { span: 16 },
        wrapperCol: { span: 24 },
      };
    return (
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
                    label="Company Name"
                    name="name"
                    rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                    >
                        <Input  />
                    </Form.Item>
                    <Title level={5}>Contact Information</Title>
                    <Form.Item
                    label="Email Address"
                    name='email'
                    rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                    >    
                        <Input type='email' placeholder="example@gamil.com"  />           
                    </Form.Item>

                    <Form.Item
                    label="Enter Country Code and Phone Number"
                    name='phone'
                    rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                    >
                        <InputNumber style={{width:"100%"}} placeholder="937********"  />
                    </Form.Item>

                    <Form.Item
                        name="website"
                        label="Website"
                        rules={[{ required: true, message: 'Please input website!' }]}
                    >            
                        <Input addonBefore="http://" />

                    </Form.Item>
               
                </Col>
               
                <Col span={8}>
                    <Title level={5}>Contact Information</Title>
                    
                    <Form.List name="addresses" {...layout} >
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                {...field}
                                label="District"
                                name={[field.name, 'street']}
                                fieldKey={[field.fieldKey, 'street']}
                                rules={[{ required: true, message: 'field should not be empty!ty!' }]}
                                >
                                    <Input placeholder="District"/>
                                </Form.Item>
                                <Form.Item
                                {...field}
                                label="Street"
                                name={[field.name, 'street2']}
                                fieldKey={[field.fieldKey, 'street2']}
                                >
                                <Input placeholder="Street 2"/>
                                </Form.Item>
                                <Form.Item
                                    label='Country'
                                    name={[field.fieldKey, 'country']}
                                    fieldKey={[field.fieldKey, 'country']}
                                    rules={[{ required: true, message: 'field should not be empty!' }]}
                                >
                                    <Select placeholder="Country" onChange={e => setCityData(e)}>
                                        {privateData.length === 0 ? <Empty />  : privateData.map((item, i) => (
                                        <Option key={i} value={item._id}>
                                            {item.name}    
                                        </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name={[field.fieldKey, 'city']}
                                    fieldKey={[field.fieldKey, 'city']}
                                    label='City'
                                    rules={[{ required: true, message: 'field should not be empty!' }]}
                                >
                                     <Select placeholder="City">
                                        {city.length === 0 ? <Empty />  : city.map((item, i) => (
                                        <Option key={i} value={item._id}>{item.name}</Option>
                                        ))}
                                    </Select>
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
    );
}


export default PublisherForm;