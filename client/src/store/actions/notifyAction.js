import { GLOBALTYPES } from "../actions/globalTypes";
import {
    getDataAPI,
    postDataAPI,
    patchDataAPI,
    deleteDataAPI,
} from "../../utils/fetchData";

export const NOTIFY_TYPES = {
    GET_NOTIFY: "GET_NOTIFY",
    DELETE_NOTIFY: "DELETE_NOTIFY",
};

export const getNotifications = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI("notification", token);
        dispatch({
            type: NOTIFY_TYPES.GET_NOTIFY,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data },
        });
    }
};

export const createNotify =
    ({ _id, data, token }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            const newBody = {
                title: data.title,
                content: data.content,
                faculty: data.faculty,
            };
            if (data.attachment) {
                newBody.attachment = data.attachment;
            }

            await postDataAPI(`notification/${_id}/create`, newBody, token);

            const res = await getDataAPI("notification", token);

            dispatch({
                type: NOTIFY_TYPES.GET_NOTIFY,
                payload: res.data,
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: "Add notify Successfull !" },
            });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data },
            });
        }
    };

export const updateNotify =
    ({ _id, body, token }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const newBody = {
                userID: body.userID,
                title: body.title,
                content: body.content,
                faculty: body.faculty,
            };
            if (body.attachment) {
                newBody.attachment = body.attachment;
            }

            await patchDataAPI(`notification/${_id}`, newBody, token);

            const res = await getDataAPI("notification", token);

            dispatch({
                type: NOTIFY_TYPES.GET_NOTIFY,
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

export const deleteNotify =
    ({ _id, data, token }) =>
    async (dispatch) => {
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

            const res = await deleteDataAPI(`notification/${_id}`, data, token);

            dispatch({
                type: NOTIFY_TYPES.DELETE_NOTIFY,
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
