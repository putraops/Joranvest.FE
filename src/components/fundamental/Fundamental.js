import React from 'react';
import 'antd/dist/antd.css';

import { Breadcrumb, Card, Button, List, Divider, Skeleton } from 'antd';
import { Row, Col } from 'reactstrap';
import './css/style.css'
import { connect } from 'react-redux';
import TechnicalFilter from './components/Filter';
import axiosApi from '../../config/axiosConfig';

import SubNav from '../_nav/subNav'
import FundamentalList from './components/FundamentalList';
import Footer from '../Footer';
import moment from 'moment';
import { 
    HomeOutlined, 
} from '@ant-design/icons';

class Fundamental extends React.Component {
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
        axiosApi.post(`/fundamental_analysis/getPagination`, payload).then(res => {
            var r = res.data;
            if (r.total > 0) {
                this.setState({...this.state, listData: r});
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

    componentDidUpdate = () => {
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

    handleTimeFormat = (submitted_at, created_at) => {
        let articleDate = submitted_at.Time; 
        let articleLongDate = "";
        let articleTime = "";
        let articleDayName = "";
        if (!submitted_at.Valid) {
            articleDate = created_at.Time;
        } 

        articleLongDate = moment(articleDate,  "YYYY/MM/DD").format('DD MMMM YYYY');
        articleTime = moment(articleDate,  "YYYY/MM/DD HH:mm").format('HH:mm')
        articleDayName = moment(articleDate,  "YYYY/MM/DD HH:mm").format('dddd');

        if (articleDayName == "Monday") articleDayName = "Senin";
        if (articleDayName == "Tuesday") articleDayName = "Selasa";
        if (articleDayName == "Wednesday") articleDayName = "Rabu";
        if (articleDayName == "Thursday") articleDayName = "Kamis";
        if (articleDayName == "Friday") articleDayName = "Jumat";
        if (articleDayName == "Saturday") articleDayName = "Sabtu";
        if (articleDayName == "Sunday") articleDayName = "Minggu";

        return articleDayName;
    }
    
    render() {
        const { listData, payload, isLoading } = this.state;
        return (
            <React.Fragment>
                <section className="section home-1-bg" id="home">
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="container mb-3">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/fundamental">
                                    Analisa
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Fundamental</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <SubNav title="Riset Analisa Fundamental" sub_title="Pilih beragam riset analisa fundamental sesuai strategi & timeframe kamu" />
                    <div className="container mt-3">
                    {(() => {
                            if (this.props.user === null) {
                                return (
                                    <Row className="justify-content-md-center">
                                        <Col md="12">
                                            <Card size="small" className="borderShadow5 p-3 pt-2 pb-2">
                                                <Row className="justify-content-md-center">
                                                    <Col lg="7" className="mb-4 text-center">
                                                        <p className="font-weight-bold f-20 mb-2">Ooops...</p>
                                                        <p className="font-weight-bold f-18 mb-0" style={{lineHeight: "30px"}}>Kamu belum login. Silahkan login terlebih dahulu.</p>
                                                    </Col>
                                                </Row>
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
                                                <Row className="justify-content-md-center">
                                                    <Col lg="7" className="mb-4 text-center">
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
                                        <Col md="5" lg="4" xl="3" className="mb-3">
                                            <TechnicalFilter 
                                                handleFilterTimeframe={this.handleFilterTimeframe} 
                                                filtering={this.filtering} 
                                            />
                                        </Col>
                                        <Col md="7" lg="8" xl="9">
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
                                                    // footer={}
                                                    renderItem={item => <FundamentalList obj={item} />}
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
export default connect(mapStateToProps, null)(Fundamental);