import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import NumberFormat from "react-number-format";
import { Typography } from 'antd';
const { Text } = Typography;


class Pricing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pricings: [],
        };
    }

    render() {
        const { pricings } = this.props;
        return (
            <React.Fragment>
                <Row>
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
                                            <Link to="#" className={item.is_default ? "btn btn-outline btn-sm active" : "btn btn-outline btn-sm"} >Beli Sekarang</Link>
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