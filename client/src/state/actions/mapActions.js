import { api } from "../../services/api";
import { exampleCountries } from "../../models/Map.model";

export const fetchMap = (mapId) => async dispatch => {
    dispatch({type:'FETCH_MAP_LOAD'});

    if (mapId === 'example') {
        return dispatch({type: 'FETCH_MAP_SUCCESS', payload: {countries: exampleCountries, trips: []}});
    }

    await api.get(`map/${mapId}`)
        .then(response => dispatch({type:'FETCH_MAP_SUCCESS', payload: response.data}))
        .catch(err => dispatch({type:'FETCH_MAP_ERROR', payload: err.response.data}));
}
