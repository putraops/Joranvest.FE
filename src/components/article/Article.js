import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import ArticleList from './ArticleList';
import ArticlePopular from './ArticlePopular';
import ArticleRecomendation from './ArticleRecomendation';
import InfiniteScroll from 'react-infinite-scroller';
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { Button, Breadcrumb, List, Spin } from 'antd';
import SubNav from '../_nav/subNav'; 
import { HomeOutlined } from '@ant-design/icons';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                page: 1,
                size: 8,
            },
            user: {
                name: "",
            },
            initLoading: true,   
            loading: false,
            hasMore: true,
            data: [],
            list: [],
            existingData: [],
            listData: {total:0,data:[]}
        };
    }

    componentDidMount() {
        const { payload } = this.state;
        this.fetchData(res => {
            this.setState({
                data: res.data.results,
            });
        });

        this.loadList(res => {
            this.setState({
                payload: {
                    page: payload.page + 1,
                    size: payload.size,
                },
            });
            if (res.data.data.length > 0) {
                this.setState({
                    existingData: res.data.data
                })
            }
        });
    }

    loadList = callback =>
    {
        const {payload} = this.state; 
        axiosApi.post(`/article/getPagination`, payload).then(r => {
            console.log(r);
            if (r.data.total > 0) {
                callback(r);
            }
        });
    }

    fetchData = callback => {
        const {payload} = this.state
        var url = `https://randomuser.me/api/?results=`+payload.size +`&inc=name,email,nat&noinfo`
        axiosApi.get(url).then(r => {
            callback(r);
        });
    };

    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        const { payload } = this.state;
        let { existingData } = this.state;
        this.setState({
          loading: true,
        });
        if (data.length > 14) {
          this.setState({
            hasMore: false,
            loading: false,
          });
          return;
        }
        this.fetchData(res => {
            data = data.concat(res.data.results);
            this.setState({
                data,
                loading: false,
            });
        });

        this.loadList(res => {
            if (res.data.data.length > 0) {
                existingData = existingData.concat(res.data.data); 
                this.setState({
                    existingData,
                });
            } else {
                this.setState({
                    hasMore: false,
                    loading: false,
                });
                return;
            }
            this.setState({
                payload: {
                    page: payload.page + 1,
                    size: payload.size,
                },
            });
        });
      };

    handlePage = event => {
        const {payload} = this.state;
        payload.page = event;
        // this.LoadData();
    }

    handleDetail = (id) => {
        this.props.history.push(`/webinar-detail/${id}`);
    }

    render() {
        const { existingData } = this.state;
        const dataTerpopuler = [
            {
                no: 1,
                title: 'IHSG diprediksi menguat pada Senin (13/9), simak pergerakan saham SCMA, PWON, KLBF',
            },
            {
                no: 2,
                title: 'IHSG berpeluang menguat terbatas pada pekan depan, ini sentimen yang perlu dicermati',
            },
            {
                no: 3,
                title: 'Sempat merugi, FKS Food Sejahtera (AISA) raup laba Rp 14,25 miliar di semester I 2021',
            },
            {
                no: 4,
                title: 'Bahtsul Masail setuju perdagangan kripto dilakukan',
            },
            {
                no: 5,
                title: 'Respons CEO Indodax usai Bahtsul Masail perbolehkan perdagangan aset kripto',
            },
            {
                no: 6,
                title: 'Laba Tunas Alfin (TALF) turun 48,67% pada semester I-2021',
            },
        ];
        const { initLoading, loading, list } = this.state;
        const loadMore =
        !initLoading && !loading ? (
            <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
            >
            <Button onClick={this.onLoadMore}>loading more</Button>
            </div>
        ) : null;

        const styleNumberMostPopular = {
            fontWeight: '700',
            fontSize: '25px',
            color: '#454545',
            marginTop: '-2px',
        }
      
        return (
            <React.Fragment>
                <section className="section home-1-bg" id="home">
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="container mb-3">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Article</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <SubNav title="Artikel Pilihan" sub_title="Info seputar Bisnis Emiten, Ekonomi Nasional dan Internasional" />
                    </div>  

                    <div className="container mt-4">
                        <Row className="">
                            <Col md="9">
                                <div className="demo-infinite-container mb-4" style={{overflow:"auto"}}>
                                    <InfiniteScroll
                                        initialLoad={false}
                                        pageStart={0}
                                        loadMore={this.handleInfiniteOnLoad}
                                        hasMore={!this.state.loading && this.state.hasMore}
                                        useWindow={true}
                                    >
                                    <List
                                        dataSource={existingData}
                                        renderItem={item => <ArticleList obj={item} />}
                                        >
                                        {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container text-center">
                                                <Spin />
                                            </div>
                                        )}
                                    </List>
                                    </InfiniteScroll>
                                </div>
                            </Col>
                            <Col md="3" className="d-none">
                                <Row>
                                    <Col lg="12">
                                        <div className="title-heading mb-5">
                                            <h3 className="text-dark mb-1 font-weight-light text-uppercase">TERPOPULER</h3>
                                            <div className="title-border-simple position-relative"></div>
                                        </div>
                                    </Col>
                                    <Col lg="12">
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={dataTerpopuler}
                                            renderItem={item => <ArticlePopular obj={item} />}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-5 d-none">
                            <Col lg="9">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">Baca Juga</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                            <Col lg="9">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={dataTerpopuler}
                                    renderItem={item => <ArticleRecomendation obj={item} />}
                                />
                            </Col>
                        </Row>
                    </div>      
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}
export default withRouter(Article);