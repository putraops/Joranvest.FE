import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { Typography } from 'antd';
import Pricing from './membership/components/Pricing'
const { Text } = Typography;


class PricingSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                        <Pricing  />
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default PricingSection;