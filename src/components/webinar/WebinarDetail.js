import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import Footer from '../Footer';
import WebinarSpeaker from './WebinarSepaker';
import WebinarPrice from './WebinarPrice';
import WebinarDate from './WebinarDate';
import WebinarDetailHeader from './WeinarDetailHeader';

import axiosApi from '../../config/axiosConfig';

import { PoweroffOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Card, Alert, Button, List, Image, Avatar, Rate, Tag, Form, Input } from 'antd';
import {
    UserOutlined,
    ScheduleOutlined,
    IdcardOutlined,
    EyeOutlined,
    YoutubeOutlined
  } from '@ant-design/icons';
import { configConsumerProps } from 'antd/lib/config-provider';
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
            loadings: [],
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
            speakers: [],
        };
    }

    componentDidMount () {
        const { payload } = this.state;
        axiosApi.get(`/webinar/getById/${this.props.match.params.id}`).then(r => {
            if (r.data.status) {
                this.setState({...this.state, detailData: r.data.data});

                // this.setState({...this.state, webinarFirstStartDate: r.data.data.webinar_first_start_date});
                // this.setState({...this.state, webinarFirstEndDate: r.data.data.webinar_first_end_date});
                // this.setState({...this.state, webinarLastStartDate: r.data.data.webinar_last_start_date});
                // this.setState({...this.state, webinarLastEndDate: r.data.data.webinar_last_end_date});

                var temp = {
                    startDate: r.data.data.webinar_start_date,
                    endDate: r.data.data.webinar_end_date,
                }
                this.setState({...this.state, webinarDate: temp});

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

    handleSpeakerDetail = (id) => {
        this.props.history.push(`/speaker/${id}`);
    }

    enterLoading = index => {
        this.setState(({ loadings }) => {
          const newLoadings = [...loadings];
          newLoadings[index] = true;
    
          return {
            loadings: newLoadings,
          };
        });
        setTimeout(() => {
          this.setState(({ loadings }) => {
            const newLoadings = [...loadings];
            newLoadings[index] = false;
    
            return {
              loadings: newLoadings,
            };
          });
        }, 6000);
      };
    
    render() {
        const { loadings, detailData, speakers } = this.state;
        const { webinarDate } = this.state;
        // console.log("T" , this.state.webinarFirstStartDate.Time);
        // console.log("IsValid" , this.state.webinarFirstStartDate.Valid);
        // console.log("T" , this.state.webinarLastStartDate.Time);
        // console.log("IsValid" , this.state.webinarLastStartDate.Valid);
        const cardStyle = { 
            // width: "360px", 
            // height: "192px", 
            // borderRadius: "16px", 
            // marginRight: "24px", 
            boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" 
        }

        return (
            <React.Fragment>
                <section className="section home-1-bg">         
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="container mb-3">
                            <ul className="nav subNav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/technical">Teknikal</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/fundamental">Fundamental</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/article">Artikel Pilihan</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/webinar">Webinar</a>
                                </li>
                            </ul>
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
                                    <Card className="mb-2" style={cardStyle}
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
                                            loading={loadings[1]}
                                            onClick={() => this.enterLoading(1)}
                                            >
                                            <span>Daftar Sekarang</span>
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

export default WebinarDetail;