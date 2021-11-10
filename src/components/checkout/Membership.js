import React, { Fragment, useState, useEffect } from 'react'

import { Row, Col } from 'reactstrap';
import axiosApi from '../../config/axiosConfig';
import { Button, Card, Alert, Radio, List, Skeleton, Modal } from 'antd';
import { Form, Input, InputNumber, Image, Space, Tooltip, Typography, notification, message  } from 'antd';
import NumberFormat from "react-number-format";
import CreditCardInput from 'react-credit-card-input';
import { connect } from 'react-redux';
import IframeComm from 'react-iframe-comm';
import Footer from '../Footer';
import { Collapse } from 'antd';

import {
    InfoCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
const { Panel } = Collapse;

const { Text, Link } = Typography;

const Membership = props => {
    const [formPaymentManual] = Form.useForm();
    
    const [paymentType, setPaymentType] = useState('')
    const [isPaymentAvailable, setIsPaymentAvailable] = useState(true)
    const [membershipRecord, setMembershipRecord] = useState({})
    const [customerDetails, setCustomerDetails] = useState({});
    const [cardRecord, setCardRecord] = useState({
        cardNumber: "",
        expiry: "",
        cvc: ""
    })
    const [loading, setLoading] = useState({
        isMembershipLoading: true,
        isButtonManualPayment: false,
        isButtonPaymentLoading: false,
        isButtonCardPaymentLoading: false,
    });
    const [modal, setModal] = useState({
        transferModal: false,
        cardModal: false,
        auth3dsModal: false,
        gopayQrisModal: false
    });
    const [auth3dsUrl, setAuth3dsUrl] = useState('')
    const [gopayQRUrl, setGopayQRUrl] = useState('')
    const [uniqueNumber, setUniqueNumber] = useState(0)
    const [payloadManualPayment, setPayloadManualPayment] = useState({
        id: "",
        payment_date: null,
        payment_type: paymentType,
        payment_status: 2,
        account_name: "",
	    account_number: "",
        price: 0,
        unique_number: 0
    })
                                        
    const handlePaymentTypeChange = e => {
        setPaymentType(e.target.value)
    };

    useEffect(() => {
        loadData(props.match.params.id);
        if (props.user) {
            setCustomerDetails({
                "first_name": props.user.first_name,
                "last_name": props.user.last_name,
                "email": props.user.email,
                "phone": "081340810046",//props.user.phone,
                "billing_address": {
                    "first_name": props.user.first_name,
                    "last_name": props.user.last_name,
                    "email": props.user.email,
                    "phone": "081340810046",
                    "address": "",
                    "city": "",
                    "postal_code": "",
                    "country_code": ""
                },
                "shipping_address": {
                    "first_name": props.user.first_name,
                    "last_name": props.user.last_name,
                    "email": props.user.email,
                    "phone": "081340810046",
                    "address": "",
                    "city": "",
                    "postal_code": "",
                    "country_code": ""
                }
            })
        }
    }, []);

    const GetUniqueNumber = (payment_type) => {
        axiosApi.get(`/payment/getUniqueNumber`)
        .then(res => {
            var r = res.data;
            if (r.status) {
                formPaymentManual.resetFields();
                setPayloadManualPayment({
                    ...payloadManualPayment, 
                    payment_type: payment_type,
                    price: membershipRecord.price * membershipRecord.duration,
                    unique_number: r.data,
                })
                setLoading({...loading, isButtonManualPayment: false})
                setModal({...modal, transferModal: true})
            }
        });
    }

    const loadData = (value) => {
        if (props.user && props.user.is_membership) {
            setIsPaymentAvailable(false);
        }

        axiosApi.get(`/membership/getViewById/${value}`)
        .then(res => {
            var r = res.data;
            if (r.status) {
                setLoading({...loading, isMembershipLoading: false});
                setMembershipRecord(r.data);
            }
        });
    }

    const openNotification = (title, message) => {
        notification.open({
          message: title,
          description:
            message,
            icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
          onClick: () => {
          },
        });
    };

    const handlePayment = () => {
        const { user } = props
        setLoading({...loading, isButtonCardPaymentLoading: false});
        if (!user) {
            openNotification("Peringatan!", "Silahkan Login terlebih dahulu.")
            return;
        }

        if (paymentType == "transfer_bca") {
            GetUniqueNumber(paymentType);
        } else if (paymentType == "credit_card") {
            setCardRecord({
                cardNumber: "",
                expiry: "",
                cvc: ""
            })
            setModal({...modal, cardModal: true})
        } else if (paymentType == "gopay") {
            handleCharge();
        } else {
            openNotification("Peringatan!", "Silahkan Pilih Tipe Pembayaran terlebih dahulu.")
        }
    }
    const onFormPaymentManualFinish = (values) => {
        axiosApi.post(`/payment/save`, {
            ...payloadManualPayment,
            account_name: values.account_name,
            account_number: values.account_number,
        })
        .then(res => {
            var r = res.data;
            if (r.status) {
                if (r.data.payment_status === 2) {
                    window.location.assign("/membership/payment/pending/" + r.data.id)
                }
            }
        });
    }

    const handleCloseTransferModal = () => {
        setModal({...modal, transferModal: false});
    }
    const handleCloseCardModal = () => {
        setModal({...modal, cardModal: false});
    }
    const handleCloseAuth3dsModal = () => {
        setModal({...modal, auth3dsModal: false})
    }
    const handleCloseGopayQrisModal = () => {
        setModal({...modal, gopayQrisModal: false});
    }

    const handleCardCVVInvalid = () => {
        //message.error('CVV / CVC is invalid. Please input valid CVV / CVC');
    }
    const handleCardNumberInvalid = () => {
        //message.error('Card Number is invalid. Please input valid Card Number');
    }
    const handleCardExpiredError = () => {
        //message.error('Expired Data is invalid. Please input valid Expired Data');
    }

    const handleCardToken = (e) => {
        if (cardRecord.cardNumber == "" || cardRecord.cvv == "" || cardRecord.expiry == "") {
            openNotification('Notification Title', 'This is the content of the notification. This is the content of the notification. This is the content of the notification.');
        } else {
            new Promise((resolve, reject) => {
                var payload = {
                    "card_number": "4811111111111114",
                    "exp_month": 12,
                    "exp_year": 2024,
                    "cvv": 123
                }
                axiosApi.post(`/payment/createTokenByCard`, payload)
                .then(res => {
                    var r = res.data
                    if (r.status) {
                        resolve(r.data);
                    } else {
                        reject(r.data);
                    }
                });
            })
            .then((res) => {
                //throw new Error('Something failed');
                handleCharge(res.token_id)
            })
            .catch((res) => {
            })
            .then(() => {
            });
        }
    }

    const handleCharge = (tokenId) => {
        var today = new Date();
        if (!membershipRecord) {
            message.error("Koneksi internet tidak stabil. Silahkan Refresh halaman ini.");
            return;
        }

        var prePaymentType = "";
        if (paymentType === "credit_card") prePaymentType = "CC";
        if (paymentType === "gopay") prePaymentType = "GOPAY";
        if (paymentType === "transfer") prePaymentType = "TRF";

        var payloadCreditCard = null;
        var payloadGopay = null;
        if (paymentType === "credit_card") {
            payloadCreditCard = {
                "token_id": tokenId,
                "authentication": true
            }
            setLoading({...loading, isButtonPaymentLoading: true})
        } else if (paymentType === "gopay") {
            payloadGopay = {
                "enable_callback": true,
                "callback_url": "someapps://callback"
            }
        }

        var payload = {
            "payment_type": paymentType,
            "transaction_details": {
                "order_id": "JORANVEST/" + prePaymentType + "/" + today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate() + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds(),
                "gross_amount": membershipRecord.price * membershipRecord.duration
            },
            "credit_card": payloadCreditCard,
            "gopay": payloadGopay,
            "item_details": [{
                "id": membershipRecord.id,
                "price": membershipRecord.price * membershipRecord.duration,
                "quantity": 1,
                "name": "(Membership) " + membershipRecord.name + " - " + membershipRecord.description,
            }],
            "customer_details": customerDetails
        }
        
        axiosApi.post(`/payment/charge`, payload)
        .then(res => {
            var r = res.data
            if (paymentType === "credit_card") {
                if (r.data.transaction_status === "pending") {
                    setLoading({...loading, isButtonCardPaymentLoading: true});
                    setAuth3dsUrl(r.data.redirect_url);
                    setModal({...modal, cardModal: false, auth3dsModal: true})
                }
                if (r.status === 200) {
                }
            } else if (paymentType === "gopay") {
                setLoading({...loading, isButtonPaymentLoading: false})
                if (r.data.transaction_status === "pending") {
                    //-- Open QR
                    var redirect_url = "";
                    for (var i = 0; i < r.data.actions.length; i++) {
                        if (r.data.actions[i].name === "generate-qr-code") {
                            redirect_url = r.data.actions[i].url;
                        }
                    }
                    setGopayQRUrl(redirect_url);
                    setModal({...modal, gopayQrisModal: true})
                }
            }
        });
    }

    const transferBankTypes = [
        {
            name: "BCA",
            value: "transfer_bca",
        },
    ];

    const paymentTypes = [
        {
            name: "Kartu Kredit",
            value: "credit_card",
        },
        {
            name: "gopay",
            value: "gopay",
        }
    ];
 
    const onReceiveMessage = (e) => {
        // payment_type: "credit_card"
        // transaction_time: "2021-11-09 01:13:54"
        if (e.data.status_code === "200") {
            // status_message: "Success, Credit Card transaction is successful"
            // transaction_status: "capture"
        }
        if (e.data.status_code === "202") {
            // status message = Card is not authenticated.
            // transaction_status = deny
            openNotification('Verifikasi Gagal!', 'Silahkan ulangi pembayaran dan masukkan OTP yang benar.');
        }
        
        if (e.data.status_code === "200" || e.data.status_code === "202") {
            setModal({...modal, auth3dsModal: false})
        }
    };
 
    // iframe has loaded
    const onReady = () => {
        // Do something
    };
    
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    return (
        <Fragment>
            <section className="section " id="home">
                <div className="container mt-4">
                    <Modal 
                        // title="Gopay QRIS" 
                        id="gopay-qris"
                        centered
                        visible={modal.gopayQrisModal}
                        onCancel={handleCloseGopayQrisModal}
                        footer={[]}
                        >
                        <div style={{textAlign: "center"}}>
                            <Image
                                preview={false}
                                src="assets/img/gopay.png"
                                width={200}
                            />
                            <br />
                            <Image
                                preview={false}
                                src={gopayQRUrl}
                                // width={400}
                                style={{width: "100%"}}
                            />
                        </div>
                        
                        {/* <IframeComm
                            attributes={{
                                src: "https://api.sandbox.veritrans.co.id/v2/gopay/920880d3-6669-4c23-94fa-0ca9318aeba4/qr-code",//gopayQRUrl,
                                width: "100%",
                                height: "450px",
                                frameBorder: 0, // show frame border just for fun...
                            }}
                            handleReady={onReady}
                            handleReceiveMessage={onReceiveMessage}
                        /> */}
                    </Modal>
                    <Modal 
                        title="3DS Authentication" 
                        centered
                        visible={modal.auth3dsModal}
                        onCancel={handleCloseAuth3dsModal}
                        footer={[
                            <Fragment key="fragment">
                                <p className="f-13 mt-0 mb-1" key="terms" style={{float: "left"}}
                                    >Dengan menyelesaikan pembelian, Anda menyetujui <a href="/terms" className="font-weight-bold">Ketentuan Layanan</a> ini.
                                </p>
                            </Fragment>
                        ]}
                        >
                        <IframeComm
                            attributes={{
                                src: auth3dsUrl,
                                width: "100%",
                                height: "450px",
                                frameBorder: 0, // show frame border just for fun...
                            }}
                            handleReady={onReady}
                            handleReceiveMessage={onReceiveMessage}
                        />
                    </Modal>
                    <Modal 
                        title="Pembayaran Kartu Debit / Kredit" 
                        centered
                        visible={modal.cardModal}
                        onCancel={handleCloseCardModal}
                        footer={[
                            // <Button key="cancel">Cancel</Button>,
                            <Fragment key="fragment">
                                <p className="f-13 mt-0 mb-1" key="terms" style={{float: "left"}}
                                    >Dengan menyelesaikan pembelian, Anda menyetujui <a href="/terms" className="font-weight-bold">Ketentuan Layanan</a> ini.
                                </p>
                                <Button key="pay" type="primary" loading={false} block onClick={handleCardToken} loading={loading.isButtonCardPaymentLoading}>Bayar</Button>
                            </Fragment>
                        ]}
                        >
                        <p className="font-weight-bold mb-1 card-label">Nomor Kartu Debit / Kredit 
                            <Tooltip 
                                placement="top"
                                color="blue"
                                title={
                                    <div>
                                        <span key="info-1">1. CVV tidak disimpan dan wajib dimasukkan untuk transaksi</span><br />
                                        <span key="info-2">2. Sistem Pembayaran Joranvest memiliki partner dengan sistem keamanan yang baik.</span>
                                    </div>
                                }
                            >
                                <InfoCircleOutlined className="f-17 ml-2"/>
                            </Tooltip>
                        </p>
                        <CreditCardInput style={{width: "100%"}}
                            cardNumberInputProps={{ 
                                value: cardRecord.cardNumber, 
                                onChange: e => setCardRecord({...cardRecord, cardNumber: e.target.value}),
                                onError: handleCardNumberInvalid
                            }}
                            cardExpiryInputProps={{ 
                                value: cardRecord.expiry, 
                                onChange: e => setCardRecord({...cardRecord, expiry: e.target.value}),
                                onError: handleCardExpiredError
                            }}
                            cardCVCInputProps={{ 
                                value: cardRecord.cvc, 
                                onChange: e => setCardRecord({...cardRecord, cvc: e.target.value}),
                                onError: handleCardCVVInvalid
                            }}
                            fieldClassName="input"
                        />
                    </Modal>

                    <Modal 
                        title="Transfer Manual" 
                        centered
                        visible={modal.transferModal}
                        onCancel={handleCloseTransferModal}
                        footer={[
                            // <Button key="cancel">Cancel</Button>,
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
                                        value={membershipRecord ? (membershipRecord.price * membershipRecord.duration) + payloadManualPayment.unique_number : 0}
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
                                        src={paymentType == "transfer_bca" ? "assets/img/bca-icon.png" : ""} />
                                </Space>
                            }
                        />
                        <Form 
                            form={formPaymentManual}
                            className="mt-3"
                            //   form={form}
                            layout="vertical"
                            //   initialValues={{ requiredMarkValue: requiredMark }}
                            //   onValuesChange={onRequiredTypeChange}
                            //   requiredMark={requiredMark}
                            // onSubmit={handleSubmit}
                            onFinish={onFormPaymentManualFinish}
                        >
                            <Text style={{fontWeight: "500"}}>Nomor Rekening <span className="text-danger">*</span></Text>
                            <Form.Item
                                // onChange={onFormPaymentManualChange}
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
                            
                                
                            <Button key="pay" type="primary" htmlType="submit" loading={loading.isButtonManualPayment} block>Submit</Button>
                        </Form >
                    </Modal>
                    <Row>
                        <Col sm="12" className="mt-3 mb-4">
                            {(() => {
                                if (!props.user) {
                                    return (
                                        <Alert
                                            message={<span style={{fontWeight: "500"}}>Silahkan login terlebih dahulu untuk mendaftar sebagai member.</span>}
                                            description={
                                                <Fragment>
                                                    <span className="f-14">Click <a href="/login" className="font-weight-bold">disini</a> untuk login.</span>
                                                </Fragment>
                                            }
                                            type="warning"
                                        />
                                    )
                                } else if (isPaymentAvailable) {
                                    return (
                                        <Alert
                                            message={<span style={{fontWeight: "500"}}>Kamu sudah terdaftar sebagai Member.</span>}
                                            description={
                                                <Fragment>
                                                    <span className="f-14">Kembali ke halaman utama. Click <a href="/" className="font-weight-bold">disini</a>.</span>
                                                </Fragment>
                                            }
                                            type="warning"
                                        />
                                    )
                                } else {
                                    return (
                                        <Alert
                                            message={<span style={{fontWeight: "500"}}>Silahkan Pilih Tipe Pembayaran untuk melakukan pembayaran.</span>}
                                            description={
                                                <Fragment>
                                                    <span className="f-14">Setiap jenis pembayaran menggunakan <strong>Kartu</strong> akan dilakukan verifikasi.</span>
                                                </Fragment>
                                            }
                                            type="info"
                                        />
                                    )
                                }
                            })()}
                        </Col>
                        <Col md="7" className="mb-3">
                        <p className="f-20 mb-2 font-weight-bold">Checkout</p>
                            <Row>
                                <Col xs="12" md="12" lg="12">
                                    <Radio.Group onChange={handlePaymentTypeChange}  name="radiogroup" defaultValue={paymentType} style={{width: "100%"}}>
                                        <Collapse accordion>
                                            <Panel 
                                                header={<span className="font-weight-bold">Transfer Manual</span>}
                                                key="1">
                                                <List
                                                    size="large"
                                                    bordered
                                                    dataSource={transferBankTypes}
                                                    renderItem={item => (
                                                        <List.Item
                                                            actions={[<Radio className="pull-right" checked={true} value={item.value} style={{marginRight: "-10px"}}></Radio>]}
                                                        >
                                                            <List.Item.Meta
                                                            avatar={<Image
                                                                width={60}
                                                                preview={false} 
                                                                src={item.name == "BCA" ? "assets/img/bca-icon.png" : ""} />
                                                            }
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            </Panel>
                                        </Collapse>
                                        <List style={{marginTop: "5px"}}
                                            size="large"
                                            bordered
                                            dataSource={paymentTypes}
                                            renderItem={item =>
                                                <List.Item
                                                actions={[<Radio className="pull-right" checked={true} value={item.value}></Radio>]}>
                                                        <span className="font-weight-bold" style={{marginLeft: "16px"}}>{item.name}</span>
                                                </List.Item>
                                            }
                                        />
                                    </Radio.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="5" className="mb-2">
                            <Card className="borderShadow5">
                                <p className="f-20 mb-2 font-weight-bold">Ringkasan</p>
                                <Skeleton loading={loading.isMembershipLoading} active paragraph={{ rows: 4 }}>
                                    <table style={{width: "100%"}}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="mb-0 f-18">{membershipRecord ? membershipRecord.name : ""}</p>
                                                    <p className="mb-0">Durasi {membershipRecord ? membershipRecord.duration : "0"} Bulan</p>
                                                    <p className="mb-3">Hemat <NumberFormat
                                                                        value={membershipRecord ? membershipRecord.total_saving : 0}
                                                                        displayType="text"
                                                                        thousandSeparator={true}
                                                                        prefix="Rp "
                                                                        /></p>
                                                </td>
                                                <td className="text-right align-top">
                                                    <p className="mb-0"><NumberFormat
                                                                        value={membershipRecord ? membershipRecord.price : 0}
                                                                        displayType="text"
                                                                        thousandSeparator={true}
                                                                        prefix="Rp "
                                                                        /> / bulan</p>
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
                                <span className="f-13">Dengan menyelesaikan pembelian, Anda menyetujui <a href="/terms" className="font-weight-bold">Ketentuan Layanan</a> ini.</span>
                                <Button type="primary" className="mt-3" block disabled={isPaymentAvailable} loading={loading.isButtonPaymentLoading} onClick={() => handlePayment()} >Selesaikan Pembayaran</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>
            
            <Footer />
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(Membership);