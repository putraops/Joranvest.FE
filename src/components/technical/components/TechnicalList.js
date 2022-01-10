import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import { List, Image, Tag, Popover } from 'antd';
import { Row, Col } from 'reactstrap';
import NumberFormat from "react-number-format";
import { Link } from 'react-router-dom';
import dateFormat from '../../../commons/dateFormat'

import ReactHtmlParser from 'react-html-parser';

import baseUrl from '../../../config/baseUrl';
import serverUrl from '../../../config/serverUrl';

import { 
    CheckCircleOutlined 
} from '@ant-design/icons';

const TechnicalList = (props) => {
    const gridAnalysis = {
        left: 0,
        right: 0,
        // margin: '0 0px',
        padding: '15px',
        WebkitBoxShadow: '0 0 5px 0px rgb(0 0 0 / 15%)',
        boxShadow: '0 0 5px 0px rgb(0 0 0 / 15%)',
        borderRadius: '0px',
        top: '-25px',
        WebkitTransition: 'all 0.5s',
        transition: 'all 0.5s'
    }

    var analysisDate = dateFormat.getInteractiveLongDateTimeFormatID(props.obj.submitted_at.Valid ? props.obj.submitted_at.Time : props.obj.created_at.Time);

    return (
        <List.Item className="pl-0 pr-0"
            key={props.obj.id}
            actions={[
            ]}>
            <List.Item.Meta className="mt-0"
                avatar={
                    <Image 
                        style={{width: "50px", height: "50px", border: "1px solid #f0f0f0", borderRadius: "50px"}} 
                        src={props.obj ? serverUrl + "/" + props.obj.analysis_profile_picture_filepath : null}
                        shape="circle"
                        preview={false}
                        onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/avatar-default.png?t=9999"}}
                    />
                }
                title={
                    <Fragment>
                        <a href={`/j/${props.obj.created_by}/${props.obj.created_by_fullname}`} className="mr-1">{props.obj.created_by_fullname}</a> 
                        <Popover content="Verified">
                            <img src={baseUrl + "/assets/icons/verified.svg"} />
                        </Popover>
                    </Fragment>
                }
                description={
                    <div className="row">
                        {(() => {
                            if (props.obj.user_create_title !== "") {
                                return (
                                    <div className= "col-md-12 form-inline mt-n1">
                                        <span className="font-weight-bold">{props.obj.user_create_title == "" ? "" : props.obj.user_create_title}</span>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                } />
            {
                <Row className="ml-2 mr-2 mb-4">
                    <Col md="12">
                        <Row>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="4" xl="4" >
                                <div className="blog"  style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title">Signal</h5>
                                        <p className={props.obj.signal === "Uptrend" ? "signal-technical signal-uptrend mb-0" : props.obj.signal === "Downtrend" ? "signal-technical signal-downtrend mb-0" : "signal-technical signal-netral mb-0" }>{props.obj.signal}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="4" xl="4" >
                                <div className="blog" style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title">Emiten</h5>
                                        <p className="text-muted f-18 mb-0 emiten-code">{props.obj.emiten_code}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="4" xl="4" >
                                <div className="blog"  style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title">Risk Reward</h5>
                                        <p className="text-primary f-16 mb-0 emiten-price">{props.obj.start_ratio} : {props.obj.end_ratio}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="4" xl="4" >
                                <div className="blog" style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title">Area Beli</h5>
                                        <p className="mb-0">
                                            {
                                                <Fragment>
                                                    <NumberFormat className="text-primary f-16 mb-0 emiten-price"
                                                        value={props.obj.start_buy}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                        prefix=""
                                                        />
                                                    {(() => {
                                                        if (props.obj.end_buy !== 0 && props.obj.start_buy !== props.obj.end_buy) {
                                                        return (
                                                            <Fragment>
                                                                <span className="text-primary font-weight-bold"> - </span>
                                                                <NumberFormat className="text-primary f-16 mb-0 emiten-price"
                                                                    value={props.obj.end_buy}
                                                                    displayType="text"
                                                                    thousandSeparator={true}
                                                                    prefix=""
                                                                    />
                                                            </Fragment>
                                                            )
                                                        }
                                                    })()}  
                                                </Fragment>
                                            }        
                                        </p> 
                                    </div>
                                </div>
                            </Col>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="4" xl="4" >
                                <div className="blog" style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title">Area Jual</h5>
                                        <p className="mb-0">
                                            {
                                                <Fragment>
                                                    <NumberFormat className="text-success f-16 mb-0 emiten-price"
                                                        value={props.obj.start_sell}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                        prefix=""
                                                    />
                                                    {(() => {
                                                        if (props.obj.end_sell !== 0 && props.obj.start_sell !== props.obj.end_sell) {
                                                        return (
                                                            <Fragment>
                                                                <span className="text-success font-weight-bold"> - </span>
                                                                <NumberFormat className="text-success f-16 mb-0 emiten-price"
                                                                    value={props.obj.end_sell}
                                                                    displayType="text"
                                                                    thousandSeparator={true}
                                                                    prefix=""
                                                                    />
                                                            </Fragment>
                                                            )
                                                        }
                                                })()}
                                                </Fragment>
                                            }
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="4" xl="4" >
                                <div className="blog"  style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title">Area Stoploss</h5>
                                        <p className="mb-0">
                                        {
                                                <Fragment>
                                                    <NumberFormat className="f-16 mb-0 emiten-price text-danger"
                                                        value={props.obj.start_cut}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                        prefix=""
                                                        />
                                                    {(() => {
                                                        if (props.obj.end_cut !== 0 && props.obj.start_cut !== props.obj.end_cut) {
                                                        return (
                                                            <Fragment>
                                                                <span className="text-danger font-weight-bold"> - </span>
                                                                <NumberFormat className="f-16 mb-0 emiten-price text-danger"
                                                                    value={props.obj.end_cut}
                                                                    displayType="text"
                                                                    thousandSeparator={true}
                                                                    prefix=""
                                                                    />
                                                            </Fragment>
                                                            )
                                                        }
                                                    })()}  
                                                </Fragment>
                                            }
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="12">
                        <Row>
                            <Col className="pr-0 pl-0" xs="12" sm="12" md="12" lg="12" xl="12" >
                                <div className="blog"  style={{borderRadius: "0px"}}>
                                    <div className="bg-white" style={gridAnalysis}>
                                        <Row >
                                            <Col className="text-left" xs="6" sm="6" md="6" lg="6" xl="6" >
                                                <h5 className="font-weight-normal f-14">Bandarmology:
                                                {(() => {
                                                    if (props.obj.bandarmology_status === "Jelek") {
                                                        return (
                                                            <Tag color="red" className="ml-1 font-weight-bold f-22">{props.obj.bandarmology_status}</Tag>
                                                        )
                                                    } else if (props.obj.bandarmology_status === "Bagus") {
                                                        return (
                                                            <Tag color="green" className="ml-1 font-weight-bold f-22">{props.obj.bandarmology_status}</Tag>
                                                        )
                                                    } else {
                                                        return (
                                                            <Tag color="blue" className="ml-1 font-weight-bold f-22">{props.obj.bandarmology_status}</Tag>
                                                        )
                                                    }
                                                })()}
                                                </h5>
                                            </Col>
                                            <Col className="text-right" xs="6" sm="6" md="6" lg="6" xl="6" >
                                                <h5 className="font-weight-normal f-14"><Link to="#" className="text-dark">Timeframe: {props.obj.timeframe}</Link></h5>
                                                <p className="text-muted mb-0 f-12">{analysisDate}</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="12" className="pr-0 pl-0 mt-2">
                        <p className="mb-0 font-weight-bold f-16 text-uppercase">Reason to Buy:</p>
                        <span>{ReactHtmlParser(props.obj.reason_to_buy)}</span>
                        
                        <p className="mb-0">
                            <Tag color="red" className="mb-1 mt-3 font-weight-bold f-22 text-uppercase">Reminder!!!</Tag>
                            <br/>
                            Selalu gunakan Money Management dan disiplin dengan Trading Plan yang sudah diinformasikan.
                            <br/>
                            Pergerakan market tidak 100% selalu bisa diprediksi dengan tepat. Oleh sebab itu, sebagai seorang trader, <span className="text-uppercase">wajib disiplin trading plan.</span>
                        </p>
                    </Col>
                </Row>
            }
        </List.Item>
        )
}

export default TechnicalList