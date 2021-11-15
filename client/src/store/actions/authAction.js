import axios from "axios";
import ACTIONS from "./index";

export const LoginSuccessfull = (user) => ({
    type: ACTIONS.LOGIN_SUCCESS,
    payload: user,
});

export const LoginFailure = () => ({
    type: ACTIONS.LOGIN_FAILURE,
});

export const Logout = () => ({
    type: ACTIONS.LOGOUT,
});

export const fetchUser = async (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.post("/user/secret");
    return res;
};

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false,
        },
    };
};
