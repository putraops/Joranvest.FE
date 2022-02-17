import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Image } from 'antd';

import IframeComm from 'react-iframe-comm';

import validate from '../../../../commons/validate';
import "./style.css"
var QRCode = require('qrcode.react');

export function QRModal({isModalShow, setHide, qrString, isSubmitLoading}){
    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <Modal 
                title="Pembayaran menggunakan QRIS" 
                centered
                visible={isModalShow}
                // visible={true}
                onCancel={setHide}
                footer={null}
                >
                <div className="mt-0">
                    <Image
                        id="qris-header"
                        preview={false}
                        src="/assets/img/payment/qris-icon.png"
                    />
                    <Image
                        id="gpn-header"
                        preview={false}
                        src="/assets/img/payment/gpn-icon.png"
                    />
                </div>
                <div className="mt-0 text-center" id="payment-information">
                    <img src="/assets/img/logo.png" id="joranvest-logo" />
                </div>
                <div className="mt-0 text-center">
                    
                    {/* <IframeComm
                        attributes={{
                            src: qrString,
                            width: "100%",
                            height: "450px",
                            frameBorder: 0,
                        }}
                        //handleReady={onReady}
                        //handleReceiveMessage={onReceiveMessage}
                    /> */}
                    <QRCode value={qrString || "putraops@gmail.com"} />
                </div>
                <div className="mt-3 text-center">
                    <p id="qris-footer">SATU QRIS UNTUK SEMUA</p>
                </div>
            </Modal>
        </Fragment>
    );
}