import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'antd';

import Logo from './Logo';
import { connect } from 'react-redux';
import { registerUser, actionFormUpdate, actionPasswordAndRepasswordNotMatch } from '../../../config/redux/action';
import sideNotification from '../../../commons/sideNotification';

const RegisterForm = (props) => {
    const { errorMessage, isLoading } = props;

    const handleKeyDown = (e) => {
        props.actionFormUpdate();
    }

    const handleRegister = async (data, resetForm) => {
        var userData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
        }
        
        const res = await props.registerUser(userData)
        .catch(err => err);
        
        if (res) {
            sideNotification.open("Register Berhasil", "Silahkan cek Email untuk melakukan Verifikasi", true);
            resetForm();
        }
    }

    const ValidationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('Nama Depan tidak boleh kosong.'),
        email: Yup.string()
            .required('Email tidak boleh kosong.')
            .email('Format Email masih salah.'),
        password: Yup.string()
            .required('Password tidak boleh kosong.')
            .min(6, 'Password minimal 6 karakter'),
        repassword: Yup.string()
            .required('ulangi Password tidak boleh kosong.').
            oneOf([Yup.ref('password'), null], 'Password dan Ulangi Password harus sama.'),
    });

    return (
        <Fragment>
            <div className="d-xs-block d-sm-block d-md-none" style={{marginBottom: "30px"}}>
                <Logo size="200px" />
            </div>

            <h1 className="display-4 f-10 mb-4" style={{fontSize: "25px"}}>Daftar Akun</h1>

            {errorMessage && (
                <Alert className="mb-3" message={errorMessage} type="error"showIcon  />
            )}

            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    repassword: ''
                }}
                validationSchema={ValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    handleRegister(values, resetForm);
                }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <Row>
                            <Col md="6">
                                <p className="mb-0 font-weight-bold text-joran">Nama Depan <span className="text-danger"> *</span></p>
                                <Field name="first_name" className="form-control mb-0 mr-3 no-radius" placeholder="Masukkan Nama Depan" onKeyDown={handleKeyDown} />
                                {errors.first_name && touched.first_name ? (
                                    <p className="text-danger mb-1 fw-500">{errors.first_name}</p>
                                ): <p className="mt-2 mb-1"></p>}
                            </Col>
                            <Col md="6">
                                <p className="mb-0 font-weight-bold text-joran">Nama Belakang</p>
                                <Field name="last_name" className="form-control mb-0 mr-3 no-radius" placeholder="Masukkan Nama Belakang" onKeyDown={handleKeyDown} />
                                {errors.last_name && touched.last_name ? (
                                    <p className="text-danger mb-1 fw-500">{errors.last_name}</p>
                                ): <p className="mt-2 mb-1"></p>}
                            </Col>
                        </Row>

                        <p className="mb-0 font-weight-bold text-joran">Email <span className="text-danger"> *</span></p>
                        <Field name="email" className="form-control mb-0 mr-3 no-radius" placeholder="Masukkan Email" onKeyDown={handleKeyDown} />
                        {errors.email && touched.email ? (
                            <p className="text-danger mb-1 fw-500">{errors.email}</p>
                        ): <p className="mt-2 mb-1"></p>}
                        
                        
                        <p className="mb-0 font-weight-bold text-joran">Password <span className="text-danger"> *</span></p>
                        <Field type="password" name="password" className="form-control mb-0 mr-3 no-radius" placeholder="Masukkan Password" onKeyDown={handleKeyDown} />
                        {errors.password && touched.password ? (
                            <p className="text-danger mb-1 fw-500">{errors.password}</p>
                        ): <p className="mt-2 mb-1"></p>}

                        <p className="mb-0 font-weight-bold text-joran">Ulangi Password <span className="text-danger"> *</span></p>
                        <Field type="password" name="repassword" className="form-control mb-0 mr-3 no-radius" placeholder="Ulangi Password" onKeyDown={handleKeyDown} />
                        {errors.repassword && touched.repassword ? (
                            <p className="text-danger mb-1 fw-500">{errors.repassword}</p>
                        ): <p className="mt-2 mb-1"></p>}
                        
                        <button type="submit" 
                            className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius"
                            disabled={isLoading}>
                            {isLoading ? 
                                <span><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...</span>
                                : <span>Register</span>
                            }
                        </button>
                    </Form>
                )}
            </Formik>
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