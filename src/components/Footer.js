import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
    render() {

        return (
            <React.Fragment>
                <section className="footer-bg mt-0">
                    <div className="container">
                        <Row>
                            <Col md="6" lg="6" className="mb-2">
                                <div className="text-dark">
                                    <p className="text-uppercase text-dark footer-title mb-2">PT. RISAMBESSY KONSULTINDO MANDIRI</p>
                                    <p className="text-muted mb-0">Jl. Tenggilis Timur Dalam 3th Floor, Tenggilis Mejoyo</p>
                                    <span className="text-muted mb-1">Surabaya 60292</span>
                                    {/* <p className="text-muted">www.rkmconsulting.com</p> */}
                                </div>
                            </Col>
                            
                            <Col md="6" lg="6" className="mb-2 pull-right">
                                <div className="row">
                                    <div className="col-md-2">
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <p className="text-uppercase text-dark footer-title mb-2">JORANVEST</p>
                                        {/* <p className="text-muted mb-0">Blog </p> */}
                                        <p className="text-muted mb-0"><a href="/webinar" className="text-secondary">Webinar</a></p>
                                        <p className="text-muted mb-0">Jadi Member</p>
                                        {/* <p className="text-muted mb-0">Karir</p> */}
                                        {/* <p className="text-muted mb-0">Partnership</p> */}
                                    </div>
                                    <div className="col-md-5">
                                        {/* <p class="text-muted mb-0">BANTUAN & PANDUAN</p> */}
                                        <p className="text-uppercase text-dark footer-title mb-2">Bantuan & Panduan</p>
                                        <p className="text-muted mb-0">Syarat & Ketentuan</p>
                                        <p className="text-muted mb-0"><a href="/privacy" className="text-secondary">Kebijakan Privasi</a></p>
                                        <p className="text-muted mb-0">Disclaimer</p>
                                        <p className="text-muted mb-0"><a href="/about-us" className="text-secondary">Tentang Kami</a></p>
                                        <p className="text-muted mb-0"><a href="/contact-us" className="text-secondary">Hubungi Kami</a></p>
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