import { authedApi } from "../../services/api";

export const fetchGenerals = () => async dispatch => {
    dispatch({type:'FETCH_GENERALS_LOAD'});

    await authedApi.get(`dashboard/generals/`)
        .then(response => dispatch({type:'FETCH_GENERALS_SUCCESS', payload: response.data}))
        .catch(err => dispatch({type:'FETCH_GENERALS_ERROR', payload: err.response.data}));
}

export const fetchMaps = () => async dispatch => {
    dispatch({type:'FETCH_MAPS_LOAD'});

    await authedApi.get(`dashboard/maps/`)
        .then(response => dispatch({type:'FETCH_MAPS_SUCCESS', payload: response.data}))
        .catch(err => dispatch({type:'FETCH_MAPS_ERROR', payload: err.response.data}));
}

export const fetchStats = () => async dispatch => {
    dispatch({type:'FETCH_STATS_LOAD'});

    await authedApi.get(`dashboard/stats/`)
        .then(response => dispatch({type:'FETCH_STATS_SUCCESS', payload: response.data}))
        .catch(err => dispatch({type:'FETCH_STATS_ERROR', payload: err.response.data}));
}
