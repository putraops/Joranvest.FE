import React, { Fragment, useState, useEffect } from 'react'

import { Row, Col } from 'reactstrap';
import { Spin, Divider } from 'antd';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import Logo from '../../auth/components/Logo';

// services
import * as service from '../services/service'
// style
import "./style.css"

import {
    ExclamationOutlined,
    LoadingOutlined,
    CheckOutlined
} from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: "7em", marginBottom: "20px" }} spin />;
let myInterval;

const Confirmation = props => {
    const [paymentRecord, setPaymentRecord] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(2);
    const [isTransactionFound, setIsTransactionFound] = useState(true);
    const [loading, setLoading] = useState({
        isWaitingStatusLoading: true,
    });

    useEffect(() => {
        document.getElementById("main_navbar").classList.add("d-none");
        if (props.match && props.match.params && props.match.params.payment_id) {
            runHook();
        }

    }, []);

    const runHook = () => {
        myInterval = setInterval(() => {
            loadData();
        }, 2000);
    }

    const loadData = () => {
        service.getPaymentById(props.match.params.payment_id)
        .then(res => {
            var r = res.data;
            console.log(r);
            if (r.status) {
                setPaymentRecord(r.data);

                if (r.data.payment_status !== 2) {
                    myStopFunction();
                    setPaymentStatus(r.data.payment_status)

                    if (r.data.payment_status !== 2) {
                        setLoading({...loading, isWaitingStatusLoading: false});
                    } else {
                        setLoading({...loading, isWaitingStatusLoading: false});
                    }
                } 
            } else {
                if (r.message === "Record not found") {
                    setIsTransactionFound(false);
                    setLoading({...loading, isWaitingStatusLoading: false});
                    myStopFunction();
                }
            }
        })
    }

    function myStopFunction() {
        clearInterval(myInterval);
    }
    
    return (
        <Fragment>
            <section className="section pb-0 pt-0 vh-100">
                    <div className="container-fuild" style={{width: "100%"}}>
                        <Row className="p-0 m-0">
                            <Col md="5" lg="5" xl="4" className="d-none d-md-block" style={{height: "100vh", backgroundColor: "#E0F3FF"}}>
                                <div className="card h-100 border-0 justify-content-center" style={{backgroundColor: "transparent"}}>           
                                    <div>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <Logo />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12" md="7" lg="7" xl="8" style={{height: "100vh"}}>
                                <div className="card h-100 border-0 justify-content-center">           
                                    <div className="text-center">
                                        <div className="card-body">
                                            {loading.isWaitingStatusLoading ? 
                                                <>
                                                    <Spin indicator={antIcon} className="mb-4" />
                                                    <p id="payment-verifying-label" className="mb-4 f-20">Silahkan Lakukan Pembayaran</p>
                                                    <p id="payment-verifying-label" className="mb-0 f-17">Apabila telah melakukan Pembayaran, Silahkan tunggu untuk Verifikasi Pembayaran kamu</p>
                                                </> : (
                                                    <>
                                                        <div className="d-md-none d-lg-none" id="right-logo">
                                                            <a href="/"><img src="assets/img/logo.png" alt="" 
                                                                style={{
                                                                    width: "270px",
                                                                }} />
                                                            </a>
                                                        </div>
                                                        { isTransactionFound ? 
                                                            paymentStatus === 3 ?
                                                            <>
                                                                <ExclamationOutlined id="not-found-icon" />
                                                                <p id="payment-danger-label" className="mb-0">Pembayaran Gagal</p>
                                                                <p id="payment-danger-label-sub" className="mb-0">Silahkan Ulangi Pembayaran</p>
                                                            </> : 
                                                            <>
                                                                <CheckOutlined id="check-icon" />
                                                                <p id="payment-success-label" className="mb-0 f-20">Pembayaran Berhasil</p>
                                                                <Divider />
                                                                <p id="payment-label" className="mb-0 text-uppercase">Total Pembayaran</p>
                                                                <p id="payment-amount" className="mb-0">
                                                                    <NumberFormat
                                                                        value={paymentRecord ? paymentRecord.price : 0}
                                                                        displayType="text"
                                                                        thousandSeparator={true}
                                                                        prefix="Rp "
                                                                    />
                                                                </p>
                                                                <Divider />
                                                            </> :
                                                            <>
                                                                <ExclamationOutlined id="not-found-icon" />
                                                                <p id="payment-danger-label" className="mb-0 f-20">Transaksi tidak ditemukan</p>
                                                            </>
            
                                                        }
                                                        <a href="/" 
                                                            className={`btn btn-block ${isTransactionFound ? (paymentStatus === 3 ? `btn-danger` : `btn-joran`) : `btn-danger`} mt-3 p-2 pr-4 pl-4 no-radius`}>
                                                            <span>Kembali ke Halaman Utama</span>
                                                        </a>
                                                    </>
                                                )
                                                
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(Confirmation);