import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { Button, Card, Alert, Radio, List } from 'antd';
import NumberFormat from "react-number-format";
import baseUrl from '../../config/baseUrl';
import { connect } from 'react-redux';

class Membership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordId: this.props.match.params.id,
            defaultPayment: "BankTransfer",
            isMember: false,
            membershipRecord: {},
            payload: {
                id: "",
                application_user_id: this.props.user ? this.props.user.id : "",
                membership_id: this.props.match.params.id,
                payment_status: 200,
                payment_type: "BankTransfer"
            }
        };
    }

    componentDidMount() {
        const { recordId } = this.state;
        window.scrollTo(0, 0);
        this.loadData(recordId);
    }

    loadData = (value) => {
        const { user } = this.props
        let _isMember = false;
        
        if (user && user.is_membership) {
            _isMember = true;
        }

        axiosApi.get(`/membership/getById/${value}`)
        .then(res => {
            var r = res.data;
            console.log("getMembership: ", r);
            if (r.status) {
                this.setState({
                    ...this.state,
                    membershipRecord: r.data,
                    isMember: _isMember,
                })
            }
        });
    }

    handlePayment = () => {
        const { payload } = this.state
        axiosApi.post(`/membershipUser/save`, payload)
        .then(res => {
            var r = res.data
            console.log(r.data);
            if (r.status) {
               this.getUserDetail();
            }
        });
    }

    getUserDetail = () => {
        axiosApi.get(`/application_user/getViewById/${this.props.user.id}`)
        .then(res => {
            var r = res.data
            if (r.status) {
                localStorage.setItem("joranvestUser", JSON.stringify(r.data));
                window.location.assign(baseUrl + "/membership/payment-success");
            }
        });
    }
    
    handlePaymentTypeChange = e => {
        const {payload} = this.state
        this.setState({
            ...this.state,
            payload: {
                ...payload,
                payment_type: e.target.value
            }
        })
    };

    render() {
        const { defaultPayment, loading, membershipRecord, isMember } = this.state;
        console.log("render state: ", this.state);
        const paymentTypes = [
            {
                name: "Transfer",
                value: "BankTransfer",
            },
            {
                name: "Kartu Kredit / Debit",
                value: "Card",
            },
            {
                name: "Transfer Virtual Account",
                value: "VA",
            }
        ];
      
        return (
            <React.Fragment>
                <section className="section home-1-bg" id="home">
                    <div className="container mt-5">
                        <Row className="">
                            {(() => {
                                if (isMember) {
                                    return (
                                        <Col sm="12 mb-3">
                                            <Alert
                                                message={<strong>Kamu sudah terdaftar sebagai Member.</strong>}
                                                description={
                                                    <Fragment>
                                                        <span className="f-14">Kembali ke halaman utama. Click <a href="/" className="font-weight-bold">disini</a>.</span>
                                                    </Fragment>
                                                }
                                                type="success"
                                                />
                                        </Col>
                                    )
                                }
                            })()}
                            <Col md="7" className="mb-3">
                            <p className="f-20 mb-2 font-weight-bold">Checkout</p>
                                <Row>
                                    <Col xs="12" md="12" lg="12">
                                        <Radio.Group onChange={this.handlePaymentTypeChange}  name="radiogroup" defaultValue={defaultPayment} style={{width: "100%"}}>
                                            <List
                                                size="large"
                                                bordered
                                                dataSource={paymentTypes}
                                                renderItem={item =>
                                                    <List.Item
                                                    actions={[<Radio className="pull-right" checked={true} value={item.value}></Radio>]}>
                                                            <span className="font-weight-bold">{item.name}</span>
                                                    </List.Item>}
                                            />
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="5" className="mb-2">
                                <Card className="borderShadow5">
                                    <p className="f-20 mb-2 font-weight-bold">Ringkasan</p>
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
                                    <span className="f-13">Dengan menyelesaikan pembelian, Anda menyetujui <a href="/terms" className="font-weight-bold">Ketentuan Layanan</a> ini.</span>
                                    {(() => {
                                        if (isMember) {
                                            return (
                                                <Button type="primary" className="mt-3" block disabled>Selesaikan Pembayaran</Button>
                                            )
                                        } else {
                                            return (
                                                <Button type="primary" className="mt-3" block onClick={() => this.handlePayment()} >Selesaikan Pembayaran</Button>
                                            )
                                        }
                                    })()}
                                </Card>
                            </Col>
                        </Row>
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, null)(Membership);
// export default withRouter();