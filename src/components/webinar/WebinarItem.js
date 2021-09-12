import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Link, withRouter, Route, useParams  } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { Image } from 'antd';
import { Button, Card, Drawer, Badge, List, Avatar, Divider, IconText, Tag } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { Space } from 'antd';
import Webinar from './Webinar';
import Item from 'antd/lib/list/Item';

const { Option, OptGroup } = Select;
const { Meta } = Card;

const WebinarItem = (props) => {
    return (
            <List.Item className="p-0 mb-2 border-bottom-0" style={{cursor: "pointer"}} onClick={() => props.goDetail(props.obj.id)} 
                key={props.obj.id}
                actions={[
                ]}>
                <Badge.Ribbon text="Gratis" color="green">
                    <Card size="small">
                        <List.Item.Meta className="mb-0"
                            avatar={
                                <Image
                                    width={150}
                                    src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?4123`}
                                    placeholder={
                                    <Image
                                        preview={false}
                                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                                        width={150}
                                    />
                                    }
                                />
                            }
                            title={
                                <div style={{marginTop: "-5px", marginBottom: "-10px"}}>
                                    <p className="f-15 mb-0">{props.obj.title}</p>
                                    <div>
                                        <Tag className="mr-1" color="#531dab">Webinar</Tag>
                                        <Tag className="mr-1" color="#2db7f5">Pemula</Tag>
                                        <Tag className="mr-1" color="#87d068">Bersertifikat</Tag>
                                    </div>
                                    <span className="f-13 text-muted">Kamis, 13 September 2021</span>
                                </div>
                            }
                            description={
                                <div className="row">
                                    <div className= "col-md-12">
                                        <Meta style={{marginTop: "7px"}}
                                            avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>}
                                            title={
                                                <div style={{marginTop: "-5px"}}>
                                                    <span className="f-14">Nelly Mathias</span>
                                                </div>
                                            }
                                            description={
                                                <div style={{marginTop: "-12px"}}>
                                                    <span className="f-13 text-muted">Professional Fasilisator</span>
                                                </div>
                                            }
                                        />
                                    </div>
                                    <div className="col-md-12 mt-2">
                                    {props.obj.description}
                                    </div>
                                </div>
                            } />
                        {
                            <Row>
                                <Col className="text-right" lg="12">
                                    <hr className="mt-3 mb-2" />
                                    <strong>Biaya: Rp {props.obj.price}</strong>
                                </Col>
                            </Row>
                        }
                    </Card>
                </Badge.Ribbon>
            </List.Item>
    )
}

export default WebinarItem