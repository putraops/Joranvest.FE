import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    render() {
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
                                        <form id="js-login" noValidate="" action="">
                                            <div className="card p-2 rounded-plus bg-faded">
                                                <div className="card-body">
                                                    <Row>
                                                        <Col lg="6" sm="12">
                                                            <div className="form-group">
                                                                <label className="text-muted" htmlFor="">Nama Depan</label>
                                                                <input type="text" className="form-control" name="first_name" required />
                                                            </div>
                                                        </Col>
                                                        <Col lg="6" sm="12">
                                                            <div className="form-group">
                                                                <label className="text-muted" htmlFor="">Nama Belakang</label>
                                                                <input type="text" className="form-control" name="last_name" required />
                                                            </div>
                                                        </Col>
                                                        <Col md="12">
                                                            <div className="form-group">
                                                                <label className="text-muted" htmlFor="">Email</label>
                                                                <input type="text" className="form-control" name="email" />
                                                            </div>
                                                        </Col>
                                                        <Col md="12">
                                                            <div className="form-group">
                                                            <label className="text-muted" htmlFor="">Password</label>
                                                            <input type="password" className="form-control" name="password" />
                                                            </div>
                                                        </Col>
                                                        <Col md="12">
                                                            <div className="form-group">
                                                                <label className="text-muted" htmlFor="">Ulangi Password</label>
                                                                <input type="password" className="form-control" id="retype-password" />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <button type="button" className="btn btn-primary btn-block btn-lg waves-effect waves-themed">Register <i className="fab fa-google"></i></button>            
                                                </div>
                                                <div className="card-footer bg-white text-muted text-center">
                                                    <div>
                                                        <span>Sudah punya akun?</span> <Link to="/login">Login</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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