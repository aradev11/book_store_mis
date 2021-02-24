// import react component
import React from 'react';

// Ant component
import { Typography, Button } from 'antd';

// Ant icons 
import { CheckCircleFilled } from '@ant-design/icons';

// import header style
import "./style.css";


const Header = () => {
    // Distract items
    const { Title, Text } = Typography;
    return (
     
            <div className="header-message-container">
                <div>
                    <div className='header-title'>
                        <Title>ARA.DEV BOOK STORE</Title>
                    </div>
                    <div className='header-body'>
                        <Text>We Create today's Communitry to start the find the next world Community</Text>
                    </div>
                    <div className="header-action">
                        <Button type='primary' size='large'>
                            Buy Book
                        </Button>
                        <Button size='large'>
                            <CheckCircleFilled />
                            Register
                        </Button>
                    </div>
                </div>
            </div>
      
    );
};


export default Header;