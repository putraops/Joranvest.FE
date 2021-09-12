import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Link, withRouter, Route, useParams  } from 'react-router-dom';
import Navbar from '../Navbar';
import ArticleList from './ArticleList';
import ArticlePopular from './ArticlePopular';
import Footer from '../Footer';
import axiosApi from '../../config/axiosConfig';
import { Image } from 'antd';
import { Button, Card, Drawer, Badge, Avatar, Divider, IconText, Tag } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Select, Breadcrumb, Skeleton  } from 'antd';
import { Space, List, message, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import ArticleRecomendation from './ArticleRecomendation';

const { Option, OptGroup } = Select;
const { Meta } = Card;


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo`;

class Article extends React.Component {
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
            initLoading: true,   
            loading: false,
            hasMore: true,
            data: [],
            list: [],
            listData: {total:0,data:[]}
        };
    }



    componentDidMount() {
        this.fetchData(res => {
            console.log("componentDidMount", res);
        this.setState({
            data: res.data.results,
        });
        });
    }

    fetchData = callback => {
        axiosApi.get(fakeDataUrl).then(r => {
            console.log(r.data.results);
            callback(r);
            //this.setState({...this.state, data: r.data.results});
        });
    };

    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
          loading: true,
        });

        if (data.length > 14) {
          message.warning('Infinite List loaded all');
          this.setState({
            hasMore: false,
            loading: false,
          });
          return;
        }
        this.fetchData(res => {
            console.log("scroll: ", res)
            data = data.concat(res.data.results);
            this.setState({
                data,
                loading: false,
            });
        });
      };

    handlePage = event => {
        const {payload} = this.state;
        payload.page = event;
        this.LoadData();
    }

    handleDetail = (id) => {
        this.props.history.push(`/webinar-detail/${id}`);
    }

    render() {
        const { listData, data, payload } = this.state;
        console.log(listData);

        const breadcrumb = {
            fontWeight: '500'
        }
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
                            <ul className="nav subNav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/technical">Teknikal</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/fundamental">Fundamental</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Artikel Pilihan</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/webinar">Webinar</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card no-radius" style={{backgroundColor: "#1c1d1f"}}>
                            <div className="card-body">
                                <div className="container pb-3 pt-3">
                                    <Row>
                                        <Col lg="12">
                                            <h5 className="card-title text-white font-weight-bold" style={{fontSize: "24px"}}>Artikel Pilihan</h5>
                                            <p className="card-title text-white font-weight-bold">Info seputar Bisnis Emiten, Ekonomi Nasional dan Internasional</p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
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
                                        dataSource={data}
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
                            <Col md="3">
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
                        <Row className="mb-5">
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