import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import { Typography, Card, Alert, Button, List, Modal, Breadcrumb } from 'antd';
import {
    HomeOutlined, 
    UserOutlined,
    IdcardOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

import Footer from '../Footer';
import WebinarSpeaker from './WebinarSepaker';
import WebinarPrice from './WebinarPrice';
import WebinarDate from './WebinarDate';
import WebinarDetailHeader from './WeinarDetailHeader';

import axiosApi from '../../config/axiosConfig';
import baseUrl from '../../config/baseUrl';

const { confirm } = Modal;

const { Text } = Typography;
const { Meta } = Card;

class WebinarDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                page: 1,
                size: 10,
            },
            user: {
                name: "",
            },
            isLoading: {
                register: false,
            },
            isRegistered: false,
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
        };
    }

    componentDidMount () {
        const { user } = this.props;
        axiosApi.get(`/webinar/getById/${this.props.match.params.id}`).then(r => {
            if (r.data.status) {
                this.setState({...this.state, detailData: r.data.data});
                var temp = {
                    startDate: r.data.data.webinar_start_date,
                    endDate: r.data.data.webinar_end_date,
                }
                console.log("temp", temp)
                this.setState({...this.state, webinarDate: temp});

                if (user) {
                    this.isWebinarRegistered();
                }
                this.getSpeakers();
            }
        });
    }

    getSpeakers = () => {
        const { detailData } = this.state;
        axiosApi.get(`/webinar_speaker/getAll?webinar_id=${detailData.id}`).then(r => {
            if (r.data.status) {
                this.setState({...this.state, speakers: r.data.data});
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

    handleSpeakerDetail = (id) => {
        this.props.history.push(`/speaker/${id}`);
    }

    handleRegistration = () => {
        const { isLoading, detailData, payload } = this.state;
        isLoading.register = true;
        payload.id = "";
        payload.webinar_id = detailData.id;
        payload.payment_status = detailData.price === 0 ? 200 : 1;
        payload.payment_type = detailData.price === 0 ? "Free" : "";

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
                    window.location.assign(baseUrl + "/membership/payment-success/" + r.data.id);
                }
            }
        });
    }
    
    render() {
        const { isLoading, isRegistered, detailData, speakers } = this.state;
        const { webinarDate } = this.state;
        const { user } = this.props;

        var register = () => {
            this.handleRegistration();
        }

        function showRegisterConfirm() {
            confirm({
                title: "Apakah yakin ingin mendaftar?.",
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
                                <Breadcrumb.Item>Webinar</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    
                    <WebinarDetailHeader data={detailData} /> 
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
                                                    <WebinarSpeaker speaker={item} goDetail={this.handleSpeakerDetail} />
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
                                                {detailData.description == "" ? 
                                                    <span className="">Tidak ada Ringkasan</span> : 
                                                    <div className="">{detailData.description}</div>}
                                                {/* Salah satu kunci kesuksesan adalah untuk mengetahui potensi yang kamu miliki terlebih dahulu. Sudahkah kamu menemukan potensimu? Yuk ikuti webinar ini! Memulai proses pendampingan memakai metode Coaching yang menggali kreatifitas, memacu motivasi dan mendukung bagi para Coachee. Peserta akan dibantu menyusun rencana aksi yang mendetail dan terinci untuk dapat memulai karir mereka dengan langkah mantap dan lebih percaya diri.
                                                <br /><br />
                                                Target Peserta :<br />
                                                1. Mahasiswa yang sebentar lagi akan lulus dan dalam persiapan memasuki dunia kerja nantinya <br /><br />

                                                2. Fresh graduate yang baru ingin memulai karir professional<br /><br />

                                                3. Mereka yang ingin mencoba jalur karir yang baru<br /><br />

                                                ㅡㅡㅡㅡㅡ<br /><br />

                                                Dapatkan<br />
                                                ✅ Jalur khusus daftar kerja <br />
                                                ✅ E-certificate <br />
                                                ✅ Saldo GO-PAY 50K untuk 2 orang penanya <br /> */}
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
                                                            Kamu bisa mendaftar webinar ini dengan mengklik tombol "Daftar Sekarang".<br /><br />
                                                            1.Pastikan kamu sudah terdaftar menjadi pengguna dan login. <br />
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
                                    <Card className="mb-2 borderShadow5"
                                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" height="180px" />}
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
                                                        {(() => {
                                                            if (detailData.speaker_name != "") {
                                                                return (
                                                                    <div>{detailData.speaker_name}</div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div>{detailData.organizer_organization_name}</div>
                                                                )
                                                            }
                                                        })()}
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
                                            disabled={isRegistered}
                                            loading={isLoading.register}
                                            onClick={user ? () => showRegisterConfirm() : () => showLoginConfirm()}
                                            >
                                            <span>{isRegistered ? "Sudah Terdaftar" : "Daftar Sekarang" }</span>
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