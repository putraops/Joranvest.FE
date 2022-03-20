import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import Footer from '../../Footer';
import { connect } from 'react-redux';
import { Breadcrumb, Card, Image, Badge, Spin, List } from 'antd';
import ReactHtmlParser from 'react-html-parser';

import { PricingComponents } from '../../membership/components/PricingComponents';
import './css/styles.css';

import { YoutubePlaylist } from './components/YoutubePlaylist';

import * as services from './services/service';
import * as membershipService from '../../membership/services/service';

import serverUrl from '../../../config/serverUrl';

import { 
    LockOutlined,
    HomeOutlined, 
    LoadingOutlined
} from '@ant-design/icons';
import sideNotification from '../../../commons/sideNotification';

const spinContent = <LoadingOutlined style={{ fontSize: 16 }} spin />;

const EducationDetailPage = (props) => {
    const [record, setRecord] = useState({});
    const [playlistRecord, setPlaylistRecord] = useState([]);
    const [loading, setLoading] = useState({
        isPaginationLoading: false,
        isContentLoading: false,
        isPlayerLoading: false,
        isPlaylistLoading: false,
        isPricingLoading: false,
    })
    const [videoIndex, setVideoIndex] = useState(0);
    const [playerState, setPlayerState] = useState({
        autoPlay: true,
        educationPlaylistId: "",
        url: [],
        playing: false,
    })

    const [isPricingShow, setIsPricingShow] = useState(false);
    const [pricings, setPricings] = useState([]);

    useEffect(() => {
        //-- Check User Login
        if (!props.user || !props.user?.is_membership) {
            window.location.assign("/edukasi/modul-pembelajaran")
        }
        
        if (props.match?.params?.path_url) {
            getByPathUrl(props.match?.params?.path_url);
        }

        getMemberships();

    }, []);

    const getByPathUrl = (path_url) => {
        setLoading({...loading, isContentLoading: true})

        services.getByPathUrl(path_url)
        .then(res => {
            var r = res.data;
            if (r.status) {
                setRecord(r.data);
                getPlaylist(r.data.id);
            }
        }).catch(res => {
            setLoading({...loading, isContentLoading: false});
        });
    }

    const getPlaylist = (recordId) => {
        setLoading({...loading, 
            isPlayerLoading: true,
            isPlaylistLoading: true
        });

		services.getPlaylist(recordId, props?.user?.id || "")
		.then(res => {
			var r = res.data;
			if (r.status) {

                if (r.data && r.data.length > 0) {
                    setPlaylistRecord(r.data);
                    setPlayerState({
                        ...playerState, 
                        educationPlaylistId: r.data[videoIndex].id,
                        url: r.data[videoIndex].file_url
                    });
                }

                setLoading({
                    ...loading, 
                    isPlayerLoading: false,
                    isPlaylistLoading: false
                });
			} else {
				sideNotification.open("Something went Wrong!", r.message, false);
			}
		}).catch(res => {
			sideNotification.open("Something went Wrong!", res.message, false);
		})
	}

    const getMemberships = () => {
        setLoading({...loading, isPricingShow: true});

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
            
            setLoading({...loading, isPricingShow: false});
        }).catch(res => {
            setLoading({...loading, isPricingShow: false});
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
                        <Breadcrumb.Item href="/edukasi/modul-pembelajaran">Modul Pembelajaran</Breadcrumb.Item>
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
                    isLoading={loading.isPricingLoading}
                    setHide={() => setIsPricingShow(false)} 
                />

                <Row className="">
                    <Col md="4" lg="4" className="mb-3">
                        {/* <Filter 
                            // handleFilterTimeframe={this.handleFilterTimeframe} 
                            // filtering={this.filtering} 
                        /> */}
                   
                        <Card id="card-education-detail-cover-image">
                            <Image
                                // className="cover-image-education"
                                preview={false}
                                src={serverUrl + "/" + record?.filepath}
                                onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image.png?t=9999"}} />
                        </Card>
                        
                        <Card id="card-education-detail-information" className='mt-3' bordered={false}>
                            <div className='f-20 font-weight-bold mb-0 card-education-detail-information-title'>
                                {loading.isContentLoading ? 
                                    <Spin indicator={spinContent}  /> :
                                    record?.title || "" }
                            </div>
                            
                            <Row className="mt-2">
                                <Col xs="12">
                                    {loading.isContentLoading ? 
                                        <Spin indicator={spinContent} /> :
                                        <>
                                            <Badge className='mr-3' color="green" text="Beginner" />
                                            <Badge color="#108ee9" text="30 Videos" />
                                        </>
                                    }
                                </Col>

                                <Col xs="12" className="mt-4">
                                    <p className='f-18 font-weight-bold mb-0 card-education-detail-information-title'>Tentang Modul</p>
                                    <div>
                                        {loading.isContentLoading ? 
                                            <Spin indicator={spinContent}  /> :
                                            ReactHtmlParser(record?.description || "") }
                                    </div>
                                </Col>
                            </Row>
                        
                        </Card>
                    </Col>
                    <Col md="8" lg="8" className="mb-3">
                        <YoutubePlaylist
                            userId={props.user.id}
                            videoIndex={videoIndex}
                            setVideoIndex={setVideoIndex}
                            playlistRecord={playlistRecord}
                            loading={loading}
                            setPlayerState={setPlayerState}
                            playerState={playerState} />
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
export default connect(mapStateToProps, null)(EducationDetailPage);