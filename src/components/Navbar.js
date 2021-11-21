import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { Menu, Dropdown, Card, Avatar, Image } from 'antd';
import { connect } from 'react-redux'
import serverUrl from '../config/serverUrl';
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
		const cookies = new Cookies();
		cookies.remove('joranvestCookie')
		cookies.remove('joranvestCookie', {
			domain: "joranvest.com"
		})
		window.location.assign(baseUrl);
	}
    
	render() {
		const cookies = new Cookies();
        let user = cookies.get('joranvestCookie') || null;
		console.log("userLogin: ", user);
		console.log("userRedux: ", this.props.user);
		const analysisMenu = (
            <Menu style={{minWidth: "200px"}}>
				<Menu.Item key="fundamental">
					<a  rel="noopener noreferrer" href="/fundamental">Fundamental</a>
				</Menu.Item>
				<Menu.Item key="teknikal">
					<a  rel="noopener noreferrer" href="/technical">Teknikal</a>
				</Menu.Item>
            </Menu>
		);
        const menu = (
            <Menu style={{minWidth: "200px"}}>
				<Menu.Item key="member_status">
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
				<Menu.Item key="profile">
					<a  rel="noopener noreferrer" href="/profile">Profile Saya</a>
				</Menu.Item>
				<Menu.Item key="transaction_history">
					<a  rel="noopener noreferrer" href="/transaction">Riwayat Transaksi</a>
				</Menu.Item>
				<Menu.Item key="logout" onClick={() => this.handleLogout()}>
					Logout
				</Menu.Item>
            </Menu>
		);
        return (
            <React.Fragment>
                <nav id="main_navbar" className="navbar navbar-expand-lg  fixed-top navbar-custom sticky sticky-dark">
                    <div className="container">
							<a href="/" className="navbar-brand logo" >
								<img src="assets/img/logo.png" alt="" className="img-fluid" style={{width: "150px"}}/>
							</a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
								<i className="mdi mdi-menu"></i>
							</button>

							<div className="collapse navbar-collapse" id="navbarCollapse">
							<ul className="navbar-nav ml-auto navbar-center" id="mySidenav">
								<li className="nav-item"><a href="/" className="nav-link text-white font-weight-bold mr-3">Home</a></li>
								<li className="nav-item"><a href="/article" className="nav-link text-white font-weight-bold mr-3">Article</a></li>
								<li className="nav-item"><a href="/webinar" className="nav-link text-white font-weight-bold mr-3">Webinar</a></li>
								{(() => {
									if (user && user.id != "") {
										return (
											<li className="nav-item">
												<Dropdown overlay={analysisMenu}>
													<a className="ant-dropdown-link nav-link text-white font-weight-bold"  onClick={e => e.preventDefault()}>Analisa</a>
												</Dropdown>
											</li>
										)
									}
								})()}
								<li className="nav-item"><a href="#" className="nav-link text-white font-weight-bold mr-4">Jadi Member</a></li>
								{(() => {
									if (user && user.id != "") {
										return (
											<li className="nav-item">
												<Dropdown overlay={menu}>
													<a className="ant-dropdown-link nav-link text-white font-weight-bold"  id="nav-profile" onClick={e => e.preventDefault()}>
														<Avatar
														// style={{width: "20px", height: "20px"}}
														// preview={false}
														// shape={circle}
														src={serverUrl + "/" + user.filepath} /> 
														<span className="ml-2">Hi, {user.first_name}</span>          
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