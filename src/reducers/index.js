import { combineReducers } from "redux";
import countriesReducer from "./countriesReducer";
import filesReducer from "./filesReducer";
import tripsReducer from "./tripsReducer";

export default combineReducers({
    countries: countriesReducer,
    trips: tripsReducer,
    files: filesReducer
});