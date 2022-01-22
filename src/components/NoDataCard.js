import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';
import { Card } from 'antd';

const NoDataCard = (props) => {
    return (
        <Card className={`mb-5 borderShadow5 "}`}>
            <Row className="mt-2 mb-2 text-center">
                <Col span={24}>
                    {props.title}
                </Col>
            </Row>
        </Card>
    )
}
export default NoDataCard;