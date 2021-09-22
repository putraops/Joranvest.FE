import React, { Fragment } from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import SubtitleSection from './SubtitleSection'

const SubNav = (props) => {
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
            <SubtitleSection title={props.title} subtitle={props.subtitle} />
        </div>  
    )
}

export default SubNav