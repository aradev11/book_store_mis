import React from "react";

import { Carousel, Empty } from 'antd';
import { ReadOutlined } from '@ant-design/icons';

import mock from '../../data/other/mock.json';


  const sliderStyle = {
    container: {
        height: '360px',
        color: '#000',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    left: {
        height: "80%",
        width: "30%",
        background: "#fff",
        borderRadius: "2px",
        outline: "none"
    },
    right: {
        height: "80%",
        width: "30%",
        background: "#fff",
        outline: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
  };


const slider = props => {
    const {Books} = mock;
    return (
        <Carousel autoplay>
            {!Books ? (<Empty />) 
            : Books.map(book => (
                <div>
                    <div style={sliderStyle.container}>
                        <div style={sliderStyle.left}>
                            <h1>{book.title}</h1>
                            <p>{book.describe}</p>
                            <h5>by: {book.author}</h5>
                        </div>
                        <div style={sliderStyle.right}>
                            <ReadOutlined style={{ fontSize: '200px', color: '#08c' }} />
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};


export default slider;