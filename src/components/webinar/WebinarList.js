import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Image } from 'antd';
import { Card, Badge, List, Avatar, Tag } from 'antd';
import NumberFormat from "react-number-format";

const { Meta } = Card;

const WebinarList = (props) => {
    console.log(props);
    
    var is_free = props.obj.price == 0 ? "Gratis" : props.obj.price;
    var ribbonColor = props.obj.price == 0 ? "green" : "white";
    return (
        <Fragment>
            <a href={`/webinar/detail/${props.obj.id}`}> 
                <List.Item className="p-0 mb-2 border-bottom-0" style={{cursor: "pointer"}} 
                    key={props.obj.id}
                    actions={[
                    ]}>
                    <Badge.Ribbon text={<span style={{fontWeight: "500"}}>{is_free}</span>} color={ribbonColor}>
                        <Card size="small">
                            <List.Item.Meta className="mb-0"
                                avatar={
                                    <Image
                                        width={150} preview="disabled"
                                        src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?4123`}
                                    />
                                }
                                title={
                                    <div style={{marginTop: "-5px", marginBottom: "-10px"}}>
                                        <p className="f-15 mb-0">{props.obj.title}</p>
                                        <div>
                                            <Tag className="mr-1" color="#531dab">Webinar</Tag>
                                            {(() => {
                                                return (
                                                    <Tag className="mr-1" color={props.obj.webinar_level == "Pemula" ? "#2db7f5" : "#b92222"} >{props.obj.webinar_level}</Tag>
                                                )
                                            })()}
                                            {(() => {
                                                if (props.obj.is_certificate) {
                                                    return (
                                                        <Tag className="mr-1" color="#87d068">Bersertifikat</Tag>
                                                    )
                                                }
                                            })()}
                                        </div>
                                        <p className="f-13 text-muted">Kamis, 13 September 2021</p>
                                    </div>
                                }
                                description={
                                    <div className="row">
                                        <div className= "col-md-12">
                                            <Meta style={{marginTop: "7px"}}
                                                avatar={<Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf'}}>PO</Avatar>}
                                                title={
                                                    <div style={{marginTop: "-5px"}}>
                                                        <p className="f-15 mb-0">Nelly Mathias</p>
                                                        <p className="f-14 mb-0 text-muted" style={{marginTop: "-5px", wordWrap: "break-word"}}>Professional Fasilisator</p>
                                                    </div>
                                                }
                                                // description={
                                                //     <div style={{marginTop: "-12px"}}>
                                                //         <span className="f-13 text-muted">Professional Fasilisator</span>
                                                //     </div>
                                                // }
                                            />
                                        </div>
                                        <div className="col-md-12 mt-2">
                                            {props.obj.description}
                                        </div>
                                    </div>
                                } />
                            {
                                (() => {
                                    if (props.obj.price > 0) {
                                        return (
                                            <Row>
                                                <Col className="text-right" lg="12">
                                                    <hr className="mt-3 mb-2" />
                                                    <strong>
                                                        <NumberFormat
                                                            value={props.obj.price}
                                                            displayType="text"
                                                            thousandSeparator={true}
                                                            prefix="Rp "
                                                        />
                                                    </strong>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                })()
                            }
                        </Card>
                    </Badge.Ribbon>
                </List.Item>
            </a>
        </Fragment>
    )
}

export default WebinarList