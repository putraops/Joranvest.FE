import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Card } from 'antd';

const NoData = (props) => {
    return (
        <Card className={`mb-5 borderShadow5 "}`}>
            <Row className="mt-2 mb-2 text-center">
                <Col span={24}>
                    <p className='font-weight-bold mb-2' style={{"fontSize" :"20pt", "lineHeight" :"1.2"}}>Oopss... Tidak ada yang bisa ditampilkan.</p>
                </Col>
            </Row>
        </Card>
    )
}
export default NoData;