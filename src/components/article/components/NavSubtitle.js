import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';

const NavSubtitle = (props) => {
    return (
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
                        <a className="nav-link active" aria-current="page" href="/article">Artikel Pilihan</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/webinar">Webinar</a>
                    </li>
                </ul>
            </div>
            <div className="card no-radius" style={{backgroundColor: "#002a7d"}}>
                <div className="card-body">
                    <div className="container pb-3 pt-3">
                        <Row>
                            <Col lg="12">
                                <h5 className="card-title text-white font-weight-bold" style={{fontSize: "24px"}}>Artikel Pilihan</h5>
                                <p className="card-title text-white font-weight-bold" style={{fontSize: "16px"}}>Info seputar Bisnis Emiten, Ekonomi Nasional dan Internasional</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default NavSubtitle