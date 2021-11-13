import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Card, Image, Alert, Skeleton, Radio, List } from 'antd';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import moment from 'moment';
import axiosApi from '../../../config/axiosConfig';
import Footer from '../../Footer';

const Success = props => {
    const [record, setRecord] = useState({});
    const [expiredDate, setExpiredRecord] = useState("");
    
    const [loading, setLoading] = useState({
        isContentLoading: true,
    });
    useEffect(() => {
        console.log("pending page", props);
     
        loadData();
    }, []);

    const loadData = () => {
        axiosApi.get(`/payment/getById/${props.record_id}`)
        .then(res => {
            var r = res.data;
            console.log("/payment/getById: ", r);
            if (r.status) {
                setLoading({...loading, isContentLoading: false})
                setRecord(r.data)
                var now = Date.now();
                var expired = r.data.payment_date_expired.Time;
                
                setExpiredRecord(moment(r.data.payment_date_expired.Time,  "YYYY/MM/DD HH:mm").format('DD MMMM YYYY HH:mm'));
                //console.log(moment(r.data.payment_date_expired.Time).subtract(1, 's').quarter());
                // setLoading({...loading, isMembershipLoading: false});
                // setMembershipRecord(r.data);
            }
        }).catch(function (error) {
            console.log(error.toJSON());
            window.location.assign("/")
        });
    }

    const handleRedirectPaymentStatus = () => {
        window.location.assign(`/transaction/history/${props.record_id}`);
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
                                            <img src="/images/gallery/logo.png" alt="" className="img-fluid"  style={{width: "300px"}} />
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
                                                } else {
                                                    <span>2</span>
                                                }
                                            })()}
                                            </Fragment>
                                        }
                                    >
                                        <Row>
                                            <Col md="12">
                                                <p className="mb-0 text-center f-14">Terima kasih telah berlangganan sebagai Member Premium.</p>
                                                <p className="mb-0 text-center f-14">Sekarang kamu bisa akses fitur Premium.</p>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col md="12" className="text-center">
                                                <p className="mb-0 font-weight-bold">Total Pembayaran</p>
                                                <NumberFormat
                                                    value={record ? record.price + record.unique_number : 0}
                                                    className="f-18"
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
export default Success;