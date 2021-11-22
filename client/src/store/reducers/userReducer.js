import { USERS_TYPES } from "../actions/usersAction";

const initialState = {
    loading: false,
    users: [],
};

const facultyReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_TYPES.GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case USERS_TYPES.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload._id),
            };
        default:
            return state;
    }
};

export default facultyReducer;
