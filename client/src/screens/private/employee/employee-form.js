import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import Error from '../../../utils/error';
import axios from 'axios';

import { 
    Form, 
    Row, 
    Col, 
    Button, 
    Input, 
    Space, 
    Select, 
    DatePicker, 
    InputNumber, 
    Typography,
    Switch
} from 'antd';

import { PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import { ControlPanel } from '../../../components/controlpanel/controlpanel';

const EmployeeForm = () => {
    const history = useHistory();
    const { url } = useRouteMatch();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [privateData, setPrivateData] = useState({});
    const { Option } = Select;
    const { Title } = Typography;
    

    const layout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 24 },
            },
            wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
        },
    };

    const onReset = () => {
        form.resetFields();
    }

    
    const onFinish = value => {
        setFormData(value); 
        postHander();
    }   

    const postHander = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth-token")}`
            }
        }
        try {
            const { data } = await axios.post("/api/employee", formData, config);
            
            if(!data) return Error.notification.error("Data Not Added");
            onReset();
            Error.notification.success("Your Data Added Successfully")
            history.push(`${url}/employee`);
            
        } catch (err) {
            Error.notification.error(err.response.data.error)
        }
    }

    const FetchPrivateDate = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth-token")}`
            }
        }
        try {
            const { data } = await axios.get(`/api/employee/${id}`, config);
            if(data && data.data) 
            setPrivateData(data.data)
            form.setFieldsValue(privateData[0])
        } catch (err) {
            Error.notification.error(err.response.data.error);
        }
    }
   
    useEffect(() => {
        if(id) {
            FetchPrivateDate();
        }
    }, [])

    return (
        <div>
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
                    <Title level={5}>Personal Information</Title>
                        <Form.Item
                        label="ID CARD"
                        name="id_card"
                        rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                        >
                            <Input maxLength={20} value={privateData.first_name}  />
                        </Form.Item>
                        <Form.Item
                            label="Firstname"
                            name="first_name"
                            rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Lastname"
                            name="last_name"
                            rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            label="Fathername"
                            name="father_name"
                        >
                            <Input  />
                        </Form.Item>
                        
                        <Space>
                            <Form.Item
                                name='gender'
                                hasFeedback
                                label="Gender"
                                style={{width: 180}}
                                rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                            >
                                <Select >
                                    <Option value="M">Male</Option>
                                    <Option value='F'>Female</Option>
                                    <Option value='O'>Other</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name='dob'
                                hasFeedback
                                label="Date Of Birth"
                                rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Space >

                        <Form.Item
                            label="Position"
                            name="position"
                            rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            label="Is Actived"
                            name="is_active"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                    
                    <Col span={8}>
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
                            label="BIO"
                            name="describe"
                        >
                            <Input.TextArea allowClear autoSize showCount rows={6} maxLength={255} />
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
                                    label="Street"
                                    name={[field.name, 'street']}
                                    fieldKey={[field.fieldKey, 'street']}
                                    rules={[{ required: true, message: 'field should not be empty!ty!' }]}
                                    >
                                        <Input placeholder="Street"/>
                                    </Form.Item>
                                    <Form.Item
                                    {...field}
                                    label="Street2"
                                    name={[field.name, 'street2']}
                                    fieldKey={[field.fieldKey, 'street2']}
                                    >
                                    <Input placeholder="Street 2"/>
                                    </Form.Item>
                                    <Form.Item
                                        label='Country'
                                        name={[field.fieldKey, 'country']}
                                        fieldKey={[field.fieldKey, 'country']}
                                        hasFeedback
                                        rules={[{ required: true, message: 'field should not be empty!' }]}
                                    >
                                        <Select placeholder="Country">
                                        <Option value="60159ef3b8143d12f0deed75">Afghanistan</Option>
                                        <Option value='60159ef3b8143ddeed75'>IR-IRAN</Option>
                                        
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name={[field.fieldKey, 'city']}
                                        fieldKey={[field.fieldKey, 'city']}
                                        label='City'
                                        hasFeedback
                                        rules={[{ required: true, message: 'field should not be empty!' }]}
                                    >
                                        <Select placeholder="City">
                                        <Option value="6015a014b8143d12f0deed7c">Kabul</Option>
                                        <Option value='6015a014b8143d12f0d'>Herat</Option>
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

            
        </div>        
    )
}

export default EmployeeForm;