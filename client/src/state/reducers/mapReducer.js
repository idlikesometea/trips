const initialState = {
    loading: false,
    countries: [],
    trips: [],
    errorMessage: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_MAP_LOAD':
            return {
                ...state,
                countries: [],
                trips: [],
                loading: true
            };
        case 'FETCH_MAP_SUCCESS':
            return {
                ...state,
                countries: action.payload.countries,
                trips: action.payload.trips,
                loading: false
            };
        case 'FETCH_MAP_ERROR':
            return {
                ...initialState,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}