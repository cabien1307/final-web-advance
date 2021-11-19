import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import alert from "./alertReducer";
import homePosts from "./postReducer";

export default combineReducers({
    auth,
    token,
    alert,
    homePosts,
});
