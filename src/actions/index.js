import api from "../services/api";

export const fetchCountries = (userId) => async dispatch => {
    const response = await api.get(`/trips/countries/${userId}`);
    
    dispatch({type:'FETCH_COUNTRIES', payload: response.data.data});
};