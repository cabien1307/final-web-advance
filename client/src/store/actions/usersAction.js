import {
    getDataAPI,
    postDataAPI,
    patchDataAPI,
    deleteDataAPI,
} from "../../utils/fetchData";
import { GLOBALTYPES } from "../actions/globalTypes";

export const USERS_TYPES = {
    GET_USERS: "GET_USERS",
    DELETE_USER: "DELETE_USER",
};

export const getUsers = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI("user/role", token);
        dispatch({
            type: USERS_TYPES.GET_USERS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data },
        });
    }
};

export const createUsers =
    ({ data, token }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            await postDataAPI("user/sign-up", data, token);

            const res = await getDataAPI("user/role", token);

            dispatch({
                type: USERS_TYPES.GET_USERS,
                payload: res.data,
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: "Add user Successfull !" },
            });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data },
            });
        }
    };

export const updateUserRole =
    ({ data, token }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const dataBody = {
                username: data.username,
                listRolePost: data.listRolePost,
            };

            await patchDataAPI(`user/${data._id}/update-role`, dataBody, token);

            const res = await getDataAPI("user/role", token);

            dispatch({
                type: USERS_TYPES.GET_USERS,
                payload: res.data,
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: "Update Successfull !" },
            });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data },
            });
        }
    };

export const deleteUser =
    ({ _id, token }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const res = await deleteDataAPI(`user/${_id}/delete`, token);

            dispatch({
                type: USERS_TYPES.DELETE_USER,
                payload: res.data.result,
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: "Delete Successfull !" },
            });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data },
            });
        }
    };
