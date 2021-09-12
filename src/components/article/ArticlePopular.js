import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Image } from 'antd';
import { Card, List } from 'antd';

const ArticlePopular = (props) => {
    const styleNumberMostPopular = {
        fontWeight: '700',
        fontSize: '25px',
        color: '#454545',
        marginTop: '-2px',
    }
    
    return (
        <List.Item>
            <List.Item.Meta
            avatar={<div style={styleNumberMostPopular}><span>{props.obj.no}</span></div>}
            title={<a className="f-18" href="https://ant.design">{props.obj.title}</a>}
            description={<p className="text-muted f-8 mb-0" style={{marginTop: "-5px", fontSize: "13px"}}>15 Sept 2021</p>}
            />
        </List.Item>
    )
}

export default ArticlePopular