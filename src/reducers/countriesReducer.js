const initialState = {
    data: [],
    loading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_COUNTRIES_LOAD':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_COUNTRIES':
            return {
                data: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
