export const showTransferModal = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "SHOW_TRANSFER_MODAL"});
        resolve(true);
    })
}

export const hideTransferModal = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "HIDE_TRANSFER_MODAL"});
        resolve(true);
    })
}

export const showGopayModal = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "SHOW_GOPAY_MODAL"});
        resolve(true);
    })
}

export const hideGopayModal = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "HIDE_GOPAY_MODAL"});
        resolve(true);
    })
}

export const showCreditCardModal = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "SHOW_CREDITCARD_MODAL"});
        resolve(true);
    })
}

export const hideCreditCardModal = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "HIDE_CREDITCARD_MODAL"});
        resolve(true);
    })
}