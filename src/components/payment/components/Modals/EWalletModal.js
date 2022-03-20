import React, { Fragment, useState, useEffect } from 'react'
import { Button, Alert, Modal } from 'antd';
import { Form, Input, Image, Space, Typography, message  } from 'antd';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import axiosApi from '../../../../config/axiosConfig';
import actions from '../../actions/actions';

import { hideTransferModal } from '../../../../config/redux/action/payment';

const { Text } = Typography;

const EWalletModal = props => {
    const [formPaymentManual] = Form.useForm();
    const [loading, setLoading]= useState({
        isSubmitLoading: false
    })
     
    useEffect(() => {
    }, []);
    
    const onFormFinish = (values) => {
        setLoading({...loading, isSubmitLoading: true});
        var payload = {
            id: "",
            application_user_id: props.user.id,
            record_id: props.record_id,
            order_number: actions.generateOrderNumber(props.payment_type),
            payment_date: null,
            payment_type: props.payment_type,
            payment_status: 2,
            account_name: values.account_name,
            account_number: values.account_number,
            price: props.price,
        }
      
        axiosApi.post(`/payment/webinarPayment`, payload)
        .then(res => {
            setLoading({...loading, isSubmitLoading: false});
            var r = res.data;
            if (r.status) {
                if (r.data.payment_status === 2) {
                    window.location.assign("/webinar/payment/pending/" + r.data.id)
                }
            }
        });
    }

    return (
        <Fragment>
            <Modal 
                title="Transfer Manual" 
                centered
                visible={false}
                onCancel={() => props.hideTransferModal()}
                footer={null}
                >
                <Alert
                    message={
                        <Fragment>
                            <p className="mb-0" style={{fontWeight: "500"}}>Total Tagihan</p>
                            <NumberFormat
                                className="f-19" style={{fontWeight: "800"}}
                                value={props.price}
                                displayType="text"
                                thousandSeparator={true}
                                prefix="Rp "
                                />
                        </Fragment>
                    }
                    type="info"
                    action={
                        <Space>
                            <Image
                                width={70}
                                preview={false} 
                                src={props.payment_type == "transfer_bca" ? "assets/img/bca-icon.png" : ""} 
                            />
                        </Space>
                    }
                />
                <form className="mt-3">
                    <div className="form-group">
                        <label className="fw-500">Password</label>
                        <input type="password" className="form-control no-radius" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius">Bayar</button>
                    {/* <button type="button" 
                                        className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius"
                                        onClick={user ? () => registration() : () => showLoginConfirm()}
                                        disabled={isRegistered || isExpired}>
                                        {isLoading.register ? 
                                            <span><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Sedang diproses...</span>
                                            : <span>{isRegistered ? "Sudah Terdaftar" : (isExpired ? "Telah Berakhir" : "Daftar Sekarang") }</span>
                                        }
                                    </button> */}
                </form>

                {/* <Form 
                    form={formPaymentManual}
                    className="mt-3"
                    layout="vertical"
                    onFinish={onFormFinish}
                >
                    <Text style={{fontWeight: "500"}}>Nomor Rekening <span className="text-danger">*</span></Text>
                    <Form.Item
                        name="account_number"
                        className="mb-2"
                        rules={[{ required: true, message: 'Nomor Rekening tidak boleh kosong.' }]}>
                        <Input 
                            className="mt-1" 
                            allowClear
                            placeholder="Input Nomor" /> 
                    </Form.Item>

                    <Text style={{fontWeight: "500"}}>Nama Pemilik Rekening <span className="text-danger">*</span></Text>
                    <Form.Item 
                        className="mb-2"
                        rules={[{ required: true, message: 'Nama Pemilik Rekening tidak boleh kosong.' }]}
                        name="account_name">
                        <Input
                            className="mt-1" 
                            allowClear
                            placeholder="Input Nama Pemilik" />
                    </Form.Item>
                    <Button key="pay" type="primary" htmlType="submit" loading={loading.isSubmitLoading} block>Bayar</Button>
                </Form > */}
            </Modal>
        </Fragment>
    );
}

export default connect(null, null)(EWalletModal);