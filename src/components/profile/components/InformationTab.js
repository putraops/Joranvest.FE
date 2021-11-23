import React, { Fragment } from 'react';
import { Card  } from 'antd';
import { Row, Col } from 'reactstrap';
import SettingProfile from './SettingProfile';

const { Meta } = Card;

class InformationTab extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { user } = this.props;
        return (
            <Fragment>
                <Row>
                    <Col span={6} xs="5" xs={{ order: 2 }} sm="5" sm={{ order: 2 }} md="5" md={{ order: 1 }} lg="5" lg={{ order: 1 }} xl={{ order: 1 }} xl="5">
                        <SettingProfile user={user} />
                    </Col>
                    <Col span={6} xs="7" xs={{ order: 1 }} sm="7" sm={{ order: 1 }} md="7" md={{ order: 2 }} lg="7" lg={{ order: 2 }} xl={{ order: 2 }} xl="7" className="mb-3">
                        <p className="mb-2 f-18 font-weight-bold">Biodata</p>
                        <hr className="mt-1 mb-1" />
                        <div className="mb-2 row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Nama</label>
                            <div className="col-sm-10">
                                <label className="col-form-label">{user.full_name}</label>
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Alamat</label>
                            <div className="col-sm-10">
                                <label className="col-form-label">{user.address || "-"}</label>
                            </div>
                        </div>
                        
                        <p className="mt-5 mb-2 f-18 font-weight-bold">Kontak</p>
                        <hr className="mt-1 mb-1" />
                        <div className="mb-2 row">
                            <label className="col-sm-2 col-form-label font-weight-bold">Email</label>
                            <div className="col-sm-10">
                                <label className="col-form-label">{user.first_name}</label>
                            </div>
                        </div>
                        <div className="mb-2 row">
                            <label className="col-sm-2 col-form-label font-weight-bold">No Hp</label>
                            <div className="col-sm-10">
                                <label className="col-form-label">{user.phone || "-"}</label>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default InformationTab;