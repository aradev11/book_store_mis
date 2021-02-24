import { useState, useEffect } from 'react';
import axois from "axios";
import { Link } from 'react-router-dom';

import Error from '../../../../utils/error';

import { Card, Form, Button, Input, Typography } from 'antd';

import { LoginOutlined, CheckCircleFilled } from '@ant-design/icons';


const style = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%"
    },
    card: {
        width: "40%",
    }
}
const  { container } = style;

const Register = ( { history }) =>  {

    const { Text } = Typography;

    const [user_name, setUsername] = useState('');
    const [user_email, setEmail] = useState("");
    const [pwd, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const user_type = "customer";

    useEffect(() => {
      if(localStorage.getItem("authToken")) {
        history.push('/');
      }
    }, [history])

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        if(pwd !== repassword) {
            setPassword("")
            setRepassword("")
            Error.notification.error('Password Not Match');
            return false
        }

        try {
          const { data } = await axois.post("/api/auth/register", { user_name, user_email, user_type, pwd }, config);

          localStorage.setItem("auth-toen", data.token);

          history.push('/login');

          Error.notification.success(`Your account created Successfully Dear, ${user_name}`);

        } catch (err) {
            Error.notification.error(err.response.data.error);
        }

    }
    return (
        <div style={container} className='auth-container'>
        <Card 
        style={style.card} 
        title="Please Fill Your Personal Information" 
        actions={[
          <Button onClick={handleSubmitForm} size='large' type='primary'><CheckCircleFilled />Submit</Button>,
          <Link to="/login"><Button size='large' type='primary'><LoginOutlined key="Home" />Login</Button></Link>,
        ]}
        >
         <Form layout="vertical" hideRequiredMark onSubmit={handleSubmitForm}>
           
               <Form.Item
                 id="username"
                 label="Username"
                 rules={[{ required: true, message: 'Please enter user name' }]}
               >
                 <Input size='large' value={user_name} onChange={e => setUsername(e.target.value)} placeholder="Please enter user name" />
               </Form.Item>
            
                <Form.Item
                 id="email"
                 label="Email Address"
                 rules={[{ required: true, message: 'Please enter Email' }]}
                >
                  <Input size='large' type='email' value={user_email} onChange={e => setEmail(e.target.value)} placeholder="Please enter Email" />
                </Form.Item>
         
               <Form.Item
                 id="password"
                 label="Password"
                 rules={[{ required: true, message: 'Please enter Password' }]}
               >
                  <Input size='large' type='password' value={pwd} onChange={e => setPassword(e.target.value)} placeholder="Please enter Password'" />
               </Form.Item>
            
               <Form.Item
                 id="repassword"
                 label="Re-Password"
                 rules={[{ required: true, message: 'Please enter Re-Password' }]}
               >
                  <Input size='large' type='password' value={repassword} onChange={e => setRepassword(e.target.value)} placeholder="Please enter Re-Password" />
               </Form.Item>
           
          <Text>I have already account? <Link to="/login">login</Link></Text>
         </Form>
       </Card>
   </div>
    );
};


export default Register;