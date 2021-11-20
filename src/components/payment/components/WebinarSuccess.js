import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Button, Card, Image, Skeleton, message } from 'antd';
import NumberFormat from "react-number-format";
import axiosApi from '../../../config/axiosConfig';
import Footer from '../../Footer';

const WebinarSuccess = props => {
    const [record, setRecord] = useState({});
    
    const [loading, setLoading] = useState({
        isContentLoading: true,
    });

    useEffect(() => {
        getPaymentById(props.record_id);
    }, []);

    const getPaymentById = async (id) => {
        return new Promise((resolve, reject) => {
            axiosApi.get(`/payment/getById/${id}`)
            .then(res => {
                var r = res.data;
                if (r.status) {
                    setLoading({...loading, isContentLoading: false})
                    setRecord(r.data)
                    resolve(r.data);
                } else {
                    reject(false);
                }
            }).catch(function (error) {
                message.error(error);
                reject(false);
            });
        });
    }

    return (
        <section className="section home-1-bg" id="home">
            <div className="home-8-bg-overlay"></div>
            <div className="home-center">
                <div className="home-desc-center">
                    <div className="container">
                        <Row className="justify-content-center" style={{marginTop: "50px"}}>
                            <Col md="8" lg="7" xl="6">
                                <Skeleton 
                                    shape="square"
                                    paragraph={{ rows: 10 }}
                                    loading={loading.isContentLoading}
                                    active>
                                    
                                    <div className="text-center mb-4">
                                        <a href="/" >
                                            <img src="/images/gallery/logo.png" alt="" className="img-fluid"  style={{width: "200px"}} />
                                        </a>
                                    </div>
                                    
                                    <Card 
                                        title={record.payment_type === "credit_card" ? "Kartu Kredit" : ""}
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
                                                }
                                            })()}
                                            </Fragment>
                                        }
                                    >
                                        <Row>
                                            <Col md="12">
                                                <p className="mb-0 text-center f-14">Terima kasih telah melakukan pendaftaran Webinar.</p>
                                                <p className="mb-0 text-center f-14">Kami mengharapkan kehadiranmu pada Webinar yang kami laksanakan.</p>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col md="12" className="text-center">
                                                <p className="mb-0 font-weight-bold">Total Pembayaran</p>
                                                <NumberFormat
                                                    value={record ? record.price + record.unique_number : 0}
                                                    className="f-20"
                                                    style={{marginTop: "-15px", fontWeight: "800", color: "#005bea"}}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    prefix="Rp "
                                                />
                                            </Col>
                                        </Row>
                                    </Card>
                                    
                                    <Row>
                                        <Col md="12">
                                            <a href={`/transaction`}>
                                                <Button type="primary"  className="mb-2" block>
                                                    Lihat Riwayat Transaksi
                                                </Button>
                                            </a>
                                            <a href="/">
                                                <Button type="info" block>
                                                    Kembali ke Halaman Utama
                                                </Button>
                                            </a>
                                        </Col>
                                    </Row>
                                </Skeleton>                                
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}
export default WebinarSuccess;