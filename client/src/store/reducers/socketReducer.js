import { io } from "socket.io-client"
import { NOTIFY_TYPES } from "../actions/notifyAction"
const initSocket = io();

const socketReducer = (state = initSocket, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.NEW_NOTIFY:
            return state.emit('new-notify')
        default:
            return state;
    }
};

export default socketReducer;