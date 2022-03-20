import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { List, Tag } from 'antd';
import axiosApi from '../../../config/axiosConfig';

class ArticleTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tags: [],
            recordId: "",
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.articleId !== this.props.articleId) {
            let articleId = this.props.articleId;
            this.setState({recordId: this.props.articleId});
            axiosApi.get(`/article_tag/getAll?article_id=${articleId}`).then(r => {
                if (r.data.status) {
                     this.setState({...this.state, tags: r.data.data});
                }
            }); 
        }
    }

    render() {
        const { tags } = this.state;
        return (
            <Row>
                <Col sm="12" xl="12">
                    <List.Item>
                        <List.Item.Meta
                            avatar={<p className="font-weight-bold f-15">Tag</p>}
                            title={
                                <Fragment>
                                    {tags.map((item, i) => {     
                                        return (
                                            <Tag color="blue" key={item.id} className="pr-3 pl-3 pt-1 pb-1 mb-1">
                                                {/* <Link to={`/article-tag/${item.tag_name}`} className="f-15" >{item.tag_name}</Link> */}
                                                <span className="f-15" >{item.tag_name}</span>
                                            </Tag>
                                        ) 
                                    })}
                                </Fragment>
                            }
                        />
                    </List.Item>
                </Col>
            </Row>
        )
    }
}
export default ArticleTag;