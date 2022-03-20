import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import SubNav from './_nav/subNav';
import Footer from './Footer';
import { Breadcrumb } from 'antd';

import { 
    HomeOutlined, 
} from '@ant-design/icons';


const ContactUs = () => {
    return (
        <React.Fragment>
            <section className="section pb-0" id="home">
                <div className="container-fluid mt-2 mb-2 pr-0 pl-0">
                    <div className="container">
                        <Breadcrumb className="pt-1">
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Hubungi Kami</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <SubNav title="Hubungi Kami" sub_title="" />

                <div className="container mt-4 mb-5">
                    <Row>
                        <Col md="8">
                            <p>Jika ada pertanyaan tentang JORANVEST, kamu dapat menghubungi email dibawah ini sesuai dengan kebutuhan</p>
                            <p className="font-weight-bold mb-0">Kontak JORANVEST</p>
                            <p>Untuk pertanyaan bantuan dan support, silahkan membaca halaman FAQ. Jika ada pertanyaan tambahan lainnya, silahkan email melalui cs@joranvest.com atau menghubungi melalui WhatsApp di nomor : 081 22 88 22 77 4</p>
                            <p className="font-weight-bold mb-0">Kerjasama Periklanan dan Liputan Media</p>
                            <p>Untuk pertanyaan seputar perikalanan dan liputan media, silahkan bisa mengirimkan penawaran melalui marketing@joranvest.com</p>

                            <p className="font-weight-bold mb-0">Kolaborasi Bisnis</p>
                            <p>Jika ingin melakukan kolaborasi bisnis, silahkan bisa mengirimkan penawaran melalui renaldondona@joranvest.com</p>

                            <p className="font-weight-bold mb-0">Alamat Perusahaan</p>
                            <p className="font-weight-bold mb-0">JORANVEST</p>
                            <p className="mb-0">PT. Risambessy Konsultindo Mandiri</p>
                            <p className="mb-0">Jln. Tenggilis Timur Dalam No.12 Surabaya</p>
                        </Col>
                    </Row>
                </div>      
                <Footer />
            </section>
        </React.Fragment>
    );
}
export default (ContactUs);