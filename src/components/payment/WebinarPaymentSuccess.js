import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Card, Alert, Radio, List } from 'antd';

class WebinarPaymentSuccess extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        document.getElementById("main_navbar").classList.add("d-none");
    }

    render() {
        return (
            <section className="section home-1-bg" id="home">
                <div className="home-8-bg-overlay"></div>
                <div className="home-center">
                    <div className="home-desc-center">
                        <div className="container">
                            <Row className="justify-content-center">
                                <Col md="11" lg="11" xl="11" style={{"marginTop": "-120px"}}>
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
            </section>
        );
    }
}
export default WebinarPaymentSuccess;