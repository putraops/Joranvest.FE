import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import NumberFormat from "react-number-format";
import { Typography, Modal, Card, Button, message, Divider, Radio, Space, List } from 'antd';
import { Steps } from 'antd';
import { CheckOutlined, SolutionOutlined, LoadingOutlined, CreditCardOutlined, HourglassOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { Text } = Typography;


class Pricing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            currentStep: 0,
            value: 1
        };
    }

    handleVisible = (value) => {
        console.log(this.state);
        this.setState({
            ...this.state,
            isVisible: value
        })
        console.log(this.state);
    }
    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };

    next = () => {
        const { currentStep } = this.state
        if (currentStep == 2) {
            //-- Do Payment
        } else {
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
        const { value } = this.state;
        const { isVisible } = this.state;
        const { pricings } = this.props;
        const { Step } = Steps;
        const { currentStep } = this.state

        const data = [
            {
                name: "Transfer",
                value: 1,
            },
            {
                name: "Kartu Kredit / Debit",
                value: 12,
            },
            {
                name: "Transfer Virtual Account",
                value: 3,
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
                                            <p className="mb-0 f-18">Premium</p>
                                            <p className="mb-0">Durasi 12 Bulan</p>
                                            <p className="mb-3">Hemat Rp 360.000</p>
                                        </td>
                                        <td className="text-right align-top">
                                            <p className="mb-0">Rp 69.000 / bulan</p>
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
                                            <p className="font-weight-bold mb-0" style={{fontSize: "25px"}}>Rp 869.000</p>
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
                                    <Radio.Group onChange={this.onChange} value={value} style={{width: "100%"}}>
                                        <List 
                                            size="large"
                                            bordered
                                            dataSource={data}
                                            renderItem={item => 
                                                <List.Item
                                                    actions={[<Radio name="putr" className="pull-right" value={item.value}></Radio>]}>
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
                        onOk={() => this.handleVisible(false)}
                        onCancel={() => this.handleVisible(false)}
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
                        return  <Col lg="3" md="6" sm="6" xs="6" key={index}>
                                    <div className={item.is_default ? "pricing-box borderShadow5 active mt-4" : "pricing-box borderShadow5 mt-4"}>
                                        <div className="price bg-light position-relative p-4 p">
                                            <div className="float-left">
                                                <h5 className="text-dark title mt-2 font-weight-normal f-18 mb-0">{item.name}</h5>
                                            </div>
                                            <div className="">
                                                <h2 className="text-dark font-weight-normal text-right mb-0">{
                                                                            <Text className={item.is_default ? "text-white" : "text-dark"}>
                                                                                <NumberFormat
                                                                                    value={item.price}
                                                                                    displayType="text"
                                                                                    thousandSeparator={true}
                                                                                    prefix=""
                                                                                    />
                                                                            </Text>}
                                                </h2>
                                            </div>
                                            <div className="text-right">
                                                <span className={item.is_default ? "text-white" : "text-dark"}>per bulan</span>
                                            </div>
                                        </div>
                                        <div className="p-4 pricing-list">
                                            <ul className="list-unstyled mb-0">
                                                <li className="text-muted f-14">Durasi {item.duration} Bulan</li>
                                                <li className="text-muted f-14">{
                                                                                <Text className="text-muted f-14">
                                                                                    <NumberFormat
                                                                                        value={item.total_saving == 0 ? "-" : item.total_saving}
                                                                                        displayType="text"
                                                                                        thousandSeparator={true}
                                                                                        prefix="Hemat Rp "
                                                                                        />
                                                                                </Text>
                                                                                }</li>
                                                <li className="text-muted mb-0 f-14" style={{minHeight: "50px"}}>* {item.description}</li>
                                            </ul>
                                        </div>
                                        <div className="pl-4 mb-4 mt-2">
                                            <Link to="#" className={item.is_default ? "btn btn-outline btn-sm active" : "btn btn-outline btn-sm"} onClick={() => this.handleVisible(true)} >Beli Sekarang</Link>
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
export default Pricing;