import React, { Fragment, Text } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import 'antd/dist/antd.css';

import {
    HistoryOutlined,
    ScheduleOutlined,
  } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;


const WebinarDate = (props) => {
    var dateFormat = "";
    var timeFormat = "";
    var startDate = moment(props.webinar_date.startDate.Time,  "YYYY/MM/DD").format('DD MMM YYYY');
    var endDate = moment(props.webinar_date.endDate.Time,  "YYYY/MM/DD").format('DD MMM YYYY');
    const startTime = moment(props.webinar_date.startDate.Time,  "YYYY/MM/DD HH:mm").format('HH:mm');
    const endTime = moment(props.webinar_date.endDate.Time,  "YYYY/MM/DD HH:mm").format('HH:mm');

    dateFormat += startDate;
    if (startDate != endDate) {
        dateFormat += " - " + endDate;
    }

    timeFormat = startTime;
    if (startTime != endTime) {
        timeFormat +=  " - " + endTime;
    }
    
    return (
        <Fragment>
            <Meta className="mb-2"
                avatar={<ScheduleOutlined className="f-20" />}
                title={
                    <div style={{marginTop: "-2px"}}>
                        <span className="f-14">Tanggal Webinar</span>
                    </div>
                }
                description={
                    <div style={{marginTop: "-8px"}}>
                        <span className="f-14 text-muted">
                            {dateFormat} <br/>
                        </span>
                    </div>
                }
            />
            
            <Meta className="mb-3"
                avatar={<HistoryOutlined className="f-20" />}
                title={
                    <div style={{marginTop: "-2px"}}>
                        <span className="f-14">Jam</span>
                    </div>
                }
                description={
                    <div style={{marginTop: "-8px"}}>
                        <span className="f-14 text-muted">
                            <span>Jam: {timeFormat}</span>
                        </span>
                    </div>
                }
            />
        </Fragment>
    )
}
export default WebinarDate