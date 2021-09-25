import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Link, withRouter, Route, useParams  } from 'react-router-dom';
import Navbar from '../Navbar';
import WebinarList from './WebinarList';
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { Image } from 'antd';
import { Button, Card, Drawer, Badge, List, Avatar, Divider, IconText, Tag } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { Space } from 'antd';

const { Option, OptGroup } = Select;
const { Meta } = Card;

class Webinar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                page: 1,
                size: 10,
            },
            user: {
                name: "",
            },
            listData: {total:0,data:[]}
        };
    }

    componentDidMount () {
        const { payload } = this.state;
        this.LoadData();
    }

    LoadData = () =>
    {
        const {payload} = this.state; 
        axiosApi.post(`/webinar/getPagination`, payload).then(r => {
            console.log(r.data);
            if (r.data.total > 0) {
                    this.setState({...this.state, listData:r.data});
                }
        });
    }

    handlePage = event => {
        const {payload} = this.state;
        payload.page = event;
        this.LoadData();
    }

    handleDetail = (id) => {
        //this.props.history.push(`/webinar/detail/${id}`);
    }

    render() {
        const { listData, payload } = this.state;

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
      
        return (
            <React.Fragment>
                <section className="section home-1-bg" id="home">
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="container mb-3">
                            <ul className="nav subNav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/technical">Teknikal</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/fundamental">Fundamental</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/article">Artikel Pilihan</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Webinar</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="card no-radius" style={{backgroundColor: "#1c1d1f"}}>
                            <div className="card-body">
                                <div className="container pb-4 pt-4">
                                    <Row>
                                        <Col span={6} xs={{ order: 1 }} sm={{ order: 1 }} sm="12" md={{ order: 2 }} lg={{ order: 2 }} lg="12">
                                            <h5 className="card-title text-white font-weight-bold" style={{fontSize: "28px"}}>Kumpulan Webinar Terbaik untuk Kamu</h5>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <div className="container mt-4">
                        <Row className="">
                            <Col md="12">
                            <p className="h5 mb-3 f-18">Semua Webinar</p>
                            <div>
                                <span>Filter: </span>
                                <Select className="mr-1" defaultValue="all" style={{ width: 200 }}>
                                    <Option value="all">Semua Kategori</Option>
                                    <OptGroup label="Manager">
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                    </OptGroup>
                                    <OptGroup label="Engineer">
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </OptGroup>
                                </Select>
                                <Select className="mr-1"  defaultValue="soon" style={{ width: 200 }}>
                                    <Option value="soon">Webinar Terdekat</Option>
                                    <Option value="newest">Terbaru</Option>
                                    <Option value="popularity">Popularitas</Option>
                                    <Option value="lowest_price">Harga Terendah</Option>
                                    <Option value="highest_price">Harga Tertinggi</Option>
                                </Select>
                                <hr />
                            </div>
                            </Col>
                            <Col md="12">
                                <List
                                    itemLayout="vertical"  size="large"
                                    pagination={{
                                    onChange: page => {
                                        this.handlePage(page);
                                    },
                                    pageSize: payload.size,
                                    total: listData.total
                                    }}
                                    dataSource={listData.data}
                                    // footer={}
                                    renderItem={item => <WebinarList title={item.title} price={item.price} obj={item} goDetail={this.handleDetail} />}
                                />
                            </Col>
                        </Row>
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}
export default withRouter(Webinar);