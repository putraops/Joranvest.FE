import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import "../style/style.css"

import MembershipPrice from '../../membership/components/MembershipPrice';

class ArticleBody extends React.Component {
    constructor(props) {
        super(props);
    }

    premiumSection = () => {
        const { isArticlePremium } = this.props;
        if (isArticlePremium) {
            return (
                <Row>
                    <Col sm="12" md="12">
                    <Card className="text-white" id="article-container" title={
                            <div className="text-center">
                                <p id="card-title" className="mb-0 text-uppercase font-weight-bold">Ini Artikel Pilihan</p>
                                <p id="card-subtitle" className="mb-0">Berlangganan sekarang untuk mendapatkan informasi yang lebih mendalam.</p>
                            </div>
                        }>
                        <MembershipPrice />
                    </Card>
                    </Col>
                </Row>
            )
        }
    }

    render() {
        const { children, isArticlePremium } = this.props;
        var totalContent = 0;
        if (isArticlePremium) {
            totalContent = (React.Children.count(children) * 0.4);
        } else {
            totalContent = React.Children.count(children);
        }

        if (totalContent == 0) totalContent = 1;

        return (
            <Fragment>
                <div className="mt-3" id="article-body">
                {React.Children.map(children, (child, i) => {
                    if (i < totalContent) {
                        return child;
                    }
                })}
                </div>

                {this.premiumSection()}
            </Fragment>
        )
    }
}
export default ArticleBody;