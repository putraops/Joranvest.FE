import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import NumberFormat from "react-number-format";
import './css/style.css'
import Navbar from '../Navbar';
import SubNav from '../SubNav'
import Footer from '../Footer';
import TechnicalFilter from './components/Filter';
import axios from 'axios';
import axiosApi from '../../config/axiosConfig';
import { Button, Card, Drawer, List, Avatar, Divider, Skeleton, Rate, Tabs, Badge } from 'antd';
import { Select, Space, Typography } from 'antd';
import { Menu, Dropdown } from 'antd';
import { PoweroffOutlined, DownloadOutlined, UserOutlined, DashOutlined} from '@ant-design/icons';

const { Option, OptGroup } = Select;
const { Text } = Typography;
const { Meta } = Card;
const { TabPane } = Tabs;


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingFilter: [],
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
        const { payload } = this.state;
        this.LoadData();
        console.log("did mount")
    }

    LoadData = () => {
        const { payload } = this.state; 
        axiosApi.post(`/fundamental_analysis/getPagination`, payload).then(res => {
            var r = res.data;
            console.log("loaddata", r);
            if (r.total > 0) {
                this.setState({...this.state, listData: r});
            } else {
                this.setState({...this.state, listData: []});
            }
            this.setState({...this.state, loading: false});
            window.scrollTo(0, 0);
            // console.log("state: ", this.state)
            //this.getAllByRecordIds();
        });
    }

    componentDidUpdate = () => {
        console.log("componentDidUpdate")
        console.log("state: ", this.state)
    }

    handlePage = event => {
        const {payload} = this.state;
        payload.page = event;
        this.LoadData();
    }
        
    enterLoading = index => {
        this.setState(({ loadings }) => {
          const newLoadings = [...loadings];
          newLoadings[index] = true;
    
          return {
            loadings: newLoadings,
          };
        });
        setTimeout(() => {
          this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = false;
    
            return {
              loadings: newLoadings,
            };
          });
        }, 6000);
      };

    filtering = (e) => {
        console.log("filter: ", e);
        const { payload } = this.state
        payload.filter = e.responseFilter
        this.LoadData();
    }
    
    render() {
        const { listData, payload } = this.state;
        const { loadingFilter } = this.state;
        const { loading } = this.state;

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
      
        const menu = (
            <Menu>
                <Menu.Item key="change-profile">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        Ubah Profile
                    </a>
                </Menu.Item>
                <Menu.Item key="change-password">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        Ubah Password
                    </a>
                </Menu.Item>
            </Menu>
          );
        return (
            <React.Fragment>
                <section className="section home-1-bg" id="home">
                    <div className="container mt-3">
                        <Row className="">
                            <Col md="12" lg="12">
                                <Divider dashed className="mt-2 mb-2" />
                                <Skeleton active loading={this.state.loading} avatar paragraph={{ rows: 5 }}>
                                    {/* <p className="first-name mb-1"><UserOutlined className="mr-1" />Putra</p> */}
                                        <Card className="borderShadow5 mt-3 mb-3" size="small" extra={
                                            <Dropdown overlay={menu} placement="bottomLeft">
                                                <Button id="btn-more"icon={<DashOutlined />} />
                                            </Dropdown>
                                        }>
                                        <Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" shape="square" style={{width: "120px", height: "120px"}} />}
                                            title={
                                                <div className="mt-0">
                                                    <span className="f-18">Putra Ompusunggu</span>
                                                </div>
                                            }
                                            description={
                                                <div style={{marginTop: "-5px"}}>
                                                    <span className="f-14 text-muted">Professional Fasilisator</span>
                                                    <div className="mb-2">
                                                        <Rate allowHalf disabled defaultValue={4.5} className="mr-2" /> <strong>(142 Ulasan)</strong> 
                                                    </div>
                                                    <Badge className="site-badge-count-109" count={"Member"} style={{ backgroundColor: '#ffc107', color: "black", fontWeight: "700" }} />
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Skeleton>
                                <Skeleton active loading={this.state.loading} avatar paragraph={{ rows: 5 }}>
                                    <Card className="borderShadow5 mb-3" >
                                        <Tabs defaultActiveKey="1" style={{marginTop: "-22px"}}>
                                            <TabPane tab="Information" key="1">
                                                <div className="mb-2 row">
                                                    <label className="col-sm-2 col-form-label font-weight-bold">Nama</label>
                                                    <div className="col-sm-10">
                                                        <label className="col-form-label">{"Putra Ompusunggu"}</label>
                                                    </div>
                                                </div>
                                                <div className="mb-2 row">
                                                    <label className="col-sm-2 col-form-label font-weight-bold">Email</label>
                                                    <div className="col-sm-10">
                                                        <label className="col-form-label">{"putraops@gmail.com"}</label>
                                                    </div>
                                                </div>
                                                <div className="mb-2 row">
                                                    <label className="col-sm-2 col-form-label font-weight-bold">No Hp</label>
                                                    <div className="col-sm-10">
                                                        <label className="col-form-label">{"081340810046"}</label>
                                                    </div>
                                                </div>
                                                <div className="mb-2 row">
                                                    <label className="col-sm-2 col-form-label font-weight-bold">Alamat</label>
                                                    <div className="col-sm-10">
                                                        <label className="col-form-label">{"email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com email@example.com"}</label>
                                                    </div>
                                                </div>
                                            </TabPane>
                                            <TabPane tab="Membership" key="2">
                                                <div className="mb-2 row">
                                                    <label className="col-sm-2 col-form-label font-weight-bold">Status</label>
                                                    <div className="col-sm-10">
                                                        <label className="col-form-label">{"Aktif"}</label>
                                                    </div>
                                                </div>
                                                <div className="mb-2 row">
                                                    <label className="col-sm-2 col-form-label font-weight-bold">Nama</label>
                                                    <div className="col-sm-10">
                                                        <label className="col-form-label">{"Advance"}</label>
                                                    </div>
                                                </div>
                                                <div className="mb-2 row">
                                                    <label className="col-sm-2 col-form-label font-weight-bold">Durasi</label>
                                                    <div className="col-sm-10">
                                                        <label className="col-form-label">{"12 Bulan"}</label>
                                                    </div>
                                                </div>
                                                <div className="mb-2 row">
                                                    <label className="col-sm-2 col-form-label font-weight-bold">Tanggal Terdaftar</label>
                                                    <div className="col-sm-10">
                                                        <label className="col-form-label">{"12 Desember 2021"}</label>
                                                    </div>
                                                </div>
                                                <div className="mb-2 row">
                                                    <label className="col-sm-2 col-form-label font-weight-bold">Tanggal Expired</label>
                                                    <div className="col-sm-10">
                                                        <label className="col-form-label">{"12 Desember 2022"}</label>
                                                    </div>
                                                </div>
                                            </TabPane>
                                            <TabPane tab="Daftar Webinar" key="3">
                                                <span>Tidak ada</span>
                                            </TabPane>
                                        </Tabs>
                                    </Card>
                                </Skeleton>
                            </Col>
                        </Row>
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}
export default Profile;