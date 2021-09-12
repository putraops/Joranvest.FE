import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Image } from 'antd';
import { Card, List } from 'antd';

const ArticleList = (props) => {
    const articleCategory = {
        color: '#ff8700',
        fontSize: '12px',
    }
    const articleTitle = {
        fontSize: '20px',
    }
    const categoryStyle = {
        marginTop: "-5px",
    }
    const postedDate = {
        marginTop: "-5px", 
        fontSize: "13px",
    }
    return (
        <List.Item key={props.obj.id}>
            <List.Item.Meta
            avatar={
                <Image
                    width={150} height={100} 
                    preview={false}
                    src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?4123`}
                    placeholder={
                        <Image
                            preview={false}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                            width={150} height={100}
                        />
                    }
                />
            }
            title={
                <Fragment>
                    <div style={categoryStyle}>
                        <p className="mb-0" style={articleCategory}>EMITEN</p>
                    </div>
                    <a style={articleTitle} href="https://ant.design">{props.obj.name.last}</a>
                </Fragment>
            }
            description={<p className="text-muted f-8 mb-0" style={postedDate}>15 Sept 2021</p>}
        />
    </List.Item>
    )
}

export default ArticleList