const initState = {
    isParentModal: false,
    parentRecord: {},
    file: {},
    thumbUrl: "",
}

const parentTransactionHistoryReducer = (state = initState, res) => {
    switch (res.type) {
        case "SHOW_UPLOAD_TRANSFER_MODAL":
            return {
                ...state,
                isParentModal: true,
                parentRecord: res.value.data,
                file: res.file,
            }
        case "HIDE_UPLOAD_TRANSFER_MODAL":
            return {
                ...state,
                isParentModal: false,
                parentRecord: {}
            }
        default: 
            return state
    }
}

export default parentTransactionHistoryReducer;