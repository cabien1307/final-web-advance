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
    const res = await axios.post("/user/secret", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
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
