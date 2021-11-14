import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import WebinarList from './WebinarList';
import SubNav from '../_nav/subNav';
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { List, Select, Space, Breadcrumb } from 'antd';

import { 
    HomeOutlined, 
} from '@ant-design/icons';
const { Option, OptGroup } = Select;

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
                    <div className="container-fluid mt-4 pr-0 pl-0">
                        <div className="container mb-2">
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