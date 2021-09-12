import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import Footer from '../Footer';
import WebinarSpeaker from './WebinarSepaker';
import WebinarPrice from './WebinarPrice';
import WebinarDate from './WebinarDate';

import axiosApi from '../../config/axiosConfig';

import { PoweroffOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Card, Alert, Button, List, Image, Avatar, Rate, Tag } from 'antd';
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
                <section className="section">
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="container">
                            <p className="h5 mb-3 f-15">Home / 123 / 123</p>
                        </div>
                        <div className="card no-radius" style={{backgroundColor: "#1c1d1f"}}>
                            <div className="card-body text-white">
                                <div className="container pb-4 pt-4">
                                    <Row>
                                        <Col className="text-right" span={6} xs={{ order: 1 }} sm={{ order: 1 }} sm="12" md={{ order: 2 }} lg={{ order: 2 }} lg="4">
                                            <Tag className="pr-3 pl-3" color="#cd201f">LIVE</Tag>
                                        </Col>
                                        <Col span={6} xs={{ order: 2 }} sm={{ order: 1 }} sm="12" md={{ order: 1 }} lg={{ order: 1 }} lg="8">
                                            <h5 className="card-title text-white font-weight-bold" style={{fontSize: "28px"}}>{this.state.detailData.title}</h5>
                                            <div className="f-15">
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-2 pb-0 col-form-label">Pembicara</label>
                                                    <label className="col-sm-10 pb-0 col-form-label">
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
                                                    </label>
                                                </div>
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-2 pb-0 col-form-label">Tanggal</label>
                                                    <label className="col-sm-10 pb-0 col-form-label">11 Sep 2021</label>
                                                </div>
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-2 pb-0 col-form-label">Jam</label>
                                                    <label className="col-sm-10 pb-0 col-form-label">10:00 - 12:00 WIB</label>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className="card no-radius">
                        {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
                            <div className="card-body pt-2 pb-2">
                                <div className="container">
                                    <Row className="g-0">
                                        <Col xs="6" sm="6" md="6" lg="4 g-0">
                                            <span className="f-14" style={{fontWeight: "500"}}>
                                                {detailData.min_age == 0 ? "Semua Umur" : <span>Min Umur: {detailData.min_age} tahun</span>}
                                            </span>
                                        </Col>
                                        <Col xs="6" sm="6" md="6" lg="4">
                                            <span className="f-14" style={{fontWeight: "500"}}>Level: {this.state.detailData.webinar_level}</span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    
                        <div className="container mt-4">
                            <Row>
                                <Col span={6} xs={{ order: 2 }} sm={{ order: 2 }} sm="7"  md="8" md={{ order: 1 }} lg="8" lg={{ order: 1 }} xl={{ order: 1 }} lg="8">
                                    <p className="mb-1 font-weight-bold f-17">Pembicara</p>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={speakers}
                                        renderItem={item => (
                                            <WebinarSpeaker speaker={item} goDetail={this.handleSpeakerDetail} />
                                        )}
                                    />

                                    <p className="mb-1 font-weight-bold f-17">Ringkasan</p>
                                    <Card className={detailData.description == "" ? "mb-3 text-center" : "mb-3"} >
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

                                    <p className="mb-1 font-weight-bold f-17">Cara Mengikuti Webinar</p>
                                    <Alert className="mb-3"
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
                                    <p className="mb-1 font-weight-bold f-17">Syarat dan Ketentuan</p>
                                    <Alert className="mb-0"
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
                    </div>      
                </section>
                <Footer />
            </React.Fragment>
        );
    }
}

export default WebinarDetail;