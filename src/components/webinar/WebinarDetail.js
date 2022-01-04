import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { Card, Alert, Button, List, Modal, Breadcrumb } from 'antd';
import moment from 'moment';
import {
    HomeOutlined, 
    UserOutlined,
    IdcardOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

import Footer from '../Footer';
import WebinarSpeaker from './components/WebinarSepaker';
import WebinarPrice from './components/WebinarPrice';
import WebinarDate from './components/WebinarDate';
import WebinarDetailHeader from './components/WebinarDetailHeader';

import axiosApi from '../../config/axiosConfig';
import baseUrl from '../../config/baseUrl';
import serverUrl from '../../config/serverUrl';

const { confirm } = Modal;

const { Meta } = Card;

class WebinarDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
            },
            isLoading: {
                register: false,
            },
            isRegistered: false,
            isExpired: false,
            detailData: [],
            webinarDate: {
                startDate: {
                    Time: "",
                    Valid: false,
                },
                endDate: {
                    Time: "",
                    Valid: false,
                },
            },
            payload: {
                id: "",
                webinar_id: "",
                payment_type: "",
                payment_status: 0,
            },
            speakers: [],
            webinar_speakers: "",
        };
    }

    componentDidMount () {
        const { user } = this.props;
        axiosApi.get(`/webinar/getById/${this.props.match.params.id}`)
        .then(res => {
            var r = res.data;
            var now = Date.now();
            if (r.status) {
                var isExpired = moment(now).isAfter(moment(r.data.webinar_start_date.Time))

                var temp = {
                    startDate: r.data.webinar_start_date,
                    endDate: r.data.webinar_end_date,
                }
                this.setState({
                    ...this.state, 
                    detailData: r.data,
                    webinarDate: temp,
                    isExpired: isExpired,
                });

                if (user && !isExpired) {
                    this.isWebinarRegistered();
                }
                this.getSpeakers();
            }
        });
    }

    getSpeakers = () => {
        const { detailData } = this.state;
        axiosApi.get(`/webinar_speaker/getAll?webinar_id=${detailData.id}`)
        .then(res => {
            var r = res.data;
            console.log("getSpeakers:: ", r);
            if (r.status) {
                var webinar_speakers = "";
                if (r.data && r.data.length > 0) {
                    for (var i = 0; i < r.data.length; i++) {
                        if (i !== 0 && i === r.data.length -1) {
                            webinar_speakers += " dan ";
                        } else if (i !== 0 && i !== r.data.length -1) {
                            webinar_speakers += ", ";
                        }
                        webinar_speakers += r.data[i].organization_name !== "" ? r.data[i].organization_name : r.data[i].speaker_full_name;
                    }
                }
                this.setState({
                    ...this.state, 
                    speakers: r.data,
                    webinar_speakers: webinar_speakers
                });
            }
        });
    }

    isWebinarRegistered = () => {
        const { detailData } = this.state;
        axiosApi.get(`/webinar_registration/isWebinarRegistered/${detailData.id}`)
        .then(res => {
            var r = res.data;
            if (r.status) {
                this.setState({
                    ...this.state,
                    isRegistered: true,
                })
            }
        });
    }

    handleRegistration = () => {
        const { isLoading, detailData, payload } = this.state;
        isLoading.register = true;
        payload.id = "";
        payload.webinar_id = detailData.id;
        payload.application_user_id = this.props.user.id;
        payload.payment_id = null;

        this.setState({
            ...this.state,
            isLoading: {
                ...isLoading,
                register: true
            },
            payload: payload
        })
        
        axiosApi.post("/webinar_registration/save", payload)
        .then(res => {
            var r = res.data;
            if (r.status) {
                if (r.status) {
                    window.location.assign(baseUrl + "/webinar/payment/success/" + r.data.id);
                }
            }
        });
    }
    
    render() {
        const { isLoading, isRegistered, isExpired, detailData, speakers, webinar_speakers } = this.state;
        const { webinarDate } = this.state;
        const { user } = this.props;

        var register = () => {
            this.handleRegistration();
        }

        function registration() {
            if (detailData.price > 0) {
                window.location.assign(baseUrl + "/webinar/payment/" + detailData.id);
            } else {
                confirm({
                    title: "Apakah yakin ingin mendaftar?",
                    icon: <ExclamationCircleOutlined />,
                    content: '',
                    okText: 'Ya',
                    width: "500px",
                    cancelText: 'Tidak',
                    centered: true,
                    onOk() {
                        register();
                    },
                    onCancel() {
                    },
                });
            }
        }

        function showLoginConfirm() {
            confirm({
                title: "Login terlebih dahulu untuk daftar Webinar.",
                icon: <ExclamationCircleOutlined />,
                content: 'Pilih Login untuk pindah ke halaman login.',
                okText: 'Login',
                width: "500px",
                cancelText: 'Batal',
                onOk() {
                    window.location.assign(baseUrl + "/login");
                },
                onCancel() {
                },
            });
        }

        return (
            <React.Fragment>
                <section className="section home-1-bg">         
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="container mb-3">
                            <Breadcrumb className="pt-1">
                                <Breadcrumb.Item href="/">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/webinar">
                                    <span>Webinar</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{detailData.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    
                    <WebinarDetailHeader data={detailData} speakers={speakers} /> 
                    <div className="container mt-4">
                        <Row>
                            <Col span={6} xs={{ order: 2 }} sm={{ order: 2 }} sm="7"  md="8" md={{ order: 1 }} lg="8" lg={{ order: 1 }} xl={{ order: 1 }} lg="8">
                                <Row className="mb-4">
                                    <Col lg="12 mb-4">
                                        <div className="title-heading">
                                            <h3 className="text-dark font-weight-bold mb-0 f-17">Pembicara</h3>
                                            <div className="title-border-simple position-relative"></div>
                                        </div>
                                    </Col>
                                    <Col lg="12 mt-2">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={speakers}
                                            renderItem={item => (
                                                <WebinarSpeaker speaker={item}/>
                                            )}
                                        />
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col lg="12 mb-4">
                                        <div className="title-heading">
                                            <h3 className="text-dark font-weight-bold mb-0 f-17">Ringkasan</h3>
                                            <div className="title-border-simple position-relative"></div>
                                        </div>
                                    </Col>
                                    <Col lg="12 mt-2">
                                        <Card >
                                            {detailData.description === "" ? 
                                                <span className="">Tidak ada Ringkasan</span> : 
                                                <div className="">{detailData.description}</div>}
                                        </Card> 
                                    </Col>
                                </Row>   
                                <Row className="mb-4">
                                    <Col lg="12 mb-4">
                                        <div className="title-heading">
                                            <h3 className="text-dark font-weight-bold mb-0 f-17">Cara Mengikuti Webinar</h3>
                                            <div className="title-border-simple position-relative"></div>
                                        </div>
                                    </Col>
                                    <Col lg="12 mt-2">
                                        <Alert
                                            message=""
                                            description={
                                                <div style={{marginTop: "-5px"}}>
                                                    <p>
                                                        Kamu bisa mendaftar webinar ini dengan mengklik tombol <strong>"Daftar Sekarang"</strong>.<br /><br />
                                                        1. Pastikan kamu sudah terdaftar menjadi pengguna dan login. <br />
                                                        2. 15 menit sebelum event berlangsung, kamu sudah bisa bergabung.<br />
                                                        3. Bergabung webinar terdaftar.<br />
                                                        Buka halaman webinar yang sudah terdaftar.<br />
                                                        Pastikan kamu sudah login.<br />
                                                        Lalu klik tombol "Mulai Sekarang".<br />
                                                        4. Jangan lupa setelah sesi webinar berakhir untuk mengisi ulasan webinar dengan mengklik tombol "Beri Ulasan".<br />
                                                        5. Webinar yang memiliki sertifikat kehadiran bisa kamu dapatkan 1x24 jam setelah mengisi ulasan webinar.<br /><br />
                                                        
                                                        Note: Link download akan dikirimkan melalui email atau halaman riwayat webinar atau halaman ini.
                                                    </p>
                                                </div>
                                            }
                                            type="success"
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col lg="12">
                                        <div className="title-heading mb-4">
                                            <h3 className="text-dark font-weight-bold mb-0 f-17">Syarat dan Ketentuan</h3>
                                            <div className="title-border-simple position-relative"></div>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <Alert className="mt-2"
                                            message=""
                                            description={
                                                <div style={{marginTop: "-5px"}}>
                                                    Segala pemberitahuan mengenai informasi dan perubahan kelas akan disampaikan langsung oleh sistem kami melalui email, harap melakukan pengecekan email secara berkala. Untuk info selanjutnya bisa hubungi kami di info@joranvest.com
                                                </div>
                                            }
                                            type="info"
                                            showIcon
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6} xs={{ order: 1 }} sm={{ order: 1 }} sm="5"  md="4" md={{ order: 2 }} lg="4" lg={{ order: 2 }} xl={{ order: 2 }} lg="4">
                                <Card 
                                    className="mb-2 borderShadow5"
                                    cover={
                                        <img 
                                            alt={detailData.title} 
                                            src={serverUrl + "/" + detailData.filepath}
                                            onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image.png?t=9999"}}
                                            style={{width: "100%", maxHeight: "250px"}}
                                        />
                                    }
                                >
                                    <p className="mb-0">Harga Webinar</p>
                                    <p className="mb-3 font-weight-bold" style={{fontSize: "30px", marginTop: "-15px"}}>
                                        <WebinarPrice price={detailData.price} discount={detailData.discount} />
                                    </p>

                                    <Meta className="mb-3"
                                        avatar={<UserOutlined className="f-20" />}
                                        title={
                                            <div style={{marginTop: "-5px"}}>
                                                <span className="f-14">Pembicara</span>
                                            </div>
                                        }
                                        description={
                                            <div style={{marginTop: "-12px"}}>
                                                <span className="f-13 text-muted">
                                                    <div>{webinar_speakers}</div>
                                                </span>
                                            </div>
                                        }
                                    />
                                    <WebinarDate obj={detailData} webinar_date = {webinarDate} />
                                    {(() => {
                                        if (detailData.is_certificate) {
                                            return (
                                                <Meta className="mb-4"
                                                avatar={<IdcardOutlined className="f-20" />}
                                                title={
                                                    <div style={{marginTop: "-1px"}}>
                                                        <span className="f-14">Bersertifikat</span>
                                                    </div>
                                                }
                                            />
                                            )
                                        }
                                    })()}

                                    <Button className="font-weight-bold"
                                        type="primary"
                                        block
                                        size='large'
                                        disabled={isRegistered || isExpired}
                                        loading={isLoading.register}
                                        onClick={user ? () => registration() : () => showLoginConfirm()}
                                        >
                                        <span>{isRegistered ? "Sudah Terdaftar" : (isExpired ? "Telah Berakhir" : "Daftar Sekarang") }</span>
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    </div> 
                <Footer />
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(WebinarDetail);