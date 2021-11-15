import ACTIONS from "../actions";

const initialState = {
    user: null,
    isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };

        case ACTIONS.LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
            };
        case ACTIONS.LOGOUT:
            return {
                user: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default authReducer;
