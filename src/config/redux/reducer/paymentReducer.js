const initState = {
    isTransferModalShow: false,
}

const paymentReducer = (state = initState, res) => {
    switch (res.type) {
        case "SHOW_TRANSFER_MODAL":
            return {
                ...state,
                isTransferModalShow: true,
            }
        case "HIDE_TRANSFER_MODAL":
            return {
                ...state,
                isTransferModalShow: false,
            }
        default: 
            return state
    }
}

export default paymentReducer;