import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import alert from "./alertReducer";
import homePosts from "./postReducer";
import modal from "./modalReducer";
import faculty from "./facultyReducer";

export default combineReducers({
    auth,
    token,
    alert,
    homePosts,
    modal,
    faculty,
});
