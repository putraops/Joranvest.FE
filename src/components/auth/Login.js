import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import { Card } from 'antd';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            loading: false,
            isAuthentication: false,
            errorMessage: this.props.authError,
        };
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
                                    <Col md="8" lg="6" xl="5" style={{"marginTop": "-120px"}}>
                                        <div className="text-center mb-4">
                                            <h3 className="text-dark font-weight-normal"><Link to="/">Joranvest</Link></h3>
                                        </div>
                                         <Card className="borderShadow5">
                                            <LoginForm history={this.props.history} />                                            
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

export default connect(null, null)(Login);