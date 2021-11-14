import React, { Fragment, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Image, Button} from 'antd';
import { Card, Badge, List, Avatar, Tag, message } from 'antd';

const { Meta } = Card;

const SubNav = (props) => {
    console.log(props);
    return (
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
    )
}

export default SubNav;