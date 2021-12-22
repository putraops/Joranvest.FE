import React from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import { List, Image } from 'antd';
import serverUrl from '../../config/serverUrl';

const ArticleList = (props) => {
    const articleCategory = {
        color: '#ff8700',
        fontSize: '12px',
    }
    const articleTitle = {
        fontSize: '20px',
        marginTop: '-5px'
    }
    const categoryStyle = {
        marginTop: "-5px",
    }
    const postedDate = {
        marginTop: "-5px", 
        fontSize: "13px",
    }
    
    let articleDate = props.obj.submitted_at.Time; 
    let articleLongDate = "";
    let articleTime = "";
    let articleDayName = "";
    if (!props.obj.submitted_at.Valid) {
        articleDate = props.obj.created_at.Time;
    } 

    articleLongDate = moment(articleDate,  "YYYY/MM/DD").format('DD MMMM YYYY');
    articleTime = moment(articleDate,  "YYYY/MM/DD HH:mm").format('HH:mm')
    articleDayName = moment(articleDate,  "YYYY/MM/DD HH:mm").format('dddd');

    if (articleDayName == "Monday") articleDayName = "Senin";
    if (articleDayName == "Tuesday") articleDayName = "Selasa";
    if (articleDayName == "Wednesday") articleDayName = "Rabu";
    if (articleDayName == "Thursday") articleDayName = "Kamis";
    if (articleDayName == "Friday") articleDayName = "Jumat";
    if (articleDayName == "Saturday") articleDayName = "Sabtu";
    if (articleDayName == "Sunday") articleDayName = "Minggu";
    
    return (
        <a href={`/article/detail/${props.obj.id}`}>
            <List.Item key={props.obj.id}>
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
                    description={<p className="text-muted f-8 mb-0" style={postedDate}>{articleDayName}, {articleLongDate} | {articleTime} WIB</p>}
                />
            </List.Item>
        </a>
    )
}

export default ArticleList