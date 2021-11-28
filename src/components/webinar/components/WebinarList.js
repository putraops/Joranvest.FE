import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Image } from 'antd';
import { Card, List, Tag } from 'antd';
import moment from 'moment';
import NumberFormat from "react-number-format";
import serverUrl from "../../../config/serverUrl"
import monthName from '../../../commons/monthName';

const WebinarList = (props) => {
    var isExpired = false;
    var startDate, startTime, endTime = "";
    if (props.obj.webinar_start_date.Valid && props.obj.webinar_end_date.Valid) {
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
        }

        if (startTime !== endTime) {
            startTime += " - " + endTime;
        }
    }

    if (props.obj.webinar_start_date.Valid && props.obj.webinar_end_date.Valid) {
        var now = Date.now();
        isExpired = moment(now).isAfter(moment(props.obj.webinar_start_date.Time));
    }

    var imgUrl = "";
    if (props.obj.filepath !== "" && props.obj.filepath !== null) {
        imgUrl = serverUrl + "/" + props.obj.filepath;
    }
    return (
        <Fragment>
            <a href={`/webinar/detail/${props.obj.id}`}> 
                <List.Item className="p-0 mb-2 border-bottom-0" style={{cursor: "pointer"}} 
                    key={props.obj.id}
                    >
                    <Card size="small">
                        <List.Item.Meta className="mb-0"
                            avatar={
                                <Image
                                    width={150} 
                                    style={{height: "80px", maxWidth: "150px"}}
                                    preview={false}
                                    src={imgUrl}
                                    onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image.png?t=9999"}}
                                />
                            }
                            title={
                                <div style={{marginTop: "-5px", marginBottom: "-10px"}}>
                                    <p className="f-15 mb-0">{props.obj.title}</p>
                                    <div>
                                        <Tag className="mr-1" color="#531dab">{props.obj.webinar_category_name}</Tag>
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
                                    <p className="f-13 mb-0 text-muted">{startDate} | {startTime}</p>
                                </div>
                            }
                            description={
                                <Fragment></Fragment>
                            } />
                        <Row>
                            <Col className="text-right" lg="12">
                                <hr className="mt-2 mb-2" />
                                {isExpired > 0 ? (
                                    <Tag className="font-weight-bold mr-0" color="red">Telah Berakhir</Tag>
                                ) : 
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
                    </Card>
                </List.Item>
            </a>
        </Fragment>
    )
}

export default WebinarList