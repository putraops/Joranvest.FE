import React from 'react';
import './css/auth.css'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Divider, Alert } from 'antd';

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
                                            <h3 className="text-dark font-weight-normal"><Link to="/">Joranvest</Link></h3>
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