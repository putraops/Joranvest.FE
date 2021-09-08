import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import axiosApi from '../../config/axiosConfig';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }
    handleChange = event => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
          });
    }

    Login = event => {
        var data = {
            username: this.state.username,
            password: this.state.password
        };

        axiosApi.post(`/api/auth/login`, 
            data
        ).then(r => {
          console.log(r);
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
                                    <Col md="8" lg="6" xl="5" style={{"marginTop": "-120px"}}>
                                        <div className="text-center mb-4">
                                            <h3 className="text-dark font-weight-normal"><Link to="/">Joranvest</Link></h3>
                                        </div>
                                        <form id="" method="POST" >
                                            <div className="card p-2 rounded-plus bg-faded">
                                                <div className="card-body">
                                                    {/* <h4 className="text-dark text-center font-weight-normal mb-4">Login</h4> */}
                                                    <div className="form-group mb-4">
                                                        <input type="text" className="form-control" name="username" placeholder="Email or Username" onChange={this.handleChange} />
                                                    </div>
                                                    <div className="form-group mb-4">
                                                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange} />
                                                    </div>
                                                    <button type="button" className="btn btn-primary btn-block btn-lg waves-effect waves-themed"
                                                            onClick={this.Login}>
                                                        Login <i className="fab fa-google"></i>
                                                        </button>            
                                                </div>
                                                <div className="card-footer bg-white text-muted text-center">
                                                    <div>
                                                        <span>Belum punya akun?</span> <Link to="/register">Daftar</Link>
                                                    </div>
                                                    <div>
                                                        <Link to="/forgotpassword">Lupa Password?</Link>
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
export default Login;