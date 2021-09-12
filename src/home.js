import React from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Home1 from './components/Home1';
import AboutSection from './components/AboutSection';
import ServiceSection from './components/ServiceSection';
import FeatureSection from './components/FeatureSection';
import ClientSection from './components/ClientSection';
import PricingSection from './components/PricingSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FooterAlt from './components/FooterAlt';


class Home extends React.Component {

  componentDidMount() {
        document.getElementById("main_navbar").classList.add("navbar-light");
}

  render() {

    return (
      <React.Fragment>

        {/* preloader */}
        {/* <Preloader /> */}

        {/* Navigation Menu */}
        {/* <Navbar /> */}

        {/* HomeSection Menu */}
        <Home1 />
        
        {/* BlogSection Menu */}
        <BlogSection />

        {/* AboutSection Menu */}
        {/* <AboutSection /> */}

        {/* ServiceSection Menu */}
        {/* <ServiceSection /> */}

        {/* FeatureSection Menu */}
        {/* <FeatureSection /> */}

        {/* PricingSection Menu */}
        <PricingSection />

        {/* ClientSection Menu */}
        <ClientSection />

        {/* ContactSection Menu */}
        {/* <ContactSection /> */}

        {/* Footer Menu */}
        <Footer />

        {/* FooterAlt Menu */}
        <FooterAlt />

      </React.Fragment>

    );
  }
}

export default Home;