import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import alert from "./alertReducer";

export default combineReducers({
    auth,
    token,
    alert,
});
