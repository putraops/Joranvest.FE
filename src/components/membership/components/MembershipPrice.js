import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import { Row, Col } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';

const MembershipPrice = (props) => {
    var membership = [
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
    ];
    
    return (
        <Row gutter="1" className=" g-2">
        {membership.map((plan, index) => {
            return  <Col xl="3" lg="4" md="6" key={index} className="mb-3">
                        <div className={plan.is_active ? "pricing-box active mt-0" : "pricing-box mt-0"}>
                            <div className="price article-price bg-light position-relative p-4 p">
                                <div className="">
                                    <h5 className="text-dark title mt-2 font-weight-normal f-10 font-weight-bold mb-0 ">{plan.name}</h5>
                                </div>
                                <h2 className="text-dark font-weight-normal text-right mb-0 f-5">{plan.monthly}</h2>    
                                <div className="text-right">
                                    <span className={plan.is_active ? "text-white" : "text-dark"}>per bulan</span>
                                </div>
                            </div>
                            <div className="p-4 pricing-list bg-white">
                                <ul className="list-unstyled mb-0">
                                    <li className="text-muted f-14">Durasi {plan.duration}</li>
                                    <li className="text-muted f-14">{plan.description}</li>
                                    <li className="text-muted mb-0 f-14">* {plan.term}</li>
                                </ul>
                            </div>
                            <div className="bg-white pl-3 pr-3">
                                <Link to={`/checkout/membership/${plan.id}`} className={plan.is_active ? "btn btn-outline btn-sm active mt-2 mb-3 w-100" : "btn btn-outline btn-sm mt-2 mb-3 w-100"} >Beli Sekarang</Link>
                            </div>
                        </div>
                    </Col>
        })}
        </Row>
    )
}

export default MembershipPrice