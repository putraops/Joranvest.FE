import authReducer from "./authReducer";
import joranserviceReducer from "./joranserviceReducer";
import { combineReducers } from 'redux'
import parentRecordReducer from "./parentRecordReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    joranservice: joranserviceReducer,
    parentRecord: parentRecordReducer
})

export default rootReducer;