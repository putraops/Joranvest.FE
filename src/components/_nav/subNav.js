import React from 'react';
import 'antd/dist/antd.css';

import { Row, Col } from 'reactstrap';

const SubNav = (props) => {
    return (
        <div className="container-fluid mt-3 pr-0 pl-0">
            <div className="card no-radius" style={{backgroundColor: "#1c1d1f"}}>
                <div className="card-body">
                    <div className="container pb-3 pt-3">
                        <Row>
                            <Col span={6} xs={{ order: 1 }} sm={{ order: 1 }} sm="12" md={{ order: 2 }} lg={{ order: 2 }} lg="12">
                                <h5 className="card-title text-white font-weight-bold mb-0" style={{fontSize: "25px"}}>{props.title}</h5>
                                {(() => {
                                    if (props.sub_title != "") {
                                        return (
                                            <p className="card-title text-white font-weight-bold mt-2 mb-0" style={{fontSize: "16px"}}>{props.sub_title}</p>
                                        )
                                    }
                                })()}
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SubNav;