import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link, NavLink, useLocation  } from 'react-router-dom';
import axios from 'axios';
import axiosApi from '../../config/axiosConfig';

import { connect } from 'react-redux'
import { SignIn } from './actions/authentication';

import { Form, Input, Button, Card, Divider, Alert } from 'antd';
import { userLogin, actionFormUpdate } from '../../config/redux/action';

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

    componentWillReceiveProps(newProps) {
        if (newProps.authStatus) {
            this.props.history.push(`/`)
        }
        
        this.setState({
            ...this.state, loading: false,
        });  
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value,
        });   
        this.props.actionFormUpdate();
    }

    onFinish = (values) => {
    };
    
    onFinishFailed = (errorInfo) => {
    };

    handleLogin = async (e) => {
        const { email, password } = this.state; 

        if (email == "" || password == "") {
            return;
        }

        const res = await this.props.userLogin({email, password})
            .catch(err => err);

        if (res) {
            console.log(this.props);
        } else {
            console.log(this.props);
        }
    }
    render() {
        const { loading, errorMessage } = this.state
        const { authError, username, isLoading } = this.props

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
                                            <h3 className="text-dark font-weight-normal"><Link to="/">Joranvest {username}</Link></h3>
                                        </div>
                                         <Card className="borderShadow5">
                                            {
                                                authError ? <Alert className="mb-3" message={authError} type="error"showIcon  /> : null
                                            }
                                            <Form
                                                name="basic"
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                initialValues={{ remember: true }}
                                                onFinish={this.onFinish}
                                                onFinishFailed={this.onFinishFailed}
                                                autoComplete="off"
                                                >
                                                <Form.Item 
                                                    name="email"
                                                    rules={[{ required: true, message: 'Please input your Email' }]}>
                                                    <Input className="mb-2" size="large" placeholder="Email" name="email" onChange={this.handleChange} />
                                                </Form.Item>
                                                <Form.Item 
                                                    name="password"
                                                    rules={[{ required: true, message: 'Please input your password' }]}>
                                                    <Input.Password className="mb-2" size="large" placeholder="Password" name="password" onChange={this.handleChange} />
                                                </Form.Item>

                                                <Form.Item>
                                                    <Button type="primary" size="medium" loading={isLoading} block htmlType="submit" onClick={this.handleLogin}>Login</Button> 
                                                </Form.Item>

                                                <div className="text-center mt-4">
                                                    <Divider className="mt-2 mb-2" plain>Belum punya akun?</Divider>
                                                    <Link to="/register"><Button type="primary" className="mb-2" size="medium" block >Register</Button> </Link>
                                                    {/* <Link to="/forgotpassword"><Button type="danger" size="medium" block >Lupa Password</Button> </Link> */}
                                                    <Button type="danger" size="medium" block onClick={this.handleTesting}>Lupa Password</Button>
                                                </div>
                                            </Form>
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


const reduxState = (state) => ({
    isLogin: state.auth.isLogin,
    isLoading: state.auth.isLoading,
    authError: state.auth.authError,
    username: state.auth.username,
})

const reduxDispatch = (dispatch) => ({
    userLogin: (data) => dispatch(userLogin(data)),
    actionFormUpdate: () => dispatch(actionFormUpdate())
})

export default connect(reduxState, reduxDispatch)(Login);