import React, { createElement, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import 'antd/dist/antd.css';
import { Row, Col } from 'reactstrap';
import Footer from '../Footer';

import NavSubtitle from './components/NavSubtitle';
import ArticlePopular from './ArticlePopular';
import Comments from './components/Comments'
import ArticleBody from './components/ArticleBody';
import ArticleTag from './components/ArticleTag';
import axiosApi from '../../config/axiosConfig';
import "./style/style.css"
import axios from 'axios';

import { PoweroffOutlined } from '@ant-design/icons';
import { Skeleton, Typography } from 'antd';
import { Card, Alert, Button, List, Image, Badge, Descriptions, Space, Switch, Rate, Tag, Form, Input } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

import { configConsumerProps } from 'antd/lib/config-provider';
const { Text } = Typography;
const { Meta } = Card;


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
        console.log("article-detail");
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
                console.log("detail: ", r);
            }
        });
    }

    // getArticleCover = () => {
    //     const { recordId } = this.state;
    //     axiosApi.get(`/article/getArticleCoverById/${recordId}`).then(r => {
    //         console.log(r);
    //         if (r.data.status) {
    //             this.setState({...this, articleCoverPath: r.data.data.filepath})
    //             // this.setState({...this.state, speakers: r.data.data});
    //         }
    //     });

    // }

    // ImageDemo = () => {
    //     const [random] = React.useState();
    //     return (
    //     <Space size={12}>
    //         <Image
    //         // width={100%}
    //         src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
    //         preview={false}
    //         />
    //     </Space>
    //     );
    // }

    getPostedDate = (submitted_at, created_at) => {
        var articleDate = submitted_at.Time; 
        let articleLongDate = "";
        let articleTime = "";
        let articleDayName = "";
        if (!submitted_at.Valid) {
            articleDate = created_at.Time;
        } 

        articleLongDate = moment(articleDate,  "YYYY/MM/DD").format('DD MMMM YYYY');
        articleTime = moment(articleDate,  "HH:mm").format('HH:mm')
        articleDayName = moment(articleDate,  "YYYY/MM/DD HH:mm").format('dddd');

        if (articleDayName == "Monday") articleDayName = "Senin";
        if (articleDayName == "Tuesday") articleDayName = "Selasa";
        if (articleDayName == "Wednesday") articleDayName = "Rabu";
        if (articleDayName == "Thursday") articleDayName = "Kamis";
        if (articleDayName == "Friday") articleDayName = "Jumat";
        if (articleDayName == "Saturday") articleDayName = "Sabtu";
        if (articleDayName == "Sundary") articleDayName = "Minggu";

        return articleDayName + ", " + articleLongDate + " | " + articleTime + " WIB";
    }

    render() {
        const { data, loading, loadingArticleBody, articleCoverPath, recordId, membership, isArticlePremium, articlePostedDate } = this.state;
        var article_id = data.id;
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

        console.log("render");

        // function getBase64(url) {
        //     return axios
        //     .get(url, {
        //         responseType: 'arraybuffer'
        //     })
        //     .then(response => new Buffer(response.data, 'binary').toString('base64'))
        // }

        // getBase64(`http:localhost:10000/${articleCoverPath}`)


        return (
            <React.Fragment>
                <section className="section home-1-bg">
                    <NavSubtitle />
                    <div className="container mt-4">
                        <Row>
                            <Col lg="9" md="8">
                                <h5 className="card-title font-weight-bold mb-1" style={{fontSize: "25pt"}}>{data.title}</h5>
                                <p className="text-muted">{articlePostedDate}</p>

                                <Image style={{width: "100%"}}
                                    // src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${random}`}
                                    // src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                                    src={(`http:localhost:10000/${articleCoverPath}`)}
                                    fallback="data:image/png;base64,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"
                                    preview={false}
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
                            <Col lg="3" md="4">
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