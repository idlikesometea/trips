import api from "../services/api";

export const fetchCountries = (mapId) => async dispatch => {
    dispatch({type:'FETCH_COUNTRIES_LOAD'});

    const response = await api.get(`/trips/countries/${mapId}`);
    
    dispatch({type:'FETCH_COUNTRIES', payload: response.data});
};
