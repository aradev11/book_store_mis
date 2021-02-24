import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { protect } from '../../../../utils/protect';
import { ControlPanel } from '../../../../components/controlpanel/controlpanel';
import Error from '../../../../utils/error';

import { 
    Form, 
    Input,
    Row,
    Col,
    Select,
    Empty
} from 'antd';


const CityForm = ({history}) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [privateData, setPrivateData] = useState([]);
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
            const { data } = await axios.post("/api/city", formData, config);
            
            if(!data) return Error.notification.error("Data Not Added");

            onReset();
            Error.notification.success("Your Data Added Successfully");
            
        } catch (err) {
            Error.notification.error(err.response.data.error);
        }
    }

    useEffect(() => {
        protect({history})
        fetchData();
    }, [history])

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
                <Col span={5}>
                    <Form.Item
                    label="City Name"
                    name="name"
                    rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                    label="Country"
                    name='country'
                    rules={[{ required: true, message: 'Field Should not be Empty!' }]}
                    >    
                        <Select placeholder="Country" onChange={e => addNewCountry(e)}>
                            {privateData.length === 0 ? <Empty />  : privateData.map((item, i) => (
                            <Option key={i} value={item._id}>
                                {item.name}    
                            </Option>
                            ))}
                            <Option value='add' >
                                Add New 
                            </Option> 
                        </Select>  
                    </Form.Item>
                </Col>
            </Row>    
        </Form>
        </>
    );
}


export default CityForm;