import React, { Fragment, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Tag } from 'antd';
import moment from 'moment';

const WebinarDetailHeader = (props) => {
    console.log(props);
    useEffect((ee) => {
    }, []);

    const tdRight = { 
        borderTop: "0px", 
    }
    const tdLeft = { 
        borderTop: "0px", 
        width: "1px",
    }

    var startDate, startTime, endDate, endTime = "";
    var speakers = "";
    if (props.data.webinar_start_date && props.data.webinar_start_date.Valid && 
        props.data.webinar_end_date && props.data.webinar_end_date.Valid) {
        startDate = moment(props.data.webinar_start_date.Time,  "YYYY/MM/DD").format('DD MMMM YYYY');
        startTime = moment(props.data.webinar_start_date.Time,  "YYYY/MM/DD HH:mm").format('HH:mm');
        
        endDate = moment(props.data.webinar_end_date.Time,  "YYYY/MM/DD").format('DD MMMM YYYY');
        endTime = moment(props.data.webinar_end_date.Time,  "YYYY/MM/DD HH:mm").format('HH:mm');
    
        if (startDate != endDate) {
            startDate += " - " + endDate;
        } 

        if (startTime != endTime) {
            startTime += " - " + endTime;
        }
    }

    if (props.speakers && props.speakers.length > 0) {
        for (var i = 0; i < props.speakers.length; i++) {
            if (i !== 0 && i === props.speakers.length -1) {
                speakers += " dan ";
            } else if (i !== 0 && i !== props.speakers.length -1) {
                speakers += ", ";
            }
            speakers += props.speakers[i].organization_name !== "" ? props.speakers[i].organization_name : props.speakers[i].speaker_full_name;
        }
    }

    return (
        <Fragment>            
            <div className="container-fluid mt-3 pr-0 pl-0"> 
                <div className="card no-radius" style={{backgroundColor: "#1c1d1f"}}>
                    <div className="card-body text-white">
                        <div className="container pb-3 pt-3">
                            <Row>
                                <Col className="text-right" span={6} xs={{ order: 1 }} sm={{ order: 1 }} sm="12" md={{ order: 2 }} lg={{ order: 2 }} lg="4">
                                    <Tag className="pr-3 pl-3" color="#cd201f">LIVE</Tag>
                                </Col>
                                <Col span={6} xs={{ order: 2 }} sm={{ order: 1 }} sm="12" md={{ order: 1 }} lg={{ order: 1 }} lg="8">
                                    <h5 className="card-title text-white font-weight-bold" style={{fontSize: "28px"}}>{props.data.title}</h5>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="pt-2 pb-0 pl-0" style={tdLeft}>Pembicara</td>
                                                <td className="pt-2 pb-0 pl-0 pr-0 text-right" style={tdRight}>:</td>
                                                <td className="pt-2 pb-0 pl-1" style={tdRight}>
                                                    {speakers}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pt-2 pb-0 pl-0" style={tdLeft}>Tanggal</td>
                                                <td className="pt-2 pb-0 pl-0 pr-0 text-right" style={tdRight}>:</td>
                                                <td className="pt-2 pb-0 pl-1" style={tdRight}>{startDate}</td>
                                            </tr>
                                            <tr>
                                                <td className="pt-2 pb-0 pl-0" style={tdLeft}>Jam</td>
                                                <td className="pt-2 pb-0 pl-0 pr-0 text-right" style={tdRight}>:</td>
                                                <td className="pt-2 pb-0 pl-1"  style={tdRight}>{startTime}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                
                <div className="card no-radius">
                    <div className="card-body pt-2 pb-2">
                        <div className="container">
                            <Row className="g-0">
                                <Col xs="6" sm="6" md="6" lg="4 g-0">
                                    <span className="f-14" style={{fontWeight: "500"}}>
                                        {props.data.min_age == 0 ? "Semua Umur" : <span>Min Umur: {props.data.min_age} tahun</span>}
                                    </span>
                                </Col>
                                <Col xs="6" sm="6" md="6" lg="4">
                                    <span className="f-14" style={{fontWeight: "500"}}>Level: {props.data.webinar_level}</span>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>  
        </Fragment>
    )
}
export default WebinarDetailHeader


