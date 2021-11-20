import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import Pending from './components/WebinarPending';
import Success from './components/WebinarSuccess';

const WebinarPayment = props => {
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
export default connect(mapStateToProps, null)(WebinarPayment);