import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Card, Alert, Radio, List } from 'antd';
import { connect } from 'react-redux';
import Footer from '../../Footer';

const Success = props => {

    useEffect(() => {
        console.log(props);
        
        // loadData(props.match.params.id);
        
    }, []);

    return (
        <section className="section home-1-bg" id="home">
            <div className="home-8-bg-overlay"></div>
            <div className="home-center">
                <div className="home-desc-center">
                    <div className="container">
                        <Row className="justify-content-center" style={{marginTop: "-200px"}}>
                            <Col md="8" lg="7" xl="6">
                                <div className="text-center mb-4">
                                    <a href="/" >
                                        <img src="/images/gallery/logo.png" alt="" className="img-fluid"  style={{width: "300px"}} />
                                    </a>
                                </div>
                                    <Card className="borderShadow5">
                                        <p className="mb-0 text-center f-18">Terima kasih telah berlangganan sebagai Member Premium.</p>
                                        <p className="mb-4 text-center f-18">Sekarang kamu bisa akses fitur Premium.</p>
                                        <p className="mb-0 text-center f-14">Click <a href="/">disini</a> untuk kembali ke halaman utama.</p>
                                </Card>
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