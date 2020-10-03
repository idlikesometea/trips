export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_COUNTRIES':
            return action.payload;
        default:
            return state;
    }
};