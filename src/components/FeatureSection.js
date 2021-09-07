import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class FeatureSection extends React.Component {
    render() {

        return (
            <React.Fragment>
                <section className="section bg-features bg-light" id="features">
                    <div className="container">
                        <Row>
                            <Col className="col-lg-12">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">Our Features</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col lg="6">
                                <div className="features-content">
                                    <div className="features-icon">
                                        <i className="pe-7s-science text-primary"></i>
                                    </div>
                                    <h4 className="font-weight-normal text-dark mb-3 mt-4">Marketing Performance</h4>
                                    <p className="text-muted f-14">Itaque earum rerum hic tenetur sapiente delectut reiciendis voluptatibus perspiciatis unde omnis iste natus error sit maiores alias consequatur perferendisthat doloribus asperiores repellat.</p>
                                    <p className="text-muted f-14">Nam libero tempore cum soluta nobis eligendi optio cumque nihil impedit minusidquod maxime placeat facere possimus.</p>
                                    <p className="mb-0 text-uppercase f-13"><Link to="/" className="text-primary">learn more <span className="right-arrow ml-1">&#x21FE;</span></Link></p>
                                </div>
                            </Col>
                            <Col lg="6">
                                <div className="features-img mt-32">
                                    <img src="images/features-img/img-1.png" alt="" className="img-fluid mx-auto d-block" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>

                <section className="section bg-features">
                    <div className="container">
                        <Row className="align-items-center">
                            <Col lg="6">
                                <div className="features-img">
                                    <img src="images/features-img/img-2.png" alt="" className="img-fluid mx-auto d-block" />
                                </div>
                            </Col>
                            <Col lg="6">
                                <div className="features-content mt-32">
                                    <div className="features-icon">
                                        <i className="pe-7s-shuffle text-primary"></i>
                                    </div>
                                    <h4 className="font-weight-normal text-dark mb-3 mt-4">Strategy Solutions</h4>
                                    <p className="text-muted f-14">Itaque earum rerum hic tenetur sapiente delectut reiciendis voluptatibus perspiciatis unde omnis iste natus error sit maiores alias consequatur perferendisthat doloribus asperiores repellat.</p>
                                    <p className="text-muted f-14">Nam libero tempore cum soluta nobis eligendi optio cumque nihil impedit minusidquod maxime placeat facere possimus.</p>
                                    <p className="mb-0 text-uppercase f-13"><Link to="/" className="text-primary">learn more <span className="right-arrow ml-1">&#x21FE;</span></Link></p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>

                <section className="section bg-features bg-light">
                    <div className="container">
                        <Row className="align-items-center">
                            <Col lg="6">
                                <div className="features-content">
                                    <div className="features-icon">
                                        <i className="pe-7s-display1 text-primary"></i>
                                    </div>
                                    <h4 className="font-weight-normal text-dark mb-3 mt-4">Marketing business</h4>
                                    <p className="text-muted f-14">Itaque earum rerum hic tenetur sapiente delectut reiciendis voluptatibus perspiciatis unde omnis iste natus error sit maiores alias consequatur perferendisthat doloribus asperiores repellat.</p>
                                    <p className="text-muted f-14">Nam libero tempore cum soluta nobis eligendi optio cumque nihil impedit minusidquod maxime placeat facere possimus.</p>
                                    <p className="mb-0 text-uppercase f-13"><Link to="/" className="text-primary">learn more <span className="right-arrow ml-1">&#x21FE;</span></Link></p>
                                </div>
                            </Col>
                            <Col lg="6">
                                <div className="features-img mt-40">
                                    <img src="images/features-img/img-3.png" alt="" className="img-fluid mx-auto d-block" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default FeatureSection;