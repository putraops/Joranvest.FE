import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { Row, Col } from 'reactstrap';

import Logo from './components/Logo'

import { connect } from 'react-redux';

import './css/auth.css';
import axiosApi from '../../config/axiosConfig';

const RegisterVerification = (props) => {
    useEffect(() => {
        document.getElementById("main_navbar").classList.add("d-none");
        handleVerification(props.match.params.id);
    }, []);    


    const handleVerification = (id) => {
        axiosApi.patch(`/application_user/emailVerificationById/${id}`)
        .then(res => {
        });
    }

    return (
        <Fragment>
            <section className="section pb-0 pt-0"  style={{height: "100vh"}}>
                <div className="container-fuild" style={{width: "100%"}}>
                    <Row className="p-0 m-0">
                        <Col md="5" lg="5" xl="6" className="d-none d-md-block" style={{height: "100vh", backgroundColor: "#E0F3FF"}}>
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
                        <Col sm="12" md="7" lg="7" xl="6" style={{height: "100vh"}}>
                            <div className="card h-100 border-0 justify-content-center">           
                                <div>
                                    <div className="card-body text-center">
                                        {/* <LoginForm history={this.props.history} />       */}
                                        
                                        <div className="d-md-none d-lg-none" id="right-logo">
                                            <Logo />
                                        </div>

                                        <p className='text-center page-title'>Selamat akun Kamu telah Terverifikasi</p>

                                        <div className="text-center mt-4">
                                            <a href="/login" type="button" 
                                                className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius">
                                                <span>Login ke Joranvest</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
            {/* <section className="section">
                <div className="home-8-bg-overlay"></div>
                <div className="home-center">
                    <div className="home-desc-center">
                        <div className="container">
                            <Row className="justify-content-center">
                                <Col md="8" lg="8" xl="7" style={{"marginTop": "-120px"}}>
                                    <div className="text-center mb-4">
                                        <a href="/"><img src="assets/img/logo.png" alt="" className="img-fluid mb-3" style={{width: "250px"}}/></a>
                                    </div>
                                        <Card className="borderShadow5">
                                            <p className='text-center f-20 font-weight-bold'>Selamat Akun anda telah Terdaftar.</p>

                                            <div className="text-center mt-4">
                                            <Link to="/login"><Button type="primary" className="mb-2" size="medium" block >Login ke dalam Website</Button> </Link>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </section> */}
        </Fragment>
    );
}

export default connect(null, null)(RegisterVerification);