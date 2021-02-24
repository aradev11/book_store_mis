import React, { useState } from 'react';
import axios from 'axios';

// ERROR
import Error from '../../../../utils/error';

// Control Panel 
import { ControlPanel } from '../../../../components/controlpanel/controlpanel';

// ANT
import { 
    Form, 
    Input
} from 'antd';

const UnitForm = () => {

    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});

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
            const { data } = await axios.post("/api/unit", formData, config);
            
            if(!data) return Error.notification.error("Data Not Added");

            onReset();
            Error.notification.success("Your Data Added Successfully")
            
        } catch (err) {
            Error.notification.error(err.response.data.error)
        }
    }

    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 4 },
      };
    return (
        <Form
        form={form}
        {...layout}
        name="unit-form"
        className='form-container'
        onFinish={onFinish}
        >

        <ControlPanel onReset={onReset} />

        <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title Should Not be Empty!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Currenct Code"
            name="code"
            rules={[{ required: true, message: 'Currency Code Should Not Be Empty!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Symbol"
            name="symbol"
            rules={[{ required: true, message: 'Symbol Should Not Be Empty!' }]}
        >
            <Input />
        </Form.Item>
        </Form>
    );
}


export default UnitForm;