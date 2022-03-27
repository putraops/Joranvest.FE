import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import axiosApi from '../../config/axiosConfig';
import Footer from '../Footer';
import sideNotification from '../../commons/sideNotification';

const FreeWebinarRegistrationSuccess = props => {
    const [loading, setLoading] = useState({
        isContentLoading: true,
    });

    useEffect(() => {
        if (props.match.params.id) {
            getWebinarRegistrationById(props.match.params.id);
        }
    }, []);

    const getWebinarRegistrationById = async (id) => {
        axiosApi.get(`/webinar_registration/getViewById/${id}`)
        .then(res => {
            var r = res.data;
            console.log("r: ", r);
            if (r.status) {
                //setWebinarRegistrationRecord(r.data);
                setLoading({...loading, isContentLoading: false})
            }
        }).catch(function (error) {
            //-- Will run this if record is not found
            sideNotification.open("Silahkan Periksa Koneksi Kamu", error.message, false);
        });
    }

    return (
        <section className="section" id="home">
            <div className="home-center">
                <div className="home-desc-center">
                    <div className="container mt-5 mb-5">
                        <Row className="p-0 m-0">
                            <Col sm="12" md="5" lg="5" xl="4" className="d-none d-md-block" style={{height: "400px", borderRight: "1px solid #ddd"}}>
                                <div className="card h-100 border-0 justify-content-center" style={{backgroundColor: "transparent"}}>           
                                    <div>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <a href="/"><img src="assets/img/logo.png" alt="" 
                                                    style={{
                                                        width: "220px",
                                                    }} />
                                                </a>
                                                <div className="d-md-none d-lg-none" id="right-logo">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12" md="7" lg="7" xl="6" style={{height: "400px"}}>
                                <div className="card h-100 border-0 justify-content-center">           
                                    <div>
                                        <div className="card-body">
                                            <div className="d-md-none d-lg-none" id="right-logo">
                                                <a href="/"><img src="assets/img/logo.png" alt="" 
                                                    style={{
                                                        width: "200px",
                                                    }} />
                                                </a>
                                            </div>
                                            <p id="not-found-title" className="mb-2 f-12">Terima kasih telah melakukan pendaftaran Webinar.</p>
                                            <p className="text-joran mb-4 f-16">Kami mengharapkan kehadiranmu pada Webinar ini.</p>
                                            
                                            <a href="my-webinar"  className="btn btn-joran pt-2 pb-2 mb-2 mr-2">Lihat Riwayat Webinar</a>
                                            <a href="/" className="btn btn-outline-joran pt-2 pb-2 mb-2">Kembali</a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {/* <Row className="justify-content-center" style={{marginTop: "50px"}}>
                            <Col md="8" lg="7" xl="6">
                                <Skeleton 
                                    shape="square"
                                    paragraph={{ rows: 10 }}
                                    loading={loading.isContentLoading}
                                    active>
                                    
                                    <div className="text-center mb-4">
                                        <a href="/" >
                                            <img src="/images/gallery/logo.png" alt="" className="img-fluid"  style={{width: "200px"}} />
                                        </a>
                                    </div>
                                    
                                       
                                    </Card>
                                    
                                    <Row>
                                        <Col md="12">
                                            <a href={`/my-webinar`}>
                                                <Button type="primary"  className="mb-2" block>
                                                    Lihat Riwayat Webinar
                                                </Button>
                                            </a>
                                            <a href="/">
                                                <Button type="info" block>
                                                    Kembali ke Halaman Utama
                                                </Button>
                                            </a>
                                        </Col>
                                    </Row>
                                </Skeleton>                                
                            </Col>
                        </Row> */}
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}
export default FreeWebinarRegistrationSuccess;