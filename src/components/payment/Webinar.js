import React, { Fragment, useState, useEffect } from 'react'

import { Row, Col } from 'reactstrap';
import axiosApi from '../../config/axiosConfig';
import { Button, Card, Alert, Radio, List, Skeleton, Modal } from 'antd';
import { Form, Input, InputNumber, Image, Space, Tooltip, Typography, notification, message  } from 'antd';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Collapse } from 'antd';
import payment from '../../services/paymentService';
import TransferModal from './components/Modals/Transfer'
import CreditCardModal from './components/Modals/CreditCard'
import GopayModal from './components/Modals/Gopay'
import paymentMethod from './payment-method';

import sideNotification from '../../commons/sideNotification';
import { showTransferModal, showCreditCardModal, showGopayModal } from '../../config/redux/action/payment';

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
    const [gopayQRUrl, setGopayQRUrl] = useState('')
    const [uniqueNumber, setUniqueNumber] = useState(0)
                                        
    const handlePaymentTypeChange = e => {
        setPaymentType(e.target.value)
    };

    useEffect(() => {
        loadData(props.match.params.id);
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
            if (r.status) {
                setLoading({...loading, isSummaryLoading: false});
                setWebinarRecord(r.data);
                setTotalPrice(r.data.price - r.data.discount);
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

    const handlePayment = () => {
        const { user } = props
        setLoading({...loading, isButtonCardPaymentLoading: false});
        if (!user) {
            sideNotification.open("Peringatan!", "Silahkan Login terlebih dahulu.", false)
            return;
        }

        if (paymentType == "transfer_bca") {
            props.showTransferModal();
        } else if (paymentType == "credit_card") {
            props.showCreditCardModal();
        } else if (paymentType == "gopay") {
            handleCharge();
        } else {
            sideNotification.open("Peringatan!", "Silahkan Pilih Tipe Pembayaran terlebih dahulu.", false)
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
                "order_id": "JORAN/" + prePaymentType + "/" + today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate() + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds(),
                "gross_amount": webinarRecord.price
            },
            "credit_card": payloadCreditCard,
            "gopay": payloadGopay,
            "item_details": [{
                "id": webinarRecord.id,
                "price": webinarRecord.price,
                "quantity": 1,
                "name": "(Webinar) " + webinarRecord.title,
            }],
            "customer_details": customerDetails
        }
        
        axiosApi.post(`/payment/charge`, payload)
        .then(res => {
            var r = res.data
            if (r.status || 
                (r.data.status_code === "201" && (r.data.payment_type === "credit_card" || r.data.payment_type === "gopay"))) {
                if (paymentType === "gopay") {
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
                        props.showGopayModal();
                    }
                }
            } else {
                sideNotification.open("Kartu tidak Valid", "Silahkan masukkan informasi Kartu yang benar.", false);
            }
        });
    }

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
                    
                    <CreditCardModal record_id={props.match.params.id} customer={customerDetails} product_name={webinarRecord.title} price={totalPrice} payment_type={paymentType} />

                    <GopayModal record_id={props.match.params.id} price={totalPrice} url={gopayQRUrl} payment_type={paymentType} />
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
    showTransferModal: () => dispatch(showTransferModal()),
    showCreditCardModal: () => dispatch(showCreditCardModal()),
    showGopayModal: () => dispatch(showGopayModal())
})

export default connect(reduxState, reduxDispatch)(Webinar);