import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { Card } from 'antd';
import "../style/style.css"
import "../style/article-premium.css"

import Pricing from '../../membership/components/Pricing';
import { connect } from 'react-redux'

class ArticleBody extends React.Component {
    constructor(props) {
        super(props);
    }

    premiumSection = () => {
        const { isArticlePremium, user } = this.props;
        if (isArticlePremium && user && !user.is_membership) {
            return (
                <Row>
                    <Col sm="12" md="12">
                        <Card className="text-white" id="article-container" title={
                                <div className="text-center">
                                    <p id="card-title" className="mb-0 text-uppercase font-weight-bold">Ini Artikel Pilihan</p>
                                    <p id="card-subtitle" className="mb-0">Berlangganan sekarang untuk mendapatkan informasi yang lebih mendalam.</p>
                                </div>
                            }>
                            <Pricing />
                        </Card>
                    </Col>
                </Row>
            )
        }
    }

    render() {
        const { children, isArticlePremium, user } = this.props;
        var totalContent = totalContent = React.Children.count(children);
        if (isArticlePremium && user && !user.is_membership) {
            totalContent = (React.Children.count(children) * 0.4);
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

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

export default  connect(mapStateToProps)(ArticleBody);