import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import Footer from '../Footer';

import ArticlePopular from './ArticlePopular';
import SubNav from '../_nav/subNav';
import ArticleBody from './components/ArticleBody';
import ArticleTag from './components/ArticleTag';
import axiosApi from '../../config/axiosConfig';
import "./style/style.css"

import { Breadcrumb, Skeleton, Image, List } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import moment from 'moment';
import serverUrl from '../../config/serverUrl';

class ArticleDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingArticleBody: true,
            recordId: "",
            articleCoverPath: "",
            articlePostedDate: "",
            isArticlePremium: false,
            data: {},
            tags: [],
            membership: [],
        };
    }

    componentDidMount() {
        axiosApi.get(`/article/getViewById/${this.props.match.params.id}`).then(res => {
            if (res.data.status) {
                var r = res.data;
                this.setState({
                    data: r.data,
                    loading: false,
                    loadingArticleBody: false, 
                    recordId: r.data.id,
                    isArticlePremium: r.data.article_type == "Premium" ? true : false,
                    articlePostedDate: this.getPostedDate(r.data.submitted_at, r.data.created_at)
                });
            }
        });
    }

    getPostedDate = (submitted_at, created_at) => {
        var articleDate = submitted_at.Time; 
        let articleLongDate = "";
        let articleTime = "";
        let articleDayName = "";
        if (!submitted_at.Valid) {
            articleDate = created_at.Time;
        } 

        articleLongDate = moment(articleDate,  "YYYY/MM/DD").format('DD MMMM YYYY');
        articleTime = moment(articleDate, "YYYY/MM/DD HH:mm").format('HH:mm')
        articleDayName = moment(articleDate,  "YYYY/MM/DD HH:mm").format('dddd');

        if (articleDayName == "Monday") articleDayName = "Senin";
        if (articleDayName == "Tuesday") articleDayName = "Selasa";
        if (articleDayName == "Wednesday") articleDayName = "Rabu";
        if (articleDayName == "Thursday") articleDayName = "Kamis";
        if (articleDayName == "Friday") articleDayName = "Jumat";
        if (articleDayName == "Saturday") articleDayName = "Sabtu";
        if (articleDayName == "Sunday") articleDayName = "Minggu";

        return articleDayName + ", " + articleLongDate + " | " + articleTime + " WIB";
    }

    render() {
        const { data, loadingArticleBody, articleCoverPath, recordId, isArticlePremium, articlePostedDate } = this.state;
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

        return (
            <React.Fragment>
                <section className="section home-1-bg">
                    <div className="container-fluid mt-3 pr-0 pl-0">
                        <div className="container mb-3">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/Article">
                                    Article
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{data.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <SubNav title="Artikel Pilihan" sub_title="Info seputar Bisnis Emiten, Ekonomi Nasional dan Internasional" />
                    </div> 
                    <div className="container mt-4">
                        <Row>
                            <Col md="12" lg="9">
                                <h5 className="card-title article-title font-weight-bold mb-1" style={{fontSize: "25pt"}}>{data.title}</h5>
                                <p className="text-muted">{articlePostedDate}</p>

                                <Image
                                    style={{width: "100%"}}
                                    // width={150} 
                                    // height={80}  
                                    preview={false}
                                    src={serverUrl + "/" + data.filepath}
                                    onError={(e)=>{e.target.onerror = null; e.target.src="assets/img/No-Image.png?t=9999"}}
                                />
                                <Row>
                                    <Col md="12" lg="12" xl="12">
                                        {/* <p><span>Sumber: {data.source} </span> <span style={{fontSize: "13px"}}>|</span> <span>Editor: - </span></p> */}
                                        <p><span>Editor: </span><span className="font-weight-bold">{data.submitted_by_fullname == "" ? data.created_by_fullname : data.submitted_by_fullname} </span></p>
                                    </Col>
                                    <Col md="12" lg="12" xl="12">
                                        <Skeleton active loading={loadingArticleBody}>
                                            <ArticleBody isArticlePremium={isArticlePremium} children={ReactHtmlParser(data.body) }/>
                                        </Skeleton>
                                    </Col>
                                </Row>
                                <ArticleTag articleId={recordId} />

                                {/* <Comments /> */}
                            </Col>
                            <Col  md="12" lg="3" className="d-none">
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
                    </div>
                    <Footer />
                </section>
            </React.Fragment>
        );
    }
}

export default ArticleDetail;