import React, { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axiosApi from '../../../config/axiosConfig';
import Logo from './Logo';
import sideNotification from '../../../commons/sideNotification';

const RecoverPasswordForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("props", props);
        console.log("props", props.param.match.params.user_id);
        console.log("props", props.param.match.params.email);
    }, []);

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password tidak boleh kosong.')
            .min(6, 'Password minimal 6 karakter'),
        repassword: Yup.string()
            .required('Ulangi Password tidak boleh kosong.').
            oneOf([Yup.ref('password'), null], 'Password dan Ulangi Password harus sama.'),
    });


    return (
        <Fragment>
            <div className="d-xs-block d-sm-block d-md-none" style={{marginBottom: "80px"}}>
                <Logo size="200px" />
            </div>

            <h1 className="display-4 f-10 mb-4" style={{fontSize: "25px"}}>Ganti Password</h1>
            <Formik
                initialValues={{
		            password: '',
		            repassword: '',
                }}
                validationSchema={ValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    setIsLoading(true);
                    axiosApi.post(`/application_user/recoverPassword`,{
                        user_id: props.param.match.params.user_id,
                        email: props.param.match.params.email,
                        new_password: values.password
                    })
                    .then(res => {
                        var r = res.data
                        resetForm();
                        setIsLoading(false);
                        sideNotification.open(`Reset Password ${r.status ? "Berhasil" : "Gagal"}`, r.status ? "Password berhasil diubah, Silahkan Login kembali." : r.message, r.status);
                    });
                }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <p className="mb-0 font-weight-bold text-joran">Password <span className="text-danger"> *</span></p>
                        <Field type="password" name="password" className="form-control mb-0 mr-3 no-radius" placeholder="Masukkan Password" />
                        {errors.password && touched.password ? (
                            <p className="text-danger mb-1 fw-500">{errors.password}</p>
                        ): <p className="mt-2 mb-1"></p>}

                        <p className="mb-0 font-weight-bold text-joran">Ulangi Password <span className="text-danger"> *</span></p>
                        <Field type="password" name="repassword" className="form-control mb-0 mr-3 no-radius" placeholder="Ulangi Password" />
                        {errors.repassword && touched.repassword ? (
                            <p className="text-danger mb-1 fw-500">{errors.repassword}</p>
                        ): <p className="mt-2 mb-1"></p>}
                        
                        <button type="submit" 
                            className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius"
                            disabled={isLoading}>
                            {isLoading ? 
                                <span><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...</span>
                                : <span>Ganti Password</span>
                            }
                        </button>
                    </Form>
                )}
            </Formik>
        </Fragment>
    );
}

export default (RecoverPasswordForm);