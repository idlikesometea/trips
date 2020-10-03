import { combineReducers } from "redux";
import countriesReducer from "./countriesReducer";

export default combineReducers({
    countries: countriesReducer
});