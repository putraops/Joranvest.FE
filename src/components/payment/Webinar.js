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
import payment from '../../services/paymentService';
import TransferModal from './components/Modals/Transfer'
import paymentMethod from './payment-method';
import { showTransferModal } from '../../config/redux/action/payment';

import {
    InfoCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
const { Panel } = Collapse;

const { Text, Link } = Typography;

const Webinar = props => {
    const [formPaymentManual] = Form.useForm();
    
    const [paymentType, setPaymentType] = useState('')
    const [isPaymentAvailable, setIsPaymentAvailable] = useState(true)
    //const [webinarRecord, setMembershipRecord] = useState({})
    const [webinarRecord, setWebinarRecord] = useState({})
    const [totalPrice, setTotalPrice] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({});
    const [cardRecord, setCardRecord] = useState({
        cardNumber: "",
        expiry: "",
        cvc: ""
    })
    const [loading, setLoading] = useState({
        isSummaryLoading: true,
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
                                        
    const handlePaymentTypeChange = e => {
        setPaymentType(e.target.value)
    };

    useEffect(() => {
        loadData(props.match.params.id);
        console.log("props: ", props);
        isWebinarRegistered(props.match.params.id);
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

    function loadData(id){
        axiosApi.get(`/webinar/getById/${id}`)
        .then(res => {
            var r = res.data;
            console.log("getById: ", r);
            if (r.status) {
                setLoading({...loading, isSummaryLoading: false});
                setWebinarRecord(r.data);
                setTotalPrice(r.data.price - r.data.discount);
            //     this.setState({...this.state, detailData: r.data});
            //     var temp = {
            //         startDate: r.data.webinar_start_date,
            //         endDate: r.data.webinar_end_date,
            //     }
            //     this.setState({...this.state, webinarDate: temp});

            //     if (user) {
            //         this.isWebinarRegistered();
            //     }
            //     this.getSpeakers();
            }
        });
    }

    function isWebinarRegistered(id){
        axiosApi.get(`/webinar_registration/isWebinarRegistered/${id}`)
        .then(res => {
            var r = res.data;
            setIsPaymentAvailable(r.status);
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
            //GetUniqueNumber(paymentType);
            const res = props.showTransferModal();
            if (res) {  
                // console.log(props);
                // alert();
            }
        // var today = new Date();
        //     formPaymentManual.resetFields();
        //         setPayloadManualPayment({
        //             ...payloadManualPayment,
        //             record_id: webinarRecord.id,
        //             order_number: "JORANVEST/TRF/" + today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate() + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds(),
        //             payment_type: paymentType,
        //             price: webinarRecord.price - webinarRecord.discount,
        //             unique_number: 0,
        //         });
        //         setLoading({...loading, isButtonManualPayment: false})
        //         setModal({...modal, transferModal: true})
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
            var expired = (cardRecord.expiry).replace(/\s/g, '').split("/");
            var payload = {
                "card_number": (cardRecord.cardNumber).replace(/\s/g, ''),
                "exp_month": parseInt(expired[0]),
                "exp_year": parseInt("20" + expired[1]),
                "cvv": parseInt(cardRecord.cvc)
            }
            new Promise((resolve, reject) => {
                axiosApi.post(`/payment/createTokenByCard`, payload)
                .then(res => {
                    var r = res.data
                    console.log(r);
                    if (r.status) {
                        resolve(r.data);
                    } else {
                        reject(r.data);
                        openNotification("Kartu tidak Valid", "Silahkan masukkan informasi Kartu yang benar.")
                    }
                });
            })
            .then((res) => {
                //throw new Error('Something failed');
                if (res.status_code === "200") {
                    handleCharge(res.token_id)
                }
            })
            .catch((res) => {
            })
            .then(() => {
            });
        }
    }

    const handleCharge = (tokenId) => {
        var today = new Date();
        if (!webinarRecord) {
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
                "gross_amount": webinarRecord.price * webinarRecord.duration
            },
            "credit_card": payloadCreditCard,
            "gopay": payloadGopay,
            "item_details": [{
                "id": webinarRecord.id,
                "price": webinarRecord.price * webinarRecord.duration,
                "quantity": 1,
                "name": "(Membership) " + webinarRecord.name + " - " + webinarRecord.description,
            }],
            "customer_details": customerDetails
        }
        
        axiosApi.post(`/payment/charge`, payload)
        .then(res => {
            var r = res.data
            console.log("payment/charge", r);
            if (r.status || 
                (r.data.status_code === "201" && (r.data.payment_type === "credit_card" || r.data.payment_type === "gopay"))) {
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
            } else {
                openNotification("Kartu tidak Valid", "Silahkan masukkan informasi Kartu yang benar.")
            }
        });
    }

    const handleCardPayment = (payload) => {
        axiosApi.post(`/payment/membershipPayment`, payload)
        .then(res => {
            var r = res.data;
            console.log("handleCardPayment: ", r);
            if (r.status) {
                if (r.data.payment_status === 200) {
                    openNotification('Transaksi Berhasil', 'Terima kasih telah melakukan pembelian membership.');
                    setModal({...modal, auth3dsModal: false})
                    window.location.assign("/membership/payment/success/" + r.data.id)
                }
            } else {
                message.error(r.message);
            }
        });
    }
 
    const onReceiveMessage = (e) => {
        // payment_type: "credit_card"
        // transaction_time: "2021-11-09 01:13:54"
        console.log(e);
        if (e.data.status_code === "200") {
            // status_message: "Success, Credit Card transaction is successful"
            var cardExpiry = (cardRecord.expiry).replace(/\s/g, '').split("/");
            var payload = {
                record_id: props.match.params.id,
                exp_month: parseInt(cardExpiry[0]),
                exp_year: parseInt("20" + cardExpiry[1]),
                card_number: (cardRecord.cardNumber).replace(/\s/g, ''),
                payment_type: e.data.payment_type,
                card_type: e.data.card_type,
                payment_status: 200,
                bank_name: e.data.bank,
                order_number: e.data.order_id,
                currency: e.data.currency,
                price: parseInt(e.data.gross_amount)
            }
            handleCardPayment(payload);
        }
        if (e.data.status_code === "202") {
            // status message = Card is not authenticated.
            // transaction_status = deny
            openNotification('Verifikasi Gagal!', 'Silahkan ulangi pembayaran dan masukkan OTP yang benar.');
        }
        
        if (e.data.status_code === "202") {
            setModal({...modal, auth3dsModal: false})
        }
    };
 
    // iframe has loaded
    const onReady = () => {
        // Do something
    };

    console.log(paymentMethod);

    function sectionPayment (paymentMethod) {
        const listItems = paymentMethod.map((items) =>
            <Fragment key={items.key}>
                {items.has_children ? (
                    <Collapse accordion
                        key={items.key}>
                        <Panel 
                            header={<span className="font-weight-bold">Transfer Manual</span>}>
                            <List
                                size="large"
                                bordered
                                dataSource={items.data}
                                renderItem={item => (
                                    <List.Item
                                        key={item.name}
                                        actions={[<Radio className="pull-right" checked={true} value={item.value} style={{marginRight: "-10px"}}></Radio>]}
                                    >
                                        <List.Item.Meta
                                        avatar={<Image
                                            width={60}
                                            preview={false} 
                                            src={item.img} />
                                        }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Panel>
                    </Collapse>
                ) : (
                    <List style={{marginTop: "5px"}}
                        key={items.key}
                        size="large"
                        bordered
                        dataSource={items.data}
                        renderItem={item =>
                            <List.Item
                                actions={
                                    [<Radio key={item.name} className="pull-right" checked={true} value={item.value}></Radio>]}>
                                        <span className="font-weight-bold" style={{marginLeft: "16px"}}>{item.name}</span>
                            </List.Item>
                        }
                    />
                )}
            </Fragment>
        );
        return listItems
    } 

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
                        <p className="font-weight-bold mb-1 card-label">Nomor Kartu Kredit 
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

                    <TransferModal record_id={props.match.params.id} price={totalPrice} payment_type={paymentType} />

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
                        <Row className="mb-4">
                            <Col lg="12 mb-4">
                                <div className="title-heading">
                                    <h3 className="text-dark font-weight-bold mb-0 f-17">Pilih Jenis Pembayaran</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>
                        {/* <p className="f-20 mb-2 font-weight-bold"></p> */}
                            <Row>
                                <Col xs="12" md="12" lg="12">
                                    <Radio.Group onChange={handlePaymentTypeChange}  name="radiogroup" defaultValue={paymentType} style={{width: "100%"}}>
                                        {(() => {
                                            if (paymentMethod) {
                                                return sectionPayment(paymentMethod);
                                            }
                                        })()}
                                    </Radio.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="5" className="mb-2">
                            <Card className="borderShadow5">
                                <Row className="mb-4">
                                    <Col lg="12 mb-4">
                                        <div className="title-heading">
                                            <h3 className="text-dark font-weight-bold mb-0 f-20">Ringkasan</h3>
                                            <div className="title-border-simple position-relative"></div>
                                        </div>
                                    </Col>
                                </Row>
                                <Skeleton loading={loading.isSummaryLoading} active paragraph={{ rows: 4 }}>
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
const reduxState = (state) => {
    return {
        user: state.auth.user,
        paymentReducer: state.paymentReducer,
    }
}
const reduxDispatch = (dispatch) => ({
    showTransferModal: () => dispatch(showTransferModal())
})

export default connect(reduxState, reduxDispatch)(Webinar);