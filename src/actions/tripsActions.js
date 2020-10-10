import api from "../services/api";

export const fetchTrips = (userId) => async dispatch => {
    dispatch({type:'FETCH_TRIPS_LOAD'});

    const response = await api.get(`/trips/${userId}`);

    dispatch({type:'FETCH_TRIPS', payload: response.data});
}

export const selectTrip = (tripId) => async (dispatch, getState) => {
    dispatch({type:'FETCH_TRIP_LOAD'});
    
    const trip = getState().trips.trips.find(trip => trip.id === tripId);

    await api.get(`/trips/files/${tripId}`)
        .then(response => dispatch({type:'FETCH_TRIP', payload: {...trip, files: response.data}}))
        .catch(err => dispatch({type:'FETCH_TRIP_ERROR', payload: err}))

}

export const resetTrip = () => dispatch => {
    dispatch({type:'RESET_TRIP'});
}