import React from 'react'
import { Row, Col } from 'reactstrap';
import { Alert } from 'antd';
import moment from 'moment';

import dateFormat from '../../../commons/dateFormat';

export function MembershipInformation({record, user}){
    return (
        <Alert
            className="pt-3 pb-3 pr-4 pl-4"
            message={<span className="f-15" style={{fontWeight: "500"}}>Saat ini kamu telah terdaftar sebagai Member <span className="text-joran" style={{fontWeight: "700"}}>{record?.name || ""}</span></span>}
            description={
                <Row className="mt-2">
                    <Col sm="12">
                        <span>Perpanjang Member akan ditambahkan langsung dengan tanggal berakhirnya member kamu saat ini.</span>
                    </Col>
                    <Col sm="12">
                        <p className="mb-0 mt-2" style={{fontWeight: "500"}}>Contoh:</p>
                        <p className="mb-0">Membership kamu berakhir pada tanggal <span style={{fontWeight: "500"}}>{dateFormat.getLongDateFormatID(user.membership_expired.Time)}</span></p>
                        <p className="mb-0">Apabila kamu memperpanjang membership dengan durasi <span className="text-joran" style={{fontWeight: "700"}}>{record.duration} Bulan,</span> maka tanggal berakhir member kamu akan menjadi <span style={{fontWeight: "500"}}>{dateFormat.getLongDateFormatID(moment(user.membership_expired.Time).add(record.duration, 'M'))}</span></p>
                    </Col>
                </Row>
            }
            type="info"
        />
    );
}