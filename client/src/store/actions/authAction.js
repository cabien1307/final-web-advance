import axios from "axios";
import { GLOBALTYPES } from "./globalTypes";

export const LoginSuccessfull = (user) => ({
    type: GLOBALTYPES.LOGIN_SUCCESS,
    payload: user,
});

export const LoginFailure = () => ({
    type: GLOBALTYPES.LOGIN_FAILURE,
});

export const Logout = () => ({
    type: GLOBALTYPES.LOGOUT,
});

export const fetchUser = async (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.post("/user/secret");
    return res;
};

export const dispatchGetUser = (res) => {
    return {
        type: GLOBALTYPES.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false,
        },
    };
};
