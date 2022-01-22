import React, { Fragment, useState, useEffect } from 'react';
import axiosApi from '../../config/axiosConfig'
import { Row, Col } from 'reactstrap';
import { Breadcrumb, Pagination, List, Alert, Select, Card } from 'antd';
import { connect } from 'react-redux'

import SubNav from '../_nav/subNav';
import Footer from '../Footer';
import WebinarHistoryItem from './components/WebinarHistoryItem'

import { 
    HomeOutlined, 
} from '@ant-design/icons';

const WebinarHistory = props => { 
    const [listData, setlistData] = useState([{}]);
    const [totalData, setTotalData] = useState(0);
    const [pagination, setPagination] = useState({
        total: 0
    });
    const [payload, setPayload] = useState({
        page: 1,
        size: 10
    });
    const [loading, setLoading] = useState({
        isPagingLoading: true,
    });

    useEffect(() => {
        if (props.user && props.user.id != "") {
            LoadWebinarUser();
        }
    }, []);

    function onPageChange(page, pageSize){
        setPayload({
            ...payload,
            page: page,
            size: pageSize, 
        })
    }

    const LoadWebinarUser = () => {
        var webinarPayload = {
            page: payload.page,
            size: payload.size,
            filter: [
                {
                    "field": "application_user_id",
                    "operator": "=",
                    "value": props.user.id,
                },
            ]
        }
        axiosApi.post(`/webinar_registration/getPagination`, webinarPayload)
        .then(res => {
            var r = res.data;

            setTotalData(r.total);
            setlistData(r.data || [])
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            setLoading({...loading, isPagingLoading: false});

            window.scrollTo(0, 0);
        });
    }


    return (
        <Fragment>
            <section className="section home-1-bg" id="home">
                <div className="container-fluid mt-2 mb-2 pr-0 pl-0">
                    <div className="container">
                        <Breadcrumb className="pt-1">
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Daftar Webinar</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <SubNav title="Daftar Webinar" sub_title="" />

                <div className="container mt-4" style={{minHeight: "180px"}}>
                    <Row>
                        <Col md="12" lg="12">
                            <Fragment>
                                <List
                                    itemLayout="vertical"  size="large"
                                    dataSource={listData}
                                    loading={loading.isPagingLoading}
                                    locale={{emptyText: 
                                        <Alert message={<p className="mb-0 pt-2 pb-2 f-16 font-weight-bold">Tidak ada Webinar yang kamu ikuti</p>}type="info" />
                                    }}
                                    renderItem={item => <WebinarHistoryItem obj={item} />}
                                />
                                <Pagination
                                    onChange={onPageChange}
                                    current={payload.page}
                                    className={`float-right ${listData.length == 0 ? "d-none" : ""}`} 
                                    total={totalData}
                                    responsive={true}
                                />
                            </Fragment>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </section>
        </Fragment>
    );
}

const reduxState = (state) => ({
    isLogin: state.auth.isLogin,
    isLoading: state.auth.isLoading,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
})

export default connect(reduxState, null)(WebinarHistory);