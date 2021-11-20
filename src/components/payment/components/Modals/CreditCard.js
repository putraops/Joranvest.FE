import React, { Fragment, useState, useEffect } from 'react'
import { Button, Modal } from 'antd';
import { Tooltip } from 'antd';
import IframeComm from 'react-iframe-comm';
import { connect } from 'react-redux';
import axiosApi from '../../../../config/axiosConfig';
import CreditCardInput from 'react-credit-card-input';

import midtrans from '../../actions/midtrans';
import actions from '../../actions/actions';
import sideNotification from '../../../../commons/sideNotification';
import { hideCreditCardModal } from '../../../../config/redux/action/payment';

import {
    InfoCircleOutlined,
} from '@ant-design/icons';

const CreditCard = props => {
    const [auth3dsUrl, setAuth3dsUrl] = useState('')
    const [loading, setLoading]= useState({
        isSubmitLoading: false,
        isButtonPaymentLoading: false
    })
    const [modal, setModal] = useState({
        cardModal: false,
        auth3dsModal: false,
    });
    const [cardRecord, setCardRecord] = useState({
        cardNumber: "",
        expiry: "",
        cvc: ""
    })
     
    useEffect(() => {
    }, []);

    const handleCreateToken = async () => {
        if (cardRecord.cardNumber == "" || cardRecord.cvv == "" || cardRecord.expiry == "") {
            sideNotification.open('Peringatan', 'Informasi kartu masih belum lengkap. Silahkan lengkapi terlebih dahulu.', false);
        } else {
            var expired = (cardRecord.expiry).replace(/\s/g, '').split("/");
            var payload = {
                "card_number": (cardRecord.cardNumber).replace(/\s/g, ''),
                "exp_month": parseInt(expired[0]),
                "exp_year": parseInt("20" + expired[1]),
                "cvv": parseInt(cardRecord.cvc)
            }

            setLoading({...loading, isButtonPaymentLoading: true})
            const res = await midtrans.createTokenByCard(payload).catch(err => err);
            if (res) {  
                setLoading({...loading, isButtonPaymentLoading: false});
                if (res.status_code == 200) {
                    var payloadCreditCard = {
                        "token_id": res.token_id,
                        "authentication": true
                    }
                    handlePayment(payloadCreditCard)
                } else {
                    sideNotification.open("Informasi", res.status_message, false);
                }
            } else {
                setLoading({...loading, isButtonPaymentLoading: false})
            }
        }
    }

    const handlePayment = async (payloadCreditCard) => {
        var payload = {
            "payment_type": props.payment_type,
            "transaction_details": {
                "order_id": actions.generateOrderNumber(props.payment_type),
                "gross_amount": props.price
            },
            "credit_card": payloadCreditCard,
            "gopay": null,
            "item_details": [{
                "id": props.record_id,
                "price": props.price,
                "quantity": 1,
                "name": "(Webinar) " + props.product_name,
            }],
            "customer_details": props.customer
        }

        const res = await midtrans.payment(payload).catch(err => err);
        if (res) {  
            //-- Need Confirmation by OTP
            if (res.status_code == 201) {
                setAuth3dsUrl(res.redirect_url);
                setModal({...modal, auth3dsModal: true});
            }
        } else {
            setLoading({...loading, isButtonPaymentLoading: false})
        }
    }

    const handleCloseAuth3dsModal = () => {
        setModal({...modal, auth3dsModal: false})
    }
 
    const onReceiveMessage = (e) => {
        // payment_type: "credit_card"
        if (e.data.status_code === "200") {
            // status_message: "Success, Credit Card transaction is successful"
            var cardExpiry = (cardRecord.expiry).replace(/\s/g, '').split("/");
            var payload = {
                record_id: props.record_id,
                exp_month: parseInt(cardExpiry[0]),
                exp_year: parseInt("20" + cardExpiry[1]),
                card_number: (cardRecord.cardNumber).replace(/\s/g, ''),
                payment_type: props.payment_type,
                card_type: e.data.card_type,
                payment_status: 200,
                bank_name: e.data.bank,
                order_number: e.data.order_id,
                currency: e.data.currency,
                price: parseInt(e.data.gross_amount)
            }

            axiosApi.post(`/payment/webinarPayment`, payload)
            .then(res => {
                var r = res.data;
                if (r.status) {
                    sideNotification.open('Transaksi Berhasil', 'Terima kasih telah melakukan pendaftaran Webinar.', true);
                    setModal({...modal, auth3dsModal: false})
                    window.location.assign("/webinar/payment/success/" + r.data.id)
                } else {
                    sideNotification.open("Informasi", r.message, false);
                }
            });
        }
        if (e.data.status_code === "202") {
            // status message = Card is not authenticated.
            // transaction_status = deny
            setModal({...modal, auth3dsModal: false})
            sideNotification.open('Verifikasi Gagal!', 'Silahkan ulangi pembayaran dan masukkan OTP yang benar.', false);
        }
    };

    // iframe has loaded
    const onReady = () => {
        // Do something
    };

    const handleCardCVVInvalid = () => {
        //message.error('CVV / CVC is invalid. Please input valid CVV / CVC');
    }
    const handleCardNumberInvalid = () => {
        //message.error('Card Number is invalid. Please input valid Card Number');
    }
    const handleCardExpiredError = () => {
        //message.error('Expired Data is invalid. Please input valid Expired Data');
    }

    return (
        <Fragment>
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
                        frameBorder: 0,
                    }}
                    handleReady={onReady}
                    handleReceiveMessage={onReceiveMessage}
                />
            </Modal>
            <Modal 
                title="Pembayaran Kartu Debit / Kredit" 
                centered
                visible={props.paymentReducer.isCreditCardModalVisible}
                onCancel={() => props.hideCreditCardModal()}
                footer={[
                    <Fragment key="fragment">
                        <p className="f-13 mt-0 mb-1" key="terms" style={{float: "left"}}
                            >Dengan menyelesaikan pembelian, Anda menyetujui <a href="/terms" className="font-weight-bold">Ketentuan Layanan</a> ini.
                        </p>
                        <Button key="pay" type="primary" loading={false} block onClick={handleCreateToken} loading={loading.isButtonPaymentLoading}>Bayar</Button>
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
    hideCreditCardModal: () => dispatch(hideCreditCardModal())
})

export default connect(reduxState, reduxDispatch)(CreditCard);