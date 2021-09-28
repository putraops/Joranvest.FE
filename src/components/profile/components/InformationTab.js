import React, { Fragment } from 'react';
import { Card  } from 'antd';

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
                <div className="mb-2 row">
                    <label className="col-sm-2 col-form-label font-weight-bold">Nama</label>
                    <div className="col-sm-10">
                        <label className="col-form-label">{user.full_name}</label>
                    </div>
                </div>
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
                <div className="mb-2 row">
                    <label className="col-sm-2 col-form-label font-weight-bold">Alamat</label>
                    <div className="col-sm-10">
                        <label className="col-form-label">{user.address || "-"}</label>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default InformationTab;