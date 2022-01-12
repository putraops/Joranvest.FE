import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { Typography, Skeleton } from 'antd';
import axiosApi from '../../../config/axiosConfig';
import NumberFormat from "react-number-format";

const { Text } = Typography;

class Pricing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pricings: [],
            isSkeletionPricing: true,
        };
    }

    componentDidMount(){
		//const element = document.getElementById("joranvest-pricing");
    }

    componentWillMount() {
        axiosApi.get(`/membership/getAll`)
        .then(res => {
            var r = res.data;
            if (r.status) {
                this.setState({
                    ...this.state, 
                    pricings: r.data,
                    isSkeletionPricing: false
                });
            }
        });
    }
    
    render() {
        const { pricings, isSkeletionPricing } = this.state;
       
        return (
            <React.Fragment>
                <Row id="joranvest-pricing">
                    <Skeleton active={true} loading={isSkeletionPricing} paragraph={true} row="5">
                        {pricings.map((item, index) => {
                            return  <Col xs="12" sm="6" md="6" lg="4" xl="3" key={index}>
                                        <div className={item.is_default ? "pricing-box borderShadow5 active mt-4" : "pricing-box borderShadow5 mt-4"}>
                                            <div className="price bg-light position-relative p-4 p">
                                                <div className="float-left">
                                                    <h5 className="text-dark pricing-title title mt-2 font-weight-normal f-18 mb-0">{item.name}</h5>
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
                                            <div className="pl-4 pr-4 mb-4 mt-2">
                                                <a href={`/checkout/membership/${item.id}`} className={`btn btn-outline btn-sm btn-block btn-pricing mt-2 mb-3 ${item.is_active ? "active" : ""}`} >Beli Sekarang</a>
                                            </div>
                                        </div>
                                    </Col>
                            })
                        }
                    </Skeleton>
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