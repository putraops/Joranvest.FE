import React, { Fragment } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Alert, Divider } from 'antd';

import { connect } from 'react-redux';
import { userLogin, userLoginWithGoogle, actionFormUpdate } from '../../../config/redux/action';
import baseUrl from '../../../config/baseUrl';
import Logo from './Logo';

import '../css/auth.css';

import { 
    GoogleOutlined 
} from '@ant-design/icons';

const LoginForm = (props) => {
    const { errorMessage, isLoading } = props;

    const handleKeyDown = (e) => {
        props.actionFormUpdate();
    }

    const handleLogin = async (email, password) => {
        const res = await props.userLogin({email, password})
            .catch(err => err);

        if (res) {
            window.location.assign(baseUrl);
        } else {
            console.log(errorMessage);
        }
    }

    // const handleLoginWithGoogle = () => {
    //     props.userLoginWithGoogle({});
    // }

    const ValidationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email tidak boleh kosong.')
            .email('Format Email masih salah.'),
        password: Yup.string()
            .required('Password tidak boleh kosong.'),
    });

    return (
        <Fragment>
            <div className="d-xs-block d-sm-block d-md-none" style={{marginBottom: "30px"}}>
                <Logo size="200px" />
            </div>

            <h1 className="display-4 f-10 mb-4" style={{fontSize: "25px"}}>Masuk ke Akun kamu</h1>
            
            {errorMessage && (
                <Alert className="mb-3" message={errorMessage} type="error"showIcon  />
            )}

            <Formik
                initialValues={{
                    email: '',
		            password: '',
                }}
                validationSchema={ValidationSchema}
                onSubmit={values => {
                    handleLogin(values.email, values.password);
                }}
                >
                {({ errors, touched }) => (
                    <Form>
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
                        
                        <button type="submit" 
                            className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius"
                            disabled={isLoading}>
                            {isLoading ? 
                                <span><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...</span>
                                : <span>Login</span>
                            }
                        </button>
                    </Form>
                )}
            </Formik>
            {/* <button type="button" 
                className="btn btn-joran-default btn-block btn-joran mt-2 p-2 pr-4 pl-4 no-radius"
                onClick={handleLoginWithGoogle}
                disabled={isLoading}>
                {isLoading ? 
                    <span><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...</span>
                    : 
                    <>
                        <img id="google-icon" className="mr-2" src="/assets/img/google-icon.png" /> <span>Login dengan GOOGLE</span>
                    </>
                }
            </button> */}
            <Divider className="mt-2 mb-2" plain><a href="/reset-password" className="text-joran fw-500">Lupa password?</a></Divider>
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