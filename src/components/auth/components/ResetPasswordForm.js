import React, { Fragment, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'antd';
import axiosApi from '../../../config/axiosConfig';
import Logo from './Logo';
import sideNotification from '../../../commons/sideNotification';

const ResetPasswordForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const ValidationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email tidak boleh kosong.')
            .email('Format Email masih salah.'),
    });

    return (
        <Fragment>
            <div className="d-xs-block d-sm-block d-md-none" style={{marginBottom: "40px"}}>
                <Logo size="200px" />
            </div>

            <h1 className="display-4 f-10 mb-4" style={{fontSize: "25px"}}>Reset Password</h1>
            <Formik
                initialValues={{
                    email: '',
		            password: '',
                }}
                validationSchema={ValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    setIsLoading(true);
                    axiosApi.post(`/application_user/resetPassword?email=` + values.email)
                    .then(res => {
                        var r = res.data
                        resetForm();
                        setIsLoading(false);
                        sideNotification.open("Reset Password", r.Status ? "Reset Password telah dikirim ke Email kamu." : r.Message, r.Status);
                    });
                }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <p className="mb-0 font-weight-bold text-joran">Email <span className="text-danger"> *</span></p>
                        <Field name="email" className="form-control mb-0 mr-3 no-radius" placeholder="Masukkan Email" />
                        {errors.email && touched.email ? (
                            <p className="text-danger mb-1 fw-500">{errors.email}</p>
                        ): <p className="mt-2 mb-1"></p>}
                        
                        <button type="submit" 
                            className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius"
                            disabled={isLoading}>
                            {isLoading ? 
                                <span><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...</span>
                                : <span>Reset Password</span>
                            }
                        </button>
                    </Form>
                )}
            </Formik>
        </Fragment>
    );
}

export default (ResetPasswordForm);