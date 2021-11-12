import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import ListTransaction from './components/ListTransaction';
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { List, Select, Space, Breadcrumb } from 'antd';
import { DatePicker } from 'antd';

import { 
    HomeOutlined, 
    UserOutlined 
} from '@ant-design/icons';
const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;

class Transaaction extends React.Component {
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
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Riwayat Transaksi</Breadcrumb.Item>
                        </Breadcrumb>
                        </div>
                    </div>
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="card no-radius" style={{backgroundColor: "#1c1d1f"}}>
                            <div className="card-body">
                                <div className="container pb-3 pt-3">
                                    <Row>
                                        <Col span={6} xs={{ order: 1 }} sm={{ order: 1 }} sm="12" md={{ order: 2 }} lg={{ order: 2 }} lg="12">
                                            <h5 className="card-title text-white font-weight-bold" style={{fontSize: "25px"}}>Riwayat Transaksi</h5>
                                            <p className="card-title text-white font-weight-bold mb-0" style={{fontSize: "14px"}}>Ini adalah Riwayat Transaksi kamu</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <div className="container mt-4">
                        <Row className="">
                            <Col md="12">
                            <p className="h5 mb-1 f-16">Filter:</p>
                            <Space>
                                <RangePicker className="mr-1" />
                                <Select className="mr-1"  defaultValue="all" style={{ width: 200 }}>
                                    <Option value="all">Semua Status</Option>
                                    <Option value="success">Berhasil</Option>
                                    <Option value="pending">Menunggu Pembayaran</Option>
                                    <Option value="failed">Gagal</Option>
                                </Select>
                                <Select className="mr-1"  defaultValue="all" style={{ width: 200 }}>
                                    <Option value="all">Semua Tipe</Option>
                                    <Option value="membership">Membership</Option>
                                    <Option value="webinar">Webinar</Option>
                                </Select>
                                <hr />
                            </Space>
                            </Col>
                            <Col md="12">
                                {/* <List
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
                                /> */}
                                <ListTransaction />
                            </Col>
                        </Row>
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}
export default withRouter(Transaaction);