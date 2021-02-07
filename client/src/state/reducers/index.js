import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mapReducer from "./mapReducer";
import tripReducer from "./tripReducer";

export default combineReducers({
    trip: tripReducer,
    auth: authReducer,
    map: mapReducer
});