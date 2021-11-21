import React, { Fragment, useState, useEffect } from 'react'
import { Button, Alert, Modal } from 'antd';
import { Form, Input, Image, Space, Typography, message  } from 'antd';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import axiosApi from '../../../../config/axiosConfig';
import actions from '../../actions/actions';

import { hideTransferModal } from '../../../../config/redux/action/payment';

const { Text } = Typography;

const Transfer = props => {
    const [formPaymentManual] = Form.useForm();
    const [loading, setLoading]= useState({
        isSubmitLoading: false
    })
    const [uniqueNumber, setUniqueNumber] = useState(0);
     
    useEffect(() => {
        GetUniqueNumber();
    }, []);
    
    function GetUniqueNumber(){
        axiosApi.get(`/payment/getUniqueNumber`)
        .then(res => {
            var r = res.data;
            if (r.status) {
                setUniqueNumber(r.data);
            }
        }).catch(err => {
            message.error(err);
        });
    }

    const onFormFinish = (values) => {
        setLoading({...loading, isSubmitLoading: true});
        var payload = {
            id: "",
            record_id: props.record_id,
            order_number: actions.generateOrderNumber(props.payment_type),
            payment_date: null,
            payment_type: props.payment_type,
            payment_status: 2,
            account_name: values.account_name,
            account_number: values.account_number,
            price: props.price,
            unique_number: uniqueNumber
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
                visible={props.paymentReducer.isTransferModalShow}
                onCancel={() => props.hideTransferModal()}
                footer={[
                    <Fragment key="fragment">
                        <p className="f-13 mt-0 mb-1" key="terms" style={{float: "left"}}
                            >Dengan menyelesaikan pembelian, Anda menyetujui <a href="/terms" className="font-weight-bold">Ketentuan Layanan</a> ini.
                        </p>
                    </Fragment>
                ]}
                >
                <Alert
                    message={
                        <Fragment>
                            <p className="mb-0" style={{fontWeight: "500"}}>Total Tagihan</p>
                            <NumberFormat
                                className="f-19" style={{fontWeight: "800"}}
                                value={props.price + uniqueNumber}
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
                <Form 
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
                    <Alert
                        className="mt-3 mb-3"
                        message={<span style={{fontWeight: "500"}}>Panduan Transfer</span>}
                        description={
                            <Fragment>
                                <ol style={{marginLeft: "-15px"}}>
                                    <li>Masukkan masukkan nominal sesuai sampai digit terakhir untuk memudahkan verifikasi.</li>
                                    <li>Masukkan info rekening sesuai pada buku tabungan / informasi rekening.</li>
                                    <li>Pembayaran melalui teller, informasi <strong>"Nomor Rekening"</strong> dengan nomor. Kemudian, isi <strong>"Nama Pemilik Rekening"</strong> dengan nama Anda.</li>
                                </ol>
                            </Fragment>
                        }
                        type="warning"
                    />
                    <Button key="pay" type="primary" htmlType="submit" loading={loading.isSubmitLoading} block>Submit</Button>
                </Form >
            </Modal>
        </Fragment>
    );
}

const reduxState = (state) => {
    return {
        user: state.auth.user,
        paymentReducer: state.paymentReducer,
    }
}
const reduxDispatch = (dispatch) => ({
    hideTransferModal: () => dispatch(hideTransferModal())
})

export default connect(reduxState, reduxDispatch)(Transfer);