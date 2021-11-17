import React from 'react';
import { Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import baseUrl from '../config/baseUrl';

class Home1 extends React.Component {
    render() {

        return (
            <React.Fragment>
                <section className="section home-2-bg" id="home">
                    <div className="home-center">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="align-items-center">
                                    <Col lg="5">
                                        <div className="mt-40 home-2-content">
                                            <h2 className="text-white font-weight-normal home-2-title mb-0">Ambil Keputusan Investasi & Trading Lebih Cepat / Mudah</h2>
                                            <p className="text-white-70 mt-4 f-15 mb-0">Ut enim ad minima veniam quis nostrum exercitationem ullam corporis at suscipit laboriosam nisi ut aliquid a commodi consequatur Quis autem.</p>
                                            <div className="mt-5">
                                                <Link to="#" className="btn btn-custom mr-4">Learn More</Link>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg="7">
                                        <div className="mt-40 home-2-content position-relative">
                                            {/* <img src="images/home-2-img.png" alt="" className="img-fluid mx-auto d-block home-2-img mover-img" /> */}
                                            <div className="home-2-bottom-img">
                                                <img src="images/homr-2-bg-bottom.png" alt="" className="img-fluid d-block mx-auto" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default Home1;