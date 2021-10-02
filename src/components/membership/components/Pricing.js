import React from 'react';
import { Row, Col } from 'reactstrap';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux'
import { Typography, Modal, Card, Button, message, Radio, List } from 'antd';
import { Steps } from 'antd';
import { CheckOutlined, SolutionOutlined, ExclamationCircleOutlined, CreditCardOutlined, HourglassOutlined } from '@ant-design/icons';
import axiosApi from '../../../config/axiosConfig';

const { Step } = Steps;
const { Text } = Typography;
const { confirm } = Modal;

class Pricing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isButtonLoading: false,
            currentStep: 0,
            value: 1,
            defaultPayment: "BankTransfer",
            payload: {
                id: "",
                application_user_id: this.props.user ? this.props.user.id : "",
                membership_id:"",
                payment_status: 200,
                payment_type: "BankTransfer"
            }
        };
    }

    showConfirm = () => {
        const { user } = this.props
        confirm({
          title: 'Silahkan login terlebih dahulu.',
          icon: <ExclamationCircleOutlined />,
          content: 'Apakah kamu ingin login?',
          okText: <a href="/login">Login</a>,
          cancelText: 'Tutup',
          onOk() {
          },
        });
    }

    handleMembership = (value) => {
        const { payload } = this.state
        const { user } = this.props
        if (user && user.is_membership) {
            message.success('Kamu sudah terdaftar sebagai member.', 10);
        } else if (user && !user.is_membership) {
            this.setState({
                ...this.state,
                isButtonLoading: true,
            })
            axiosApi.get(`/membership/getById/${value}`)
            .then(res => {
                var r = res.data;
                if (r.status) {
                    this.setState({
                        ...this.state,
                        isVisible: true,
                        isButtonLoading: false,
                        currentStep: 0,
                        membershipRecord: r.data,
                        defaultPayment: "BankTransfer",
                        payload: {
                            ...payload,
                            membership_id: r.data.id
                        }
                    })
                }
                console.log("currentState: ", this.state);
            });
        } else {
            this.showConfirm();
        }
    }

    handleModal = (value) => {
        const {payload} = this.state
        this.setState({
            ...this.state,
            isVisible: value,
            payload: {
                ...payload,
                membership_id: ""
            }
        })
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

    next = () => {
        const { currentStep, payload } = this.state
        console.log(this.state);

        if (currentStep == 2) {
            // -- Do Payment
            axiosApi.post(`/membershipUser/save`, payload)
            .then(res => {
                var r = res.data
                console.log(r.data);
                if (r.status) {
                    this.setState({
                        ...this.state,
                        currentStep: currentStep + 1
                    })
                }
            });
        } else {
            this.setState({
                ...this.state,
                currentStep: currentStep + 1
            })
        }


        this.setState({
            ...this.state,
            currentStep: currentStep + 1
        })
    }

    prev = () => {
        const { currentStep } = this.state
        this.setState({
            ...this.state,
            currentStep: currentStep - 1
        })
    };

    render() {
        const { isVisible, isButtonLoading, defaultPayment, membershipRecord } = this.state;
        const { pricings } = this.props;
        const { Step } = Steps;
        const { currentStep } = this.state

        const data = [
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

        const steps = [
            {
              title: 'First',
              content:
                <Row>
                    <Col md="12" className="mb-2">
                        <Card className="borderShadow5">
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
                                    <tr>
                                        <th>
                                            <p className="font-weight-bold mb-0" style={{fontSize: "25px"}}>TOTAL</p>
                                        </th>
                                        <th className="text-right">
                                            <p className="font-weight-bold mb-0" style={{fontSize: "25px"}}><NumberFormat
                                                                value={membershipRecord ? membershipRecord.price * membershipRecord.duration : 0}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                prefix="Rp "
                                                                /></p>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                            <Row>
                                <Col xs="12">
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>,
            },
            {
                title: 'Second',
                content:
                <Row>
                    <Col md="12" className="mb-2">
                        <Card className="borderShadow5">

                            <Row>
                                <Col xs="12" md="12" lg="12">
                                    <Radio.Group onChange={this.handlePaymentTypeChange}  name="radiogroup" defaultValue={defaultPayment} style={{width: "100%"}}>
                                        <List
                                            size="large"
                                            bordered
                                            dataSource={data}
                                            renderItem={item =>
                                                <List.Item
                                                    actions={[<Radio className="pull-right" checked={true} value={item.value}></Radio>]}>
                                                        <span className="font-weight-bold">{item.name}</span>
                                                </List.Item>}
                                        />
                                    </Radio.Group>
                                </Col>
                                {/* <Col xs="12" md="12" lg="12">
                                    <p className="font-weight-bold mt-3 mb-1">Ringkasan Pembayaran</p>
                                    <table style={{width: "100%"}}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="mb-0">Total Tagihan</p>
                                                </td>
                                                <td className="text-right align-top">
                                                    <p className="font-weight-bold mb-0" >Rp 869.000</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="mb-0">Biaya Layanan</p>
                                                </td>
                                                <td className="text-right align-top">
                                                    <p className="mb-0" >Rp 0</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col> */}
                            </Row>
                        </Card>
                    </Col>
                </Row>,
            },
            {
                title: 'Fourth',
                content:
                <Row>
                    <Col md="12" className="mb-2">
                        <Card className="borderShadow5">
                            <Row>
                                <Col xs="12" md="12" lg="12">
                                    <p className="font-weight-bold mt-0 mb-1">Proses Pembayaran disini</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>,
              },
            {
              title: 'Last',
              content:
              <Row>
                  <Col md="12" className="mb-2">
                      <Card className="borderShadow5">
                          <Row>
                              <Col xs="12" md="12" lg="12" className="text-center">
                                  <CheckOutlined className="font-weight-bold text-muted" style={{fontSize: "70px"}} />
                                  <p className="font-weight-bold mt-2 mb-0 text-muted" style={{fontSize: "20px"}}>Terima kasih telah Berlangganan.</p>
                              </Col>
                          </Row>
                      </Card>
                  </Col>
              </Row>,
            },
        ];

        return (
            <React.Fragment>
                <Row>
                    <Modal
                        className="modal-pricing"
                        title="Daftar Membership"
                        centered
                        visible={isVisible}
                        onOk={() => this.handleModal(false)}
                        onCancel={() => this.handleModal(false)}
                        width={1200}
                    >
                        <>
                        {/* <Steps current={currentStep}>
                            {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                            ))}
                        </Steps> */}
                        <Steps current={currentStep}>
                            <Step title="Informasi" icon={<SolutionOutlined />} />
                            <Step title="Tipe Pembayaran" icon={<CreditCardOutlined />} />
                            <Step title="Pembayaran" icon={<HourglassOutlined />} />
                            <Step title="Selesai" icon={<CheckOutlined />} />
                        </Steps>
                        <div className="steps-content">
                            <div className="mt-4">
                                {steps[currentStep].content}
                                {/* <Divider className="mt-3 mb-3" /> */}
                            </div>
                        </div>
                        <div className="steps-action text-right mt-3">
                            {currentStep > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                    kembali
                                </Button>
                            )}
                            {currentStep < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    Lanjut
                                </Button>
                            )}
                            {currentStep === steps.length - 1 && (
                                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                    Selesai
                                </Button>
                            )}
                        </div>
                        </>
                    </Modal>
                    {pricings.map((item, index) => {
                        return  <Col lg="3" md="6" sm="6" xs="12" key={index}>
                                    <div className={item.is_default ? "pricing-box borderShadow5 active mt-4" : "pricing-box borderShadow5 mt-4"}>
                                        <div className="price bg-light position-relative p-4 p">
                                            <div className="float-left">
                                                <h5 className="text-dark title mt-2 font-weight-normal f-18 mb-0">{item.name}</h5>
                                            </div>
                                            <div className="">
                                                <h2 className="text-dark font-weight-normal text-right mb-0">
                                                    {
                                                        <Text className={item.is_default ? "text-white" : "text-dark"}>
                                                            <NumberFormat
                                                                value={item.price}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                prefix=""
                                                                />
                                                        </Text>
                                                    }
                                                </h2>
                                            </div>
                                            <div className="text-right">
                                                <span className={item.is_default ? "text-white" : "text-dark"}>per bulan</span>
                                            </div>
                                        </div>
                                        <div className="p-4 pricing-list">
                                            <ul className="list-unstyled mb-0">
                                                <li className="text-muted f-14">Durasi {item.duration} Bulan</li>
                                                <li className="text-muted f-14">
                                                    {
                                                        <Text className="text-muted f-14">
                                                            <NumberFormat
                                                                value={item.total_saving == 0 ? "-" : item.total_saving}
                                                                displayType="text"
                                                                thousandSeparator={true}
                                                                prefix="Hemat Rp "
                                                                />
                                                        </Text>
                                                    }
                                                </li>
                                                <li className="text-muted mb-0 f-14" style={{minHeight: "50px"}}>* {item.description}</li>
                                            </ul>
                                        </div>
                                        <div className="pl-4 mb-4 mt-2">
                                            <Button
                                                type="primary"
                                                className={item.is_default ? "btn btn-outline btn-sm text-normal active" : "btn btn-outline text-normal btn-sm"}
                                                // icon={<PoweroffOutlined />}
                                                loading={isButtonLoading}
                                                onClick={() => this.handleMembership(item.id)}
                                            >
                                            Beli Sekarang
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                        })
                    }

                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
  }
export default connect(mapStateToProps, null)(Pricing);