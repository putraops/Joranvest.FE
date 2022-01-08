import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import { Row, Col, Image, Alert, Tag, Rate, Breadcrumb, List, Card } from 'antd';
import { Tabs } from 'antd';

import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser';

import SubNav from '../../_nav/subNav';
import Footer from '../../Footer';

import { 
    HomeOutlined, 
} from '@ant-design/icons';
import axiosApi from '../../../config/axiosConfig';
import serverUrl from '../../../config/serverUrl';

const { TabPane } = Tabs;
const { Meta } = Card;

const SpeakerReview = props => { 
    const [speakerId, setSpeakerId] = useState("");
    const [speakerRecord, setSpeakerRecord] = useState({});
    const [listData, setListData] = useState([]);
    const [pagination, setPagination] = useState({
        total: 0
    });
    const [payload, setPayload] = useState({
        page: 1,
        size: 10,
    });

    const [loading, setLoading] = useState({
        isPagingLoading: false,
    });

    useEffect(() => {
        if (props.match.params.id) {
            getSpeakerById(props.match.params.id)

            setPayload({
                ...payload,
                page: 1,
                size: 10,
                filter: [
                    {
                        "field": "object_rated_id",
                        "operator": "=",
                        "value": props.match.params.id,
                    }
                ]
            })
        }
    }, []);

    useLayoutEffect(() => {
        if (props.match.params.id) {
            getReviewPagination();
        }
    }, [payload]);

    const getSpeakerById = (id) => {
        axiosApi.get(`/webinar_speaker/getSpeakerReviewById/${id}`)
        .then(res => {
            var r = res.data;
            if (r.status) {
                setSpeakerId(r.data.id);
                setSpeakerRecord(r.data);
            }
        });
    }

    function onPageChange(page, pageSize){
        setPayload({
            ...payload,
            page: page,
            size: pageSize, 
        })
    }

    function handleStarFilter(data) {
        setPayload({
            ...payload,
            page: 1,
            size: 10,
            filter: [
                {
                    "field": "object_rated_id",
                    "operator": "=",
                    "value": props.match.params.id,
                },
                {
                    "field": "rating",
                    "operator": data === -1 ? ">" : "=",
                    "value": data === -1 ? "0" : data.toString(),
                },
            ]
        })
    }

    const getReviewPagination = () => {
        setLoading({
            ...loading,
            isPagingLoading: true
        });
        axiosApi.post(`/rating_master/getPagination`, payload)
        .then(res => {
            var r = res.data;
            
            if (r.status) {
                setListData(r.data.data || [])
                setPagination({
                    total: r.data.total
                });
            }
            setLoading({
                ...loading,
                isPagingLoading: false
            });
        });
    }

    function callback(key) {
        console.log(key);
    }

    return (
        <Fragment>
            <section className="section" id="home">
                {(() => {
                    if (speakerRecord) {
                        return (
                            <>
                                <div className="container-fluid mt-2 mb-2 pr-0 pl-0">
                                    <div className="container">
                                        <Breadcrumb className="pt-1">
                                            <Breadcrumb.Item href="/">
                                                <HomeOutlined />
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>{speakerRecord.speaker_name}</Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                </div>
                                <SubNav title={speakerRecord.speaker_name} sub_title="" />          
                            </>
                        )
                    }
                })()}

                <div className="container mt-4">
                    {(() => {
                        if (speakerId === "") {
                            return (
                                <Card className={`mb-3 borderShadow5 ${speakerId === "" ? "mt-5 mb-5" : ""}`}>
                                    <Row className="mt-5 text-center">
                                        <Col span={24}>
                                            <p className='font-weight-bold mb-2' style={{"fontSize" :"25pt", "lineHeight" :"1.2"}}>Oopss... Sepertinya Kamu Tersesat</p>
                                            <span style={{"fontSize" :"14pt", "fontWeight": "500"}}>Ayoo kembali sebelum kamu salah alamat !!!</span>
                                        </Col>
                                        <Col span={6} offset={9} className="mt-4">
                                            <a href={`/`} className={`btn btn-outline btn-sm btn-block btn-pricing mt-2 mb-3 active`}>Kembali</a>
                                        </Col>
                                    </Row>
                                </Card>
                            );
                        } else {
                            return (
                                <>
                                    <Card className={`mb-3 mt-3 borderShadow5`}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Meta
                                                    avatar={
                                                        <Image
                                                            style={{width: "100px", height: "100px", borderRadius: "50px", border: "1px solid #ccc"}} 
                                                            preview={false}
                                                            src={speakerRecord && speakerRecord.filepath ? serverUrl + "/" + speakerRecord.filepath_thumb: serverUrl + "/" + speakerRecord.filepath_thumb}
                                                            onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/avatar-default.png?t=9999"}}
                                                        />
                                                    }
                                                    title={
                                                        <a className="f-17 text-dark">{speakerRecord.speaker_name || ""}</a>
                                                    }
                                                    description={
                                                        <>
                                                            {(() => {
                                                                if (speakerRecord && !speakerRecord.is_organization && speakerRecord.speaker_title !== "") {
                                                                    return (
                                                                        <p className="f-13 text-muted" style={{marginTop: "-12px"}}>{speakerRecord.speaker_title}</p>
                                                                    )
                                                                }
                                                            })()}
                                                            <Tag color={"red"}>Pembicara</Tag>
                                                            <br />
                                                            <span className="text-dark" style={{"fontSize" :"50pt", "fontWeight" : "500","lineHeight" :"1.2"}}>{speakerRecord.rating}</span>/ 5
                                                            <br />
                                                            <Rate allowHalf disabled value={speakerRecord.rating} className="mr-2" />
                                                            <p className="text-dark mt-1 mb-0" style={{"fontWeight": "500"}}>{speakerRecord.total_rating} Ulasan</p> 
                                                        </>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className={`mb-3 mt-3 borderShadow5`}>
                                        <Tabs onChange={callback} style={{marginTop: "-10px"}}>
                                            <TabPane tab="Ulasan & Penilaian" key="ulasan">
                                                <div className="row">
                                                    <div className='col-md-12 mt-0 mb-3'>
                                                        <p className="mt-2 mb-2" style={{"fontSize" :"13pt", "fontWeight" : "500","lineHeight" :"1.2"}}>Apa kata mereka?</p>
                                                        <p className='h6 mt-3 mb-1'>Filter dengan: </p>
                                                        <Tag className="pt-1 pb-1 pr-3 pl-3 mb-1 text-center" onClick={() => handleStarFilter(-1)} style={{"minWidth": "85px", cursor: "pointer"}}><span style={{"fontSize": "15px"}}>Semua</span></Tag>
                                                        <Tag className="pt-1 pb-1 pr-3 pl-3 mb-1 text-center" onClick={() => handleStarFilter(5)} style={{"minWidth": "85px", cursor: "pointer"}}><Rate count={1} value={1} style={{"fontSize": "17px"}} /> <span style={{"fontSize": "15px"}}>5</span></Tag>
                                                        <Tag className="pt-1 pb-1 pr-3 pl-3 mb-1 text-center" onClick={() => handleStarFilter(4)} style={{"minWidth": "85px", cursor: "pointer"}}><Rate count={1} value={1} style={{"fontSize": "17px"}} /> <span style={{"fontSize": "15px"}}>4</span></Tag>
                                                        <Tag className="pt-1 pb-1 pr-3 pl-3 mb-1 text-center" onClick={() => handleStarFilter(3)} style={{"minWidth": "85px", cursor: "pointer"}}><Rate count={1} value={1} style={{"fontSize": "17px"}} /> <span style={{"fontSize": "15px"}}>3</span></Tag>
                                                        <Tag className="pt-1 pb-1 pr-3 pl-3 mb-1 text-center" onClick={() => handleStarFilter(2)} style={{"minWidth": "85px", cursor: "pointer"}}><Rate count={1} value={1} style={{"fontSize": "17px"}} /> <span style={{"fontSize": "15px"}}>2</span></Tag>
                                                        <Tag className="pt-1 pb-1 pr-3 pl-3 mb-1 text-center" onClick={() => handleStarFilter(1)} style={{"minWidth": "85px", cursor: "pointer"}}><Rate count={1} value={1} style={{"fontSize": "17px"}} /> <span style={{"fontSize": "15px"}}>1</span></Tag>
                                                        <hr />
                                                        {(() => {
                                                            if (pagination.total > 0) {
                                                                return (
                                                                    <List
                                                                        itemLayout="horizontal"
                                                                        dataSource={listData}
                                                                        loading={loading.isPagingLoading}
                                                                        pagination={{
                                                                            onChange: page => {
                                                                                onPageChange(page);
                                                                            },
                                                                            pageSize: 5,
                                                                            total: pagination.total,
                                                                        }}
                                                                        renderItem={item => (
                                                                            <List.Item>
                                                                                <List.Item.Meta
                                                                                    avatar={
                                                                                        <Image
                                                                                            style={{width: "50px", height: "50px", borderRadius: "50px", border: "1px solid #ccc"}} 
                                                                                            preview={false}
                                                                                            src={serverUrl + "/" + item.user_profile_picture_filepath}
                                                                                            onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/avatar-default.png?t=9999"}}
                                                                                        />
                                                                                    }
                                                                                    // <Avatar src={} />}
                                                                                    title={<a href="https://ant.design">{item.rater_full_name}</a>}
                                                                                    description={
                                                                                        <div style={{"marginTop": "-5px"}}>
                                                                                                <Rate count={5} value={item.rating} style={{"fontSize": "17px"}} />
                                                                                                <p className="mb-0 text-muted f-12">Mengikuti Webinar <strong>"{item.webinar_title}"</strong></p>
                                                                                                <p className="mb-0 text-dark">{item.comment}</p>
                                                                                        </div>
                                                                                    }
                                                                                />
                                                                            </List.Item>
                                                                        )}
                                                                    />                                                        
                                                                )
                                                            } else {
                                                                return (
                                                                    <Alert className="text-center" message="Tidak ada ulasan." type="warning" />
                                                                )
                                                            }
                                                        })()}
                                                        
                                                    </div>
                                                </div>
                                            </TabPane>
                                            <TabPane tab="Informasi Pembicara" key="ulasan-pembicara">
                                                {(() => {
                                                    if (speakerRecord && speakerRecord.description === "") {
                                                        return (
                                                            <>
                                                                <p className="text-center mb-0">Tidak ada informasi tersedia.</p>          
                                                            </>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                {ReactHtmlParser(speakerRecord.description)}
                                                            </>
                                                        )
                                                    }
                                                })()}
                                            </TabPane>
                                        </Tabs>
                                    </Card>
                                </>
                            )
                        }
                    })()}
                </div>
                <Footer />
            </section>
        </Fragment>
    );
}

const reduxState = (state) => ({
    isLogin: state.auth.isLogin,
    isLoading: state.auth.isLoading,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
})

export default connect(reduxState, null)(SpeakerReview);