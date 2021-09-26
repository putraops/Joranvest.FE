import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import NumberFormat from "react-number-format";
import axiosApi from '../config/axiosConfig';
import { Typography } from 'antd';
const { Text } = Typography;


class PricingSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pricings: [],
        };
    }

    componentWillMount() {
        axiosApi.get(`/membership/getAll`).then(r => {
            if (r.data.status) {
                 this.setState({...this.state, pricings: r.data.data});
            }
        });
    }

    render() {
        const { pricings } = this.state;
        return (
            <React.Fragment>
                <section className="section bg-about bg-light-about bg-light" id="pricing">
                    <div className="container">
                        <Row>
                            <Col lg="12">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">Tentukan Pilihan yang paling nyaman dengan kantong kamu</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>
                        <div className="row">

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
                                                    {/* <li className="text-muted f-14">Domain: {plan.domain}</li> */}
                                                    {/* <li className="text-muted mb-0 f-14">Hidden Fees: {plan.fees}</li> */}
                                                </ul>
                                            </div>
                                            <div className="pl-4 mb-4 mt-2">
                                                <Link to="#" className={item.is_default ? "btn btn-outline btn-sm active" : "btn btn-outline btn-sm"} >Beli Sekarang</Link>
                                            </div>
                                        </div>
                                    </Col>
                            })}
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default PricingSection;