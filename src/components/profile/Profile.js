import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import './css/style.css'
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { Card, Divider, Skeleton, Tabs } from 'antd';
import { connect } from 'react-redux'
import Main from './components/Main';
import InformationTab from './components/InformationTab';
import MembershipTab from './components/MembershipTab';
import WebinarTab from './components/WebinarTab';

const { TabPane } = Tabs;

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
        };
    }

    componentDidMount () {
        this.LoadData();
    }

    LoadData = () => {
        const { user } = this.props;
        axiosApi.get(`/application_user/getViewById/${user.id}`)
        .then(res => {
            var r = res.data;
            var user = {};
            console.log("loadUser:", r);
            if (r.status) {
                user = r.data;
            } else {

            }
            this.setState({
                ...this.state, 
                loading: false,
                user: user,
            });
            window.scrollTo(0, 0);
        });
    }

    componentDidUpdate = () => {
        console.log("componentDidUpdate")
        // console.log("state: ", this.state)
    }

    render() {
        const { user } = this.state;
        // console.log("user Profile: ", user);
 
        return (
            <React.Fragment>
                <section className="section home-1-bg" id="home">
                    <div className="container mt-3">
                        <Row className="">
                            <Col md="12" lg="12">
                                <Divider dashed className="mt-2 mb-2" />
                                <Main user={user} />
                                <Card className="borderShadow5 mb-3" >
                                    <Skeleton active loading={this.state.loading} paragraph={{ rows: 5 }}>
                                        <Tabs defaultActiveKey="1" style={{marginTop: "-20px"}}>
                                            <TabPane tab="Information" key="1">
                                                <InformationTab user={user} />
                                            </TabPane>
                                            <TabPane tab="Membership" key="2">
                                                <MembershipTab user={user} />
                                            </TabPane>
                                            <TabPane tab="Daftar Webinar" key="3">
                                                <WebinarTab user={user} />
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
}

const reduxState = (state) => ({
    isLogin: state.auth.isLogin,
    isLoading: state.auth.isLoading,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
})

export default connect(reduxState, null)(Profile);