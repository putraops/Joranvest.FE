import React, { Fragment, useState, useEffect } from 'react'

import { Row, Col } from 'reactstrap';
import axiosApi from '../../config/axiosConfig';
import { Button, Card, Alert, Radio, List, Skeleton, Modal } from 'antd';
import { Image, message  } from 'antd';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Collapse } from 'antd';
import TransferModal from './components/Modals/Transfer'
import CreditCardModal from './components/Modals/CreditCard'
import EWalletModal from './components/Modals/EWalletModal';
import actions from './actions/actions';
import midtrans from './actions/midtrans';
import paymentMethod from './payment-method';

import sideNotification from '../../commons/sideNotification';
import * as services from './actions/services';
import { showEWalletModal, showTransferModal, showCreditCardModal } from '../../config/redux/action/payment';

const { Panel } = Collapse;

const Webinar = props => {
    const [paymentType, setPaymentType] = useState('')
    const [isPaymentAvailable, setIsPaymentAvailable] = useState(true)
    const [webinarRecord, setWebinarRecord] = useState({})
    const [totalPrice, setTotalPrice] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({});
   
    const [loading, setLoading] = useState({
        isSummaryLoading: true,
        isButtonPaymentLoading: false,
    });
    const [modal, setModal] = useState({
        gopayQRModal: false,
        eWalletModal: true
    });
    const [gopayQRUrl, setGopayQRUrl] = useState('')
                                        
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
        if (!user) {
            sideNotification.open("Peringatan!", "Silahkan Login terlebih dahulu.", false)
            return;
        }

        if (paymentType == "transfer_bca") {
            props.showTransferModal();
        } else if (paymentType == "credit_card") {
            props.showCreditCardModal();
        } else if (paymentType == "gopay") {            
            handleGopayCharge();
        } else if (paymentType.toUpperCase() === "OVO" || paymentType.toUpperCase() === "LINKAJA") {
            handleEWalletCharge(paymentType);
        } else {
            sideNotification.open("Peringatan!", "Silahkan Pilih Tipe Pembayaran terlebih dahulu.", false)
        }
    }

    const handleEWalletCharge = async (paymentType) => {
        // setAuth3dsUrl(r.data.redirect_url);
        // setModal({...modal, cardModal: false, auth3dsModal: true})
        setLoading({...loading, isButtonPaymentLoading: true});
        services.CreateEWalletPayment({
            amount: 100,
            phone_number: "+6281340810046",
            payment_type: "LINKAJA",
            record_id: webinarRecord.id,
            payment_request: "Webinar"
        }).then(res => {
            var r = res.data;
            setLoading({...loading, isButtonPaymentLoading: false});

            if (r.Status) {
                if (paymentType === "LINKAJA") {
                    window.location.replace(r.Data.actions.desktop_web_checkout_url)
                    //setEWalletUrl(r.Data.actions.desktop_web_checkout_url);
                    //setModal({...modal, eWalletModal: true});
                }
            }
        }).catch(res => {
            setLoading({...loading, isButtonPaymentLoading: false});
        });
    }

    const handleGopayCharge = async () => {
        setLoading({...loading, isButtonPaymentLoading: true});
        if (!webinarRecord) {
            message.error("Koneksi internet tidak stabil. Silahkan Refresh halaman ini.");
            return;
        }

        var payload = {
            "payment_type": paymentType,
            "transaction_details": {
                "order_id": actions.generateOrderNumber(paymentType),
                "gross_amount": totalPrice
            },
            "gopay": {
                "enable_callback": true,
                "callback_url": "someapps://callback"
            },
            "item_details": [{
                "id": webinarRecord.id,
                "price": totalPrice,
                "quantity": 1,
                "name": "(Webinar) " + webinarRecord.title,
            }],
            "customer_details": customerDetails
        }
        
        const res = await midtrans.payment(payload).catch(err => err);
        if (res != "") {
            setGopayQRUrl(res);
            setModal({...modal, gopayQRModal: true});
            setLoading({...loading, isButtonPaymentLoading: false})
        }
    }

    function hideGopayQRModal() {
        setModal({...modal, gopayQRModal: false});
    }

    function sectionPayment (paymentMethod) {
        const listItems = paymentMethod.map((items) =>
            <Fragment key={items.key}>
                {items.has_children ? (
                    <Collapse 
                        accordion={false} className='mb-1'
                        defaultActiveKey={items.key}
                        key={items.key}>
                        <Panel
                            key={items.key}
                            header={<span className="font-weight-bold">{items.title}</span>}>
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
                                            avatar={
                                                <Image
                                                    className="mt-1"
                                                    width={item.width}
                                                    preview={false} 
                                                    src={item.img} />
                                            }
                                            title={<p className={`${items.key === "transfer_bank" ? "d-none" : "mt-1 mb-0"}`}>{item.name}</p>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Panel>
                    </Collapse>
                ) : (
                    <List className='mb-1'
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
                        id="gopay-qris"
                        centered
                        visible={modal.gopayQRModal}
                        onCancel={hideGopayQRModal}
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
                    </Modal>

                    <CreditCardModal record_id={props.match.params.id} customer={customerDetails} product_name={webinarRecord.title} price={totalPrice} payment_type={paymentType} />
                    <TransferModal record_id={props.match.params.id} price={totalPrice} payment_type={paymentType} />
                    <EWalletModal record_id={props.match.params.id} price={totalPrice} payment_type={paymentType} />

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
                                            
                                <button type="submit" 
                                    className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius"
                                    onClick={() => handlePayment()}
                                    disabled={isPaymentAvailable || loading.isButtonPaymentLoading}>
                                    {loading.isButtonPaymentLoading ? 
                                        <span><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Sedang diproses...</span>
                                        : <span>Selesaikan Pembayaran</span>
                                    }
                                </button>
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
    showEWalletModal: () => dispatch(showEWalletModal()),
    showCreditCardModal: () => dispatch(showCreditCardModal()),
})

export default connect(reduxState, reduxDispatch)(Webinar);