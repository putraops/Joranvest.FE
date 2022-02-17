import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Button, Card, Image, Alert, Skeleton, Radio, List } from 'antd';
import NumberFormat from "react-number-format";
import moment from 'moment';
import axiosApi from '../../../config/axiosConfig';
import Footer from '../../Footer';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

const PendingPage = props => {
    const [record, setRecord] = useState({});
    const [expiredDate, setExpiredRecord] = useState("");
    
    const [loading, setLoading] = useState({
        isContentLoading: true,
    });
    useEffect(() => {     
        loadData();
    }, []);

    const loadData = () => {
        axiosApi.get(`/payment/getById/${props.record_id}`)
        .then(res => {
            var r = res.data;
            if (r.status) {
                setLoading({...loading, isContentLoading: false})
                setRecord(r.data)
                setExpiredRecord(moment(r.data.payment_date_expired.Time,  "YYYY/MM/DD HH:mm").format('DD MMMM YYYY HH:mm'));
            }
        }).catch(function (error) {
            window.location.assign("/")
        });
    }

    return (
        <section className="section" id="home">
            <div className="home-8-bg-overlay"></div>
            <div className="home-center">
                <div className="home-desc-center">
                    <div className="container">
                        <section className="section pb-0 pt-0"  style={{minHeight: "200px"}}>
                            <div className="container-fuild" style={{width: "100%"}}>
                                <Row className="p-0 m-0">
                                    <Col md="5" lg="5" xl="5" className="d-none d-md-block">
                                        <div className="card h-100 border-0 justify-content-center" style={{backgroundColor: "transparent"}}>           
                                            <div>
                                                <div className="card-body">
                                                    <div className="text-center">
                                                        <a href="/" >
                                                            <img src="/images/gallery/logo.png" alt="" className="img-fluid"  style={{width: "250px"}} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm="12" md="7" lg="7" xl="7" className="pt-3 pb-3 mb-3">
                                        <p className="mb-0 text-center f-20 font-weight-bold">Batas Akhir Pembayaran</p>
                                        
                                        <p className="mb-0 text-center font-weight-bold" style={{marginTop: "-5px"}}>
                                            {loading.isContentLoading ? 
                                                <Spin indicator={antIcon}>
                                                </Spin> :
                                                <>{expiredDate}</>
                                            }
                                        </p>
                                        <Card 
                                            title="Transfer Bank"
                                            className="borderShadow5 mt-3 mb-3"
                                            extra={
                                                <Fragment>
                                                    {(() => {
                                                    if (record.payment_type === "transfer_bca") {
                                                        return (
                                                            <Image
                                                                style={{marginTop: "5px"}}
                                                                width={70}
                                                                preview={false} 
                                                                src={"assets/img/bca-icon.png"}/>
                                                        )
                                                    } else {
                                                        <span>2</span>
                                                    }
                                                })()}
                                                </Fragment>
                                            }>
                                            <Row>
                                                <Col md="12">
                                                    <p className="mb-0">Nomor Rekening</p>
                                                    <p className="mb-0 f-18 font-weight-bold" style={{marginTop: "-3px"}}>036 690 9090</p>
                                                    <p className="mb-0" style={{marginTop: "-3px"}}>PT. Risambessy Konsultindo Mandiri</p>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3">
                                                <Col md="12">
                                                    <p className="mb-0 font-weight-bold">Total Pembayaran</p>
                                                    {loading.isContentLoading ? 
                                                        <Spin indicator={antIcon}>
                                                        </Spin> :
                                                        <NumberFormat
                                                            value={record ? record.price + record.unique_number : 0}
                                                            className="f-20"
                                                            style={{fontWeight: "800", color: "#3792cb"}}
                                                            displayType="text"
                                                            thousandSeparator={true}
                                                            prefix="Rp "
                                                        />
                                                    }

                                                    <a className={`btn btn-joran btn-block btn-sm mt-3 ${loading.isContentLoading ? "disabled": ""}`} href="/transaction">
                                                        Cek Status Pembayaran
                                                    </a>
                                                </Col>
                                            </Row>
                                        </Card>
                                        
                                        <Row>
                                            <Col md="12">
                                                <Alert
                                                    message={<span style={{fontWeight: "500"}}>Informasi Penting</span>}
                                                    type="info"
                                                    description={
                                                        <Fragment>
                                                            <ol style={{marginLeft: "-10px"}}>
                                                                <li>Transfer sesuai sampai digit terakhir untuk memudahkan verifikasi.</li>
                                                                <li>Tidak disarankan untuk transfer melalui LLG / Kliring / SKBNI</li>
                                                            </ol>

                                                            <p className="mb-0 mt-2" style={{fontWeight: "500"}}>Cara Pembayaran</p>
                                                            <hr className="mt-1 mb-1" />
                                                            <p className="mb-0">Pastikan Pembayaran <strong className="text-uppercase">berhasil</strong> dan unggah bukti untuk mempercepat verifikasi</p>
                                                        </Fragment>
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </section>


                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}
export default PendingPage;