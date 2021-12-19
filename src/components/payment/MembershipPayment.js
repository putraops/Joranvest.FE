import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Card, Alert, Radio, List } from 'antd';
import { connect } from 'react-redux';

import Pending from './components/Pending';
import Success from './components/Success';

const MembershipPayment = props => {
    useEffect(() => {
    }, []);

    if (props.match.params.status === "pending") {
        return (
            <Pending record_id={props.match.params.id} />
        )
    } else {
        return (
            <Success record_id={props.match.params.id} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}
export default connect(mapStateToProps, null)(MembershipPayment);