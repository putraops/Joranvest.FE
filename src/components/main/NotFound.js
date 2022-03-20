import React from 'react';
import { Row, Col } from 'reactstrap';
import "./style.css";

// import Logo from './components/Logo'

class NotFound extends React.Component {
    render() {
        return (
            <React.Fragment>
                <section className="section pb-0 pt-0"  style={{height: "400px"}}>
                    <div className="container-fuild" style={{width: "100%"}}>
                        <Row className="p-0 m-0">
                            <Col sm="12" md="5" lg="5" xl="4" className="d-none d-md-block" style={{height: "400px", borderRight: "1px solid #ddd"}}>
                                <div className="card h-100 border-0 justify-content-center" style={{backgroundColor: "transparent"}}>           
                                    <div>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <a href="/"><img src="assets/img/logo.png" alt="" 
                                                    style={{
                                                        width: "220px",
                                                    }} />
                                                </a>
                                                <div className="d-md-none d-lg-none" id="right-logo">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12" md="7" lg="7" xl="6" style={{height: "400px"}}>
                                <div className="card h-100 border-0 justify-content-center">           
                                    <div>
                                        <div className="card-body">
                                            <div className="d-md-none d-lg-none" id="right-logo">
                                                <a href="/"><img src="assets/img/logo.png" alt="" 
                                                    style={{
                                                        width: "270px",
                                                    }} />
                                                </a>
                                            </div>
                                            <p id="not-found-title" className="mb-2">Maaf, halaman yang kamu inginkan tidak ditemukan.</p>
                                            <a href="/" className="btn btn-joran pt-2 pb-2">Kembali</a>
                                        </div>
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

export default NotFound;