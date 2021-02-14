import { combineReducers } from "redux";
import authReducer from "./authReducer";
import mapReducer from "./mapReducer";
import tripReducer from "./tripReducer";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
    trip: tripReducer,
    auth: authReducer,
    map: mapReducer,
    dashboard: dashboardReducer
});