import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Button, Avatar } from 'antd';
import { DownOutlined, UserOutlined  } from '@ant-design/icons';
import ScrollspyNav from './scrollSpy';
import { matchPath } from "react-router-dom";
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

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

    
    render() {
      // const { authError } = this.props
      //console.log("this.props, ", this.props)
        const menu = (
            <Menu style={{minWidth: "200px"}}>
              <Menu.Item key="0">
                <a  rel="noopener noreferrer" href="/profile">
                  Profile
                </a>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3">
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
                              {/* <li className="nav-item active"><a href="/" className="nav-link">Home</a></li> */}
                              <li className="nav-item"><a href="/blog" className="nav-link text-white font-weight-bold">Blog</a></li>
                              <li className="nav-item"><a href="/member" className="nav-link text-white font-weight-bold">Jadi Member</a></li>
                              <li className="nav-item"><Link to="/login" className="nav-link text-white font-weight-bold">Login</Link></li>
                              <li className="nav-item">
                                <Dropdown overlay={menu}>
                                  <a className="ant-dropdown-link nav-link text-white"  id="nav-profile" onClick={e => e.preventDefault()}>
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> Hi, Putra          
                                  </a>
                                </Dropdown>
                              </li>
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
      // checked: session.checked,
      // authenticated: session.authenticated
  }
}

// const { bool } = PropTypes;
// Navbar.propTypes = {
//   authenticated: bool.isRequired,
//   checked: bool.isRequired
// };

// const mapState = ({ session }) => ({
//   checked: session.checked,
//   authenticated: session.authenticated
// });

export default connect(mapStateToProps)(Navbar);