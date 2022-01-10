import React from 'react';
import 'antd/dist/antd.css';

import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';

import Information from './Information';
import Footer from '../Footer';
import { HomeOutlined } from '@ant-design/icons';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <section className="section pb-0" id="home">
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="container mb-3">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{this.props.match.params.profile_name}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>  

                    <div className="container mt-4">
                        <Information recordId={this.props.match.params.id} />
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}
export default withRouter(Profile);