import React, { Fragment, useState, useEffect } from 'react'
import { Button, Alert, Modal } from 'antd';
import { Form, Input, Image, Space, Typography, message  } from 'antd';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import axiosApi from '../../../../config/axiosConfig';
import actions from '../../actions/actions';

import { hideTransferModal } from '../../../../config/redux/action/payment';

const { Text } = Typography;

export function TransferModal({isModalShow, setHide, user, recordId, paymentType, price}){
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
            application_user_id: user.id,
            record_id: recordId,
            order_number: actions.generateOrderNumber(paymentType),
            payment_date: null,
            payment_type: paymentType,
            payment_status: 2,
            account_name: values.account_name,
            account_number: values.account_number,
            price: price,
            unique_number: uniqueNumber
        }
        
        axiosApi.post(`/payment/webinarPayment`, payload)
        .then(res => {
            var r = res.data;
            if (r.status) {
                if (r.data.payment_status === 2) {
                    window.location.assign("/payment/pending/" + r.data.id)
                }
            } else {
                setLoading({...loading, isSubmitLoading: false});
            }
        });
    }

    return (
        <Fragment>
            <Modal 
                title="Transfer Manual" 
                centered
                visible={isModalShow}
                onCancel={setHide}
                footer={null}
                >
                <Alert
                    message={
                        <Fragment>
                            <p className="mb-0" style={{fontWeight: "500"}}>Total Tagihan</p>
                            <NumberFormat
                                className="f-19" style={{fontWeight: "800"}}
                                value={price + uniqueNumber}
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
                                src={paymentType == "transfer_bca" ? "assets/img/bca-icon.png" : ""} 
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
                                    <li>Pembayaran melalui teller, informasi <strong>"Nomor Rekening"</strong> dengan nomor. Kemudian, isi <strong>"Nama Pemilik Rekening"</strong> dengan nama Anda.</li>
                                </ol>
                            </Fragment>
                        }
                        type="warning"
                    />
                    <button type="submit" key="pay" className={`btn btn-joran btn-sm btn-block ${loading.isSubmitLoading ? "disabled" : ""}`}>
                        {loading.isSubmitLoading ? 
                            <span>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Sedang diproses...
                            </span>
                            : <span>Submit</span>
                        }
                    </button>
                    {/* <Button key="pay" type="primary" htmlType="submit" loading={loading.isSubmitLoading} block></Button> */}
                </Form >
            </Modal>
        </Fragment>
    );
}


// export default connect(reduxState, reduxDispatch)(TransferModal);