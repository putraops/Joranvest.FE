import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

class BlogSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            BlogList: [{
                "title": "Artikel Premium",
                "image_src": "images/blog/img-1.jpg",
                "content": "Dapatkan insight market update setiap harinya",
            },
            {
                "title": "Konsultasi Porto",
                "image_src": "images/blog/img-2.jpg",
                "content": "Konsultasi Portofolio dengan mentor-mentor berpengalaman",
            },
            {
                "title": "Komunitas Diskusi",
                "image_src": "images/blog/img-3.jpg",
                "content": "Saling bertukar pikiran dalam grup khusus",
            },
            ]
        };
    }

    render() {

        return (
            <React.Fragment>
                <section className="section" id="blog">
                    <div className="container">
                        <Row>
                            <Col lg="12">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">Dapatkan Juga</h3>
                                    <div className="title-border-simple position-relative"></div>
                                </div>
                            </Col>
                        </Row>

                        <div className="row">

                            {this.state.BlogList.map((blog, index)=> {
                                return <Col lg="4" key={index}>
                                    <div className="blog position-relative">
                                        <div className="blog-img position-relative mt-4">
                                            <img src={blog.image_src} alt="" className="img-fluid mx-auto d-block rounded" />
                                        </div>
                                        <div className="position-relative">
                                            <div className="blog-content text-center bg-white p-4">
                                                <h5 className="font-weight-normal f-18"><Link to="#" className="text-dark">{blog.title}</Link></h5>
                                                <p className="text-muted f-14">
                                                    {blog.content}</p>
                                                <div className="read-more">
                                                    <Link to="#" className=" text-primary f-15">Lihat Detail<i className="mdi mdi-arrow-right"></i></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            })}

                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default BlogSection;