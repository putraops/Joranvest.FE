import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import Footer from '../../Footer';
import { connect } from 'react-redux';
import { Breadcrumb, Spin, Modal, Divider, Card } from 'antd';

import './css/styles.css';

import { WebinarRecordingGrid } from './components/WebinarRecordingGrid';

import { Filter } from './components/Filter';
import { PricingComponents } from '../../membership/components/PricingComponents';

import * as services from './services/service';
import * as membershipService from '../../membership/services/service';

import { 
    HomeOutlined, 
    LoadingOutlined
} from '@ant-design/icons';
import sideNotification from '../../../commons/sideNotification';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const WebinarRecordingPage = (props) => {
    const [initPage, setInitPage] = useState(null);

    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const [loading, setLoading] = useState({
        isPaginationLoading: false,
        isLoadMoreLoading: false,
        isPricingLoading: false,
    });
    const [paginationPayload, setPaginationPayload] = useState({
        page: 1,
        size: 6,
        // order: {},
        filter: [
            {
                "field": "is_active",
                "operator": "=",
                "value": "true",
            },
            {
                "field": "is_submitted",
                "operator": "=",
                "value": "true",
            }
        ]
    });
    const [isPricingShow, setIsPricingShow] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [pricings, setPricings] = useState([]);

    const { control, reset } = useForm({
        defaultValues: {
            listData: []
        }
    });
    const { fields, append } = useFieldArray(
        {
          control,
          name: "test"
        }
    );

    useEffect(() => {
        getMemberships();
    }, []);

    useLayoutEffect(() => {
        loadPagination();
    }, [paginationPayload]);

    const loadPagination = () => {
        setLoading({...loading, isPaginationLoading: true})
        if (initPage === null) {
            setInitPage(true);
        }

        console.log(initPage);

        services.loadWebinarRecordingPagination(paginationPayload)
        .then(res => {
            var r = res.data;
            if (r.total === 0 || (r.total > 0 && r.data.length < paginationPayload.size)) {
                if (r.data.length < paginationPayload.size) {
                    setIsFullyLoaded(true)
                }
            }
            if (r.total > 0) {
                append(r.data);
            }

            setInitPage(false);

            setLoading({...loading, isPaginationLoading: false, isLoadMoreLoading: false});
        }).catch(res => {
            setLoading({...loading, isPaginationLoading: false});
        });
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

    const handleLoadMore = () => {
        const currentPage = paginationPayload.page;
        const currentSize = paginationPayload.size;
        setPaginationPayload({
            ...paginationPayload,
            page: currentPage + 1,
            size: currentSize
        });

        setLoading({...loading, isLoadMoreLoading: true});
    }

    const handleFilterChange = (obj) => {
        var currentFilter = paginationPayload.filter;
        
        var index = currentFilter.findIndex(x => x.field === obj.field);
        if (index > -1) {
            currentFilter.splice(index, 1);
        }
        
        if (obj.action === "filter") {
            currentFilter.push({
                "field": obj.field,
                "operator": "=",
                "value": obj.value
            }) 
        }

        reset({
            defaultValues: {
                listData: []
            }    
        });

        setPaginationPayload({
            ...paginationPayload,
            filter: currentFilter
        })
    }

    const gridLoading = () => {
        var temp = [];
        for (var i = 0; i < 3; i++) {
            temp.push(
                <Col sm="6" md="6" lg="4" className="mb-4" key={`loading-grid-${i}`}>
                    <Card loading={true} />
                </Col>
            );
        }
        return <Row>{temp}</Row>
    }

    return (
        <section className="section" id="home">
            <div className="container-fluid mt-3 pr-0 pl-0">
                <div className="container mb-3">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Webinar Recording</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>

            <div className="container mt-2">
                <div className="mt-3 pr-0 pl-0 mb-4">
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

                <Modal
                    style={{ top: 20 }}
                    visible={hasAccess}
                    // visible={true}
                    onCancel={() => setHasAccess(false)}
                    centered
                    footer={null}>
                    
                    <h5 className='text-center text-joran'>Informasi</h5>
                    <Divider className='mt-2' />

                    <div className='text-center mb-3'>
                        <img src="assets/img/logo.png" alt="" width={`45%`}/>

                        <p className='text-black fw-500 f-16 mt-4 mb-0'>Ini adalah halaman khusus untuk Member Premium</p>
                        <p className='fw-500 f-15 mb-0'>Untuk mendapatkan akses di halaman ini, kamu bisa daftar <span className='text-joran fw-500 cursor-pointer' onClick={() => setIsPricingShow(true)}>disini</span>.</p>
                    </div>

                </Modal>

                <Row className="">
                    <Col md="3" lg="3" className="mb-3 d-none d-lg-block">
                        <Filter handleFilterChange={handleFilterChange} />
                    </Col>
                    <Col md="12" lg="9" className="mb-3">
                        <h6 className="fw-700 mb-3">
                            <span className='mr-3 sub-menu'><a href="/edukasi/modul-pembelajaran">Modul</a></span> <span className='sub-menu sub-menu-active'>Recording</span>
                        </h6>

                        {(() => {
                            if (initPage === null || initPage === true) {
                                return (
                                    gridLoading()
                                )
                            } else {
                                return (
                                    <>
                                        <Spin indicator={antIcon} spinning={(loading.isPaginationLoading != null && !loading?.isPaginationLoading) ? false : true}>
                                            <WebinarRecordingGrid 
                                                listData={fields}
                                                initPage={initPage}
                                                loading={loading.isPaginationLoading} />
                                        </Spin>

                                        {!isFullyLoaded && 
                                            <Row>
                                                <Col md="12" lg="12" className="mb-3 text-center">
                                                    <button className='btn btn-outline-joran btn-sm' 
                                                        disabled={loading.isLoadMoreLoading} 
                                                        onClick={handleLoadMore}>
                                                            {loading.isLoadMoreLoading ? "Sedang Memuat...": "Muat Lebih Banyak"}
                                                    </button>
                                                </Col>
                                            </Row>
                                        }      
                                    </>
                                )
                            }
                        })()}
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
export default connect(mapStateToProps, null)(WebinarRecordingPage);