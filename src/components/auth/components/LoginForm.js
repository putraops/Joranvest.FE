import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Divider, Alert } from 'antd';

import { connect } from 'react-redux';
import { userLogin, userLoginWithGoogle, actionFormUpdate } from '../../../config/redux/action';
import baseUrl from '../../../config/baseUrl';
import sideNotification from '../../../commons/sideNotification';

const LoginForm = (props) => {
    const [values, setValues] = useState({
		email: '',
		password: '',
	});

    const { errorMessage, isLoading } = props;
    const [form] = Form.useForm();

    const onFinishFailed = () => {
        //handleRegister();
    };

    const onFinish = () => {
        //handleLogin();
    };

    const handleChange = (event) => {
        const target = event.target;
        setValues({...values, [target.name]: target.value});
        props.actionFormUpdate();
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    const handleLogin = async () => {
        const { email, password } = values; 

        if (email == "" || password == "") {
            sideNotification.open("Gagal", "Email dan Password tidak boleh kosong!.", false);
            return;
        }
        
        // if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) { /* Do Nothing */ }
        // else { sideNotification.open("Gagal", "Silahkan masukkan Email yang benar.", false); return; }

        const res = await props.userLogin({email, password})
            .catch(err => err);

        if (res) {
            window.location.assign(baseUrl);
        } else {
            console.log(errorMessage);
        }
    }

    const handleLoginWithGoogle = async () => {
        var email = "email";
        var password = "password";

        const res = await props.userLoginWithGoogle({email, password})
            .catch(err => err);

        if (res) {
            alert();
            // window.location.assign(baseUrl);
        } else {
            console.log(errorMessage);
        }
    }

    return (
        <Fragment>
            {
                errorMessage ? <Alert className="mb-3" message={errorMessage} type="error"showIcon  /> : null
            }
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item 
                    name="email"
                    rules={[{ required: true, message: 'Email tidak boleh kosong' }]}>
                    <Input className="mb-2" size="large" placeholder="Email" name="email" onKeyDown={handleKeyDown} onChange={handleChange} />
                </Form.Item>
                <Form.Item 
                    name="password"
                    rules={[{ required: true, message: 'Password tidak boleh kosong' }]}>
                    <Input.Password className="mb-2" size="large" placeholder="Password" name="password" onKeyDown={handleKeyDown} onChange={handleChange} />
                </Form.Item>
            </Form>
            <Form.Item>
                <Button type="primary" size="medium" loading={isLoading} block htmlType="submit" onClick={handleLogin}>Login</Button> 
            </Form.Item>
            {/* <Button type="danger" size="medium" block onClick={handleLoginWithGoogle}>Login dengan Google</Button>  */}

            <div className="text-center mt-4">
                <Divider className="mt-2 mb-2" plain>Belum punya akun?</Divider>
                <Link to="/register"><Button type="primary" className="mb-2" size="medium" block >Register</Button> </Link>
                {/* <Divider className="mt-2 mb-2" plain><Link to="/forgotpassword">Lupa Password</Link></Divider> */}
                <Button type="danger" size="medium" block>Lupa Password</Button>
            </div>
        </Fragment>
    );
}

const reduxState = (state) => ({
    isLogin: state.auth.isLogin,
    isLoading: state.auth.isLoading,
    errorMessage: state.auth.errorMessage,
    username: state.auth.username,
    user: state.auth.user,
})

const reduxDispatch = (dispatch) => ({
    userLogin: (data) => dispatch(userLogin(data)),
    userLoginWithGoogle: (data) => dispatch(userLoginWithGoogle(data)),
    actionFormUpdate: () => dispatch(actionFormUpdate())
})

export default connect(reduxState, reduxDispatch)(LoginForm);