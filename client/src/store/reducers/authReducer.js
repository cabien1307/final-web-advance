import { USER_TYPES } from "../actions/authAction";
import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
    user: null,
    isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };

        case GLOBALTYPES.LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
            };
        case GLOBALTYPES.LOGOUT:
            return {
                user: null,
                isLoggedIn: false,
            };
        case USER_TYPES.UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