// import React, { Fragment } from 'react';
// import 'antd/dist/antd.css';

// import { Row, Col } from 'reactstrap';
// import { Tag } from 'antd';

// const WebinarDetailHeader = (props) => {
//     const tdRight = { 
//         borderTop: "0px", 
//     }
//     const tdLeft = { 
//         borderTop: "0px", 
//         width: "1px",
//     }

//     return (
        // <Fragment>            
        //     <div className="container-fluid mt-3 pr-0 pl-0"> 
        //         <div className="card no-radius" style={{backgroundColor: "#1c1d1f"}}>
        //             <div className="card-body text-white">
        //                 <div className="container pb-4 pt-4">
        //                     <Row>
        //                         <Col className="text-right" span={6} xs={{ order: 1 }} sm={{ order: 1 }} sm="12" md={{ order: 2 }} lg={{ order: 2 }} lg="4">
        //                             <Tag className="pr-3 pl-3" color="#cd201f">LIVE</Tag>
        //                         </Col>
        //                         <Col span={6} xs={{ order: 2 }} sm={{ order: 1 }} sm="12" md={{ order: 1 }} lg={{ order: 1 }} lg="8">
        //                             <h5 className="card-title text-white font-weight-bold" style={{fontSize: "28px"}}>{props.data.title}</h5>
        //                             <table className="table">
        //                                 <tbody>
        //                                     <tr>
        //                                         <td className="pt-2 pb-0 pl-0" style={tdLeft}>Pembicara</td>
        //                                         <td className="pt-2 pb-0 pl-0 pr-0 text-right" style={tdRight}>:</td>
        //                                         <td className="pt-2 pb-0 pl-1" style={tdRight}>
        //                                             {(() => {
        //                                                 if (props.data.speaker_name != "") {
        //                                                     return (
        //                                                         <div>{props.data.speaker_name}</div>
        //                                                     )
        //                                                 } else {
        //                                                     return (
        //                                                         <div>{props.data.organizer_organization_name}</div>
        //                                                     )
        //                                                 }
        //                                             })()}
        //                                         </td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td className="pt-2 pb-0 pl-0" style={tdLeft}>Tanggal</td>
        //                                         <td className="pt-2 pb-0 pl-0 pr-0 text-right" style={tdRight}>:</td>
        //                                         <td className="pt-2 pb-0 pl-1" style={tdRight}>11 Sep 2021</td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td className="pt-2 pb-0 pl-0" style={tdLeft}>Jam</td>
        //                                         <td className="pt-2 pb-0 pl-0 pr-0 text-right" style={tdRight}>:</td>
        //                                         <td className="pt-2 pb-0 pl-1"  style={tdRight}>10:00 - 12:00 WIB</td>
        //                                     </tr>
        //                                 </tbody>
        //                             </table>
        //                         </Col>
        //                     </Row>
        //                 </div>
        //             </div>
        //         </div>
                  
        //         <div className="card no-radius">
        //             <div className="card-body pt-2 pb-2">
        //                 <div className="container">
        //                     <Row className="g-0">
        //                         <Col xs="6" sm="6" md="6" lg="4 g-0">
        //                             <span className="f-14" style={{fontWeight: "500"}}>
        //                                 {props.data.min_age == 0 ? "Semua Umur" : <span>Min Umur: {props.data.min_age} tahun</span>}
        //                             </span>
        //                         </Col>
        //                         <Col xs="6" sm="6" md="6" lg="4">
        //                             <span className="f-14" style={{fontWeight: "500"}}>Level: {props.data.webinar_level}</span>
        //                         </Col>
        //                     </Row>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>  
        // </Fragment>
//     )
// }

// export default WebinarDetailHeader