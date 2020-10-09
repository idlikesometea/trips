const initialState = {
    data: [],
    loading: false
};

export default (state=initialState, action) => {
    switch(action.type) {
        case 'FETCH_FILES_LOAD':
            return {
                data: [],
                loading: true
            };
        case 'FETCH_FILES':
            return {
                data: action.payload,
                loading: false
            };
        default:
            return state;
    }
}