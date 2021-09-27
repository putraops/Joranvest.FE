import authReducer from "./authReducer";
import joranserviceReducer from "./joranserviceReducer";
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    joranservice: joranserviceReducer
})

export default rootReducer;