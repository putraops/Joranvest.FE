import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import SubNav from './_nav/subNav';
import Footer from './Footer';
import { Breadcrumb } from 'antd';

import { 
    HomeOutlined, 
} from '@ant-design/icons';

const Privacy = () => {
    return (
        <React.Fragment>
            <section className="section home-1-bg" id="home">
                <div className="container-fluid mt-2 mb-2 pr-0 pl-0">
                    <div className="container">
                        <Breadcrumb className="pt-1">
                            <Breadcrumb.Item href="/">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Kebijakan Privasi</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <SubNav title="Kebijakan Privasi" sub_title="" />

                <div className="container mt-4">
                    <Row className="">
                        <Col md="12">
                            <p>
                                Kebijakan privasi <strong>("Kebijakan Privasi")</strong> ini merupakan suatu komitmen PT. Risambessy Konsultindo Mandiri (<strong>"Perseroan"</strong> atau <strong>"Kami"</strong>) 
                                untuk selalu melindungi dan menghargai setiap informasi pribadi pengguna situs www.joranvest.com <strong>("JORANVEST")</strong>. 
                                Kebijakan Privasi ini menjelaskan bagaimana kami mengelola, menggunakan, melindungi, dan, dalam beberapa hal, 
                                mengungkapkan segala informasi dan juga Data Pribadi (sebagaimana didefinisikan dibawah ini) yang anda berikan kepada Kami 
                                sehubungan dengan penggunaan terhadap Situs, yang mana merupakan suatu kepatuhan Kami terhadap peraturan perundang-undangan 
                                Republik Indonesia khususnya pada Undang-Undang No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik sebagaimana 
                                telah diubah dengan Undang-Undang No. 19 Tahun 2016 tentang Perubahan atas Undang-Undang No. 11 Tahun 2008, Peraturan Menteri 
                                Komunikasi dan Informatika No. 20 Tahun 2016 tentang Perlindungan Data Pribadi Dalam Sistem Elektronik dan peraturan 
                                pelaksananya beserta perubahannya dari waktu ke waktu <strong>("Peraturan Perundang-undangan Yang Berlaku").</strong>
                            </p>
                            <p>
                                Dengan mengakses dan menggunakan Situs, anda dianggap telah membaca, memahami
                                dan memberikan persetujuan kepada Kami atas pengumpulan, pemrosesan, pengungkapan, dan penggunaan informasi dan juga data 
                                pribadi anda sebagaimana diuraikan di bawah ini. 
                                Kebijakan Privasi dapat berubah atau diperbaharui sewaktu-waktu tanpa ada pemberitahuan dan/atau pengumuman terlebih dahulu.
                            </p>
                            <div className="mt-2">
                                <ol className="ml-2 pl-2" type="A">
                                    <li className="mb-2"><strong>PEROLEHAN DATA PRIBADI</strong>
                                        <p>
                                            Kami meminta informasi yang dianggap perlu untuk menunjang Situs Kami sewaktu anda mendaftarkan akun untuk dapat menggunakan dan 
                                            mengakses Situs, 
                                            termasuk, namun tidak terbatas pada data pribadi anda seperti nama, alamat, nomor telepon, alamat e-mail, 
                                            nomor kartu kredit dan informasi rekening bank, riwayat pengiriman, barang yang terkirim, deskripsi barang 
                                            yang diminta atau dibeli dan juga informasi log yang tersedia di server Kami, alamat protokol internet, 
                                            informasi aktivitas perangkat, jenis peramban, tanggal dan waktu permintaan, URL perunjuk, sistem operasi, 
                                            serta statistik halaman yang dilihat dan informasi lain yang akan berguna atau diperlukan <strong>("Data Pribadi")</strong> untuk memberi 
                                            anda layanan terbaik Kami dari Situs.
                                        </p>
                                        <p className="mb-1">
                                            Melalui penggunaan Situs, Perseroan mengumpulkan, mengolah, menganalisa dan menyimpan Data Pribadi, dengan cara sebagai berikut:
                                        </p>
                                        <ol className="pl-3">
                                            <li>Data / informasi identitas diri yang diserahkan secara mandiri dan sukarela oleh anda, termasuk namun tidak terbatas pada saat anda:
                                                <ol type="a">
                                                    <li>membuat atau mendaftarkan akun untuk dapat menggunakan dan mengakses Situs <strong>("Pengguna")</strong> dan mengisi formulir yang meminta informasi/data termasuk diantaranya adalah Data Pribadi;</li>
                                                    <li>mengunjungi halaman situs para mitra tertentu dari Perseroan;</li>
                                                    <li>berkontribusi untuk mengirimkan, mengunggah konten dalam bentuk foto, tulisan, video, pengiriman pertanyaan, komen, testimoni atau tanggapan lainnya mengenai Situs Kami;</li>
                                                    <li>memberikan feedback kepada Kami melalui e-mail, formulir yang diisi, surat, atau panggilan telepon; dan</li>
                                                    <li>mengisi data-data pada halaman konfirmasi pembayaran pada Situs pada saat proses pembayaran termasuk namun tidak terbatas pada data rekening bank, kartu kredit, virtual account, internet banking, dan jasa pembayaran lainnya;</li>
                                                </ol>
                                            </li>
                                            <li>Data yang Kami peroleh melalui media sosial, yaitu termasuk namun tidak terbatas, dengan like Fan Page Kami di Facebook; berinteraksi dengan Kami melalui situs sosial media lainnya. Data Pribadi yang kami peroleh dari pihak ketiga terbatas pada nama anda dan tulisan yang anda sukai yang tersedia pada laman pihak ketiga tersebut. Data yang kami gunakan terbatas pada mode agregat untuk meninjau dan meningkatkan Situs Kami</li>
                                            <li>Data yang Kami peroleh dari pihak ketiga, seperti pihak yang terafiliasi dengan Kami, mitra bisnis, dan pihak ketiga lainnya yang independen.</li>
                                            <li>Data yang terekam pada saat anda menggunakan Situs, termasuk namun tidak terbatas pada saat anda mengunjungi Situs, yang mana Kami dapat memproses data teknis seperti alamat Internet Protocol (IP address) anda.</li>
                                        </ol>
                                    </li>
                                    <li className="mb-2"><strong>PENGGUNAAN DATA PRIBADI</strong>
                                        <p className="mb-1">Data Pribadi anda digunakan dan dilindungi oleh Perseroan sesuai dengan Peraturan Perundang-undangan Yang Berlaku dan Kebijakan Privasi ini. Perseroan mengumpulkan informasi Pengguna dengan tujuan antara lain:</p>
                                        <ol type="a">
                                            <li>memverifikasi data Pengguna yang menggunakan Situs;</li>
                                            <li>menjamin dan memberikan user interface Situs yang lebih baik;</li>
                                            <li>menyediakan serta mempermudah transaksi pembayaran yang dilakukan oleh Pengguna pada Situs termasuk diantaranya dengan proses konfirmasi dan pengiriman pesanan Pengguna;</li>
                                            <li>untuk mengumpulkan data transaksi Pengguna Situs;</li>
                                            <li>melaksanakan kewajiban Perseroan sehubungan dengan pelaksanaan atas kerjasama dengan pihak ketiga;</li>
                                            <li>untuk kepentingan riset pasar atau pengembangan Situs agar Perseroan dapat meningkatkan Situs, dan/atau untuk menyesuaikan situs untuk memberikan Situs dan produk yang paling diminati oleh anda;</li>
                                            <li>untuk mengelola sebuah undian, promosi, survei, riset pasar, atau hal relevan lainnya yang bertujuan untuk disediakan kepada Pengguna;</li>
                                            <li>memfasilitasi komunikasi antara Pengguna dan bagian pelayanan konsumen Perseroan apabila ada permasalahan; dan</li>
                                            <li>untuk kepentingan publikasi, distribusi, promosi, pemasaran dan pengembangan bisnis Perseroan lebih lanjut.</li>
                                        </ol>
                                        <p>Data Pribadi harus anda perbaharui atau perbaiki secara berkala apabila memang ada perubahan atau kesalahan guna memastikan kesinambungan dan keamanan Situs Kami. Anda wajib menyediakan informasi sebagaimana diminta oleh Perseroan.</p>
                                    </li>
                                    <li className="mb-2"><strong>PENGUNGKAPAN DATA PRIBADI PENGGUNA KEPADA PIHAK KETIGA</strong>
                                        <p className="mb-1">Perseroan tidak akan mengalihkan, menjual, mendistribusikan, mengungkapkan atau meminjamkan informasi dan juga Data Pribadi anda kepada pihak ketiga lain, kecuali dengan ketentuan-ketentuan sebagai berikut:</p>
                                        <ol type="a">
                                            <li>Perseroan dapat mengalihkan Data Pribadi secara keseluruhan atau sebagian besar kepada pihak ketiga dalam hal dilakukannya aksi korporasi termasuk namun tidak terbatas pada penggabungan, peleburan, pengambilalihan, atau reorganisasi yang menyebabkan beralihnya penguasaan atau kepemilikan atas Perseroan;</li>
                                            <li>apabila Perseroan mengungkapkan informasi tersebut kepada suatu pihak yang telah menandatangani perjanjian kerahasiaan dengan Perseroan;</li>
                                            <li>apabila Perseroan berkewajiban mengungkapkan dan/atau berbagi data pribadi anda dalam upaya mematuhi kewajiban hukum berdasarkan peraturan perundang-undangan yang berlaku;</li>
                                            <li>dalam upaya memberlakukan atau menerapkan Syarat dan Ketentuan, atau untuk melindungi hak, properti, atau keselamatan Perseroan, Pelanggan, atau pihak lain, termasuk namun tidak terbatas kepada pertukaran informasi dan Data Pribadi dengan perusahaan dan organisasi lain untuk tujuan perlindungan Perseroan beserta Penggunanya termasuk namun tidak terbatas pada permasalahan penipuan, kerugian finansial atau pengurangan resiko lainnya;</li>
                                            <li>dalam rangka memberikan ulasan atau review yang diberikan Pengguna atas produk yang yang tersedia pada Situs. Ketika anda telah menyelesaikan pembelian anda terhadap suatu produk pada Situs Kami, anda akan kami undang untuk memberikan ulasan atas produk tersebut. Dengan memberikan ulasannya, Pengguna setuju bahwa ulasan tersebut dapat ditampilkan pada Situs Kami, Aplikasi Kami, akun sosial media Kami, atau penyedia Situs yang relevan dengan Kami atau situs pihak ketiga lainnya yang bermitra dengan Kami;</li>
                                            <li>kerjasama Perseroan dengan mitra bisnis atau pihak ketiga lainnya dengan memberikan akses atas Data Pribadi terhadap pihak-pihak yang bekerja dan memberikan layanan untuk pemeliharaan, pengembangan Situs dan layanan-layanan lainnya yang relevan.</li>
                                            <li>Kami dapat membagikan informasi non-pribadi yang dapat teridentifikasi kepada publik dan mitra Kami, seperti penayang, pengiklan, atau situs lain yang relevan. Kami dapat membagikan informasi yang tersedia secara publik untuk menunjukkan tren mengenai penggunaan umum atas Situs Kami.</li>
                                            <li>Kami dapat mengungkapkan kepada pihak ketiga lainnya yang bertindak sebagai penyedia jasa Kami untuk membantu Kami menyediakan layanan kepada Pengguna. Penyedia jasa tersebut termasuk kepada penyedia layanan konsumen (customer service), dan penyedia layanan transaksi pembayaran.</li>
                                            <li>Kami dapat membagikan informasi Data Pribadi kepada pihak ketiga lainnya untuk menunjang kebutuhan Kami dalam rangka meningkatkan dan mengembangkan kepentingan pemasaran dan pengembangan bisnis Perseroan.</li>
                                        </ol>
                                        <p>Kami akan selalu berusaha dengan upaya terbaik kami untuk menjaga Data Pribadi termasuk ketika kami memberikan Data Pribadi kepada pihak ketiga lainnya. Namun, tidak dalam hal apapun JORANVEST dapat menjamin penggunaan dan pengelolaan Data Pribadi, sehingga sepenuhnya menjadi tanggung jawab pihak ketiga. Pengguna dengan ini setuju untuk membebaskan JORANVEST jika terjadi penyalahgunaan Data Pribadi yang dilakukan oleh pihak ketiga.</p>
                                    </li>
                                    <li className="mb-2"><strong>HAK UNTUK MENGAKSES DAN MENGUBAH DATA PRIBADI</strong>
                                        <p>Kami memiliki database yang memungkinkan Pengguna Situs untuk menyimpan informasi mengenai penagihan, pengiriman barang, pembayaran, melacak status dari pesanan pengguna, informasi terkait kartu kredit, daftar transaksi sebelumnya, alamat e-mail dan beberapa data pribadi lainnya. Anda memiliki hak untuk mengakses informasi dan untuk meminta koreksi atas informasi tersebut. Jika anda ingin mengakses atau memperbaiki Data Pribadi anda, anda dapat melakukannya menggunakan cara yang Kami sediakan pada masing-masing Situs.</p>
                                    </li>
                                    <li className="mb-2"><strong>MENARIK PERSETUJUAN DAN MENGHAPUS DATA PRIBADI</strong>
                                        <p className="mb-1">Anda dapat menarik persetujuan atas penggunaan Data Pribadi dari Situs dengan cara menyampaikan permintaan tersebut kepada customer service Kami. Seluruh Data Pribadi yang masih ada pada Kami tetap akan digunakan sesuai dengan ketentuan kebijakan privasi ini.</p>
                                        <p className="mb-1">Dengan ditariknya persetujuan dan permintaan penghapusan Data Pribadi, Kami mungkin:</p>
                                        <ol type="a">
                                            <li>tidak dapat lagi memberikan layanan kepada anda;</li>
                                            <li>tidak dapat menghapus seluruh data atau informasi yang telah tersedia atau dipublikasikan pada Situs, termasuk namun tidak terbatas kepada hasil ulasan/review Pengguna, riwayat transaksi Pengguna, video webinar yang mungkin ada informasi Pengguna, deskripsi barang yang diminta atau dibeli dan juga informasi log yang tersedia di server Kami.</li>
                                            <li>tidak dapat menggunakan Data Pribadi sejak ditariknya persetujuan atas penggunaan Data Pribadi, namun kami tidak menjamin atas penggunaan Data Pribadi yang sudah diberikan oleh Pengguna sebelum ditariknya persetujuan tersebut.</li>
                                        </ol>
                                        <p>Dengan ini anda setuju bahwa Perseroan akan dibebaskan dari tanggung jawab atas kehilangan, kerusakan, kerugian yang mungkin timbul akibat penarikan persetujuan dan penghapusan Data Pribadi pada Situs Kami.</p>
                                    </li>
                                    <li className="mb-2"><strong>COOKIES</strong>
                                        <p>Perseroan dapat menggunakan berbagai macam teknologi untuk mengumpulkan dan menyimpan informasi saat anda menggunakan dan mengakses Situs, yang mana teknologi tersebut dapat mencakup penggunaan cookies atau teknologi serupa. Cookies adalah file kecil yang secara otomatis akan mengambil tempat di dalam perangkat komputer anda untuk mengindentifikasi dan memantau koneksi jaringan anda, sehingga memungkinkan anda untuk menggunakan dan mengakses Situs secara optimal. Cookies juga secara otomatis akan membantu sistem kami untuk mengetahui browser apa yang anda gunakan dan dapat memberikan anda layanan tambahan seperti misalnya penyimpanan data mengenai apa saja yang telah anda beli melalui Situs kami.</p>
                                    </li>
                                    <li className="mb-2"><strong>TAMPILAN IKLAN</strong>
                                        <p>Perseroan dapat menggunakan berbagai macam teknologi untuk mengumpulkan dan menyimpan informasi saat anda menggunakan dan mengakses Situs, yang mana teknologi tersebut dapat mencakup penggunaan cookies atau teknologi serupa. Cookies adalah file kecil yang secara otomatis akan mengambil tempat di dalam perangkat komputer anda untuk mengindentifikasi dan memantau koneksi jaringan anda, sehingga memungkinkan anda untuk menggunakan dan mengakses Situs secara optimal. Cookies juga secara otomatis akan membantu sistem kami untuk mengetahui browser apa yang anda gunakan dan dapat memberikan anda layanan tambahan seperti misalnya penyimpanan data mengenai apa saja yang telah anda beli melalui Situs kami.</p>
                                        <p>Kebijakan privasi ini hanya berlaku untuk cookies yang ditempatkan oleh kami dan tidak berlaku kepada cookies pengiklan pihak ketiga.</p>
                                    </li>
                                    <li className="mb-2"><strong>KEAMANAN DATA PRIBADI</strong>
                                        <p className="mb-1">Kami bekerja keras untuk melindungi Data Pribadi anda dari akses yang ilegal, khususnya dengan memberikan perlindungan kepada anda berdasarkan ketentuan-ketentuan sebagai berikut:</p>
                                        <ol type="a">
                                            <li>Kami mengenkripsi sejumlah Situs menggunakan Secure Socket Layers.</li>
                                            <li>Kami meninjau praktik-praktik seputar pengumpulan, penyimpanan, dan pemrosesan informasi, termasuk langkah keamanan teknis dan fisik, untuk melindungi sistem dari akses yang tidak sah.</li>
                                            <li>Dengan memperhatikan ketentuan Pasal 3, Kami membatasi akses ke Data Pribadi hanya kepada karyawan Kami, kontraktor, agen yang perlu mengetahui Data Pribadi, atau yang tunduk pada kewajiban perjanjian kerahasiaan yang tegas, serta pihak ketiga lainnya berdasarkan ketentuan pada kebijakan privasi ini</li>
                                        </ol>
                                        <p>
                                        Kami mengambil langkah-langkah teknis, wajib, dan administratif yang dirancang untuk melindungi Data Pribadi anda. Kami menjaga pengamanan fisik, elektronik, dan prosedural yang berkaitan dengan pengumpulan, penyimpanan, dan pengungkapan Data Pribadi anda. Prosedur keamanan kami mewajibkan Kami untuk meminta bukti identitas anda sebelum kami mengungkapkan Data Pribadi kepada anda. Anda juga bertanggung jawab untuk membantu melindungi keamanan Data Pribadi anda seperti untuk tidak pernah memberikan kata sandi anda kepada pihak ketiga lainnya, dan untuk keluar dari akun anda setelah anda selesai menggunakan Situs.
                                        </p>
                                    </li>
                                    <li className="mb-2"><strong>PERUBAHAN DALAM KEBIJAKAN PRIVASI</strong>
                                        <p>Anda mengakui dan menyetujui bahwa Kami dapat melakukan perubahan sebagaimana diperlukan dan/atau sebagaimana diwajibkan oleh hukum yang berlaku, terhadap Kebijakan Privasi ini. Sebagai konsekuensi, Anda setuju untuk tunduk pada setiap perubahan Kebijakan Privasi.</p>
                                        <p>Perubahan apapun yang Kami lakukan terhadap Kebijakan Privasi Kami di masa mendatang akan diterbitkan melalui halaman ini dan, ketika dibutuhkan, diberitahukan kepada Anda melalui surat elektronik. Mohon kunjungi kembali halaman ini dari waktu ke waktu untuk melihat adanya perubahan pada Kebijakan Privasi ini.</p>
                                    </li>
                                  

                                    <p className="mt-3 mb-1"><strong>CARA MENGHUBUNGI KAMI</strong></p>
                                    <p>Anda dapat menghubungi Kami melalui <strong>cs@joranvest.com</strong> jika memiliki pertanyaan mengenai Kebijakan Privasi ini dan/atau melakukan koreksi terhadap Informasi Pribadi Anda.</p>
                                </ol>
                            </div>
                        </Col>
                        <Col md="12">
                        
                        </Col>
                    </Row>
                </div>      
                <Footer />
            </section>
        </React.Fragment>
    );
}
export default (Privacy);