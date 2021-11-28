import React, { useState, useEffect, useLayoutEffect } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import WebinarList from './components/WebinarList';
import SubNav from '../_nav/subNav';
import Filter from './components/Filter';
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { List, Select, Card, Breadcrumb } from 'antd';
import sideNotification from '../../commons/sideNotification'

import { 
    HomeOutlined, 
} from '@ant-design/icons';

const Webinar = props => {
    const [payload, setPayload] = useState({
        page: 1,
        size: 10,
        order: {"webinar_start_date": "DESC"},
        filter: []
    })
    const [isLoading, setIsloading] = useState({
        contentLoading: true
    })
    const [listData, setListData] = useState({
        total: 0,
        data: []
    })

    useEffect(() => {
        LoadData();
    }, []);

    useLayoutEffect(() => {
        LoadData();
    }, [payload]);

    function LoadData(){
        setIsloading({...isLoading, contentLoading: true});
        axiosApi.post(`/webinar/getPagination`, payload)
        .then(res => {
            var r = res.data;
            setIsloading({...isLoading, contentLoading: false});

            if (r.status && r.status === false) {
                sideNotification.open("Error", r.Message, false);
                return;
            }
            setListData(r || { total: 0, data: []});

        });
    }

    function handlePage(event){
        setPayload({...payload, page: event});
    }

    function handleCategoryChange(e) {
        setPayload({...payload,
            filter: [
                {
                    "field": "webinar_category_id",
                    "operator": "=",
                    "value": e,
                },
            ] 
        });
    }

    function handleOrder(value) {
        if (value === "highest_price") {
            setPayload({...payload, order: {"price": "DESC"}});
        } else if (value === "lowest_price") {
            setPayload({...payload, order: {"price": "ASC"}});
        } else if (value === "newest") {
            setPayload({...payload, order: {"webinar_start_date": "DESC"}});
        }
    }

    return (
        <React.Fragment>
            <section className="section home-1-bg" id="home">
                <div className="container-fluid mt-2 mb-2 pr-0 pl-0">
                    <div className="container">
                        <Breadcrumb className="pt-1">
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Webinar</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <SubNav title="Webinar" sub_title="Kumpulan Webinar Terbaik untuk Kamu" />

                <div className="container mt-4">
                    <Row className="">
                        <Col md="12">
                            <Filter webinarCategoryChange={handleCategoryChange} handleOrder={handleOrder} />
                        </Col>
                        <Col md="12">
                            {listData.total > 0 ? (
                                <List
                                    itemLayout="vertical"  size="large"
                                    pagination={{
                                        onChange: page => {
                                            handlePage(page);
                                        },
                                        pageSize: payload.size,
                                        total: listData.total
                                    }}
                                    loading={isLoading.contentLoading}
                                    dataSource={listData.data}
                                    // footer={}
                                    renderItem={item => <WebinarList title={item.title} price={item.price} obj={item} />}
                                />
                            ) : <Card>
                                    <p className="text-center f-16 mb-0">Tidak ada Webinar tersedia.</p>
                                </Card>
                            }
                        
                        </Col>
                    </Row>
                </div>      
                <Footer />
            </section>
        </React.Fragment>
    );
}
export default (Webinar);