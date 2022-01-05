import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import './css/style.css'
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { Card, Breadcrumb, Skeleton, Tabs } from 'antd';
import { connect } from 'react-redux'
import SubNav from '../_nav/subNav';
import InformationTab from './components/InformationTab';
import MembershipTab from './components/MembershipTab';
import SideProfile from './components/SideProfile';

import { 
    HomeOutlined, 
} from '@ant-design/icons';
const { TabPane } = Tabs;

const Profile = props => {
    const [userRecord, setUserRecord] = useState({});
    const [loading, setLoading] = useState({
        isContentLoading: true,
    });
    useEffect(() => {
        setUserRecord(props.user);
        if (props.user) {
            LoadData(props.user.id);
        }
    }, []);

    const LoadData = (userId) => {
        axiosApi.get(`/application_user/getViewById/${userId}`)
        .then(res => {
            var r = res.data;
            var user = {};
            if (r.status) {
                user = r.data;
            } 
            setLoading({...loading, isContentLoading: false})
            window.scrollTo(0, 0);
        });
    }

    return (
        <React.Fragment>
            <section className="section home-1-bg" id="home">
                <div className="container-fluid mt-4 pr-0 pl-0">
                    <div className="container mb-2">
                        <Breadcrumb className="pt-1">
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Profile Saya</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <SubNav title="Profile Saya" sub_title="" />
                <div className="container">
                    <Row className="mt-4">
                        <Col span={6} xs="3" xs={{ order: 1 }} sm="5" md="4" lg="4" xl="3">
                            {/* <Divider dashed className="mt-2 mb-2" /> */}
                            <SideProfile />
                        </Col>
                        <Col span={6} xs="3" xs={{ order: 2 }} sm="7" md="8" lg="8" xl="9">
                            <Card className="borderShadow5 mb-3" >
                                <Skeleton active loading={loading.isContentLoading} paragraph={{ rows: 5 }}>
                                    <Tabs defaultActiveKey="1" style={{marginTop: "-20px"}}>
                                        <TabPane tab="Information" key="1">
                                            <InformationTab user={userRecord || null} />
                                        </TabPane>
                                        <TabPane tab="Membership" key="2">
                                            <MembershipTab user={userRecord || null} />
                                        </TabPane>
                                    </Tabs>
                                </Skeleton>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </section>
        </React.Fragment>
    );
}

const reduxState = (state) => ({
    isLogin: state.auth.isLogin,
    isLoading: state.auth.isLoading,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
})

export default connect(reduxState, null)(Profile);