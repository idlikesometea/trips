const initialState = {
    userLogged: null,
    userId: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SIGN_IN':
            return { ...state, userLogged: true, userId: action.payload };
        case 'SIGN_OUT':
            return { ...state, userLogged: false, userId: null };
        default:
            return state;
    };
};