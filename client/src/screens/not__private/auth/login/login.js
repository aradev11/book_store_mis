import React, { useState } from 'react';
import axois from "axios";
import { Link } from 'react-router-dom';


import Errors from '../../../../utils/error';

import { Form, Checkbox ,Input, Button, message, Card } from 'antd';
import { LoginOutlined, CheckCircleFilled } from '@ant-design/icons';

const style = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
    },
    card: {
        width: "30%"
    }
}

const Login = ( { history }) =>  {
    const  { container } = style;

    const [user_name, setUsername] = useState('');
    const [pwd, setPassword] = useState("");

    if(localStorage.getItem('auth-token') && localStorage.getItem('user-role')) {
      history.push('/ara-dev/dashboard');
      return
    }

    const handleSubmitForm = async e => {
        e.preventDefault();

        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        try {
          const { data } = await axois.post("/api/auth/login", { user_name, pwd }, config);
          
          if(!data.token || !data.role) {
            Errors.notification.warning("Login Process Filed","Dear User Are not Authorized, Please Check Your Email or Password or if you have forgot your password please click like below. THANK YOU!");
            return false;
          }

          await localStorage.setItem("auth-token", data.token);
          await localStorage.setItem("user-role", data.role);

          if(!localStorage.getItem('auth-token') || !localStorage.getItem('user-role')) {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user-role');
            Errors.notification.error(`Your Are Not Authorized to Login Please Register first`);
            history.push('/register');
            return false
          } else {
            history.push('/ara-dev/dashboard');
            Errors.notification.success(`Hello, ${user_name}`, "Welcome Back Hope you have nice day!");
          }
          
      
        } catch (err) {
          Errors.notification.error(err.response.data.error);
      }

    }

    return (
      <div style={container} className='auth-container'>
        <Card 
        style={style.card} 
        title="Please Login" 
        extra={<Link to="/forgotpassword">Forgot Password</Link>} 
        actions={[
          <Button onClick={handleSubmitForm} size='large' type='primary'><LoginOutlined />Login</Button>,
          <Link to="/register"><Button size='large' type='primary'><CheckCircleFilled key="Home" />Register</Button></Link>,
        ]}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={handleSubmitForm} >
               <Form.Item
                 id="username"
                 label="Username"
                 rules={[{ required: true, message: () => message.error("Please Fill Your Username") }]}
               >
                 <Input size='large' value={user_name} onChange={e => setUsername(e.target.value)} placeholder="Please enter user name" />
               </Form.Item>
            
                <Form.Item
                 id="email"
                 label="Email Address"
                 rules={[{ required: true, message: () => message.error("Please Fill Your Password") }]}
                >
                  <Input.Password size='large' value={pwd} onChange={e => setPassword(e.target.value)} placeholder="Please enter Password" />
                </Form.Item>

                <Checkbox defaultChecked >Remember Me!</Checkbox>
         </Form>
        </Card>
      </div>
    );
};


export default Login;