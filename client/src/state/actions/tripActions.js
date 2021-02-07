import { api } from "../../services/api";

export const selectTrip = (tripId) => async (dispatch, getState) => {
    dispatch({type:'FETCH_TRIP_LOAD'});
    
    await api.get(`/trip/${tripId}`)
        .then(({data}) => dispatch({type:'FETCH_TRIP_SUCCESS', payload: {trip: data.trip, files: data.files}}))
        .catch(err => dispatch({type:'FETCH_TRIP_ERROR', payload: err}))
}

export const resetTrip = () => dispatch => {
    dispatch({type:'RESET_TRIP'});
}