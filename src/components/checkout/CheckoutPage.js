import React, { Fragment, useState, useEffect } from 'react'

import { Row, Col } from 'reactstrap';
import axiosApi from '../../config/axiosConfig';
import { Image, Card, Alert, Radio, List, Skeleton } from 'antd';
import { connect } from 'react-redux';
import Footer from '../Footer';
import { Collapse } from 'antd';

import NotFound from '../main/NotFound';
import { TransferModal } from './components/Modals/TransferModal'
import CreditCardModal from './components/Modals/CreditCard'
import { EWalletModal } from './components/Modals/EWalletModal';
import { WebinarSummary, MembershipSummary } from './components/Summary';

// import { ApplicationMenuDeleteDialog } from "./form/ApplicationMenuDeleteDialog";

// import actions from './actions/actions';
// import midtrans from './actions/midtrans';
import paymentMethod from './payment-method';

import './style/style.css';

import sideNotification from '../../commons/sideNotification';
import * as services from './services/service';
import { showEWalletModal, showTransferModal, showCreditCardModal } from '../../config/redux/action/payment';
import baseUrl from '../../config/baseUrl';
import { QRModal } from './components/Modals/QRModal';
import { MembershipInformation } from './components/MembershipInformation';

const { Panel } = Collapse;

const CheckoutPage = props => {
    const [isDataFound, setIsDataFound] = useState(true);
    const [productCategory, setProductCategory] = useState(null);
    const [recordId, setRecordId] = useState(null);
    const [paymentType, setPaymentType] = useState('')
    const [isWebinarRegistered, setIsWebinarRegistered] = useState(false);
    const [isUserRegisteredAsMember, setIsUserRegisteredAsMember] = useState(false);

    const [webinarRecord, setWebinarRecord] = useState(null)
    const [membershipRecord, setMembershipRecord] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({});
    const [qrCodeString, setQrCodeString] = useState("");
   
    const [loading, setLoading] = useState({
        isButtonPaymentLoading: false,
    });
    const [modal, setModal] = useState({
        eWalletModal: false,
        transferModalShow: false,
        qrModalShow: false
    });
                                        
    const handlePaymentTypeChange = e => {
        setPaymentType(e.target.value)
    };


    useEffect(() => {
        if (props.match && props.match.params) {
            setProductCategory((props.match.params.product_category).toLowerCase());
            setRecordId(props.match.params.product_id)
        }
        loadData();
        //isWebinarRegistered(props.match.params.product_id);
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
    }, [recordId]);

    function loadData(){
        if (recordId && productCategory) {
            if (services.isServiceAvailable(productCategory)) {
                if (productCategory === "webinar") {
                    services.getWebinarById(recordId).then(res => {
                        var r = res.data;
                        setWebinarRecord(r.data);

                        if (r.status) {
                            //-- Set Price for Webinar
                            setTotalPrice(r.data.price);
                            checkIsWebinarRegistered(recordId);
                        }
                        if (!r.status && (r.message).toLowerCase() === "record not found") {
                            setIsDataFound(false);
                        }
                    }).catch(res => {
                        setLoading({...loading, isButtonPaymentLoading: false});
                    });
                } else if (productCategory === "membership") {
                    services.getMembershipById(recordId).then(res => {
                        var r = res.data;
                        setMembershipRecord(r.data);

                        if (r.status) {
                            //-- Set Price for Membership
                            setTotalPrice(r.data.price * r.data.duration);
                            setIsUserRegisteredAsMember(props.user.is_membership)
                        }
                        if (!r.status && (r.message).toLowerCase() === "record not found") {
                            setIsDataFound(false);
                        }
                    }).catch(res => {
                        setLoading({...loading, isButtonPaymentLoading: false});
                    });
                }
            } else {
                setIsDataFound(false);
            }
        }
    }

    function checkIsWebinarRegistered(id){
        axiosApi.get(`/webinar_registration/isWebinarRegistered/${id}`)
        .then(res => {
            var r = res.data;
            setIsWebinarRegistered(r.status);
        });
    }

    const handlePayment = () => {
        const { user } = props
        if (!user) {
            sideNotification.open("Peringatan!", "Silahkan Login terlebih dahulu.", false)
            return;
        }

        if (paymentType == "transfer_bca") {
            setModal({...modal, transferModalShow: true});
        } else if (paymentType == "credit_card") {
            props.showCreditCardModal();
        } else if (paymentType.toUpperCase() === "OVO") {
            setModal({...modal, eWalletModal: true})
        } else if (paymentType.toUpperCase() === "LINKAJA" || paymentType.toUpperCase() === "DANA" ||paymentType.toUpperCase() === "SHOPEEPAY") {
            handleEWalletCharge(null);
        } else if (paymentType.toUpperCase() === "QRIS") {
            handleQRPayment();
        } else {
            sideNotification.open("Peringatan!", "Silahkan Pilih Tipe Pembayaran terlebih dahulu.", false)
        }
    }

    const handleQRPayment = async () => {
        setLoading({...loading, isButtonPaymentLoading: true});

        let amount = 0;
        if (productCategory === "webinar") { 
            amount = webinarRecord.price - webinarRecord.discount;
        } else {
            amount = membershipRecord.price * membershipRecord.duration;
        }

        amount = 1500;

        services.CreateQRCode({
            amount: amount,
            product_name: productCategory,
            record_id: recordId,
        }).then(res => {
            var r = res.data;
            console.log(r);

            if (r.status) {
                setQrCodeString(r.data.qr_string);
                setModal({...modal, qrModalShow: true});
            } else {
                sideNotification.open("Gagal", r.message, false);
            }
            
            setLoading({...loading, isButtonPaymentLoading: false});
        }).catch(res => {
            setLoading({...loading, isButtonPaymentLoading: false});
        });
    }

    const handleEWalletCharge = async (phoneNumber) => {
        setLoading({...loading, isButtonPaymentLoading: true});

        let amount = 0;
        if (productCategory === "webinar") { 
            amount = webinarRecord.price - webinarRecord.discount;
        } else {
            amount = membershipRecord.price * membershipRecord.duration;
        }

        services.CreateEWalletPayment({
            amount: amount,
            phone_number: phoneNumber === null ? "+62" : phoneNumber,
            payment_type: paymentType,
            record_id: recordId,
            payment_request: productCategory,
            success_redirect_url: baseUrl + "/payment/status"
        }).then(res => {
            var r = res.data;
            console.log(r);
            if (r.status) {
                if (paymentType === "OVO") {
                    window.location.replace(baseUrl + "/payment/status/" + r.data.metadata.record_id);
                } else if (paymentType === "DANA" || paymentType === "LINKAJA") {             
                    window.location.replace(r.data.actions.desktop_web_checkout_url);
                } else if (paymentType === "SHOPEEPAY") {
                    window.location.replace(r.data.actions.mobile_deeplink_checkout_url);
                } else {
                    sideNotification.open("Gagal", "Tipe Pembayaran tidak terdaftar.", false);
                    setLoading({...loading, isButtonPaymentLoading: false});
                }
            } else {
                setLoading({...loading, isButtonPaymentLoading: false});
            }
        }).catch(res => {
            setLoading({...loading, isButtonPaymentLoading: false});
        });
    }  

    function sectionPaymentMethod (paymentMethod) {
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
                                            className={`${items.key === "ewallet" ? "ant-list-item-meta-ewallet" : ""}`}
                                            avatar={
                                                <Image
                                                    className="mt-1"
                                                    width={item.width}
                                                    style={{marginLeft: `${item.marginLeft}`}}
                                                    preview={false} 
                                                    src={item.img} />
                                            }
                                            title={<p className={`${items.key === "transfer_bank" ? "d-none" : "payment-method-title mb-0"}`}>{item.name}</p>}
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
            <section className="section ">
                <div className="container mt-4">
                    {/* <CreditCardModal record_id={props.match.params.recordId} customer={customerDetails} product_name={webinarRecord.title} price={totalPrice} payment_type={paymentType} /> */}
                    <TransferModal 
                        isModalShow={modal.transferModalShow}
                        setHide={() => setModal({...modal, transferModalShow: false})}
                        recordId={recordId}
                        user={props.user}
                        paymentType={paymentType}
                        price={totalPrice}/>

                    <EWalletModal 
                        isModalShow={modal.eWalletModal}
                        setHide={() => setModal({...modal, eWalletModal: false})}
                        isSubmitLoading={loading.isButtonPaymentLoading} 
                        handleCharge={handleEWalletCharge}/>

                        
                    <QRModal 
                        isModalShow={modal.qrModalShow}
                        setHide={() => setModal({...modal, qrModalShow: false})}
                        qrString={qrCodeString}
                        />

                    <Row>
                        <Col sm="12" className="mt-3 mb-5">
                            {!props.user ?
                                <Alert
                                    message={<span style={{fontWeight: "500"}}>Silahkan login terlebih dahulu untuk melakukan Pembayaran.</span>}
                                    description={
                                        <Fragment>
                                            <span className="f-14">Silahkan Login <a href="/login" className="font-weight-bold">disini</a>.</span>
                                        </Fragment>
                                    }
                                    type="warning"
                                /> :
                                <>
                                    {!isWebinarRegistered && !isUserRegisteredAsMember &&
                                        <Alert
                                            message={<span style={{fontWeight: "500"}}>Silahkan Pilih Tipe Pembayaran untuk melakukan pembayaran.</span>}
                                            description={
                                                <Fragment>
                                                    <span className="f-14">Setiap jenis pembayaran menggunakan <strong>Kartu</strong> akan dilakukan verifikasi.</span>
                                                </Fragment>
                                            }
                                            type="info"
                                        />
                                    }
                                </>
                            }

                            {isDataFound ?
                                <Row>
                                    <Col md="12" className="mb-4">
                                        {(() => {
                                            if (isUserRegisteredAsMember) {
                                                return (
                                                    <MembershipInformation record={membershipRecord} user={props.user} />
                                                )
                                            } else if (isWebinarRegistered) {
                                                return (
                                                    <Alert
                                                        message={<span style={{fontWeight: "500"}}>Kamu sudah terdaftar dalam Webinar.</span>}
                                                        description={
                                                            <Fragment>
                                                                <span className="f-14">Kembali ke halaman utama <a href="/" className="font-weight-bold">disini</a>.</span>
                                                            </Fragment>
                                                        }
                                                        type="warning"
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
                                                            return sectionPaymentMethod(paymentMethod);
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
                                            
                                            {(() => {
                                                if (productCategory === "webinar") {
                                                    return (
                                                        <WebinarSummary webinarRecord={webinarRecord}/>
                                                    )
                                                } else {
                                                    return (
                                                        <MembershipSummary membershipRecord={membershipRecord}/>
                                                    )
                                                }
                                            })()}
                                            <span className="f-13">Dengan menyelesaikan pembelian, Anda menyetujui <a href="/terms" className="font-weight-bold">Ketentuan Layanan</a> ini.</span>
                                                        
                                            <button type="submit" 
                                                className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius"
                                                onClick={() => handlePayment()}
                                                disabled={isWebinarRegistered || loading.isButtonPaymentLoading}>
                                                {loading.isButtonPaymentLoading ? 
                                                    <span><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Sedang diproses...</span>
                                                    : <span>{isUserRegisteredAsMember ? "BAYAR" : "Selesaikan Pembayaran"}</span>
                                                }
                                            </button>
                                        </Card>
                                    </Col>
                                </Row>
                                : <NotFound />
                            }
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

export default connect(reduxState, reduxDispatch)(CheckoutPage);