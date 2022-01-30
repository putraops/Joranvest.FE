import React from 'react';
import { Row,Col } from 'reactstrap';

class Home1 extends React.Component {
    render() {

        return (
            <React.Fragment>
                <section className="section home-2-bg" id="home">
                    <div className="home-center">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="align-items-center">
                                    <Col lg="6">
                                        <div className="mt-40 home-2-content mb-1">
                                            <h2 className="text-white font-weight-normal home-2-title f-22 mb-0">Ambil Keputusan Investasi & Trading Lebih Cepat dan Lebih Mudah</h2>
                                            <p className="text-white-70 mt-4 f-18 mb-0">Mulai dari 2,000/hari, bisa akses sepuasnya tanpa batas. Temukan Rekomendasi, riset, edukasi dan analisa saham, crypto, forex pilihan dari berbagai Analis berpengalaman.</p>
                                            {/* <div className="mt-5">
                                                <Link to="#" className="btn btn-custom mr-4">Learn More</Link>
                                            </div> */}
                                            <p className="text-white mt-4 f-18 mb-0">Yuk belajar bareng karena <span className="fw-500">#investasiuntuksemua</span></p>
                                        </div>
                                    </Col>

                                    <Col lg="6">
                                        <div className="mt-40 home-2-content position-relative">
                                            <img src="images/home-illustration.png" alt="" className="img-fluid mx-auto d-block home-2-img mover-img" />
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