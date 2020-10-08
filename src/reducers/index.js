import { combineReducers } from "redux";
import countriesReducer from "./countriesReducer";
import tripsReducer from "./tripsReducer";

export default combineReducers({
    countries: countriesReducer,
    trips: tripsReducer
});