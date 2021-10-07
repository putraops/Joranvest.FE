import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { Menu, Dropdown, Card, Avatar } from 'antd';
import { connect } from 'react-redux'
import Cookies from 'universal-cookie';
import baseUrl from '../config/baseUrl';
const { Meta } = Card;

class Navbar extends React.Component {
	constructor( props ) {
		super(props);
		this.state = { Tab: '' };
	}
	/**
	 * Sets active tab
	 */
	setActiveTab = (tab, e) => {
		this.setState({ Tab: tab });
	}

	
	handleLogout = () => {
		localStorage.removeItem("joranvestUser");
		window.location.assign(baseUrl);
	}

	getCookie = () => {
		const cookies = new Cookies();
		console.log(cookies.get('joranvest')); 
	}
    
	render() {
        let user = JSON.parse(localStorage.getItem("joranvestUser"));
		const cookies = new Cookies();  

        console.log("Navbar User: ", JSON.parse(localStorage.getItem("joranvestUser")));
        const menu = (
            <Menu style={{minWidth: "200px"}}>
				<Menu.Item key="0">
					<Meta className="mt-1"
							avatar={<Avatar src="https://ecs7.tokopedia.net/img/cache/300/user-1/2020/7/7/7810711/7810711_99bc1cb2-3584-41d5-a508-3f1c222439d2.jpg" shape="square" style={{width: "50px", height: "50px"}} />}
							title={
								<div className="row mt-0">
									<Col md="6">
										<span className="f-16">{user ? user.first_name + " " + user.last_name : "" }</span>
									</Col>
								</div>
							}
							description={
								<div style={{marginTop: "-7px"}}>
									{(() => {
										if (user && user.is_membership) {
											return (
												<span className="badge bg-warning text-dark mr-2 p-1 pr-4 pl-4" style={{ fontWeight: "700" }}>Member</span>

											)
										}
									})()}
								</div>
							}
						/>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="1">
					<a  rel="noopener noreferrer" href="/profile">Profile</a>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="3" onClick={() => this.handleLogout()}>
					Logout
				</Menu.Item>
            </Menu>
          );
        return (
            <React.Fragment>
                <nav id="main_navbar" className="navbar navbar-expand-lg  fixed-top navbar-custom sticky sticky-dark">
                    <div className="container">
                        <Link className="navbar-brand logo" to="/">
                            {/* <img src="images/logo.png" alt="" height="20" /> */}
                            <span className="text-white">Joranvest</span>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="mdi mdi-menu"></i>
                        </button>


                        <div className="collapse navbar-collapse" id="navbarCollapse">
                          <ul className="navbar-nav ml-auto navbar-center" id="mySidenav">
                              <li className="nav-item"><a href="/" className="nav-link text-white font-weight-bold mr-3">Home</a></li>
                              <li className="nav-item"><a href="/article" className="nav-link text-white font-weight-bold mr-3">Article</a></li>
                              <li className="nav-item"><a href="/webinar" className="nav-link text-white font-weight-bold mr-3">Webinar</a></li>
                              {/* <li className="nav-item"><a href="/blog" className="nav-link text-white font-weight-bold">Blog</a></li> */}
                              <li className="nav-item"><a href="/member" className="nav-link text-white font-weight-bold mr-4">Jadi Member</a></li>
                              {(() => {
                                  if (user && user.id != "") {
                                      return (
                                        <li className="nav-item">
                                          <Dropdown overlay={menu}>
                                            <a className="ant-dropdown-link nav-link text-white"  id="nav-profile" onClick={e => e.preventDefault()}>
                                              <Avatar src="https://ecs7.tokopedia.net/img/cache/300/user-1/2020/7/7/7810711/7810711_99bc1cb2-3584-41d5-a508-3f1c222439d2.jpg" /> <span className="ml-2">Hi, {user.first_name}</span>          
                                            </a>
                                          </Dropdown>
                                        </li>
                                      )
                                  } else {
                                      return (
                                        <li className="nav-item"><a href="/login"className="nav-link text-white font-weight-bold">Login</a></li>
                                      )
                                  }
                              })()}
                          </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
      }
}

const mapStateToProps = (state) => {
    return {
        services: state.joranservice.joranServices,
        authStatus: state.auth.authStatus,
        authError: state.auth.authError,
        user: state.auth.user,
    }
}
export default connect(mapStateToProps)(Navbar);