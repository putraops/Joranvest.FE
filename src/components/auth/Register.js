import React from 'react';
import './css/auth.css'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Divider, Alert } from 'antd';

import { registerUser, actionFormUpdate, actionPasswordAndRepasswordNotMatch } from '../../config/redux/action';
import { connect } from 'react-redux';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            repassword: "",
        };
    }
    
    
    componentDidMount() {
        document.getElementById("main_navbar").classList.add("d-none");
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
        this.props.actionFormUpdate();
    }
    
    onFinish = (values) => {
    };
    
    onFinishFailed = (errorInfo) => {
    };

    handleRegister = async (event) => {
        const { first_name, last_name, email, password, repassword } = this.state;

        if (password != repassword) {
            this.props.actionPasswordAndRepasswordNotMatch();
            return;
        } else {
            var data = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
            };
    
            const res = await this.props.registerUser(data)
                .catch(err => err);

            if (res) {
                this.props.actionFormUpdate();
                this.setState({
                        ...this.state,
                        first_name: "",
                        last_name: "",
                        email: "",
                        password: "",
                        repassword: ""
                    })
            } else {
                console.log(this.props);
            }
        }
        
    }

    render() {
        const { first_name, last_name, email, password, repassword } = this.state;
        const { isLoading, errorMessage } = this.props;
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
                                            {
                                                errorMessage ? <Alert className="mb-3" message={errorMessage} type="error"showIcon  /> : null
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
                                                <Row>
                                                    <Col xs="12" md="6" lg="6">
                                                        <Form.Item
                                                            name="first_name"
                                                            label="Nama Depan"  
                                                            tooltip="Nama Depan tidak boleh kosong" 
                                                            rules={[{ required: true, message: 'Nama Depan tidak boleh kosong' }]}>
                                                            <Input size="large" placeholder="Nama Depan" name="first_name" value={first_name} onChange={this.handleChange} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs="12" md="6" lg="6">
                                                        <Form.Item 
                                                            name="last_name"
                                                            label="Nama Belakang">
                                                            <Input size="large" placeholder="Nama Belakang" name="last_name" value={last_name} onChange={this.handleChange} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                                <Form.Item
                                                    name="email"
                                                    label="Email" 
                                                    tooltip="Email tidak boleh kosong" 
                                                    rules={[{ required: true,  message: 'Format Email masih salah', type: 'email' }]}
                                                    >
                                                    <Input size="large" placeholder="Email" name="email" value={email} onChange={this.handleChange} />
                                                </Form.Item> 

                                                <Form.Item
                                                    name="password"
                                                    label="Password"
                                                    tooltip="Password tidak boleh kosong" 
                                                    rules={[{ required: true, message: 'Password tidak boleh kosong' }]}>
                                                    <Input.Password size="large" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
                                                </Form.Item>

                                                <Form.Item
                                                    name="repassword"
                                                    label="Ulangi Password"
                                                    tooltip="Ulangi Password tidak boleh kosong" 
                                                    rules={[{ required: true, message: 'Password tidak boleh kosong' }]}>
                                                    <Input.Password size="large" placeholder="Ulangi Password" name="repassword" value={repassword} id="retype-password" onChange={this.handleChange} />
                                                </Form.Item>

                                                <Form.Item className="mt-3">
                                                    <Button type="primary" size="medium" loading={isLoading} block htmlType="submit" onClick={this.handleRegister}>Register</Button> 
                                                </Form.Item>

                                                <div className="text-center mt-4">
                                                    <Divider className="mt-2 mb-2" plain>Sudah punya akun? <Link to="/login">Login</Link></Divider>
                                                    
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
    errorMessage: state.auth.errorMessage
})

const reduxDispatch = (dispatch) => ({
    registerUser: (data) => dispatch(registerUser(data)),
    actionPasswordAndRepasswordNotMatch: () => dispatch(actionPasswordAndRepasswordNotMatch()),
    actionFormUpdate: () => dispatch(actionFormUpdate())
})

export default connect(reduxState, reduxDispatch)(Register);