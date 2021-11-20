import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import ListTransaction from './components/ListTransaction';
import Footer from '../Footer';
import { Space, Breadcrumb } from 'antd';

import { 
    HomeOutlined, 
} from '@ant-design/icons';

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
    render() {
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
                        <ListTransaction />
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}
export default withRouter(Transaaction);