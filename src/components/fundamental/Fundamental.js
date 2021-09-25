import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import NumberFormat from "react-number-format";
import './css/style.css'
import Navbar from '../Navbar';
import SubNav from '../SubNav'
import Footer from '../Footer';
import TechnicalFilter from './components/Filter';
import axios from 'axios';
import axiosApi from '../../config/axiosConfig';
import { Button, Card, Drawer, List, Avatar, Divider, Skeleton, Popover, Input, IconText} from 'antd';
import { Select, Space, Typography } from 'antd';
import { PoweroffOutlined, DownloadOutlined, CheckOutlined } from '@ant-design/icons';

const { Option, OptGroup } = Select;
const { Text } = Typography;

class Fundamental extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingFilter: [],
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
        axiosApi.post(`/fundamental_analysis/getPagination`, payload).then(res => {
            var r = res.data;
            console.log("loaddata", r);
            if (r.total > 0) {
                this.setState({...this.state, listData: r});
            } else {
                this.setState({...this.state, listData: []});
            }
            this.setState({...this.state, loading: false});
            window.scrollTo(0, 0);
            // console.log("state: ", this.state)
            //this.getAllByRecordIds();
        });
    }

    componentDidUpdate = () => {
        console.log("componentDidUpdate")
        console.log("state: ", this.state)
    }

    handlePage = event => {
        const {payload} = this.state;
        payload.page = event;
        this.LoadData();
    }
        
    enterLoading = index => {
        this.setState(({ loadings }) => {
          const newLoadings = [...loadings];
          newLoadings[index] = true;
    
          return {
            loadings: newLoadings,
          };
        });
        setTimeout(() => {
          this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = false;
    
            return {
              loadings: newLoadings,
            };
          });
        }, 6000);
      };

    filtering = (e) => {
        console.log("filter: ", e);
        const { payload } = this.state
        payload.filter = e.responseFilter
        this.LoadData();
    }
    
    render() {
        const { listData, payload } = this.state;
        const { loadingFilter } = this.state;
        const { loading } = this.state;

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
                <section className="section home-1-bg" id="home">
                    <SubNav title="Riset Analisa Teknikal" subtitle="Pilih beragam riset analisa teknikal sesuai strategi & timeframe kamu" />
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
                                        // footer={}
                                        renderItem={item => (
                                        <List.Item className="pl-0 pr-0"
                                            key={item.id}
                                            actions={[
                                            ]}>
                                            <List.Item.Meta className="mt-0"
                                                avatar={
                                                    <Avatar 
                                                        src={item.timeframe} 
                                                        size={{ xs: 55, sm: 55, md: 55, lg: 55, xl: 60, xxl: 100 }}/>
                                                    }
                                                title={
                                                    <Fragment>
                                                        <a href='#' className="mr-1">{item.created_by_fullname}</a> 
                                                        <Popover content="Verified">
                                                            <CheckOutlined className="verified-user" />
                                                        </Popover>
                                                    </Fragment>
                                                }
                                                description={
                                                    <div className="row">
                                                        <div className= "col-md-12 form-inline">
                                                            <span className="font-weight-bold">{item.user_create_title == "" ? "" : item.user_create_title}</span>
                                                        </div>
                                                    </div>
                                                } />
                                            {
                                                <Row className="ml-2 mr-2 mb-4">
                                                    <Col md="12">
                                                        <Row>
                                                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="6" xl="3" >
                                                                <div className="blog" style={{borderRadius: "0px"}}>
                                                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                                                        <h5 className="f-15 box-title">Emiten</h5>
                                                                        <p className="text-muted mb-0 emiten-code">{item.emiten_code}</p>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col className="pr-0 pl-0" xs="6" sm="6" md="6" lg="6" xl="3" >
                                                                <div className="blog" style={{borderRadius: "0px"}}>
                                                                    <div className="text-center bg-white box-analysis" style={gridAnalysis}>
                                                                        <h5 className="f-15 box-title">Harga Saat Ini</h5>
                                                                        <p className="mb-0">
                                                                            <NumberFormat className="mb-0 emiten-price"
                                                                                value={item.current_price}
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
                                                                                value={item.normal_price}
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
                                                                        <h5 className="f-15 box-title mb-0">Margin of Safety (MOS)</h5>
                                                                        <span className="text-success margin-of-safety mb-0">{item.margin_of_safety}%</span>
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
                                                                                <h5 className="font-weight-bold text-uppercase f-16 mb-0">{item.emiten_name}</h5>
                                                                            </Col>
                                                                            <Col className="text-right" xs="6" sm="6" md="6" lg="6" xl="6" >
                                                                                <p className="text-muted mb-0 f-12">Last updated 3 mins ago</p>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg="12" className="pr-0 pl-0 mt-2">
                                                        <p className="mb-0 font-weight-bold f-16">Data Riset</p>
                                                        <span>{item.research_data}</span>
                                                        <br /><span>{item.research_data}</span><br /><span>{item.research_data}</span><br /><span>{item.research_data}</span>
                                                        <br /><span>{item.research_data}</span><br /><span>{item.research_data}</span><br /><span>{item.research_data}</span>
                                                        <br /><span>{item.research_data}</span><br /><span>{item.research_data}</span><br /><span>{item.research_data}</span>
                                                        <Divider className="mt-2 mb-3" dashed />
                                                        {item.attachments.map((item, i) => {     
                                                            return (
                                                                <Popover key={`popover-${item.id}}`} content={
                                                                    <div>
                                                                        <p className="mb-1">File: {item.filename}</p>
                                                                        <Button className="btn-block" type="primary" icon={<DownloadOutlined />} size={30}>
                                                                            Download
                                                                        </Button>
                                                                    </div>
                                                                }>
                                                                    <img src="/images/gallery/icon/iconPDF.png" className="mr-4" key={item.id} title={item.filename} style={{width: "40px", cursor: "pointer"}}/>
                                                                </Popover>
                                                            ) 
                                                        })}
                                                        {/* <img src="/images/gallery/icon/iconPDF.png" className="mr-4" style={{width: "40px"}}/> */}
                                                        {/* <img src="/images/gallery/icon/iconPDF.png" className="mr-4" style={{width: "40px"}}/> */}
                                                        {/* <img src="/images/gallery/icon/iconPDF.png" className="mr-4" style={{width: "40px"}}/> */}
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
export default Fundamental;