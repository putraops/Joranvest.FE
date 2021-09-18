import React, { createElement, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

import { Comment, Tooltip, Avatar, Badge, Card } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

const Comments = (props) => {
    const commentActions = [
        <Tooltip key="comment-basic-like" title="Like">
          <span >
            {createElement(LikeFilled)}
            <span className="comment-action pl-1">1</span>
          </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
          <span>
            {React.createElement(DislikeFilled)}
            <span className="comment-action pl-1">20</span>
          </span>
        </Tooltip>,
    ];

    return (
        <Row>
            <Col md="12" className="mt-3">
                <div className="title-heading mb-5">
                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">Komentar</h3>
                    <div className="title-border-simple position-relative"></div>
                </div>
            </Col>
            <div md="12">
                <Badge className="mt-0 mb-3 mr-3 ml-3" count={`Total Komentar: ${23}`}
                    style={{ backgroundColor: '#7b7b7b' }}
                />
                <Card className="mt-0 mb-3 mr-3 ml-3">
                    <Comment
                        actions={commentActions}
                        author={<a className="text-dark font-weight-bold">Han Solo</a>}
                        avatar={
                            <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                            />
                        }
                        content={
                            <p>
                            We supply a series of design principles, practical patterns and high quality design
                            resources (Sketch and Axure), to help people create their product prototypes beautifully
                            and efficiently.
                            </p>
                        }
                        datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                            </Tooltip>
                        }
                    />
                    <Comment
                        actions={commentActions}
                        author={<a className="text-dark font-weight-bold">Han Solo</a>}
                        avatar={
                            <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                            />
                        }
                        content={
                            <p>
                            We supply a series of design principles, practical patterns and high quality design
                            resources (Sketch and Axure), to help people create their product prototypes beautifully
                            and efficiently.
                            </p>
                        }
                        datetime={
                            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                            </Tooltip>
                        }
                    />
                </Card>
            </div>
        </Row>
    )
}

export default Comments