import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class AboutSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            AboutList: [{
                "icon": "mdi mdi-lightbulb",
                "title": "Creative Design",
                "content": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur at aut odit aut fugit sed quia consequuntur magni.",
            }, {
                "icon": "mdi mdi-projector-screen",
                "title": "Strategy Solutions",
                "content": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur at aut odit aut fugit sed quia consequuntur magni.",
            }, {
                "icon": "mdi mdi-nature",
                "title": "Dynamic Growth",
                "content": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur at aut odit aut fugit sed quia consequuntur magni.",
            },
            ]
        };
    }

    render() {

        return (
            <React.Fragment>
                <section className="section bg-about bg-light-about bg-light" id="about">
                    <div className="container">
                        <Row>
                            <Col lg="4">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">About Us</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            {this.state.AboutList.map((about, index) => {
                                return <Col lg="4" key={index}>
                                            <div className="about-box about-light text-center p-3">
                                                <div className="about-icon mb-4">
                                                    <i className={about.icon}></i>
                                                </div>
                                                <h4 className="font-weight-light"><Link to="#" className="text-dark">{about.title}</Link></h4>
                                                <p className="text-muted f-14">{about.content}</p>
                                            </div>
                                        </Col>
                              })}
                         </Row>

                        <Row className="align-items-center mt-5">
                            <Col md="6">
                                <div className="about-desc">
                                    <h3 className="text-dark mb-3 font-weight-light">Performancect Solution For Small Businesses</h3>
                                    <p className="text-muted f-15">Temporibus autem quibusdam a aut officiis debitis rerum necessitatibus saepeeveniet ut et voluptates repudiandae sint a molestiae recusandae itaque earum rerum hic tenetur a sapiente delectus ut at aut reiciendis voluptatibus maiores alias consequatur perferendis doloribus asperiores rerum necessitat saepeeveniet.</p>
                                    <div className="about-by">
                                        <p className="font-weight-light mb-0"><Link to="#" className="text-dark"><i className="mdi mdi-circle-medium text-custom mr-2"></i>
                                            Learn More <span className="text-custom"> About Us</span></Link></p>
                                    </div>
                                </div>
                            </Col>

                            <Col md="6">
                                <div className="about-img light-img position-relative p-4">
                                    <img src="images/about-img.jpg" alt="" className="img-fluid mx-auto d-block" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default AboutSection;