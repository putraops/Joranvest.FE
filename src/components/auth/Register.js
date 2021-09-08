import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axiosApi from '../../config/axiosConfig';

class Register extends React.Component {
    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;

        if (name == "repassword") {
            console.log("repassword");
        } else {
            this.setState({
                [name]: target.value
            });
        }

        console.log(this.state)
    }
    
    Login = event => {
        var data = {
            email: this.state.email,
            password: this.state.password
        };

        axiosApi.post(`/auth/login`, 
            data
        ).then(r => {
            if (r.data.status) {
                this.props.history.push('/');
            }
        });
    }

    Register = event => {
        var data = {
            username: this.state.username,
            password: this.state.password
        };

        axiosApi.post(`/application_user/register`, 
            this.state
        ).then(r => {
            if (r.data.status) {
                this.Login();
            }
        });
    }


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
                                                                <input type="text" className="form-control" name="first_name" required="" onChange={this.handleChange} />
                                                            </div>
                                                        </Col>
                                                        <Col lg="6" sm="12">
                                                            <div className="form-group">
                                                                <label className="text-muted" htmlFor="">Nama Belakang</label>
                                                                <input type="text" className="form-control" name="last_name" required="" onChange={this.handleChange} />
                                                            </div>
                                                        </Col>
                                                        <Col md="12">
                                                            <div className="form-group">
                                                                <label className="text-muted" htmlFor="">Email</label>
                                                                <input type="text" className="form-control" name="email" required="" onChange={this.handleChange} />
                                                            </div>
                                                        </Col>
                                                        <Col md="12">
                                                            <div className="form-group">
                                                            <label className="text-muted" htmlFor="">Password</label>
                                                            <input type="password" className="form-control" name="password" required="" onChange={this.handleChange} />
                                                            </div>
                                                        </Col>
                                                        <Col md="12">
                                                            <div className="form-group">
                                                                <label className="text-muted" htmlFor="">Ulangi Password</label>
                                                                <input type="password" className="form-control" name="repassword" id="retype-password" required="" onChange={this.handleChange} />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <button type="button" className="btn btn-primary btn-block btn-lg waves-effect waves-themed" onClick={this.Register}>Register <i className="fab fa-google"></i></button>            
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