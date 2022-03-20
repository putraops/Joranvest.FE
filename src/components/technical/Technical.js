import React from 'react';
import 'antd/dist/antd.css';
import { Card, Button, List, Divider, Skeleton, Breadcrumb } from 'antd';
import { Row, Col } from 'reactstrap';
import './css/style.css'


import TechnicalFilter from './components/Filter';
import TechnicalList from './components/TechnicalList';
import { PricingComponents } from '../membership/components/PricingComponents';
import SubNav from '../_nav/subNav'
import Footer from '../Footer';

import { connect } from 'react-redux';
import axiosApi from '../../config/axiosConfig';
import { 
    HomeOutlined 
} from '@ant-design/icons';

class Technical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLoading: {
               pageLoading: false,
               pricingLoading: false,
               contentLoading: true,
            },
            isDrawerShow: false,
            pricings: [],
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
        this.LoadData();
    }

    LoadData = () => {
        if (this.props.user === null || !this.props.user.is_membership) {
            this.setState({
                ...this.state, 
                loading: false,
                isLoading: {
                    pricingLoading: true,
                    pageLoading: false,
                    contentLoading: false,
                }
            });
            if (!this.props.user?.is_membership) {
                axiosApi.get(`/membership/getAll`)
                .then(res => {
                    var r = res.data;
                    console.log(r);
                    if (r.status) {
                        this.setState({
                            ...this.state, 
                            pricings: r.data,
                            isLoading: {
                                pricingLoading: false,
                                pageLoading: false,
                                contentLoading: false,
                            }
                        });
                    }
                });
            }
        } else {
            const { payload } = this.state; 
            axiosApi.post(`/technical_analysis/getPagination`, payload).then(r => {
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

    handleDrawerShow = (value) => {
        this.setState({
            ...this.state, 
            isDrawerShow: value
        });
    }
    
    render() {
        const { listData, payload, isLoading, pricings, isDrawerShow } = this.state;

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
                    <SubNav title="Riset Analisa Teknikal" sub_title="Pilih beragam Riset Analisa Teknikal sesuai Strategi & Timeframe kamu" />
                    <PricingComponents
                        pricings={pricings}
                        isShow={isDrawerShow}
                        isLoading={isLoading.pricingLoading}
                        setHide={() => this.handleDrawerShow(false)} />
                    
                    
                    <div className="container mt-4">
                        <Row className="">
                            <Col md="4" lg="3" className="mb-3">
                                <TechnicalFilter 
                                    handleFilterTimeframe={this.handleFilterTimeframe} 
                                    filtering={this.filtering} 
                                />
                            </Col>
                            <Col md="8" lg="9">
                                {(() => {
                                    if (this.props.user === null || !this.props.user.is_membership) {
                                        return (
                                            <Row className="justify-content-md-center">
                                                <Col md="12">
                                                    <Card size="small" className="borderShadow4 p-2">
                                                        <Row className="justify-content-md-center">
                                                            <Col lg="12" className="mb-2 text-center">
                                                                {this.props.user === null ? 
                                                                    <p className="fw-600 f-14 mb-0" style={{lineHeight: "30px"}}>Untuk bisa mendapatkan Analisa terbaik dari kami.<br />Silahkan login terlebih dahulu <a href="/login" >disini</a>.</p>
                                                                    : <p className="fw-600 f-14 mb-0" style={{lineHeight: "30px"}}>Kamu belum terdaftar sebagai Member untuk bisa mendapatkan Analisa terbaik dari kami.<br />Silahkan daftar Member terlebih dahulu <span className="text-joran" style={{cursor: "pointer"}} onClick={() => this.handleDrawerShow(true)}>disini</span>.</p>
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                    } else {
                                        return (
                                            <Skeleton active loading={this.state.loading} avatar paragraph={{ rows: 5 }}>
                                                <List
                                                    itemLayout="vertical" size="large"
                                                    style={{marginTop: "-20px"}}
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
                                                    renderItem={item => <TechnicalList obj={item} />}
                                                />
                                            </Skeleton>
                                        )
                                    }
                                })()}
                            </Col>
                        </Row>
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(Technical);