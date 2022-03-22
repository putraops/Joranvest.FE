import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import Footer from '../../Footer';
import { connect } from 'react-redux';
import { Breadcrumb, Card, Image, Badge, Spin, Skeleton } from 'antd';
import ReactHtmlParser from 'react-html-parser';

import { PricingComponents } from '../../membership/components/PricingComponents';
import './css/styles.css';

import { YoutubePlaylist } from './components/YoutubePlaylist';

import * as services from './services/service';
import * as membershipService from '../../membership/services/service';

import serverUrl from '../../../config/serverUrl';

import { 
    HomeOutlined, 
    LoadingOutlined
} from '@ant-design/icons';
import sideNotification from '../../../commons/sideNotification';

const spinContent = <LoadingOutlined style={{ fontSize: 16 }} spin />;

const WebinarRecordingDetailPage = (props) => {
    const [record, setRecord] = useState(null);
    const [hasAccessVideo, setHasAccessVideo] = useState(null);
    const [isInitLoading, setisInitLoading] = useState(false);
    const [isPricingLoading, setIsPricingLoading] = useState(false);
    const [isPricingShow, setIsPricingShow] = useState(false);
    const [pricings, setPricings] = useState([]);

    useEffect(() => {
        //if (props.match?.params?.path_url) {
            getByPathUrl(props.match?.params?.path_url);
        //}

        getMemberships();

    }, [props.match?.params?.path_url]);

    const getByPathUrl = (path_url) => {
        getMemberships();
        setisInitLoading(true);

        services.getByPathUrl(path_url)
        .then(res => {
            var r = res.data;
            console.log(r);
            if (r.status) {
                setRecord(r.data);
                if (r.data.price <= 0 || (props?.user && props?.user.is_membership)) {
                    setHasAccessVideo(true);
                } else if (r.data.price > 0 && props?.user) {
                    isWebinarRegistered(r.data.webinar_id);
                } else {
                    setHasAccessVideo(false);
                }
            }
            setisInitLoading(false);
        }).catch(res => {
            setisInitLoading(false);
        });
    }

    const isWebinarRegistered = (id) => {
        services.isWebinarRegistered(id)
        .then(res => {
            var r = res.data;
            setHasAccessVideo(r.status)
        }).catch(res => {
           
        });
    }

    const getMemberships = () => {
        setIsPricingLoading(true);

        membershipService.getMemberships()
        .then(res => {
            var r = res.data;
            if (r.status) {
                if (r.data && r.data.length > 0) {
                    setPricings(r.data);
                }
            } else {
                sideNotification.open("Gagal memuat data membership")
            }
            
            setIsPricingLoading(false);
        }).catch(res => {
            setIsPricingLoading(false);
        });
    }

    return (
        <section className="section" id="home">
            <div className="container-fluid mt-3 pr-0 pl-0">
                <div className="container mb-3">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="/edukasi/webinar-recording">Webinar Recording</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {record?.title || ""}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>

            <div className="container mt-2">
                <div className="mt-3 pr-0 pl-0 mb-3">
                    <div className="card no-radius" style={{backgroundColor: "#1c1d1f"}}>
                        <div className="card-body">
                            <div className="container pb-0 pt-0">
                                <Row>
                                    <Col span={6} sm="12" md="12" lg="12">
                                        <h5 className="card-title text-white fw-500 mb-0" style={{fontSize: "16px", lineHeight: "30px"}}>
                                            <span className='mr-2'>Akses ke Modul Pembelajaran dan Webinar Recording</span>
                                            <button className="btn btn-joran btn-xs pr-2 pl-2 pt-1 pb-2" onClick={() => setIsPricingShow(true)}>Berlangganan</button>
                                            <span className='ml-2'>mulai dari 2000an/hari</span></h5>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>

                <PricingComponents
                    pricings={pricings}
                    isShow={isPricingShow}
                    isLoading={isPricingLoading}
                    setHide={() => setIsPricingShow(false)} />

                <Row className="">
                    <Col md="4" lg="4" className="mb-3">
                        <Card id={isInitLoading ? "" : "card-education-detail-cover-image"} loading={isInitLoading}>
                            <Image
                                preview={false}
                                src={serverUrl + "/" + record?.filepath}
                                onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image.png?t=9999"}} />
                        </Card>
                        
                        <Card id="card-education-detail-information" className='mt-3' bordered={false}>
                            <div className='f-20 font-weight-bold mb-0 card-education-detail-information-title'>
                                <Skeleton loading={isInitLoading} active>
                                    {record?.title}
                                </Skeleton>
                            </div>
                            
                            <Row className="mt-2">
                                <Col xs="12">
                                    {isInitLoading ? 
                                        <Spin indicator={spinContent} /> :
                                        <>
                                            <Badge className='mr-3' color="green" text={record?.webinar_level || ""} />
                                            <Badge color="#108ee9" text={record?.webinar_category_name || ""} />
                                        </>
                                    }
                                </Col>

                                <Col xs="12" className="mt-4">
                                    <p className='f-18 font-weight-bold mb-0 card-education-detail-information-title'>Tentang Webinar</p>
                                    <Skeleton loading={isInitLoading} active>
                                        {ReactHtmlParser(record?.description || "")}
                                    </Skeleton>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col md="8" lg="8" className="mb-3">
                        <YoutubePlaylist
                            hasAccess={hasAccessVideo}
                            user={props.user}
                            // isPlayerLoading={isPlayerLoading}
                            //setPlayerState={setPlayerState}
                            record={record} />
                    </Col>
                </Row>
            </div>      
            <Footer />
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(WebinarRecordingDetailPage);