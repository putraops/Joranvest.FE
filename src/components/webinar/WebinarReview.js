import React, { useState, Fragment, useEffect } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Card, Avatar, Image, List, Breadcrumb, Rate, Input, Button, Alert } from 'antd';

import SubNav from '../_nav/subNav';
import Footer from '../Footer';
import SpeakerReview from './components/Review/SpeakerReview';

import moment from 'moment';
import axiosApi from '../../config/axiosConfig';
import sideNotification from '../../commons/sideNotification';
import dateFormat from '../../commons/dateFormat';
import serverUrl from '../../config/serverUrl';
import { connect } from 'react-redux'

import { 
    HomeOutlined, 
    ScheduleOutlined,
} from '@ant-design/icons';
const { Meta } = Card;
const { TextArea } = Input;

const WebinarReview = props => {
    const [webinarRecord, setWebinarRecord] = useState({})
    const [webinarSpeakers, setWebinarSpeakers] = useState(null);
    const [isLoading, setIsLoading] = useState({
        submitWebinarRating: false,
    });
    
    useEffect(() => {
        if (props.match.params && props.match.params.id != "") {
            validateRecord(props.match.params.id);
        }
    }, []);

    const validateRecord = (id) => {
        axiosApi.get(`/webinar_registration/getById/${id}`)
        .then(res => {
            var r = res.data;
            if (r.status) {
                getWebinarRatingByUserId(r.data.webinar_id, props.user.id);
            } else {
                sideNotification.open("Error", r.message, false);
            }
        });
    }

    const getWebinarRatingByUserId = (webinarId, userId) => {
        axiosApi.get(`/webinar/getWebinarWithRatingByUserId/${webinarId}/${userId}`)
        .then(res => {
            var r = res.data;
            if (r.status) {
                console.log("getWebinarRatingByUserId: ", r);
                setWebinarRecord(r.data);
                getWebinarSpeakers(webinarId);
            } else {
                sideNotification.open("Error", r.message, false);
            }
        });
    }

    const getWebinarSpeakers = (webinar_id) => {
        axiosApi.get(`/webinar_speaker/getSpeakersRatingByWebinarId/${webinar_id}`)
        .then(res => {
            var r = res.data;
            console.log("getWebinarSpeakers: ", r);
            if (r.status) {
                if (r.data.length > 0) {
                    setWebinarSpeakers(r.data);
                }
            }
        });
    }

    const formatDate = (data) => {
        var result = "";
        if (data && data.webinar_start_date) {
            if (moment(data.webinar_start_date.Time,  "YYYY/MM/DD").format('DDMMMYYYY') === moment(data.webinar_end_date.Time,  "YYYY/MM/DD").format('DDMMMYYYY')) {
                result = dateFormat.getLongDateFormatID(data.webinar_start_date.Time);
            } else {
                result = dateFormat.getLongDateFormatID(data.webinar_start_date.Time) + " - " + dateFormat.getLongDateFormatID(data.webinar_end_date.Time);
            }
        }
        return result;
    }

    const formatTime = (data) => {
        var result = "";
        if (data && data.webinar_start_date) {
            result = moment(data.webinar_start_date.Time,  "YYYY/MM/DD HH:mm").format('HH:mm') + " - " + moment(data.webinar_end_date.Time,  "YYYY/MM/DD HH:mm").format('HH:mm');
        }
        return result;
    }

    const handleChangeWebinarRating = (event) => {
        setWebinarRecord({
            ...webinarRecord,
            rating: event
        });
    }

    const handleChangeWebinarComment = (event) => {
        setWebinarRecord({
            ...webinarRecord,
            comment: event.target.value
        });
    }

    const saveWebinarRating = () => {
        if (webinarRecord.rating === 0) {
            sideNotification.open("Gagal!", "Silahkan isi Penilaian terlebih dahulu.", false);
            return;
        }
        var payload = {
            id: webinarRecord.rating_master_id,
            user_id: props.user.id,
            object_rated_id: webinarRecord.id,
            reference_id: webinarRecord.id,
            rating: webinarRecord.rating,
            comment: webinarRecord.comment, 
        }

        setIsLoading({
            ...isLoading,
            submitWebinarRating: true
        });

        axiosApi.post(`/rating_master/save`, payload)
        .then(res => {
            var r = res.data;
            if (r.status) {
                sideNotification.open("Berhasil", "Penilaian terhadap Webinar telah dikirim.", true);
                setWebinarRecord({
                    ...webinarRecord,
                    rating_master_id: r.data.id,
                });
                setIsLoading({
                    ...isLoading,
                    submitWebinarRating: false,
                });
            } else {
                sideNotification.open("Gagal", r.message, false);
            }
        });
    }

    const desc = ['Sangat Jelek', 'Jelek', 'Biasa', 'Baik', 'Sangat Baik'];

    return (
        <React.Fragment>
            <section className="section home-1-bg" id="home">
                <div className="container-fluid mt-2 mb-2 pr-0 pl-0">
                    <div className="container">
                        <Breadcrumb className="pt-1">
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/my-webinar">
                                Riwayat Webinar
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Ulasan & Penilaian</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <SubNav title="Ulasan & Penilaian" sub_title="" />

                <div className="container mt-4">
                    <Row className="mb-5">
                        <Col md="8" lg="9">
                            <Card
                                title={"Informasi Webinar"}
                                size='default'>
                                <Meta
                                    avatar={
                                        <Image
                                            width={150} 
                                            style={{height: "80px", maxWidth: "150px"}}
                                            preview={false}
                                            src={serverUrl + "/" + webinarRecord.filepath}
                                            onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image.png?t=9999"}}
                                        />
                                    }
                                    title={
                                        <>
                                            <p className='mb-0'>{webinarRecord.title || ""}</p>
                                            <Meta className="mt-2 mb-2"
                                                avatar={<ScheduleOutlined className="f-20" />}
                                                title={
                                                    <>
                                                        <div style={{marginTop: "-2px"}}>
                                                            <span className="f-14">Tanggal Webinar</span>
                                                        </div>
                                                    </>
                                                }
                                                description={
                                                    <div style={{marginTop: "-8px"}}>
                                                        <span className="f-14 text-muted">
                                                            <span>{webinarRecord ? formatDate(webinarRecord) : "-"}</span> <br/>
                                                            <span>{webinarRecord ? "Jam: " + formatTime(webinarRecord) : "-"}</span>
                                                        </span>
                                                    </div>
                                                }
                                            />
                                            
                                            <p className="text-muted mb-0 mt-2">Bagaimana kualitas dari Webinar ini?</p>
                                            <Rate 
                                                tooltips={desc} 
                                                onChange={handleChangeWebinarRating} 
                                                value={webinarRecord.rating || 0} 
                                                disabled={webinarRecord.rating_master_id === "" ? false : true}
                                                style={{"marginTop": "-30px"}}/>
                                        </>
                                    }
                                    description={
                                        <form key={`id-${webinarRecord.id}`}>
                                            <p className="text-muted mb-0 mt-2">Beri Ulasan untuk Webinar ini: </p>
                                            <TextArea 
                                                className="mb-2"
                                                value={webinarRecord.comment || ""}
                                                onChange={handleChangeWebinarComment}
                                                disabled={webinarRecord.rating_master_id === "" ? false : true}
                                                placeholder="Tulis Ulasan"
                                                rows={2} />
                                            {(() => {
                                                if (webinarRecord.rating_master_id === "") {
                                                    return (
                                                        <Button type='primary' 
                                                            className="text-right" 
                                                            loading={isLoading.submitWebinarRating} 
                                                            disabled={webinarRecord.rating_master_id === "" ? false : true} 
                                                            onClick={saveWebinarRating}>
                                                            Kirim
                                                        </Button>
                                                    )
                                                } else {
                                                    return (
                                                        <p className="text-muted">Penilaian telah dikunci. Terima kasih telah menberikan Penilaian.</p>
                                                    )
                                                }
                                            })()}
                                        </form>
                                    }
                                />
                            </Card>
                            
                            <hr />
                            <h5 className='mb-2 font-weight-bold'>Pembicara: </h5>

                            {webinarSpeakers ? 
                                <Fragment>
                                    <List
                                        itemLayout="vertical"  size="large"
                                        dataSource={webinarSpeakers}
                                        loading={false}
                                        renderItem={item => <SpeakerReview webinar_id={webinarRecord.id} speaker_item={item} />}
                                    />
                                </Fragment>
                                
                            : 
                                <Card>
                                    <p className="text-center f-16 mb-0">Tidak ada data Pembicara</p>
                                </Card>
                            }
                        </Col>
                        <Col md="4" lg="3">
                            <Alert message="Informasi dan Tips Menulis Ulasan" type="warning" showIcon />
                            <Alert style={{"marginTop": "-1px"}} 
                                message={
                                    <ol className="mb-0" style={{"marginLeft": "-25px"}}>
                                        <li>Penilaian dan Ulasan terhadap Webinar dan Pembicara dilakukan terpisah.</li>
                                        <li>Diharapkan memberi Penilaian dan Ulasan secara objektif.</li>
                                        <li>Penilaian dan Ulasan yang kamu berikan akan sangat bermanfaat untuk tinjauan kembali kami terhadap Webinar maupun Pembicara.</li>
                                    </ol>
                                }
                                type="warning" />
                        </Col>
                    </Row>
                </div>      
                <Footer />
            </section>
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        webinarReviewReducer: state.webinarReviewReducer,
    }
}
export default connect(mapStateToProps, null)(WebinarReview);

