import React, { Fragment } from 'react';
import 'antd/dist/antd.css';
import { List, Image, Divider, Popover } from 'antd';
// import { Row, Col } from 'reactstrap';
// import NumberFormat from "react-number-format";
// import ReactHtmlParser from 'react-html-parser';
// import dateFormat from '../../../commons/dateFormat'

// import baseUrl from '../../../config/baseUrl';
// import serverUrl from '../../../config/serverUrl';

import { PickerDateProps } from 'antd/lib/date-picker/generatePicker';


import { 
    DownloadOutlined, 
} from '@ant-design/icons';
import baseUrl from '../../config/baseUrl';
import serverUrl from '../../config/serverUrl';

const Analysis = (props) => {
    //const [fileUrl, setFileUrl] =  useState(serverUrl + "/upload/fundamental_analysis/549d04ee-6ac8-445c-b80c-2c5da560a162/supported_files/lorei ipsum.pdf");

    return (
        <section className="section">
            <div className="container-fluid mt-3 pr-0 pl-0">
                <div className="container mb-3">
                    <p>TEST</p>
                  
                    {/* <PDFReader url={serverUrl + "/upload/fundamental_analysis/549d04ee-6ac8-445c-b80c-2c5da560a162/supported_files/lorei ipsum.pdf"} /> */}
                </div>
            </div>
        </section>
    )
}

export default Analysis