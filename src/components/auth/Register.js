import React from 'react';
import './css/auth.css'
import { Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axiosApi from '../../config/axiosConfig';
import { Form, Input, Button, Card, Divider, Alert, DatePicker } from 'antd';

import firebaseApp from '../../config/firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            repassword: "",
            loading: false,
            isAuthentication: false,
            errorMessage: "",
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
    }
    
    onFinish = (values) => {
    };
    
    onFinishFailed = (errorInfo) => {
    };

    handleRegister = event => {
        const { email, password } = this.state;
        var data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };

        if (data.first_name == "" || data.last_name == "" || data.email == "" || data.password == "" || this.state.repassword == "") {
            return;
        }

        this.setState({
            ...this.state, 
            loading: true,
        }); 
        const auth = getAuth(firebaseApp);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            axiosApi.post(`/application_user/register`, 
                data
            ).then(r => {
                this.setState({
                    ...this.state, 
                    loading: false,
                }); 
            });
        })
        .catch((error) => {
            console.log("error:", error);
            var errorCode = error.code;
            var errorMessage = error.message;
            
            if (error.code == "putraops@gmail.com") {
                errorMessage = "Email sudah terdaftar.";
            }

            this.setState({
                ...this.state, 
                loading: false,
                errorMessage: errorMessage
            }); 
            // ..
        });
    }

    render() {
        const { loading } = this.state
        
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
                                                        <Form.Item required
                                                            label="Nama Depan"  
                                                            tooltip="Nama Depan tidak boleh kosong" 
                                                            rules={[{ required: true, message: 'Nama Depant tidak boleh kosong' }]}>
                                                            <Input size="large" placeholder="Nama Depan" name="first_name" onChange={this.handleChange} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs="12" md="6" lg="6">
                                                        <Form.Item label="Nama Belakang">
                                                            <Input size="large" placeholder="Nama Belakang" name="last_name" onChange={this.handleChange} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                                <Form.Item required
                                                    label="Email" 
                                                    tooltip="Email tidak boleh kosong" 
                                                    rules={[{ required: true, type: 'email' }]}
                                                    >
                                                    <Input size="large" placeholder="Email" name="email" onChange={this.handleChange} />
                                                </Form.Item> 

                                                <Form.Item required
                                                    label="Password"
                                                    tooltip="Password tidak boleh kosong" 
                                                    rules={[{ required: true, message: 'Password tidak boleh kosong' }]}>
                                                    <Input.Password size="large" placeholder="Password" name="password" onChange={this.handleChange} />
                                                </Form.Item>
                                                <Form.Item required
                                                    label="Ulangi Password"
                                                    tooltip="Ulangi Password tidak boleh kosong" 
                                                    rules={[{ required: true, message: 'Password tidak boleh kosong' }]}>
                                                    <Input.Password size="large" placeholder="Ulangi Password" name="repassword" id="retype-password" onChange={this.handleChange} />
                                                </Form.Item>

                                                <Form.Item className="mt-3">
                                                    <Button type="primary" size="medium" loading={loading} block htmlType="submit" onClick={this.handleRegister}>Register</Button> 
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
export default Register;