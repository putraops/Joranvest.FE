import React from 'react';
import { Row, Col } from 'reactstrap';
import { Image } from 'antd';
import NumberFormat from "react-number-format";

import Footer from '../Footer';
import "./css/styles.css";

class JCSPage extends React.Component {
	componentDidMount() {
		document.getElementById("main_navbar").classList.add("navbar-light");
		document.getElementById("main_navbar").classList.remove("d-none");
	}

	render() {
		return (
			<React.Fragment>
				<section className="section" id="home" style={{backgroundImage: "linear-gradient(#3792cb 80%, #ffffff 0%)"}}>
                    <div className="home-center">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="align-items-center">
                                    <Col lg="12">
                                        <div className="mt-5 home-2-content position-relative">
                                            <img src="assets/img/jcs-main.png" alt="" id="img-background" className="img-fluid mx-auto d-block home-2-img" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
				<div className="container">
					<Row>
						<Col lg="12" className="mt-5">
							<p className='page-header text-center text-joran mb-0'>JORANVEST CHART SYSTEM (JCS)</p>
						</Col>
						<Col lg="12" className="mt-3">
							<p className='page-subheader text-center'>Ambil Keputusan Trading Lebih Cepat dan Lebih Mudah dengan bantuan Tools</p>
						</Col>
					</Row>
					<Row className="align-items-center mt-5">
						<Col md="7">
							<div className="about-desc">
								<h3 className="content-header">Genggam Chart Otomatis dalam Genggaman</h3>
								<p className="content mt-3">Dapakan akses ke dalam tools JCS yang menampilkan informasi Support, Resistance dan Indikator untuk membantu mempermudah kamu dalam mengambil keputusan.</p>
							</div>
						</Col>
						<Col md="5">
							<div className="about-img light-img position-relative">
								<Image
									className="img-fluid mx-auto d-block p-2"
									src="assets/img/chart-system/jcs-right.png" 
									alt="Right Image" />
							</div>
						</Col>
					</Row>
					<Row className="align-items-center mt-5">
						<Col lg="5" md="5" className="order-xxs-2 order-sm-2 order-md-1">
							<div className="about-img light-img position-relative">
								<Image
									className="img-fluid mx-auto d-block p-2"
									src="assets/img/chart-system/jcs-left.png" 
									alt="Left Image" />
							</div>
						</Col>
						<Col lg="7" md="7" className="order-xxs-1 order-sm-1 order-md-2">
							<div className="about-desc">
								<h3 className="content-header">Informasi Alert Signal</h3>
								<p className="content mt-3">Dapatkan juga akses informasi saham yang di<i>screening</i> secara otomatis untuk mempermudah kamu dalam menganalisa saham.</p>
							</div>
						</Col>
					</Row>
					
					<Row className="align-items-center mt-5">
						<Col md="7">
							<div className="about-desc">
								<h3 className="content-header">Sesuaikan dengan Kebutuhanmu</h3>
								<p className="content mt-3">Berlangganan sekarang dan dapatkan fitur
									Chart mulai dari 40ribuan saja.
									<br /> atau dapatkan akses ke semua layanan <strong className='text-joran'>JORANVEST</strong> dengan berlangganan membership <strong>Blue</strong>, <strong>Silver</strong>, <strong>Gold</strong> dan <strong>Platinum</strong></p>
							</div>
						</Col>
						<Col md="5">
							<div className={"pricing-box borderShadow5 mt-4 active"}>
								<div className="price bg-light position-relative p-4 p">
									<div className="float-left">
										<h5 className="text-dark pricing-title title mt-2 font-weight-normal mb-0">Joranvest Chart System</h5>
									</div>
									<div className="">
										<h2 className="text-dark font-weight-normal text-right mb-0">
											<NumberFormat
												className='pricing-price'
												value={40000}
												displayType="text"
												thousandSeparator={true}
												prefix=""
											/>
										</h2>
									</div>
									<div className="text-right">
										<span className="text-white">per bulan</span>
									</div>
								</div>
								<div className="pt-2 pb-2 pr-4 pl-4 pricing-list">
									<ul className="list-unstyled mb-0">
										<li className="text-muted f-14 mb-0 fw-500">*Hanya untuk Akses Chart dan Alert</li>
									</ul>
								</div>
								<div className="pl-4 pr-4 mb-4">
									<a href={`/checkout/jcs/23`} className={`btn btn-joran btn-sm btn-block btn-pricing mt-2 mb-3`} >Beli Sekarang</a>
								</div>
							</div>
						</Col>
					</Row>
				</div>

				<div style={{marginTop: "120px"}}></div>
                <Footer />
			</React.Fragment>

		);
	}
}

export default (JCSPage);