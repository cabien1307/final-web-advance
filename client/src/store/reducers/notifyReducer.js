import { NOTIFY_TYPES } from "../actions/notifyAction";

const initialState = {
    loading: false,
    notifications: [],
    unread: 0
};

const NotifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.GET_NOTIFY:
            return {
                notifications: action.payload,
            };
        case NOTIFY_TYPES.DELETE_NOTIFY:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notify) => notify._id !== action.payload._id
                ),
            };
        case NOTIFY_TYPES.GET_UNREAD:
            return {
                ...state,
                unread: action.payload
            };
        case NOTIFY_TYPES.READ_NOTIFY:
            return {
                ...state,
                unread: action.payload.unread,
                notifications: action.payload.notify
            };
        default:
            return state;
    }
};

export default NotifyReducer;
