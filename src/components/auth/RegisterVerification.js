import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import axiosApi from '../../config/axiosConfig';

const RegisterVerification = (props) => {
    useEffect(() => {
        document.getElementById("main_navbar").classList.add("d-none");
        handleVerification(props.match.params.id);
    }, []);    


    const handleVerification = (id) => {
        const payload = {
            id: id
        }

        axiosApi.post(`/application_user/emailVerificationById`, payload)
        .then(res => {
        });
    }

    return (
        <Fragment>
            <section className="section home-1-bg" id="home">
                    <div className="home-8-bg-overlay"></div>
                    <div className="home-center">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="justify-content-center">
                                    <Col md="8" lg="8" xl="7" style={{"marginTop": "-120px"}}>
                                        <div className="text-center mb-4">
                                            <a href="/"><img src="assets/img/logo.png" alt="" className="img-fluid mb-3" style={{width: "250px"}}/></a>
                                        </div>
                                         <Card className="borderShadow5">
                                             <p className='text-center f-20 font-weight-bold'>Selamat Akun anda telah Terdaftar.</p>

                                             <div className="text-center mt-4">
                                                <Link to="/login"><Button type="primary" className="mb-2" size="medium" block >Login ke dalam Website</Button> </Link>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
        </Fragment>
    );
}

export default connect(null, null)(RegisterVerification);