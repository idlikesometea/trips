import { combineReducers } from "redux";
import authReducer from "./authReducer";
import countriesReducer from "./countriesReducer";
import tripsReducer from "./tripsReducer";

export default combineReducers({
    countries: countriesReducer,
    trips: tripsReducer,
    auth: authReducer
});