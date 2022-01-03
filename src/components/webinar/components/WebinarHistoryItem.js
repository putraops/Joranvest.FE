import React, { Fragment, useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Card, Button, Image, List, Tag } from 'antd';
import NumberFormat from "react-number-format";
import serverUrl from "../../../config/serverUrl"
import moment from 'moment';
import monthName from '../../../commons/monthName';
import { connect } from 'react-redux';

const WebinarHistoryItem = (props) => {
    const [isWebinarOver, setIsWebinarOver] = useState(false);
    var startDate, startTime, endTime = "";
    var isOneDay = false;
    console.log("props: ", props);
    if (props.obj.webinar_start_date && props.obj.webinar_start_date.Valid && props.obj.webinar_end_date && props.obj.webinar_end_date.Valid) {
        startTime = moment(props.obj.webinar_start_date.Time,  "YYYY/MM/DD HH:mm").format('HH:mm');
        endTime = moment(props.obj.webinar_end_date.Time,  "YYYY/MM/DD HH:mm").format('HH:mm');

        var _startdate = moment(props.obj.webinar_start_date.Time,  "YYYY/MM/DD").format('DD');
        var _startmonth = monthName.getNameByLangID(moment(props.obj.webinar_start_date.Time,  "YYYY/MM/DD").format('MM'));
        var _startyear = moment(props.obj.webinar_start_date.Time,  "YYYY/MM/DD").format('YYYY');

        var _enddate = moment(props.obj.webinar_end_date.Time,  "YYYY/MM/DD").format('DD');
        var _endmonth = monthName.getNameByLangID(moment(props.obj.webinar_end_date.Time,  "YYYY/MM/DD").format('MM'));
        var _endyear = moment(props.obj.webinar_end_date.Time,  "YYYY/MM/DD").format('YYYY');
    
        startDate = _startdate + " " + _startmonth + " " + _startyear;
        if (moment(props.obj.webinar_start_date.Time,  "YYYY/MM/DD").format('DDMMMMYYYY') !== moment(props.obj.webinar_end_date.Time,  "YYYY/MM/DD").format('DDMMMMYYYY')) {
            startDate += " - " + _enddate + " " + _endmonth + " " + _endyear;
        } else {
            isOneDay = true;
        }

        if (startTime !== endTime) {
            startTime += " - " + endTime;
        }
    }

    useEffect(() => {
        if (props.obj) {
            handleIsWebinarOver()
        }
    }, []);

    const handleIsWebinarOver = () => {
        if (props.obj) {
            setIsWebinarOver(moment().isAfter(moment(props.obj.webinar_end_date)));
        }
    }

    var imgUrl = "";
    if (props.obj.filepath !== "" && props.obj.filepath !== null) {
        imgUrl = serverUrl + "/" + props.obj.filepath;
    }

    return (
        <Fragment>
            <List.Item className="p-0 mb-2 border-bottom-0" 
                key={props.obj.id}
                actions={[
                ]}>
                <Card size="small">
                    <List.Item.Meta className="mb-0"
                        avatar={
                            <Image
                                width={150} 
                                style={{height: "80px", maxWidth: "150px"}}
                                preview={false}
                                // src={imgUrl}
                                src={serverUrl + "/" + props.obj.filepath}
                                onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image.png?t=9999"}}
                            />
                        }
                        title={
                            <div style={{margin: "5px 0px 0px 10px"}}>
                                {(() => {
                                    return (
                                        <Fragment>
                                            <p className="f-14 mt-1 mb-0 font-weight-bold" style={{marginTop: "-5px"}}>
                                                {props.obj.webinar_title}
                                            </p>
                                            <Tag className="mr-1" color="#531dab">{props.obj.webinar_category_name}</Tag>
                                            {(() => {
                                                return (
                                                    <Tag className="mr-1" color={props.obj.webinar_level === "Pemula" ? "#2db7f5" : "#b92222"} >{props.obj.webinar_level}</Tag>
                                                )
                                            })()}
                                            {(() => {
                                                if (props.obj.is_certificate) {
                                                    return (
                                                        <Tag className="mr-1" color="#87d068">Bersertifikat</Tag>
                                                    )
                                                }
                                            })()}
                                            <p className="f-13 mb-0 text-muted">{startDate} | {startTime}</p>
                                        </Fragment>
                                    )
                                })()}
                            </div>
                        }
                        description={
                            <></>
                        } />
                        <>
                            <Row>
                                <Col lg="12">
                                    <hr className="mt-2 mb-2" />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-left" xs="6" sm="6">
                                    <a href={`/webinar/detail/${props.obj.webinar_id}`} style={{"fontWeight": "500"}}>Lihat Detail</a>
                                    {
                                        (isWebinarOver ? (
                                            <>
                                                <a href={`/webinar/review/${props.obj.id}`}><Button type="primary" size='small' className='ml-3' key={`show-${props.obj.id}`}>Beri Ulasan</Button></a>
                                            </>
                                        ) : null)
                                    }
                                </Col>
                                <Col className="text-right"  xs="6" sm="6">
                                    {
                                        (props.obj.price > 0 ? (
                                            <NumberFormat
                                                className="font-weight-bold"
                                                value={props.obj.price}
                                                displayType="text"
                                                thousandSeparator={true}
                                                prefix="Rp "
                                            />
                                            ) : <Tag className="font-weight-bold mr-0" color="green">Gratis</Tag>)
                                    }
                                </Col>
                            </Row>
                        </>
                </Card>
            </List.Item>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, null)(WebinarHistoryItem);