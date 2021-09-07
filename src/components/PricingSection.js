import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


class PricingSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PlaneList: [{
                "name": "Premium",
                "duration": "12 Bulan",
                "price": "69.000",
                "monthly": "69.000",
                "bandwidth": "1GB",
                "space": "100MB",
                "support": "No",
                "domain": "05",
                "fees": "No",
                "description": "Hemat Rp 360.000",
                "term": "Pembayaran langsung 12 bulan di depan",
                "is_active" : false
            },{
                "name": "Advance",
                "duration": "6 Bulan",
                "price": "79.000",
                "monthly": "79.000",
                "bandwidth": "1.5GB",
                "space": "500MB",
                "support": "Yes",
                "domain": "10",
                "fees": "No",
                "description": "Hemat Rp 120.000",
                "term": "Pembayaran langsung 6 bulan di depan",
                "is_active" : true
            },{
                "name": "Popular",
                "duration": "3 Bulan",
                "price": "89.000",
                "monthly": "89.000",
                "bandwidth": "2GB",
                "space": "1GB",
                "support": "Yes",
                "domain": "15",
                "fees": "No",
                "description": "Hemat Rp 30.000",
                "term": "Pembayaran langsung 3 bulan di depan",
                "is_active" : false
            },{
                "name": "Basic",
                "duration": "1 Bulan",
                "price": "99.000",
                "monthly": "99.000",
                "bandwidth": "2.5GB",
                "space": "1.5GB",
                "support": "No",
                "domain": "20",
                "fees": "Yes",
                "description": "-",
                "term": "Pembayaran langsung 1 bulan di depan",
                "is_active" : false
            },
            ]
        };
    }
    render() {
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

                        {this.state.PlaneList.map((plan, index) => {
                                return  <Col lg="3" md="6" key={index}>
                                            <div className={plan.is_active ? "pricing-box active mt-4" : "pricing-box mt-4"}>
                                                <div className="price bg-light position-relative p-4 p">
                                                    <div className="float-left">
                                                        <h5 className="text-dark title mt-2 font-weight-normal f-18 mb-0">{plan.name}</h5>
                                                    </div>
                                                    <div className="">
                                                        <h2 className="text-dark font-weight-normal text-right mb-0">{plan.monthly}</h2>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={plan.is_active ? "text-white" : "text-dark"}>per bulan</span>
                                                    </div>
                                                </div>
                                                <div className="p-4 pricing-list">
                                                    <ul className="list-unstyled mb-0">
                                                        <li className="text-muted f-14">Durasi {plan.duration}</li>
                                                        <li className="text-muted f-14">{plan.description}</li>
                                                        <li className="text-muted mb-0 f-14">* {plan.term}</li>
                                                        {/* <li className="text-muted f-14">Domain: {plan.domain}</li> */}
                                                        {/* <li className="text-muted mb-0 f-14">Hidden Fees: {plan.fees}</li> */}
                                                    </ul>
                                                </div>
                                                <div className="pl-4 mb-4 mt-2">
                                                    <Link to="#" className={plan.is_active ? "btn btn-outline btn-sm active" : "btn btn-outline btn-sm"} >Beli Sekarang</Link>
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