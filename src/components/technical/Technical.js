import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import NumberFormat from "react-number-format";
import './css/style.css'
import SubNav from '../_nav/subNav'
import Footer from '../Footer';
import TechnicalFilter from './components/Filter';
import { Button, Card, Image, List, Avatar, Divider, Skeleton, Tag, Input, IconText} from 'antd';
import { Select, Space, Typography, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import axiosApi from '../../config/axiosConfig';
import serverUrl from '../../config/serverUrl';

const { Option, OptGroup } = Select;
const { Text } = Typography;

class Technical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLoading: {
               pageLoading: false,
               contentLoading: true,
            },
            payload: {
                page: 1,
                size: 10,
                order: {},
                filter: {
                    signal: "",
                    timeframe: "",
                    //emiten_id: "",
                },
            },
            listData: {total:0,data:[]}
        };
    }

    componentDidMount () {
        const { payload } = this.state;
        this.LoadData();
        console.log("did mount")
    }

    LoadData = () => {
        const { payload } = this.state; 
        console.log("LoadData: ", this.state)
        axiosApi.post(`/technical_analysis/getPagination`, payload).then(r => {
            console.log(r.data);
            if (r.data.total > 0) {
                this.setState({...this.state, listData: r.data});
            } else {
                this.setState({...this.state, listData: []});
            }
            this.setState({
                ...this.state, 
                loading: false,
                isLoading: {
                    pageLoading: false,
                    contentLoading: false,
                }
            });
            window.scrollTo(0, 0);
        });
    }

    handlePage = event => {
        const {payload} = this.state;
        payload.page = event;
        this.LoadData();
    }

    filtering = (e) => {
        const { payload } = this.state
        payload.filter = e.responseFilter
        this.setState({
            ...this.state, 
            isLoading: {
                pageLoading: false,
                contentLoading: true,
            }
        });
        this.LoadData();
    }
    
    render() {
        const { listData, payload, isLoading } = this.state;

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

        const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
        );
      
        return (

            <React.Fragment>
                <section className="section home-1-bg">
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="container mb-3">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/">
                                    Analisa
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Teknikal</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <SubNav title="Riset Analisa Teknikal" sub_title="Pilih beragam riset analisa teknikal sesuai strategi & timeframe kamu" />
                    <div className="container mt-3">
                        <Row className="">
                            <Col md="4" lg="3" className="mb-3">
                                <TechnicalFilter 
                                    handleFilterTimeframe={this.handleFilterTimeframe} 
                                    filtering={this.filtering} 
                                />
                            </Col>
                            <Col md="8" lg="9">
                                <Divider dashed className="mt-0 mb-0" />
                                <Skeleton active loading={this.state.loading} avatar paragraph={{ rows: 5 }}>
                                    <List
                                        itemLayout="vertical"  size="large"
                                        pagination={{
                                            onChange: page => {
                                                this.handlePage(page);
                                            },
                                            pageSize: payload.size,
                                            total: listData.total,
                                            defaultCurrent: payload.page,
                                            current: payload.page,
                                        }}
                                        dataSource={listData.data}
                                        loading={isLoading.contentLoading}
                                        renderItem={item => (
                                        <List.Item className="pl-0 pr-0"
                                            key={item.id}
                                            actions={[
                                            ]}>
                                            <List.Item.Meta className="mt-0"
                                                avatar={
                                                    <Image 
                                                        style={{width: "50px", height: "50px", border: "1px solid #f0f0f0", borderRadius: "50px"}} 
                                                        src={item ? serverUrl + "/" + item.analysis_profile_picture_filepath : null}
                                                        shape="circle"
                                                        preview={false}
                                                        onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/avatar-default.png?t=9999"}}
                                                    />
                                                }
                                                title={<a href='#'>{item.created_by_fullname}</a>}
                                                description={
                                                    <div className="row">
                                                        <div className= "col-md-12">
                                                            <span className="font-weight-bold">{item.user_create_title == "" ? "" : item.user_create_title}</span>
                                                        </div>
                                                    </div>
                                                } />
                                            {
                                                <Row className="ml-2 mr-2 mb-4">
                                                    <Col md="12">
                                                        <Row>
                                                            <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="6" xl="2" >
                                                                <div className="blog"  style={{borderRadius: "0px"}}>
                                                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                                                        <h5 className="f-15 box-title">Signal</h5>
                                                                        <p className={item.signal == "Uptrend" ? "signal-technical signal-uptrend mb-0" : item.signal == "Downtrend" ? "signal-technical signal-downtrend mb-0" : "signal-technical signal-netral mb-0" }>{item.signal}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="6" xl="2" >
                                                                <div className="blog" style={{borderRadius: "0px"}}>
                                                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                                                        <h5 className="f-15 box-title">Emiten</h5>
                                                                        <p className="text-muted f-18 mb-0 emiten-code">{item.emiten_code}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="3" xl="2" >
                                                                <div className="blog" style={{borderRadius: "0px"}}>
                                                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                                                        <h5 className="f-15 box-title">Area Beli</h5>
                                                                        <p className="mb-0">
                                                                            {
                                                                                <Fragment>
                                                                                    <NumberFormat className="text-primary f-16 mb-0 emiten-price"
                                                                                        value={item.start_buy}
                                                                                        displayType="text"
                                                                                        thousandSeparator={true}
                                                                                        prefix=""
                                                                                        />
                                                                                    {(() => {
                                                                                        if (item.end_buy != 0 && item.start_buy != item.end_buy) {
                                                                                        return (
                                                                                            <Fragment>
                                                                                                <span className="text-primary font-weight-bold"> - </span>
                                                                                                <NumberFormat className="text-primary f-16 mb-0 emiten-price"
                                                                                                    value={item.end_buy}
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
                                                            <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="3" xl="2" >
                                                                <div className="blog" style={{borderRadius: "0px"}}>
                                                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                                                        <h5 className="f-15 box-title">Area Jual</h5>
                                                                        <p className="mb-0">
                                                                            {
                                                                                <Fragment>
                                                                                    <NumberFormat className="text-success f-16 mb-0 emiten-price"
                                                                                        value={item.start_sell}
                                                                                        displayType="text"
                                                                                        thousandSeparator={true}
                                                                                        prefix=""
                                                                                    />
                                                                                    {(() => {
                                                                                        if (item.end_sell != 0 && item.start_sell != item.end_sell) {
                                                                                        return (
                                                                                            <Fragment>
                                                                                                <span className="text-success"> - </span>
                                                                                                <NumberFormat className="text-success f-16 mb-0 emiten-price"
                                                                                                    value={item.end_sell}
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
                                                            <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="3" xl="2" >
                                                                <div className="blog"  style={{borderRadius: "0px"}}>
                                                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                                                        <h5 className="f-15 box-title">Area Stoploss</h5>
                                                                        <p className="mb-0">
                                                                        {
                                                                                <Fragment>
                                                                                    <NumberFormat className="f-16 mb-0 emiten-price text-danger"
                                                                                        value={item.start_cut}
                                                                                        displayType="text"
                                                                                        thousandSeparator={true}
                                                                                        prefix=""
                                                                                        />
                                                                                    {(() => {
                                                                                        if (item.end_cut != 0 && item.start_cut != item.end_cut) {
                                                                                        return (
                                                                                            <Fragment>
                                                                                                <span className="text-danger"> - </span>
                                                                                                <NumberFormat className="f-16 mb-0 emiten-price text-danger"
                                                                                                    value={item.end_cut}
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
                                                            <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="3" xl="2" >
                                                                <div className="blog"  style={{borderRadius: "0px"}}>
                                                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                                                        <h5 className="f-15 box-title">Risk Reward</h5>
                                                                        <p className="text-primary f-16 mb-0 emiten-price">{item.start_ratio} : {item.end_ratio}</p>
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
                                                                                {/* <span className={item.bandarmology_status == "Bagus" ? "bandarmology-signal bandarmology-good mb-0" : item.bandarmology_status == "Jelek" ? "bandarmology-signal bandarmology-notgood mb-0" : "bandarmology-signal bandarmology-netral mb-0" }>{item.bandarmology_status}</span> */}
                                                                                
                                                                                
                                                                                {(() => {
                                                                                    if (item.bandarmology_status == "Jelek") {
                                                                                        return (
                                                                                            <Tag color="red" className="ml-1 font-weight-bold f-22">{item.bandarmology_status}</Tag>
                                                                                        )
                                                                                    } else if (item.bandarmology_status == "Bagus") {
                                                                                        return (
                                                                                            <Tag color="green" className="ml-1 font-weight-bold f-22">{item.bandarmology_status}</Tag>
                                                                                        )
                                                                                    } else {
                                                                                        return (
                                                                                            <Tag color="blue" className="ml-1 font-weight-bold f-22">{item.bandarmology_status}</Tag>
                                                                                        )
                                                                                    }
                                                                                })()}
                                                                                </h5>
                                                                            </Col>
                                                                            <Col className="text-right" xs="6" sm="6" md="6" lg="6" xl="6" >
                                                                                <h5 className="font-weight-normal f-14"><Link to="#" className="text-dark">Timeframe: {item.timeframe}</Link></h5>
                                                                                <p className="text-muted mb-0 f-12">Last updated 3 mins ago</p>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg="12" className="pr-0 pl-0 mt-2">
                                                        <p className="mb-0 font-weight-bold f-16 text-uppercase">Reason to Buy:</p>
                                                        <p className="mb-0">{item.reason_to_buy}</p>

                                                        <Tag color="red" className="mb-1 mt-3 font-weight-bold f-22 text-uppercase">Reminder!!!</Tag>
                                                        <p className="mb-0">Selalu gunakan Money Management dan disiplin dengan Trading Plan yang sudah diinformasikan.</p>
                                                        <p>Pergerakan market tidak 100% selalu bisa diprediksi dengan tepat. Oleh sebab itu, sebagai seorang trader, <span className="text-uppercase">wajib disiplin trading plan.</span></p>
                                                    </Col>
                                                </Row>
                                            }
                                        </List.Item>
                                        )}
                                    />
                                </Skeleton>
                            </Col>
                        </Row>
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}
export default Technical;