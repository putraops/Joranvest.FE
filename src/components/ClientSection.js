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
                                            <Col lg="12">
                                                <div className="testi-content">
                                                    <div className="testi-box mt-4">
                                                        {/* <h4 className="text-white mb-3 font-weight-light">"Senior Management"</h4> */}
                                                        <p className="text-white-70 font-weight-light mb-0 f-15">Saya ibu RT (rumah tangga), newbie di saham dan belajar dari 0 murni cuma dari youtube dan baru belakangan ini ikut beberapa webinar dan workshop. Ada banyak macam style di youtube yang saya nonton dan pelajari selama ini dan beberapa yang cocok dengan style saya, salah satunya youtube dari Kak Renaldo Ndona (JORAN). Saya belajar tentang risk reward, reason to buy dan tidak fomo dan disini tidak ada namanya pom-pom saham. Selama saya trading (Januari 2021-sekarang) reward terbesar saya dari saham BBKP dan BRIS (saham kesayangan JORAN😀) . Terima kasih banyak Kak Renaldo atas bimbingan dan supportnya. Maju dan sukses selalu buat Joran. GBU😇😇</p>
                                                        <div className="quote-img">
                                                            <img src="images/quote-img.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="float-right ml-3">
                                                            <div className="client-img">
                                                                <img src="images/clients/img1.png" alt="" className="img-fluid rounded-circle" />
                                                            </div>
                                                        </div>
                                                        <div className="clients-name text-right pt-3">
                                                            <h6 className="text-white font-weight-normal position-relative f-17 mb-0"><span className="after-border"></span>Linati Djoni</h6>
                                                            <p className="text-white-70 f-13 mb-0">Ibu Rumah Tangga</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="item">
                                        <Row>
                                            <Col lg="12">
                                                <div className="testi-content">
                                                    <div className="testi-box mt-4">
                                                        {/* <h4 className="text-white mb-3 font-weight-light">"Senior Management"</h4> */}
                                                        <p className="text-white-70 font-weight-light mb-0 f-15">Mentor hebat, edukasi setiap saat dan bisa konsultasi. Harapan kedepannya ada kelas offline dan suatu hari nanti ada aplikasi.</p>
                                                        <div className="quote-img">
                                                            <img src="images/quote-img.png" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="float-right ml-3">
                                                            <div className="client-img">
                                                                <img src="images/clients/img2.png" alt="" className="img-fluid rounded-circle" />
                                                            </div>
                                                        </div>
                                                        <div className="clients-name text-right pt-3">
                                                            <h6 className="text-white font-weight-normal position-relative f-17 mb-0"><span className="after-border"></span>Dadik Utama</h6>
                                                            {/* <p className="text-white-70 f-13 mb-0">UI/UX Designer</p> */}
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