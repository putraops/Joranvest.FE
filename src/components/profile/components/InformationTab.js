import React, { Fragment } from 'react';
import { Card  } from 'antd';
import SettingProfile from './SettingProfile';

const { Meta } = Card;

class InformationTab extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { user } = this.props;
        console.log("Information Tab: ", user);
        return (
            <Fragment>
                <div className="row">
                    <div className="col-4">
                        <SettingProfile user={user} />
                    </div>
                    <div className="col-8">
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
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default InformationTab;