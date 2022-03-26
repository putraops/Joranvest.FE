import React, { Fragment, useEffect } from 'react'
import NumberFormat from "react-number-format";
import { Skeleton } from 'antd';

import '../style/style.css'

export function WebinarSummary ({webinarRecord}) {
    useEffect(() => {
    }, []);
    
    return (
        <Fragment>
            <Skeleton loading={webinarRecord ? false : true} active paragraph={{ rows: 4 }}>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>
                                <p className="mb-0 f-16 font-weight-bold">Webinar</p>
                            </td>
                            <td className="text-right align-top">
                                <NumberFormat className="f-16"
                                    value={webinarRecord?.price || 0}
                                    displayType="text"
                                    thousandSeparator={true}
                                    prefix="Rp "
                                    /> 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><p className="mb-1">{webinarRecord?.title || ""}</p></td>
                        </tr>
                        {(() => {
                            if (webinarRecord && webinarRecord.discount > 0) {
                                return (
                                    <tr className="f-14">
                                        <th>
                                            <p className="font-weight-bold mb-0">Potongan Harga</p>
                                        </th>
                                        <th className="text-right">
                                            <NumberFormat
                                                value={webinarRecord?.discount || 0}
                                                displayType="text"
                                                thousandSeparator={true}
                                                prefix="Rp "
                                            />
                                        </th>
                                    </tr>
                                )
                            }
                        })()}
                        <tr>
                            <td colSpan="2" style={{borderTop: "1px solid #f0f0f0"}}>
                            </td>
                        </tr>
                        <tr style={{fontSize: "23px"}}>
                            <th>
                                <p className="font-weight-bold mb-0">TOTAL</p>
                            </th>
                            <th className="text-right">
                                <p className="font-weight-bold mb-0"><NumberFormat
                                                    value={webinarRecord ? webinarRecord.price - webinarRecord.discount : 0}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    prefix="Rp "
                                                    /></p>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </Skeleton>
        </Fragment>
    );
}

export function MembershipSummary ({membershipRecord}) {
    useEffect(() => {
    }, []);
    
    return (
        <Fragment>
            <Skeleton loading={membershipRecord ? false : true} active paragraph={{ rows: 4 }}>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>
                                <p className="mb-0 f-20 membership-name">{membershipRecord ? membershipRecord.name : ""}</p>
                                <p className="mb-0">Durasi {membershipRecord ? membershipRecord.duration : "0"} Bulan</p>
                                <p className="mb-3">
                                    <NumberFormat
                                        value={membershipRecord ? membershipRecord.total_saving : 0}
                                        displayType="text"
                                        thousandSeparator={true}
                                        prefix="Hemat Rp "
                                    />
                                </p>
                            </td>
                            <td className="text-right align-top">
                                <p className="mb-0">
                                    <NumberFormat
                                        value={membershipRecord ? membershipRecord.price : 0}
                                        displayType="text"
                                        thousandSeparator={true}
                                        prefix="Rp "
                                        suffix='/bulan'
                                    />
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{borderTop: "1px solid #f0f0f0"}}>
                            </td>
                        </tr>
                        <tr style={{fontSize: "23px"}}>
                            <th>
                                <p className="font-weight-bold mb-0">TOTAL</p>
                            </th>
                            <th className="text-right">
                                <p className="font-weight-bold mb-0"><NumberFormat
                                                    value={membershipRecord ? membershipRecord.price * membershipRecord.duration : 0}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    prefix="Rp "
                                                    /></p>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </Skeleton>
        </Fragment>
    );
}

export function JCSSummary ({jcsRecord}) {
    useEffect(() => {
    }, []);
    
    return (
        <Fragment>
            <Skeleton loading={jcsRecord ? false : true} active paragraph={{ rows: 4 }}>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>
                                <p className="mb-0 f-20 membership-name">{jcsRecord ? jcsRecord.name : ""}</p>
                                <p className="mb-0">Durasi {jcsRecord ? jcsRecord.duration : "0"} Bulan</p>
                                <p className="mb-3">
                                    <NumberFormat
                                        value={jcsRecord ? jcsRecord.total_saving : 0}
                                        displayType="text"
                                        thousandSeparator={true}
                                        prefix="Hemat Rp "
                                    />
                                </p>
                            </td>
                            <td className="text-right align-top">
                                <p className="mb-0">
                                    <NumberFormat
                                        value={jcsRecord ? jcsRecord.price : 0}
                                        displayType="text"
                                        thousandSeparator={true}
                                        prefix="Rp "
                                        suffix='/bulan'
                                    />
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{borderTop: "1px solid #f0f0f0"}}>
                            </td>
                        </tr>
                        <tr style={{fontSize: "23px"}}>
                            <th>
                                <p className="font-weight-bold mb-0">TOTAL</p>
                            </th>
                            <th className="text-right">
                                <p className="font-weight-bold mb-0"><NumberFormat
                                                    value={jcsRecord ? jcsRecord.price * jcsRecord.duration : 0}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    prefix="Rp "
                                                    /></p>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </Skeleton>
        </Fragment>
    );
}