import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class SubtitleSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <React.Fragment>
                <div className="card no-radius" style={{backgroundColor: "#1c1d1f"}}>
                    <div className="card-body">
                        <div className="container pb-3 pt-3">
                            <Row>
                                <Col lg="12">
                                    <h5 className="card-title text-white font-weight-bold" style={{fontSize: "24px"}}>{this.props.title}</h5>
                                    <p className="card-title text-white font-weight-bold" style={{fontSize: "16px"}}>{this.props.subtitle}</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default SubtitleSection;