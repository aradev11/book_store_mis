import react, { useState } from 'react';

import { useRouteMatch, useHistory } from 'react-router-dom';

// ANT
import { Form, Space, Button } from 'antd';
import { 
    PlusCircleOutlined, 
    DeleteOutlined, 
    EditOutlined, 
    SaveOutlined,
    LeftCircleOutlined, 
    ClearOutlined 
} from '@ant-design/icons';

export const ControlPanel = (props) => {
    const { url } = useRouteMatch();
    const history = useHistory();

    return (
        <>
            {props.type === "view" ? (
                <Space style={{ marginBottom: 16 }} size='middle'>
                    <Button 
                        type='primary' 
                        shape="round"
                        onClick={() => history.push(`${url}/add`)} 
                        icon={<PlusCircleOutlined />}>
                        Add
                    </Button>
                    <Button 
                        onClick={props.onDelete}
                        shape="round"
                        disabled
                        danger
                        icon={<DeleteOutlined />}
                        >
                        Delete
                    </Button>
                    <Button 
                        onClick={props.onEdit}
                        shape="round"
                        disabled
                        danger
                        icon={<EditOutlined />}
                        >
                        Edit
                    </Button>
                </Space>
            ) : (
                <Space  className='form-action-items'>
                <Form.Item>
                    <Button htmlType="submit" shape="round" type='primary' icon={<SaveOutlined />} name='employeesumit' >
                        Save
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="button" danger shape="round" icon={<LeftCircleOutlined />} onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="button" shape="round" icon={<ClearOutlined />} onClick={props.onReset}>
                        Clean Form
                    </Button>
                </Form.Item>
                </Space>
            )}
        </>
    )
}
