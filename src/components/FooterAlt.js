import React from 'react';

class FooterAlt extends React.Component {
    render() {

        return (
            <React.Fragment>
                <section className="footer-alt bg-dark pt-3 pb-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <p className="copyright text-white f-14 font-weight-light mb-0"> {new Date().getFullYear()} copyright © 2021. PT Risambessy Konsultindo Mandiri</p>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default FooterAlt;