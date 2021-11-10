import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Card, Image, Alert, Skeleton, Radio, List } from 'antd';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import moment from 'moment';
import axiosApi from '../../../config/axiosConfig';
import Footer from '../../Footer';

const Pending = props => {
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
            console.log("/payment/save: ", r);
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
                                    
                                    <p className="mb-0 text-center">Batas Akhir Pembayaran</p>
                                    <p className="mb-0 text-center font-weight-bold" style={{marginTop: "-5px"}}>{expiredDate}</p>
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
                                        }
                                    >
                                        <Row>
                                            <Col md="12">
                                                <p className="mb-0">Nomor Rekening</p>
                                                <p className="mb-0 font-weight-bold" style={{marginTop: "-5px"}}>036 690 9090</p>
                                                <p className="mb-0" style={{marginTop: "-5px"}}>PT. Risambessy Konsultindo Mandiri</p>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col md="12">
                                                <p className="mb-0">Total Pembayaran</p>
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
                                        <Alert
                                            className="mt-3 mb-3"
                                            message={<span style={{fontWeight: "500"}}>Informasi Penting</span>}
                                            type="info"
                                            description={
                                                <Fragment>
                                                    <ol style={{marginLeft: "-10px"}}>
                                                        <li>Transfer sesuai sampai digit terakhir untuk memudahkan verifikasi.</li>
                                                        <li>Tidak disarankan untuk transfer melalui LLG/Kliring/SKBNI</li>
                                                    </ol>
                                                </Fragment>
                                            }
                                        />
                                    </Card>
                                    
                                    <Row>
                                        <Col md="12">
                                            <Button type="primary" block onClick={handleRedirectPaymentStatus}>
                                                Cek Status Pembayaran
                                            </Button>
                                            <p className="mb-0 mt-2 font-weight-bold">Cara Pembayaran</p>
                                            <hr className="mt-1 mb-1" />
                                            <p className="mb-0">Pastikan Pembayaran <strong className="text-uppercase">berhasil</strong> dan unggah bukti untuk mempercepat verifikasi</p>
                                            <p className="mb-0">Unggah bukti transfer <a href={`/transaction/history/${props.record_id}`}>disini</a></p>
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
export default Pending;