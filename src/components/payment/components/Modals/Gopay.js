import React, { Fragment, useState, useEffect } from 'react'
import { Button, Alert, Modal } from 'antd';
import { Form, Input, Image, Space, Typography, message  } from 'antd';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import axiosApi from '../../../../config/axiosConfig';

import { hideGopayModal } from '../../../../config/redux/action/payment';

const { Text } = Typography;

const Gopay = props => {
    const [loading, setLoading]= useState({
        isSubmitLoading: false
    })
    console.log(props);
    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <Modal 
                id="gopay-qris"
                centered
                visible={true}
                visible={props.paymentReducer.isGopayModalVisible}
                onCancel={() => props.hideGopayModal()}
                footer={[]}
                >
                <div style={{textAlign: "center"}}>
                    <Image
                        preview={false}
                        src="assets/img/gopay.png"
                        width={200}
                    />
                    <br />
                    <Image
                        preview={false}
                        src={props.gopayQRUrl}
                        // width={400}
                        style={{width: "100%"}}
                    />
                </div>
            </Modal>
        </Fragment>
    );
}

const reduxState = (state) => {
    return {
        user: state.auth.user,
        paymentReducer: state.paymentReducer,
    }
}
const reduxDispatch = (dispatch) => ({
    hideGopayModal: () => dispatch(hideGopayModal())
})

export default connect(reduxState, reduxDispatch)(Gopay);