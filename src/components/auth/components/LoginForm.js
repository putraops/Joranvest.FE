import React, { useState, Fragment } from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Input, message, Button, Divider, Alert } from 'antd';

import { connect } from 'react-redux';
import { userLogin, actionFormUpdate } from '../../../config/redux/action';

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

    const onFill = () => {
        form.setFieldsValue({
            first_name: 'https://taobao.com/',
        });
    };

    const handleChange = (event) => {
        const target = event.target;
        setValues({...values, [target.name]: target.value});
        props.actionFormUpdate();
    }

    const handleLogin = async (event) => {
        const { email, password } = values; 

        if (email == "" || password == "") {
            return;
        }

        const res = await props.userLogin({email, password})
            .catch(err => err);

        if (res) {
            props.history.push('/');
        } else {
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
                rules={[{ required: true, message: 'Please input your Email' }]}>
                <Input className="mb-2" size="large" placeholder="Email" name="email" onChange={handleChange} />
            </Form.Item>
            <Form.Item 
                name="password"
                rules={[{ required: true, message: 'Please input your password' }]}>
                <Input.Password className="mb-2" size="large" placeholder="Password" name="password" onChange={handleChange} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" size="medium" loading={isLoading} block htmlType="submit" onClick={handleLogin}>Login</Button> 
            </Form.Item>

            <div className="text-center mt-4">
                <Divider className="mt-2 mb-2" plain>Belum punya akun?</Divider>
                <Link to="/register"><Button type="primary" className="mb-2" size="medium" block >Register</Button> </Link>
                <Link to="/forgotpassword"><Button type="danger" size="medium" block >Lupa Password</Button> </Link>
                {/* <Button type="danger" size="medium" block>Lupa Password</Button> */}
            </div>
        </Form>
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
    actionFormUpdate: () => dispatch(actionFormUpdate())
})

export default connect(reduxState, reduxDispatch)(LoginForm);