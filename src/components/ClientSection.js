import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import RBCarousel from "react-bootstrap-carousel";

const styles = { height: 400, width: "50%" };

class ClientSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            autoplay: true
        };
    }
    onSelect = (active, direction) => {
        console.log(`active=${active} && direction=${direction}`);
    };
    visiableOnSelect = active => {
        console.log(`visiable onSelect active=${active}`);
    };
    slideNext = () => {
        this.slider.slideNext();
    };
    slidePrev = () => {
        this.slider.slidePrev();
    };
    goToSlide = () => {
        this.slider.goToSlide(4);
    };
    autoplay = () => {
        this.setState({ autoplay: !this.state.autoplay });
    };
    _changeIcon = () => {
        let { leftIcon, rightIcon } = this.state;
        leftIcon = leftIcon ? undefined : <span className="fa fa-glass" />;
        rightIcon = rightIcon ? undefined : <span className="fa fa-music" />;
        this.setState({ leftIcon, rightIcon });
    };
    render() {
        return (
            <React.Fragment>

                <section className="section bg-clients" id="clients">
                    <div className="bg-overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title-heading mb-5">
                                    <h3 className="text-white mb-1 font-weight-light text-uppercase">Apa Cerita Mereka?</h3>
                                    <div className="title-border-color position-relative"></div>
                                </div>
                            </div>
                        </div>

                        <Row>
                            <Col span={12} style={{ marginTop: 20 }}>
                                <RBCarousel
                                    version={4}
                                    autoplay={this.state.autoplay}
                                    pauseOnVisibility={true}
                                    onSelect={this.visiableOnSelect}
                                    slideshowSpeed={2000}
                                >
                                    <div className="item">
                                        <Row>
                                            <Col lg="6">
                                                <div className="testi-content">
                                                    <div className="testi-box mt-4">
                                                        <h4 className="text-white mb-3 font-weight-light">"Senior Management"</h4>
                                                        <p className="text-white-70 font-weight-light mb-0 f-15">At vero eos et accusamus et iusto odio dignissimos that site ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores quas molestias excepturi cupiditate non.</p>
                                                        <div className="quote-img">
                                                            <img src="images/quote-img.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="float-right ml-3">
                                                            <div className="client-img">
                                                                <img src="images/clients/img-1.jpg" alt="" className="img-fluid rounded-circle" />
                                                            </div>
                                                        </div>
                                                        <div className="clients-name text-right pt-3">
                                                            <h6 className="text-white font-weight-normal position-relative f-17 mb-0"><span className="after-border"></span> Sherrie Barboza</h6>
                                                            <p className="text-white-70 f-13 mb-0">UI/UX Designer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg="6">
                                                <div className="testi-content">
                                                    <div className="testi-box mt-4">
                                                        <h4 className="text-white mb-3 font-weight-light">"Senior Management"</h4>
                                                        <p className="text-white-70 font-weight-light mb-0 f-15">At vero eos et accusamus et iusto odio dignissimos that site ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores quas molestias excepturi cupiditate non.</p>
                                                        <div className="quote-img">
                                                            <img src="images/quote-img.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="float-right ml-3">
                                                            <div className="client-img">
                                                                <img src="images/clients/img-1.jpg" alt="" className="img-fluid rounded-circle" />
                                                            </div>
                                                        </div>
                                                        <div className="clients-name text-right pt-3">
                                                            <h6 className="text-white font-weight-normal position-relative f-17 mb-0"><span className="after-border"></span> Sherrie Barboza</h6>
                                                            <p className="text-white-70 f-13 mb-0">UI/UX Designer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="item">
                                        <Row>
                                            <Col lg="6">
                                                <div className="testi-content">
                                                    <div className="testi-box mt-4">
                                                        <h4 className="text-white mb-3 font-weight-light">"Senior Management"</h4>
                                                        <p className="text-white-70 font-weight-light mb-0 f-15">At vero eos et accusamus et iusto odio dignissimos that site ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores quas molestias excepturi cupiditate non.</p>
                                                        <div className="quote-img">
                                                            <img src="images/quote-img.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="float-right ml-3">
                                                            <div className="client-img">
                                                                <img src="images/clients/img-5.jpg" alt="" className="img-fluid rounded-circle" />
                                                            </div>
                                                        </div>
                                                        <div className="clients-name text-right pt-3">
                                                            <h6 className="text-white font-weight-normal position-relative f-17 mb-0"><span className="after-border"></span> Shana Esposito</h6>
                                                            <p className="text-white-70 f-13 mb-0">Web Developer</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </Col>
                                            <Col lg="6">
                                                <div className="testi-content">
                                                    <div className="testi-box mt-4">
                                                        <h4 className="text-white mb-3 font-weight-light">"Graphic Developer"</h4>
                                                        <p className="text-white-70 font-weight-light mb-0 f-15">At vero eos et accusamus et iusto odio dignissimos that site ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores quas molestias excepturi cupiditate non.</p>
                                                        <div className="quote-img">
                                                            <img src="images/quote-img.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="float-right ml-3">
                                                            <div className="client-img">
                                                                <img src="images/clients/img-6.jpg" alt="" className="img-fluid rounded-circle" />
                                                            </div>
                                                        </div>
                                                        <div className="clients-name text-right pt-3">
                                                            <h6 className="text-white font-weight-normal position-relative f-17 mb-0"><span className="after-border"></span> Linda Sanor</h6>
                                                            <p className="text-white-70 f-13 mb-0">UI/UX Designer</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </RBCarousel>
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default ClientSection;