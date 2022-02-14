import React from 'react';
import 'antd/dist/antd.css';
import { List, Image } from 'antd';
import serverUrl from '../../config/serverUrl';
import dateFormat from '../../commons/dateFormat';

const ArticleList = (props) => {
    const articleCategory = {
        color: '#ff8700',
        fontSize: '12px',
    }
    const articleTitle = {
        fontSize: '20px',
        marginTop: '-5px',
        lineHeight: "30px"
    }
    const categoryStyle = {
        marginTop: "-5px",
    }
    const postedDate = {
        marginTop: "0px", 
        fontSize: "13px",
        lineHeight: "20px"
    }
    var articleDate = dateFormat.getLongDateTimeFormatID(props.obj.submitted_at.Valid ? props.obj.submitted_at.Time : props.obj.created_at.Time);

    return (
        <a href={`/article/detail/${props.obj.id}`}>
            <List.Item key={props.obj.id} className="mb-3">
                <List.Item.Meta
                    avatar={
                        <Image
                            width={150} height={80}  
                            preview={false}
                            src={serverUrl + "/" + props.obj.filepath}
                            onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image.png?t=9999"}}
                        />
                    }
                    title={
                        <div>
                            <div style={categoryStyle}>
                                <p className="mb-0" style={articleCategory}>{props.obj.article_category_name}</p>
                            </div>
                            <p className="mb-0" style={articleTitle}>{props.obj.title}</p>
                        </div>
                    }
                    description={<p className="text-muted f-8 mb-0" style={postedDate}>{articleDate} WIB</p>}
                />
            </List.Item>
        </a>
    )
}

export default ArticleList