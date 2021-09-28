import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'antd';

class MembershipTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        console.log("Information Tab: ", user);
        
        if (user.is_membership) {
            return (
                <Fragment>
                    <div className="mb-2 row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Status</label>
                        <div className="col-sm-10">
                            <label className="col-form-label">{"Aktif"}</label>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Nama</label>
                        <div className="col-sm-10">
                            <label className="col-form-label">{"Advance"}</label>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Durasi</label>
                        <div className="col-sm-10">
                            <label className="col-form-label">{"12 Bulan"}</label>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Tanggal Terdaftar</label>
                        <div className="col-sm-10">
                            <label className="col-form-label">{"12 Desember 2021"}</label>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-sm-2 col-form-label font-weight-bold">Tanggal Expired</label>
                        <div className="col-sm-10">
                            <label className="col-form-label">{"12 Desember 2022"}</label>
                        </div>
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <p className="text-muted mb-2">Belum terdaftar sebagai Member.</p>
                    <div className="mb-0">
                        <Button type="primary">Daftar Sekarang</Button>
                    </div>
                </Fragment>
            )
        }
    }
}

export default MembershipTab;