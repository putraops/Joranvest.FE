import React from 'react';
import moment from 'moment';
import 'antd/dist/antd.css';

import {
    ScheduleOutlined,
  } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;


const WebinarDate = (props) => {
    var startDate, startTime, endDate, endTime = "";
    if (props.webinar_date.startDate.Valid && props.webinar_date.endDate.Valid) {
        startDate = moment(props.webinar_date.startDate.Time,  "YYYY/MM/DD").format('DD MMM YYYY');
        startTime = moment(props.webinar_date.startDate.Time,  "YYYY/MM/DD HH:mm").format('HH:mm');
        
        endDate = moment(props.webinar_date.endDate.Time,  "YYYY/MM/DD").format('DD MMM YYYY');
        endTime = moment(props.webinar_date.endDate.Time,  "YYYY/MM/DD HH:mm").format('HH:mm');
    
        if (startDate !== endDate) {
            startDate += " - " + endDate;
        } 

        if (startTime !== endTime) {
            startTime += " - " + endTime;
        }
    }

    return (
        <Meta className="mb-4"
            avatar={<ScheduleOutlined className="f-20" />}
            title={
                <div style={{marginTop: "-2px"}}>
                    <span className="f-14">Tanggal Webinar</span>
                </div>
            }
            description={
                <div style={{marginTop: "-8px"}}>
                    <span className="f-14 text-muted">
                        <span>{startDate}</span> <br/>
                        <span>Jam: {startTime}</span>
                    </span>
                </div>
            }
        />
    )
}
export default WebinarDate