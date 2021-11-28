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


const Disclaimer = () => {
    return (
        <React.Fragment>
            <section className="section home-1-bg" id="home">
                <div className="container-fluid mt-2 mb-2 pr-0 pl-0">
                    <div className="container">
                        <Breadcrumb className="pt-1">
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Disclaimer</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <SubNav title="Disclaimer" sub_title="" />

                <div className="container mt-4 mb-5">
                    <Row>
                        <Col md="8">
                            <p>Konten yang terkandung di halaman website <a href="https://www.joranvest.com" style={{fontWeight: 500}} target="_blank">JORANVEST</a>, atau seluruh akun media sosial <strong>JORANVEST</strong> disediakan untuk tujuan memberikan pendidikan dan informasi yang  terbatas hanya untuk pasar Indonesia.</p>
                            <p>Segala materi yang disediakan di sini, disediakan hanya terbatas untuk pemberian informasi dan bukan merupakan penawaran, permintaan penawaran, atau saran atau rekomendasi untuk melaksanakan suatu transaksi.</p>
                            <p>Setiap orang dapat memiliki pengetahuan, pengalaman, pemahaman, komitmen, perbedaan waktu, money management, psikologis dan cara penerapan yang berbeda-beda atas penggunaan layanan pada website <a href="https://www.joranvest.com" style={{fontWeight: 500}} target="_blank">JORANVEST</a>, dan karena hasil dari setiap individu kemungkinan berbeda-beda & tidak dapat dipergunakan sebagai acuan hasil rata-rata kinerja analis atau layanan <strong>JORANVEST.</strong></p>
                            <p>Kami tidak menjamin suatu hasil tertentu dalam kegiatan diskusi, rekomendasi, konsultasi di website dan atau di grup telegram, dan setiap pernyataan, testimonial, rekomendasi, percakapan, dokumen yang dibagikan oleh pengguna layanan <strong>JORANVEST</strong>, adalah semata-mata untuk keperluan informasi dan bukan merupakan jaminan mendapat hasil serupa atau bersifat ajakan membeli, menjual atau menahan sebuah emiten.</p>
                            <p>Kami akan berusaha memastikan bahwa konten (baik artikel, modul, analisa teknikal, fundamental dan webinar) yang disampaikan akurat dan diperoleh dari sumber yang dapat dipercaya. Sekalipun demikian, kami tidak mewakili atau menjamin kelengkapan, keandalan, keakurasian, ketepatan waktu atau kesesuaian terhadap maksud apapun dan kami tidak bertanggung jawab atas ketidaklengkapan, ketidakakuratan, atau ketepatan waktu dari konten yang disediakan di sini.</p>
                            <p>Anda tidak diperbolehkan untuk menyalin, mereproduksi, mendistribusikan, menerbitkan, menampilkan, melakukan, memodifikasi, membuat  karya turunan, mentransmisikan, atau dengan cara apa pun memanfaatkan konten yang ada, tidak juga untuk mendistribusikan bagian apa pun dari konten yang ada di luar kawasan Indonesia, menjual atau menawarkan untuk dijual, atau menggunakan konten tersebut untuk membangun segala jenis basis data.</p>
                            
                            <p>Investor wajib setiap saat untuk membaca dan memahami produk untuk membuat penilaian risiko investor sendiri dan meminta nasihat  dari seorang profesional (jika diperlukan) sebelum berinvestasi</p>
                            <p><strong>JORANVEST</strong> / <a href="https://www.joranvest.com" style={{fontWeight: 500}} target="_blank">JORANVEST.COM</a> / <strong>PT. RISAMBESSY KONSULTINDO MANDIRI</strong> tidak memberikan layanan jual beli saham ataupun layanan titip dana serta tindakan investasi dalam bentuk apapun. Jika anda menemukan pelanggaran pihak tertentu yang mengatasnamakan <strong>JORANVEST</strong> / <a href="https://www.joranvest.com" style={{fontWeight: 500}} target="_blank">JORANVEST.COM</a> / <strong>PT. RISAMBESSY KONSULTINDO MANDIRI</strong>, Kami mohon kesediannya untuk mengkonfirmasi dan melaporkan melalui email laporan@joranvest.com</p>

                            <p>Segala keputusan yang dilakukan diluar informasi resmi <strong>JORANVEST</strong>, maka adalah 100% (seratus persen) tanggung jawab pengguna. Selalu konfirmasi terlebih dahulu sebelum bertransaksi. Silahkan hubungi customer service kami via email cs@joranvest.com jika Anda menemukan ada yang mencurigakan.</p>
                        </Col>
                    </Row>
                </div>      
                <Footer />
            </section>
        </React.Fragment>
    );
}
export default (Disclaimer);