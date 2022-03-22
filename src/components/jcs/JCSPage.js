import React from 'react';
// import Preloader from './components/Preloader';
// import Navbar from './components/Navbar';
// import Home1 from './components/Home1';
// import AboutSection from './components/AboutSection';
// import ServiceSection from './components/ServiceSection';
// import FeatureSection from './components/FeatureSection';
// import JoranServiceSection from './components/JoranServiceSection';
// import ClientSection from './components/ClientSection';
// import PricingSection from './components/PricingSection';
// import BlogSection from './components/BlogSection';
// import ContactSection from './components/ContactSection';

// import Footer from '../components/Footer';
import { Row,Col } from 'reactstrap';

class JCSPage extends React.Component {
  componentDidMount() {
    //   document.getElementById("main_navbar").classList.add("navbar-light");
    //   document.getElementById("main_navbar").classList.remove("d-none");
  }

	render() {

		return (
			<React.Fragment>
				<section className="section home-2-bg" id="home">
                    <div className="home-center">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="align-items-center">
                                    <Col lg="12">
                                        <div className="mt-40 home-2-content position-relative">
                                            <img src="assets/img/jcs-main.png" alt="" className="img-fluid mx-auto d-block home-2-img" />
                                            <div className="home-2-bottom-img">
                                                <img src="images/homr-2-bg-bottom.png" alt="" className="img-fluid d-block mx-auto" />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
					<div className="container">
						<Row className="align-items-center">
							<Col lg="12">
								<div className="mt-60 home-2-content position-relative">
									<img src="assets/img/jcs-main.png" alt="" className="img-fluid mx-auto d-block" style={{width: "60%"}}/>
								</div>
							</Col>
							
							<Col lg="12">
								<div className="mt-60 home-2-content position-relative">
									<span>asd</span>
								</div>
							</Col>
						</Row>
					</div>
                </section>
				{/* <Footer /> */}
				{/* <section className="section home-2-bg" id="home"> */}
				{/* <section className="section  home-2-bg" style={{marginTop: "-350px"}}>
					<div className="home-center" style={{backgroundColor: "#3792cb", height: "400px"}}>
						<div className="home-desc-center">
							<div className="container">
							</div>
						</div>
					</div>
					<div className="container">
						<Row className="align-items-center">
							<Col lg="12">
								<div className="mt-60 home-2-content position-relative">
									<img src="assets/img/jcs-main.png" alt="" className="img-fluid mx-auto d-block" style={{width: "60%"}}/>
								</div>
							</Col>
							
							<Col lg="12">
								<div className="mt-60 home-2-content position-relative">
									<span>asd</span>
								</div>
							</Col>
						</Row>
					</div>
				</section> */}
			</React.Fragment>

		);
	}
}

export default (JCSPage);