import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import NumberFormat from "react-number-format";
import axiosApi from '../config/axiosConfig';
import { Typography, Skeleton } from 'antd';
import Pricing from './membership/components/Pricing'
const { Text } = Typography;


class PricingSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pricings: [],
            isPricingLoading: true,
        };
    }

    componentWillMount() {
        axiosApi.get(`/membership/getAll`).then(r => {
            if (r.data.status) {
                this.setState({
                    ...this.state, 
                    pricings: r.data.data,
                    isPricingLoading: false
                });
            }
        });
    }

    render() {
        const { pricings, isPricingLoading } = this.state;
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
                        
                        <Skeleton active={true} loading={isPricingLoading} paragraph={true} row="5">
                            <Pricing pricings={pricings} />
                        </Skeleton>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default PricingSection;