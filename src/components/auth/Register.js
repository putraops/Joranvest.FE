import React from 'react';
import './css/auth.css'
import { Row, Col } from 'reactstrap';
import { Divider } from 'antd';

import { connect } from 'react-redux';
import Logo from './components/Logo';
import RegisterForm from './components/RegisterForm'

class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        document.getElementById("main_navbar").classList.add("d-none");
    }

    render() {
        return (
            <React.Fragment>
                <div className="position-absolute mt-4 mr-4 text-right d-none d-md-block" style={{zIndex: "9999", right: "0"}}>
                    <a href="/login"><button className="btn btn-outline-joran p-2 pr-4 pl-4" style={{border: "2.2px solid"}}>Login</button></a>
                </div>
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
                                        <div className="card-body">
                                            <RegisterForm />
                                            <Divider className="mt-2 mb-2 d-sm-block d-md-none" plain>Sudah punya akun? Login <a href="/login" className="text-joran fw-500">disini</a></Divider>
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

export default connect(null, null)(Register);