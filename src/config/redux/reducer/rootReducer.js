import authReducer from "./authReducer";
import joranserviceReducer from "./joranserviceReducer";
import { combineReducers } from 'redux'
import parentRecordReducer from "./parentRecordReducer";
import paymentReducer from "./paymentReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    joranservice: joranserviceReducer,
    parentRecord: parentRecordReducer,
    paymentReducer: paymentReducer,
})

export default rootReducer;