const initialState = {
    userLogged: null,
    user: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SIGN_IN':
            return { userLogged: true, user: {...action.payload} };
        case 'SIGN_OUT':
            return { userLogged: false, user: {}};
        default:
            return state;
    };
};