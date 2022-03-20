import React, { useState, useEffect, useLayoutEffect } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import axiosApi from '../../config/axiosConfig';
import { List, Pagination, Breadcrumb } from 'antd';

import WebinarList from './components/WebinarList';
import SubNav from '../_nav/subNav';
import NoDataCard from '../NoDataCard';
import Filter from './components/Filter';
import Footer from '../Footer';

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

    // useEffect(() => {
    //     //LoadData();
    // });

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
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
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
        } else if (value === "#newest") {
            setPayload({...payload, order: {"#nearest": ""}});
        } else if (value === "#free") {
            setPayload({...payload, order: {"#free": ""}});
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
                            <List
                                itemLayout="vertical"  size="large"
                                locale={{emptyText: 
                                    <NoDataCard title={<p className="mb-0" style={{fontSize: "1.4em"}}>Oopss... Tidak ada Webinar yang bisa ditampilkan.</p>} />
                                }}
                                loading={isLoading.contentLoading}
                                dataSource={listData.data}
                                renderItem={item => <WebinarList title={item.title} price={item.price} obj={item} />}
                            />
                            
                            <Pagination
                                onChange={handlePage}
                                current={payload.page}
                                className={`float-right ${listData.length == 0 ? "d-none" : ""}`} 
                                total={listData.total}
                                responsive={true}
                            />  
                        </Col>
                    </Row>
                </div>      
                <Footer />
            </section>
        </React.Fragment>
    );
}
export default (Webinar);