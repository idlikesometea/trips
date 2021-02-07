const initialState = {
    loading: false,
    trip: {},
    errorMessage: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_TRIP_LOAD':
            return {
                ...initialState,
                loadingTrips: true
            };
        case 'FETCH_TRIP_SUCCESS':
            return {
                ...state,
                trip: action.payload.trip,
                loading: false
            };
        case 'FETCH_TRIP_ERROR':
            return {
                ...state,
                trip: {},
                loadingTrip: false,
                errorMessage: action.payload
            };
        case 'RESET_TRIP':
            return {
                ...initialState,
            };
        default:
            return state;
    }
}