import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Card, Alert, Radio, List } from 'antd';
import { connect } from 'react-redux';

import Pending from './components/Pending';

const MembershipPayment = props => {

    useEffect(() => {
        console.log(props);
        console.log(props.match.params.status);
        // loadData(props.match.params.id);
        
    }, []);

    if (props.match.params.status === "pending") {
        return (
            <Pending record_id={props.match.params.id} />
        )
    } else {
        return (
            <span>2</span>
        )
    }

    // return (
    //     <section className="section home-1-bg" id="home">
    //         <div className="home-8-bg-overlay"></div>
    //         <div className="home-center">
    //             <div className="home-desc-center">
    //                 <div className="container">
    //                     {/* <Row className="justify-content-center" style={{marginTop: "-200px"}}> */}
    //                     <Row className="justify-content-center">
    //                         <Col md="8" lg="7" xl="6">
    //                             <div className="text-center mb-4">
    //                                 <a href="/" >
    //                                     <img src="/images/gallery/logo.png" alt="" className="img-fluid"  style={{width: "300px"}} />
    //                                 </a>
    //                             </div>
                                
    //             {(() => {
    //                 if (props.match.params.status === "pending") {
    //                     <span>1</span>
    //                 } else {
    //                     <span>2</span>
    //                 }
    //             })()}
    //                                 <Card className="borderShadow5">
    //                                     <p className="mb-0 text-center f-18">Terima kasih telah berlangganan sebagai Member Premium.</p>
    //                                     <p className="mb-4 text-center f-18">Sekarang kamu bisa akses fitur Premium.</p>
    //                                     <p className="mb-0 text-center f-14">Click <a href="/">disini</a> untuk kembali ke halaman utama.</p>
    //                             </Card>
    //                         </Col>
    //                     </Row>
    //                 </div>
    //             </div>
    //         </div>
    //         <Footer />
    //     </section>
    // );
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(MembershipPayment);