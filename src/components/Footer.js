import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render() {

        return (
            <React.Fragment>
                <section className="footer-bg mt-3">
                <div className="container d-none">
                    <div className="row">
                    <div className="col-lg-6 mr-auto">
                        <div className="footer-logo">
                            <p className="text-white">PT. RISAMBESSY KONSULTINDO MANDIRI</p>
                            <p className="text-white">Jl. Tenggilis Timur Dalam 3th Floor, Tenggilis Mejoyo</p>
                            <p className="text-white mb-1">Surabaya 60292</p>

                            <p className="text-white">www.rkmconsulting.com</p>
                            <ul className="social-icons list-inline mt-3">
                                <li className="list-inline-item">
                                    <a target="_blank" href="https://facebook.com/themefisher"><i className="text-primary ti-facebook"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a target="_blank" href="https://twitter.com/themefisher"><i className="text-primary ti-twitter-alt"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a target="_blank" href="https://github.com/themefisher"><i className="text-primary ti-linkedin"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a target="_blank" href="https://instagram.com/themefisher"><i className="text-primary ti-instagram"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 pull-right">
                        <div className="row">
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-5">
                                <p className="text-white">JORANVEST</p>
                                <p className="text-white">Blog </p>
                                <p className="text-white">Webiner & Kelas Online</p>
                                <p className="text-white">Jadi Member</p>
                                <p className="text-white">Karir</p>
                                <p className="text-white">Partnership</p>
                            </div>
                            <div className="col-md-5">
                                <p className="text-white">BANTUAN & PANDUAN</p>
                                <p className="text-white">Syarat & Ketentuan</p>
                                <p className="text-white">kebijakan & Privasi</p>
                                <p className="text-white">Disclaimer</p>
                                <p className="text-white">Hubungi Kami</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                    <div className="container">
                        <Row>
                            <Col lg="6">
                                <div className="text-dark">
                                    <p className="text-uppercase text-dark footer-title mb-2">PT. RISAMBESSY KONSULTINDO MANDIRI</p>
                                    <p className="text-muted mb-0">Jl. Tenggilis Timur Dalam 3th Floor, Tenggilis Mejoyo</p>
                                    <span className="text-muted mb-1">Surabaya 60292</span>

                                    <p className="text-muted">www.rkmconsulting.com</p>
                                    <ul className="social-icons list-inline mt-3">
                                        <li className="list-inline-item">
                                            <a target="_blank" href="https://facebook.com/themefisher"><i className="text-primary ti-facebook"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a target="_blank" href="https://twitter.com/themefisher"><i className="text-primary ti-twitter-alt"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a target="_blank" href="https://github.com/themefisher"><i className="text-primary ti-linkedin"></i></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a target="_blank" href="https://instagram.com/themefisher"><i className="text-primary ti-instagram"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            
                            <Col lg="6" className="pull-right">
                                <div className="row">
                                    <div className="col-md-2">
                                    </div>
                                    <div className="col-md-5">
                                        <p className="text-uppercase text-dark footer-title mb-2">JORANVEST</p>
                                        <p className="text-muted mb-0">Blog </p>
                                        <p className="text-muted mb-0">Webiner & Kelas Online</p>
                                        <p className="text-muted mb-0">Jadi Member</p>
                                        <p className="text-muted mb-0">Karir</p>
                                        <p className="text-muted mb-0">Partnership</p>
                                    </div>
                                    <div className="col-md-5">
                                        {/* <p class="text-muted mb-0">BANTUAN & PANDUAN</p> */}
                                        <p className="text-uppercase text-dark footer-title mb-2">Bantuan & Panduan</p>
                                        <p className="text-muted mb-0">Syarat & Ketentuan</p>
                                        <p className="text-muted mb-0">kebijakan & Privasi</p>
                                        <p className="text-muted mb-0">Disclaimer</p>
                                        <p className="text-muted mb-0">Hubungi Kami</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default Footer;