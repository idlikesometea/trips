const initialState = {
    generals: {},
    maps: [],
    stats: {},
    loading: {
        generals: false,
        maps: false,
        stats: false
    },
    errorMessage: {
        generals: '',
        maps: '',
        stats: ''
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_GENERALS_LOAD':
            return {
                ...state,
                loading: {...state.loading, generals: true},
                errorMessage: {...state.errorMessage, maps: ''},
                generals: {},
            }
        case 'FETCH_GENERALS_SUCCESS':
            return {
                ...state,
                loading: {...state.loading, generals: false},
                generals: action.payload
            }
        case 'FETCH_GENERALS_ERROR':
            return {
                ...state,
                loading: {...state.loading, generals: false},
                errorMessage: {...state.errorMessage, generals: action.payload}
            }
        case 'FETCH_MAPS_LOAD':
            return {
                ...state,
                loading: {...state.loading, maps: true},
                errorMessage: {...state.errorMessage, maps: ''},
                maps: {}
            }
        case 'FETCH_MAPS_SUCCESS':
            return {
                ...state,
                loading: {...state.loading, maps: false},
                maps: action.payload
            }
        case 'FETCH_MAPS_ERROR':
            return {
                ...state,
                loading: {...state.loading, maps: false},
                errorMessage: {...state.errorMessage, maps: action.payload}
            }
        case 'FETCH_STATS_LOAD':
            return {
                ...state,
                loading: {...state.loading, stats: true},
                errorMessage: {...state.errorMessage, stats: ''},
                stats: {}
            }
        case 'FETCH_STATS_SUCCESS':
            return {
                ...state,
                loading: {...state.loading, stats: false},
                stats: action.payload
            }
        case 'FETCH_STATS_ERROR':
            return {
                ...state,
                loading: {...state.loading, stats: false},
                errorMessage: {...state.errorMessage, stats: action.payload}
            }
        default:
            return state;
    };
};