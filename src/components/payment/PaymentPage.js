import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import PendingPage from './components/PendingPage';
import Success from './components/WebinarSuccess';

const PaymentPage = props => {
    useEffect(() => {
    }, []);

    if (props.match.params.status === "pending") {
        return (
            <PendingPage record_id={props.match.params.id} />
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
export default connect(mapStateToProps, null)(PaymentPage);