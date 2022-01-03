import React, { Fragment, useState, useEffect } from 'react';
import axiosApi from '../../../config/axiosConfig'
import { Row, Col } from 'reactstrap';
import { Button, Image, Alert, message, Upload, Modal, Pagination, List, Select, notification, Card } from 'antd';
import { connect } from 'react-redux'
import WebinarItemList from './WebinarItemList'

const { Meta } = Card;
const { Option } = Select;

const WebinarTab = props => { 
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
        console.log("as", props);
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
                    "field": "created_by",
                    "operator": "=",
                    "value": props.user.id,
                },
            ]
        }
        axiosApi.post(`/webinar_registration/getPagination`, webinarPayload)
        .then(res => {

            console.log("loadWebinarUser: ", res);
            var r = res.data;

            setTotalData(r.total);
            setlistData(r.data || [])
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            setLoading({...loading, isPagingLoading: false});

            // if (r.total > 0) {
            //     this.setState({...this.state, listData: r});
            // } else {
            //     this.setState({...this.state, listData: []});
            // }
            // this.setState({
            //     ...this.state, 
            //     loading: false,
            //     isLoading: {
            //         pageLoading: false,
            //         contentLoading: false,
            //     }
            // });
            window.scrollTo(0, 0);
        });
    }


    return (
        <Fragment>
            <Row>
                <Col md="12" lg="12">
                    {totalData > 0 ? 
                        <Fragment>
                            {/* <p className="font-weight-bold f-14 mb-1">Total Webinar: {totalData}</p> */}
                            <List
                                itemLayout="vertical"  size="large"
                                dataSource={listData}
                                loading={loading.isPagingLoading}
                                renderItem={item => <WebinarItemList obj={item} />}
                            />
                            <Pagination
                                onChange={onPageChange}
                                current={payload.page}
                                className="float-right" 
                                total={totalData}
                                responsive={true}
                            />
                        </Fragment>
                    : 
                        <p className="text-muted mb-2">Tidak ada daftar Webinar</p>
                    }
                </Col>
            </Row>
        </Fragment>
    );
}

const reduxState = (state) => ({
    isLogin: state.auth.isLogin,
    isLoading: state.auth.isLoading,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
})

export default connect(reduxState, null)(WebinarTab);