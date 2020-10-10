import api from "../services/api";

export const fetchCountries = (userId) => async dispatch => {
    dispatch({type:'FETCH_COUNTRIES_LOAD'});

    const response = await api.get(`/trips/countries/${userId}`);
    
    dispatch({type:'FETCH_COUNTRIES', payload: response.data});
};
