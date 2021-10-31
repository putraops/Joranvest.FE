import React from 'react';
import './css/auth.css'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import { connect } from 'react-redux';
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
                <section className="section home-1-bg" id="home">
                    <div className="home-8-bg-overlay"></div>
                    <div className="home-center">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="justify-content-center">
                                    <Col lg="6">
                                        <div className="text-center mb-4">
                                            <a href="/"><img src="assets/img/logo.png" alt="" className="img-fluid mb-3" style={{width: "250px"}} /></a>
                                        </div>
                                        <Card className="borderShadow5">
                                            <RegisterForm />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default connect(null, null)(Register);