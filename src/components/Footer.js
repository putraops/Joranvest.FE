import React from 'react';
import { Row, Col } from 'reactstrap';

class Footer extends React.Component {
    render() {

        return (
            <React.Fragment>
                <section className="footer-bg mt-3 pt-4 pb-0" style={{borderTop: "1.5px solid #ddd"}}>
                    <div className="container pb-4">
                        <Row>
                            <Col md="6" lg="6" className="mb-2">
                                <div className="text-dark">
                                    <p className="text-uppercase text-dark footer-title mb-2">PT. RISAMBESSY KONSULTINDO MANDIRI</p>
                                    <p className="text-muted mb-0">Jl. Tenggilis Timur Dalam 3th Floor, Tenggilis Mejoyo</p>
                                    <span className="text-muted mb-1">Surabaya 60292</span>
                                </div>
                            </Col>
                            
                            <Col md="6" lg="6" className="mb-2 pull-right">
                                <div className="row">
                                    <div className="col-md-2">
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <p className="text-uppercase text-dark footer-title mb-2">JORANVEST</p>
                                        <p className="text-muted mb-0"><a href="/webinar" className="text-secondary">Webinar</a></p>
                                    </div>
                                    <div className="col-md-5">
                                        <p className="text-uppercase text-dark footer-title mb-2">Bantuan & Panduan</p>
                                        <p className="text-muted mb-0">Syarat & Ketentuan</p>
                                        <p className="text-muted mb-0"><a href="/privacy" className="text-secondary">Kebijakan Privasi</a></p>
                                        <p className="text-muted mb-0"><a href="/disclaimer" className="text-secondary">Disclaimer</a></p>
                                        <p className="text-muted mb-0"><a href="/about-us" className="text-secondary">Tentang Kami</a></p>
                                        <p className="text-muted mb-0"><a href="/contact-us" className="text-secondary">Hubungi Kami</a></p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <section className="footer-alt bg-dark pt-3 pb-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <p className="copyright text-white f-14 font-weight-light mb-0">copyright © {new Date().getFullYear()}. PT Risambessy Konsultindo Mandiri</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </React.Fragment>
        );
    }
}
export default Footer;