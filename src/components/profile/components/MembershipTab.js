import React, { Fragment } from 'react';
import moment from 'moment';
import NumberFormat from "react-number-format";
import { Button } from 'antd';

class MembershipTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        console.log("Information Tab: ", user);
        
        var startDate, expiredDate = "";
        startDate = moment(user.membership_date.Time,  "YYYY/MM/DD").format('DD MMMM YYYY');
        expiredDate = moment(user.membership_expired.Time,  "YYYY/MM/DD").format('DD MMMM YYYY');

        function float2int (value) {
            return value | 0;
        }

        if (user.is_membership) {
            return (
                <Fragment>
                    <div className="mb-2 row">
                        <label className="col-lg-2 col-md-3 col-sm-3 col-form-label font-weight-bold">Status</label>
                        <div className="col-lg-10 col-md-9 col-sm-9">
                            <label className="col-form-label">
                                <span className="badge bg-success text-white p-1 pr-4 pl-4">Aktif</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-lg-2 col-md-3 col-sm-3 col-form-label font-weight-bold">Nama</label>
                        <div className="col-lg-10 col-md-9 col-sm-9">
                            <label className="col-form-label">{user.membership_name}</label>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-lg-2 col-md-3 col-sm-3 col-form-label font-weight-bold">Durasi</label>
                        <div className="col-lg-10 col-md-9 col-sm-9">
                            <label className="col-form-label">
                            <NumberFormat 
                                value={float2int(user.membership_duration)}
                                displayType="text"
                                thousandSeparator={false}
                                prefix=""
                            /> Bulan</label>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-lg-2 col-md-3 col-sm-3 col-form-label font-weight-bold">Tanggal Terdaftar</label>
                        <div className="col-lg-10 col-md-9 col-sm-9">
                            <label className="col-form-label">{startDate}</label>
                        </div>
                    </div>
                    <div className="mb-2 row">
                        <label className="col-lg-2 col-md-3 col-sm-3 col-form-label font-weight-bold">Tanggal Expired</label>
                        <div className="col-lg-10 col-md-9 col-sm-9">
                            <label className="col-form-label">{expiredDate}</label>
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