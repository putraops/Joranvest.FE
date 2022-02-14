import React, { Fragment, useState, useEffect } from 'react'
import { Modal } from 'antd';
import NumberFormat from "react-number-format";
import validate from '../../../commons/validate';
import '../style/style.css'

export function WebinarSummary ({webinarRecord}) {
    useEffect(() => {
    }, []);
    
    return (
        <Fragment>
            <table style={{width: "100%"}}>
                <tbody>
                    <tr>
                        <td>
                            <p className="mb-0 f-16 font-weight-bold">Webinar</p>
                        </td>
                        <td className="text-right align-top">
                            <NumberFormat className="f-16"
                                value={webinarRecord ? webinarRecord.price : 0}
                                displayType="text"
                                thousandSeparator={true}
                                prefix="Rp "
                                /> 
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2"><p className="mb-1">{webinarRecord.title || ""}</p></td>
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
                                            value={webinarRecord ? webinarRecord.discount : 0}
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
        </Fragment>
    );
}

export function MembershipSummary ({membershipRecord}) {
    useEffect(() => {
    }, []);
    
    return (
        <Fragment>
            <table style={{width: "100%"}}>
                <tbody>
                    <tr>
                        <td>
                            <p className="mb-0 f-18 membership-name">{membershipRecord ? membershipRecord.name : ""}</p>
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
        </Fragment>
    );
}