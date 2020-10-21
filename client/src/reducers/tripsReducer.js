const initialState = {
    loadingTrips: false,
    loadingTrip: false,
    trips: [],
    trip: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_TRIPS_LOAD':
            return {
                ...state,
                trips: [],
                loadingTrips: true
            };
        case 'FETCH_TRIPS':
            return {
                ...state,
                trips: action.payload,
                loadingTrips: false
            };
        case 'FETCH_TRIP_LOAD':
            return {
                ...state,
                loadingTrip: true
            };
        case 'FETCH_TRIP':
            return {
                ...state,
                loadingTrip: false,
                trip: action.payload
            };
        case 'FETCH_TRIP_ERROR':
            return {
                ...state,
                loadingTrip: false
            };
        case 'RESET_TRIP':
            return {
                ...state,
                trip: {}
            };
        default:
            return state;
    }
}