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
            // var _file = [];
            // if (res.file.length > 0) {
            //     for (var i = 0; i < res.file.length; i++) {
            //         _file.push( {
            //             uid: res.file[i].id,
            //             name: res.file[i].filename,
            //             status: 'done',
            //             response: 'Server Error 500', // custom error message to show
            //             url: serverUrl + "/" + res.file[i].filepath,
            //         })
            //     }
            // }
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