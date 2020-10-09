import api from "../services/api";

// countries state
export const fetchCountries = (userId) => async dispatch => {
    dispatch({type:'FETCH_COUNTRIES_LOAD'});

    const response = await api.get(`/trips/countries/${userId}`);
    
    dispatch({type:'FETCH_COUNTRIES', payload: response.data});
};

// trips state
export const fetchTrips = (userId) => async dispatch => {
    dispatch({type:'FETCH_TRIPS_LOAD'});

    const response = await api.get(`/trips/${userId}`);

    dispatch({type:'FETCH_TRIPS', payload: response.data});
}

export const selectTrip = (tripId) => (dispatch, getState) => {
    const trip = getState().trips.data.filter(trip => trip.id === tripId)[0];

    dispatch({type:'SELECT_TRIP', payload: trip});
}

export const resetTrip = () => dispatch => {
    dispatch({type:'RESET_TRIP'});
}

// files state
// export const fetchFiles = (tripId) => async dispatch => {
//     dispatch({type:'FETCH_FILES_LOAD'});

//     const response = await api.get(`/trips/files/${tripId}`);

//     dispatch({type:'FETCH_FILES', payload:response.data});
// }