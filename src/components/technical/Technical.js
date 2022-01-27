import React from 'react';
import 'antd/dist/antd.css';
import { Card, Button, List, Divider, Skeleton, Breadcrumb } from 'antd';
import { Row, Col } from 'reactstrap';
import './css/style.css'


import TechnicalFilter from './components/Filter';
import TechnicalList from './components/TechnicalList';
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
        this.LoadData();
    }

    LoadData = () => {
        const { payload } = this.state; 
        console.log("LoadData: ", this.props)
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
                        {(() => {
                            if (this.props.user === null) {
                                return (
                                    <Row className="justify-content-md-center">
                                        <Col md="12">
                                            <Card size="small" className="borderShadow5 p-3 pt-2 pb-2">
                                                <Col lg="7" className="mb-4">
                                                        <p className="font-weight-bold f-20 mb-2">Ooops...</p>
                                                        <p className="font-weight-bold f-18 mb-0" style={{lineHeight: "30px"}}>Kamu belum login. Silahkan login terlebih dahulu.</p>
                                                    </Col>
                                                <Row className="justify-content-md-center">
                                                    <Col md="3" className="">
                                                        <a href={`/login`}>
                                                            <Button type="primary"  className="mb-2" block>
                                                                Login
                                                            </Button>
                                                        </a>
                                                    </Col>
                                                    <Col md="3" className="">
                                                        <a href={`/`}>
                                                            <Button className="mb-2" block>
                                                                Kembali ke Halaman Utama
                                                            </Button>
                                                        </a>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>
                                )
                            } if (!this.props.user.is_membership) {
                                return (
                                    <Row className="justify-content-md-center">
                                        <Col md="12">
                                            <Card size="small" className="borderShadow5 p-3 pt-2 pb-2">
                                                <Row className="justify-content-md-center text-center">
                                                    <Col lg="7" className="mb-4">
                                                        <p className="font-weight-bold f-20 mb-2">Ooops...</p>
                                                        <p className="font-weight-bold f-18 mb-0" style={{lineHeight: "30px"}}>Kamu belum terdaftar sebagai Member. Silahkan daftar Member terlebih dahulu untuk mendapatkan Analisa terbaik.</p>
                                                    </Col>
                                                </Row>
                                                <Row className="justify-content-md-center">
                                                    <Col md="3" className="">
                                                        <a href={`/`}>
                                                            <Button className="mb-2" block>
                                                                Kembali ke Halaman Utama
                                                            </Button>
                                                        </a>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>
                                )
                            } else if (this.props.user.is_membership) {
                                return (
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
                                                    renderItem={item => <TechnicalList obj={item} />}
                                                />
                                            </Skeleton>
                                        </Col>
                                    </Row>
                                );
                            }
                        })()}                        
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