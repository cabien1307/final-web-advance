import { NOTIFY_TYPES } from "../actions/notifyAction";

const initialState = {
    loading: false,
    notifications: [],
};

const NotifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.GET_NOTIFY:
            return {
                ...state,
                notifications: action.payload,
            };
        case NOTIFY_TYPES.DELETE_NOTIFY:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notify) => notify._id !== action.payload._id
                ),
            };
        default:
            return state;
    }
};

export default NotifyReducer;
