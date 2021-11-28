import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import SubNav from './_nav/subNav';
import Footer from './Footer';
import { Breadcrumb, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagram, faTwitter, faWhatsapp, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons'

import { 
    HomeOutlined, 
} from '@ant-design/icons';


const AboutUs = () => {

    const data = [
        {
            title: 'LinkedIn',
            logo: <FontAwesomeIcon icon={faLinkedin} style={{fontSize: "26px", color: "#0e76a8"}} />,
            url: "https://www.linkedin.com/company/joranvest/"
        },
        {
            title: 'Facebook',
            logo: <FontAwesomeIcon icon={faFacebookSquare} style={{fontSize: "26px", color: "#3b5998"}} />,
            url: "https://fb.me/joranvest",
        },
        {
            title: 'Instagram',
            logo: <FontAwesomeIcon icon={faInstagram} style={{fontSize: "26px", color: "#bc2a8d"}} />,
            url: "https://instagram.com/joranvest"
        },
        {
            title: 'Twitter',
            logo: <FontAwesomeIcon icon={faTwitter} style={{fontSize: "26px", color: "#00acee"}} />,
            url: "https://www.twitter.com/joranvest"
        },
        {
            title: 'Whatsapp Business',
            logo: <FontAwesomeIcon icon={faWhatsapp} style={{fontSize: "26px", color: "#4FCE5D"}} />,
            url: "https://api.whatsapp.com/send?phone=6281228822774"
        },
        {
            title: 'Telegram',
            logo: <FontAwesomeIcon icon={faTelegram} style={{fontSize: "26px", color: "#0088CC"}} />,
            url: "https://t.me/joranvest"
        },
    ];

    return (
        <React.Fragment>
            <section className="section home-1-bg" id="home">
                <div className="container-fluid mt-2 mb-2 pr-0 pl-0">
                    <div className="container">
                        <Breadcrumb className="pt-1">
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Tentang Kami</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <SubNav title="Tentang Kami" sub_title="" />

                <div className="container mt-4">
                    <Row>
                        <Col md="8">
                            <p>JORANVEST adalah Platform Edukasi dan Informasi Finansial dengan Misi membantu jutaan orang agar ‘melek finansial’ dan dapat memanfaatkan potensi yang ada untuk bersama mewujudkan kebebasan finansial.</p>
                            <p>JORANVEST telah launching versi 1.0 pada tanggal 21 Desember 2021, dimana versi ini kamu akan banyak menemukan informasi seputar dunia saham.</p>
                            <p>Di versi-versi mendatang, kami akan terus mencoba melengkapi informasi-informasi edukatif seputar dunia finansial agar semakin menambah beragam wawasan buat kamu.</p>
                            <p>JORANVEST saat ini berada dalam naungan PT. Risambessy Konsultindo Mandiri yang beralamat di Jalan Tenggilis Timur Dalam No.12 Surabaya.</p>
                            <p className="mt-3 mb-1"><strong>Ikuti Update JORANVEST di Media Sosial :</strong></p>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={item.logo}
                                            title={<a href={item.url} target="_blank">{item.title}</a>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </div>      
                <Footer />
            </section>
        </React.Fragment>
    );
}
export default (AboutUs);