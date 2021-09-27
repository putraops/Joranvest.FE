import React, { useState, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form, Input, message, Button, Divider, Alert } from 'antd';

import { connect } from 'react-redux';
import { registerUser, actionFormUpdate, actionPasswordAndRepasswordNotMatch } from '../../../config/redux/action';

// import { registerUser, actionFormUpdate, actionPasswordAndRepasswordNotMatch } from '../../../config/redux/action';

const RegisterForm = (props) => {
    const [values, setValues] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
        repassword: '',
	});

    const { errorMessage, actionFormUpdate } = props;
    const [form] = Form.useForm();

    const onFinishFailed = () => {
        handleRegister();
    };

    const onFill = () => {
        props.actionPasswordAndRepasswordNotMatch();
        console.log(props);
        form.setFieldsValue({
            first_name: 'https://taobao.com/',
        });
    };

    const handleChange = (event) => {
        const target = event.target;
        setValues({...values, [target.name]: target.value});
        props.actionFormUpdate();
    }

    const handleRegister = async (event) => {
        var userData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
        }

        if (values.password != values.repassword) {
            props.actionPasswordAndRepasswordNotMatch();
        } else if (values.first_name != "" || values.last_name != "" && values.email != "" && values.password != "") {
            const res = await props.registerUser(userData)
                .catch(err => err);

                console.log("props: ", props);
            if (res) {
                props.actionFormUpdate();
                form.resetFields();
            } else {
            }
        }
    }

    const onFinish = () => {
        handleRegister();
    };

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
            form = {form}
        >
            <Row>
                <Col xs="12" md="6" lg="6">
                    <Form.Item
                        name="first_name"
                        label="Nama Depan"  
                        tooltip="Nama Depan tidak boleh kosong"
                        rules={[{ required: true, message: 'Nama Depan tidak boleh kosong' }]}>
                        <Input size="large" placeholder="Nama Depan" name="first_name" onChange={handleChange} />
                    </Form.Item>
                </Col>
                <Col xs="12" md="6" lg="6">
                    <Form.Item 
                        name="last_name"
                        label="Nama Belakang">
                        <Input size="large" placeholder="Nama Belakang" name="last_name" onChange={handleChange} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="email"
                label="Email" 
                tooltip="Email tidak boleh kosong" 
                rules={[{ required: true,  message: 'Format Email masih salah', type: 'email' }]}
                >
                <Input size="large" placeholder="Email" name="email" onChange={handleChange} />
            </Form.Item> 

            <Form.Item
                name="password"
                label="Password"
                tooltip="Password tidak boleh kosong" 
                rules={[{ required: true, message: 'Password tidak boleh kosong' }]}>
                <Input.Password size="large" placeholder="Password" name="password" onChange={handleChange} />
            </Form.Item>

            <Form.Item
                name="repassword"
                label="Ulangi Password"
                tooltip="Ulangi Password tidak boleh kosong" 
                rules={[{ required: true, message: 'Password tidak boleh kosong' }]}>
                <Input.Password size="large" placeholder="Ulangi Password" name="repassword" id="retype-password" onChange={handleChange} />
            </Form.Item>

            <Form.Item className="mt-3">
                <Button type="primary" size="medium" loading={false} block htmlType="submit" >Register</Button> 
            </Form.Item>   

            <div className="text-center mt-4">
                <Divider className="mt-2 mb-2" plain>Sudah punya akun? <Link to="/login">Login</Link></Divider>
            </div>
        </Form>
    </Fragment>
    );
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

export default connect(reduxState, reduxDispatch)(RegisterForm);