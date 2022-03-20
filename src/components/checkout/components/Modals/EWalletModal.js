import React, { Fragment, useState, useEffect } from 'react'
import { Modal } from 'antd';

import validate from '../../../../commons/validate';
export function EWalletModal({isModalShow, setHide, handleCharge, isSubmitLoading}){
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)
     
    useEffect(() => {
    }, []);
    
    const handleChange = (event) => {
        if ((event.target.value).length <= 14) {
            setPhoneNumber(event.target.value)
        }
    }

    const handleSubmit = () => {
        var result = validate.phoneNumberID(phoneNumber);
        if (result === false) {
            setIsPhoneNumberValid(result);
            return;
        }
        handleCharge(result);
    }

    return (
        <Fragment>
            <Modal 
                title="Form Nomor Handphone" 
                centered
                visible={isModalShow}
                onCancel={setHide}
                footer={null}
                >
                <div className="mt-0">
                    <div className="form-group">
                        <label className="fw-500">Nomor Hp</label>
                        <input type="number" name="phone" onChange={handleChange} value={phoneNumber} className="form-control no-radius" placeholder="Masukkan Nomor Hp" />
                        {!isPhoneNumberValid && (<div className="text-danger mt-1">Nomor Hp tidak valid.</div>)}
                    </div>
                    <button type="button" 
                        onClick={() => handleSubmit()}
                        disabled={isSubmitLoading}
                        className="btn btn-block btn-joran mt-3 p-2 pr-4 pl-4 no-radius">
                            {isSubmitLoading ? 
                                <span><span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Sedang diproses...</span>
                                : <span>Bayar</span>
                            }
                        </button>
                </div>
            </Modal>
        </Fragment>
    );
}