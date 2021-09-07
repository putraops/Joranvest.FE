import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


class ServiceSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ServiceList: [{
                "icon": "mdi mdi-database",
                "title": "Awesome Support",
                "content": "Sed ut perspiciatis unde sit omnise iste natus voluptatem site accusantium doloremque laudantium totam.",
            }, {
                "icon": "mdi mdi-palette",
                "title": "Unlimited Colors",
                "content": "Sed ut perspiciatis unde sit omnise iste natus voluptatem site accusantium doloremque laudantium totam.",
            }, {
                "icon": "mdi mdi-finance",
                "title": "Strategy Solutions",
                "content": "Sed ut perspiciatis unde sit omnise iste natus voluptatem site accusantium doloremque laudantium totam.",
            }, {
                "icon": "mdi mdi-yin-yang",
                "title": "Digital Design",
                "content": "Sed ut perspiciatis unde sit omnise iste natus voluptatem site accusantium doloremque laudantium totam.",
            }, {
                "icon": "mdi mdi-apple-keyboard-command",
                "title": "Easy to customize",
                "content": "Sed ut perspiciatis unde sit omnise iste natus voluptatem site accusantium doloremque laudantium totam.",
            }, {
                "icon": "mdi mdi-hexagon-multiple",
                "title": "Truly Multipurpose",
                "content": "Sed ut perspiciatis unde sit omnise iste natus voluptatem site accusantium doloremque laudantium totam.",
            },
            ]
        };
    }

    render() {

        return (
            <React.Fragment>
                <section className="section" id="services">
                    <div className="container">
                        <Row>
                            <Col lg="12">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">Our Services</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            {this.state.ServiceList.map((service, index) => {
                                return <Col lg="4" md="6" key={index}>
                                    <div className="service-box rounded mt-4 p-4">
                                        <div className="service-icon mb-3">
                                            <i className={service.icon}></i>
                                        </div>
                                        <div className="services-desc">
                                            <div className="service-title mb-2 position-relative">
                                                <h5 className="font-weight-normal mb-3"><Link to="#" className="text-dark">{service.title}</Link></h5>
                                            </div>
                                            <p className="text-muted mb-3 f-14">{service.content}</p>
                                            <p className="mb-0 text-uppercase f-13"><Link to="/" className="text-primary">learn more<i className="mdi mdi-arrow-right ml-2"></i></Link></p>
                                        </div>
                                    </div>
                                </Col>
                            })}
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default ServiceSection;