import axios from "axios";
import { patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { GLOBALTYPES } from "./globalTypes";

export const USER_TYPES = {
    UPDATE_USER: "UPDATE_USER",
};

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

export const updateCover =
    ({ user, images }) =>
    async (dispatch) => {
        let media = [];
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            if (images.length > 0) media = await imageUpload(images);

            const res = await patchDataAPI(`user/${user._id}/update`, {
                coverPic: media[0].url,
            });

            dispatch({ type: USER_TYPES.UPDATE_USER, payload: res.data.data });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };

export const updateProfile =
    ({ user, images }) =>
    async (dispatch) => {
        let media = [];
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            if (images.length > 0) media = await imageUpload(images);

            const res = await patchDataAPI(`user/${user._id}/update`, {
                profilePic: media[0].url,
            });

            dispatch({ type: USER_TYPES.UPDATE_USER, payload: res.data.data });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };

export const updateUser =
    ({ user, data }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const dataUser = {
                username: data.username,
                faculty: data.faculty && data.faculty,
                major: data.major,
                class: data.class,
            };

            if (user.role === 1) {
                delete dataUser.faculty;
                delete dataUser.class;
                delete dataUser.major;
            }

            const res = await patchDataAPI(`user/${user._id}/update`, dataUser);

            dispatch({ type: USER_TYPES.UPDATE_USER, payload: res.data.data });
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };

export const changePassword =
    ({ data, token }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const res = await patchDataAPI(`user/change-password`, data, token);

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: res.data.msg },
            });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg },
            });
        }
    };
