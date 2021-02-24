import React from 'react';
import { Table as TableComponent } from 'antd';

export const Table = props => {

    return (
        <>
        <TableComponent 
        dataSource={props.data} 
        columns={props.columns} 
        size="small"
        pagination={false}
        expandable={props.expandable}
         />
        </>
    )
};