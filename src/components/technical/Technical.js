import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';
import axiosApi from '../../config/axiosConfig';
import { Button, Card, Drawer, List, Avatar, Divider, IconText} from 'antd';
import { Space  } from 'antd';

class Technical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                page: 1,
                size: 10,
            },
            user: {
                name: "",
            },
            listData: {total:0,data:[]}
        };
    }

      // state = {
    //     payload: {
    //         page: 1,
    //         size: 1,
    //     },
    //     user: {
    //         name: "",
    //     },
    //     listData: []
    // }


    componentDidMount () {
        const { payload } = this.state;
        this.LoadData();
    }

    LoadData = () =>
    {
        const {payload} = this.state; 
        axiosApi.post(`/technical_analysis/getPagination`, payload).then(r => {
            console.log(r.data);
            if (r.data.total > 0) {
                    this.setState({...this.state, listData:r.data});
                }
        });
    }

    handlePage = event => {
        const {payload} = this.state;
        payload.page = event;
        this.LoadData();
    }
    
    render() {
        const { listData, payload } = this.state;
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
                <Navbar />
                <section className="section home-1-bg" id="home">
                    <div className="container mt-5">
                        <Row className="">
                            <Col md="12">
                            <strong className="mb-2 f-20">Riset Analisa Teknikal</strong>
					        <p>Pilih beragam riset analisa teknikal sesuai strategi & timeframe kamu</p>
                            
                            <Button type="primary" className="mr-2">Semua</Button>
                            <Button className="mr-2">One Day Trade</Button>
                            <Button className="mr-2">Swing</Button>

                            </Col>
                            <Col md="12">
                                <List
                                    itemLayout="vertical"  size="large"
                                    pagination={{
                                    onChange: page => {
                                        this.handlePage(page);
                                    },
                                    pageSize: payload.size,
                                    total: listData.total
                                    }}
                                    dataSource={listData.data}
                                    // footer={}
                                    renderItem={item => (
                                    <List.Item className="pl-0 pr-0"
                                        key={item.id}
                                        actions={[
                                        ]}>
                                        <List.Item.Meta className="mt-0"
                                            avatar={<Avatar src={item.timeframe} />}
                                            title={<a href={item.timeframe}>{item.user_create}</a>}
                                            description={
                                                <div className="row">
                                                    <div className= "col-md-12">
                                                        <span className="font-weight-bold">{item.emiten_name}</span>
                                                    </div>
                                                </div>
                                            } />
                                        {
                                            <Row className="ml-2 mr-2 mb-4">
                                                <Col md="12">
                                                    <Row>
                                                        <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="6" xl="2" >
                                                            <div className="blog"  style={{borderRadius: "0px"}}>
                                                                <div className="text-center bg-white" style={gridAnalysis}>
                                                                    <h5 className="font-weight-normal f-15"><Link to="#" className="text-dark">Signal</Link></h5>
                                                                    <p className="text-muted f-14 mb-0">{item.signal}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="6" xl="2" >
                                                            <div className="blog"  style={{borderRadius: "0px"}}>
                                                                <div className="text-center bg-white" style={gridAnalysis}>
                                                                    <h5 className="font-weight-normal f-15"><Link to="#" className="text-dark">Emiten</Link></h5>
                                                                    <p className="text-muted f-14 mb-0">{item.emiten_code}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                       <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="3" xl="2" >
                                                            <div className="blog"  style={{borderRadius: "0px"}}>
                                                                <div className="text-center bg-white" style={gridAnalysis}>
                                                                    <h5 className="font-weight-normal f-15"><Link to="#" className="text-dark">Area Beli</Link></h5>
                                                                    <p className="text-muted f-14 mb-0">{item.start_buy} - {item.end_buy}</p> 
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="3" xl="2" >
                                                            <div className="blog"  style={{borderRadius: "0px"}}>
                                                                <div className="text-center bg-white" style={gridAnalysis}>
                                                                    <h5 className="font-weight-normal f-15"><Link to="#" className="text-dark">Area Jual</Link></h5>
                                                                    <p className="text-muted f-14 mb-0">{item.start_sell} - {item.end_sell}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="3" xl="2" >
                                                            <div className="blog"  style={{borderRadius: "0px"}}>
                                                                <div className="text-center bg-white" style={gridAnalysis}>
                                                                    <h5 className="font-weight-normal f-15"><Link to="#" className="text-dark">Area Stoploss</Link></h5>
                                                                    <p className="text-muted f-14 mb-0">{item.start_cut} - {item.end_cut}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col className="pr-0 pl-0" xs="6" sm="6" md="4" lg="3" xl="2" >
                                                            <div className="blog"  style={{borderRadius: "0px"}}>
                                                                <div className="text-center bg-white" style={gridAnalysis}>
                                                                    <h5 className="font-weight-normal f-15"><Link to="#" className="text-dark">Risk Reward</Link></h5>
                                                                    <p className="text-muted f-14 mb-0">{item.start_ratio} : {item.end_ratio}</p>
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
                                                                            <h5 className="font-weight-normal f-14"><Link to="#" className="text-dark">Bandarmology: {item.bandarmology_status}</Link></h5>
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
                                                    <p className="mb-0 font-weight-bold">Reason to Buy:</p>
                                                    <span>{item.reason_to_buy}</span>

                                                    <p className="mb-0 mt-2 font-weight-bold">Reminder!</p>
                                                    <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus numquam assumenda hic aliquam vero sequi velit molestias doloremque molestiae dicta?.</span>
                                                </Col>
                                            </Row>
                                        }
                                    </List.Item>
                                    )}
                                />
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