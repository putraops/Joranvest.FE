const initState = {
    isTransferModalShow: false,
    isGopayModalVisible: false,
    isCreditCardModalVisible: false,
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
        case "SHOW_CREDITCARD_MODAL":
            return {
                ...state,
                isCreditCardModalVisible: true,
            }
        case "HIDE_CREDITCARD_MODAL":
            return {
                ...state,
                isCreditCardModalVisible: false,
            }
        default: 
            return state
    }
}

export default paymentReducer;