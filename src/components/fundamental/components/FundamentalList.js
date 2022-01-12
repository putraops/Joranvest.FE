import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import { List, Image, Divider, Popover } from 'antd';
import { Row, Col } from 'reactstrap';
import NumberFormat from "react-number-format";
import ReactHtmlParser from 'react-html-parser';
import dateFormat from '../../../commons/dateFormat'

import baseUrl from '../../../config/baseUrl';
import serverUrl from '../../../config/serverUrl';

import { 
    DownloadOutlined, 
} from '@ant-design/icons';

const FundamentalList = (props) => {
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
        <List.Item className="pl-0 pr-0 pb-0"
            key={props.obj.id}
            actions={[
            ]}>
            <List.Item.Meta 
                className="mt-0"
                key={`item-${props.obj.id}`} 
                avatar={
                    <Image 
                        style={{width: "50px", height: "50px", borderRadius: "50px", border: "1px solid #ccc"}} 
                        src={props.obj ? serverUrl + "/" + props.obj.analysis_profile_picture_filepath : null}
                        shape="circle"
                        preview={false}
                        onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/avatar-default.png?t=9999"}}
                    />
                    }
                title={
                    <Fragment>
                        <a href={`/j/${props.obj.created_by}/${props.obj.created_by_fullname}`} className="text-dark mr-1">{props.obj.created_by_fullname}</a> 
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
                } 
            />
            {
                <Row className="ml-2 mr-2 mb-4">
                    <Col md="12">
                        <Row>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="6" xl="3" >
                                <div className="blog" style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title">Emiten</h5>
                                        <p className="text-muted mb-0 emiten-code">{props.obj.emiten_code}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="6" xl="3" >
                                <div className="blog" style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title">Harga Saat Ini</h5>
                                        <p className="mb-0">
                                            <NumberFormat className="mb-0 emiten-price"
                                                value={props.obj.current_price}
                                                displayType="text"
                                                thousandSeparator={true}
                                                prefix=""
                                            />       
                                        </p> 
                                    </div>
                                </div>
                            </Col>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="6" xl="3" >
                                <div className="blog" style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title">Harga Wajar</h5>
                                        <p className="mb-0">
                                            <NumberFormat className="mb-0 emiten-price"
                                                value={props.obj.normal_price}
                                                displayType="text"
                                                thousandSeparator={true}
                                                prefix=""
                                            />
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="6" xl="3" >
                                <div className="blog"  style={{borderRadius: "0px"}}>
                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                        <h5 className="f-15 box-title mb-0">Margin of Safety</h5>
                                        <span className="text-success margin-of-safety mb-0">{props.obj.margin_of_safety}%</span>
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
                                            <Col className="text-left" xs="6" sm="8" md="8" lg="8" xl="8" >
                                                <h5 className="font-weight-bold text-uppercase f-16 mb-0">{props.obj.emiten_name}</h5>
                                            </Col>
                                            <Col className="text-right" xs="6" sm="4" md="4" lg="4" xl="4" >
                                                <p className="text-muted mb-0 f-12">{analysisDate}</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="12" className="pr-0 pl-0 mt-2">
                        <p className="mb-0 font-weight-bold f-16">Data Riset</p>
                        {ReactHtmlParser(props.obj.research_data)}
                        {props.obj.attachments && props.obj.attachments.length > 0 ? 
                            <Fragment>
                                <Divider className="mt-2 mb-2" dashed />
                                <p className="mb-1 font-weight-bold">File: </p>
                                {props.obj.attachments.map((item, i) => {     
                                    return (
                                        <Popover key={`popover-${item.id}}`} content={
                                            <div>
                                                <p className="mb-1 font-weight-bold">File: {item.filename}</p>
                                                <a className="btn btn-primary btn-block btn-xs pt-2 pb-2" href={`${serverUrl}/${item.filepath}`} target="_blank"><DownloadOutlined /> Download</a>
                                                {/* <a href={`/fundamental-review/` + props.obj.emiten_code.toLowerCase() + `/` + props.obj.id + '/' + item.id} className="btn btn-primary btn-block btn-xs pt-2 pb-2" target="_blank"><DownloadOutlined /> Download</a> */}
                                            </div>
                                        }>
                                            <img src="/images/gallery/icon/iconPDF.png" className="mr-4" key={item.id} style={{width: "40px", cursor: "pointer"}}/>
                                        </Popover>
                                    ) 
                                })}
                            </Fragment>
                        : null
                        }
                    </Col>
                </Row>
            }
        </List.Item>
        )
}

export default FundamentalList