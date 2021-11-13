import serverUrl from "../../serverUrl";

const initState = {
    isParentModal: false,
    parentRecord: {},
    file: {},
    thumbUrl: "",
}

const parentRecordReducer = (state = initState, res) => {
    switch (res.type) {
        case "SHOW_UPLOAD_TRANSFER_MODAL":
            console.log("parentRecordReducer: ", res);
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

export default parentRecordReducer;