import React from 'react';
import { Col } from 'reactstrap';
import { Menu, Dropdown, Card, Image } from 'antd';
import { connect } from 'react-redux'
import serverUrl from '../config/serverUrl';
import baseUrl from '../config/baseUrl';
import { Comment } from 'antd';
import "./_nav/navbar.css"
import axiosApi from '../config/axiosConfig'
import sideNotification from '../commons/sideNotification';
import joranCookies from '../commons/joranCookies';

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
		joranCookies.remove();
		window.location.assign(baseUrl);
	}

	handlerError = (event) => {
	}

	getUserDetail = (user_id) => {
		axiosApi.get(`/application_user/getViewById/${user_id}`)
		.then(res => {
			var r = res.data;
			if (r.status) {
				joranCookies.set(r.data);
			}
		}).catch(function (error) {
			sideNotification.open("Error", error, false);
		});
    }

	
    
	render() {
        let user = joranCookies.get();
		if (user) {
			this.getUserDetail(user.id);
		}
		
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
		const servicesMenu = (
            <Menu style={{minWidth: "200px"}}>
				<Menu.Item key="jcs">
					<a rel="noopener noreferrer" href="/chart-system">Joranvest Chart System</a>
				</Menu.Item>
            </Menu>
		);
		const educationsMenu = (
            <Menu style={{minWidth: "200px"}}>
				<Menu.Item key="fundamental">
					<a rel="noopener noreferrer" href="/edukasi/modul-pembelajaran">Modul Pembelajaran</a>
				</Menu.Item>
				<Menu.Item key="teknikal">
					<a rel="noopener noreferrer" href="/edukasi/webinar-recording">Webinar Recording</a>
				</Menu.Item>
            </Menu>
		);
        const menu = (
            <Menu style={{minWidth: "200px"}}>
				<Menu.Item key="member_status">
					<Meta className="mt-1"
							avatar={
								<Image 
									style={{width: "50px", height: "50px", borderRadius: "200px", border: "1px solid #ccc"}} 
									src={user ? serverUrl + "/" + user.filepath : null}
									shape="square"
									preview={false}
									onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/avatar-default.png?t=9999"}}
								/>}
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
				<Menu.Item key="webinar_history">
					<a  rel="noopener noreferrer" href="/my-webinar">Riwayat Webinar</a>
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
								<img src="assets/img/logo-white.png" alt="" className="img-fluid" style={{width: "150px"}}/>
							</a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
								<i className="mdi mdi-menu"></i>
							</button>

							<div className="collapse navbar-collapse" id="navbarCollapse">
							<ul className="navbar-nav ml-auto navbar-center" id="mySidenav">
								{/* <li className="nav-item"><a href="/" className="nav-link text-white font-weight-bold mr-3">Home</a></li> */}
								<li className="nav-item"><a href="/article" className="nav-link text-white font-weight-bold mr-3">Article</a></li>
								<li className="nav-item"><a href="/webinar" className="nav-link text-white font-weight-bold mr-3">Webinar</a></li>
								<li className="nav-item">
									<Dropdown overlay={servicesMenu}>
										<a className="ant-dropdown-link nav-link text-white font-weight-bold"  onClick={e => e.preventDefault()}>Layanan</a>
									</Dropdown>
								</li>
								<li className="nav-item">
									<Dropdown overlay={analysisMenu}>
										<a className="ant-dropdown-link nav-link text-white font-weight-bold"  onClick={e => e.preventDefault()}>Analisa</a>
									</Dropdown>
								</li>
								<li className="nav-item">
									<Dropdown overlay={educationsMenu}>
										<a className="ant-dropdown-link nav-link text-white font-weight-bold"  onClick={e => e.preventDefault()}>Edukasi</a>
									</Dropdown>
								</li>
								{/* <li className="nav-item">
									<Dropdown overlay={notifications}>
										<a className="ant-dropdown-link nav-link text-white font-weight-bold"  style={{marginTop: "-2px"}}  id="nav-profile" onClick={e => e.preventDefault()}>
											<BellOutlined className="f-16"/>
										</a>
									</Dropdown>
								</li> */}

								{/* <li className="nav-item"><a href="#" className="nav-link text-white font-weight-bold mr-4">Jadi Member</a></li> */}
								{(() => {
									if (user && user.id != "") {
										return (
											<li className="nav-item nav-avatar-profile">
												<Dropdown overlay={menu}>
													<a className="ant-dropdown-link nav-link text-white font-weight-bold"  id="nav-profile" onClick={e => e.preventDefault()}>
														<Comment
															className="p-0 m-0 avatar-profile"
															author={<span className="text-white">Hi, {user.first_name}</span>}
															avatar={
															<Image 
																className="p-0 m-0"
																src={user ? serverUrl + "/" + user.filepath : null}
																preview={false}
																style={{width: "30px", height: "30px", marginTop: "-45px", borderRadius: "200px", border: "1px solid #ccc"}} 
																onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/avatar-default.png?t=9999"}}
															/>
														}
														/>
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