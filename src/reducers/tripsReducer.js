const initialState = {
    loading: false,
    data: [],
    activeTrip: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_TRIPS_LOAD':
            return {
                ...state,
                trips: [],
                loading: true
            };
        case 'FETCH_TRIPS':
            return {
                ...state,
                data: action.payload,
                loading: false
            };
        case 'SELECT_TRIP':
            return {
                ...state,
                activeTrip: action.payload
            };
        case 'RESET_TRIP':
            return {
                ...state,
                activeTrip: {}
            };
        default:
            return state;
    }
}