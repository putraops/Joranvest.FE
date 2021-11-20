import React, { Fragment, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Image, Button} from 'antd';
import { Card, Badge, List, Avatar, Tag, message } from 'antd';
import { connect } from 'react-redux'
import { showUploadTransferModal, hideUploadTransferModal } from '../../../config/redux/action';
import axiosApi from '../../../config/axiosConfig';
import NumberFormat from "react-number-format";
import moment from 'moment';

const { Meta } = Card;

const ListItem = (props) => {
    useEffect(() => {
        window.addEventListener('keyup', onKeyup)
    }, [])

    const onKeyup = async ({ key }) => {
        if (key === "Escape") {
            const res = await props.hideUploadTransferModal(false)
            .catch(err => err);
            if (res) {
                //-- Do Nothing
            } else {
                //-- Do Nothing
            }
        }
    };

    const handleUploadTransferModal = async (event) => {
        const res = await props.showUploadTransferModal({data: props.obj })
            .catch(err => err);

        if (res) {
            //-- Do Nothing
        } else {
            //-- Do Nothing
        }
    }
    
    var requestedDate = "";
    var paymentExpiredDate = "";
    var paymentColor = "";
    var paymentStatus = "";
    if (props.obj.payment_status === 2) {
        paymentStatus = "Menunggu Pembayaran";
        paymentColor = "gold";
    } else if (props.obj.payment_status === 3) {
        paymentStatus = "Gagal";
        paymentColor = "red";
    } else if (props.obj.payment_status === 200) {
        paymentStatus = "Sudah dibayar";
        paymentColor = "green";
    }

    if (props && props.obj.created_at && props.obj.created_at.Valid) {
        requestedDate = moment(props.obj.created_at.Time,  "YYYY/MM/DD HH:mm").format('DD MMM YYYY');
    }
    if (props && props.obj.payment_date_expired && props.obj.payment_date_expired.Valid) {
        paymentExpiredDate = moment(props.obj.payment_date_expired.Time,  "YYYY/MM/DD HH:mm").format('DD MMM, HH:mm');
    }

    return (
        <Fragment>
            <List.Item className="p-0 mb-2 border-bottom-0" 
                key={props.obj.id}
                actions={[
                ]}>
                <Card size="small">
                    <div style={{margin: "5px 0px 0px 10px"}}>
                        <p className="mb-0" style={{fontWeight: "600"}}>
                            <Tag className="f-15 mb-1"><strong>Belanja:</strong> {requestedDate}</Tag>
                            <Tag className="f-15 mb-1" color={paymentColor}>{paymentStatus}</Tag>
                            <Tag className="f-15 mb-1">{props.obj.order_number}</Tag>
                        </p>

                        {(() => {
                            if (props.obj.membership_name !== "") {
                                return (
                                    <Fragment>
                                        <p className="f-14 mt-1 mb-0 font-weight-bold" style={{marginTop: "-5px"}}>
                                            <Tag color="green">Membership</Tag>{props.obj.membership_name}
                                        </p>
                                        <p><strong>Durasi</strong> <NumberFormat
                                                                value={props.obj.membership_duration}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                fixedDecimalScale={true}
                                                                decimalScale={0}
                                                                suffix=" Bulan"
                                                                />
                                            </p>
                                    </Fragment>
                                )
                            } else {
                                return (
                                    <p className="f-14 mt-1 mb-0 font-weight-bold" style={{marginTop: "-5px"}}>
                                            <Tag color="red">Webinar</Tag>{props.obj.webinar_title}
                                    </p>
                                    // <p className="f-14 mt-1 mb-0 font-weight-bold"><Tag className="f-15 mb-1 font-weight-bold" color={props.obj.membership_name !== "" ? "green" : "red"}>{props.obj.membership_name !== "" ? "Membership" : "Webinar"}</Tag> {props.obj.webinar_title}</p>
                                )
                            }
                        })()}
                        
                        {(() => {
                            if (paymentExpiredDate) {
                                return (
                                    <p className="f-13 mt-0 mb-0" style={{marginTop: "-5px"}}>
                                        <span className="font-weight-bold">Bayar Sebelum: </span>
                                        <span className="text-danger" style={{fontWeight: "500"}}>{paymentExpiredDate}</span>
                                    </p>
                                )
                            }
                        })()}
                    </div>
                    {
                        (() => {
                            if (props.obj.price > 0) {
                                return (
                                    <Fragment>
                                        <hr className="mt-2 mb-2" />
                                        <Row>
                                            <Col className="text-left" lg="6">
                                                {(() => {
                                                    if (props.obj.payment_type === "transfer_bca") {
                                                        return (                                                    
                                                            <span className="text-primary f-12" onClick={handleUploadTransferModal} style={{marginLeft: "10px", fontWeight: "500", cursor: "pointer"}}>Upload Bukti Bayar</span>
                                                        )
                                                    }
                                                })()}
                                            </Col>
                                            <Col className="text-right" lg="6">
                                                <strong>
                                                    <NumberFormat
                                                        value={props.obj.price + props.obj.unique_number}
                                                        displayType="text"
                                                        thousandSeparator={true}
                                                        prefix="Rp "
                                                    />
                                                </strong>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                )
                            }
                        })()
                    }
                </Card>
            </List.Item>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        parent: state.parentRecord,
    }
}
const reduxDispatch = (dispatch) => ({
    showUploadTransferModal: (data) => dispatch(showUploadTransferModal(data)),
    hideUploadTransferModal: () => dispatch(hideUploadTransferModal(false))
})
export default connect(mapStateToProps, reduxDispatch)(ListItem);