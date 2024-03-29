import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../actions/globalTypes";

export const FACULTY_TYPES = {
    GET_FACULTY: "GET_FACULTY",
};

export const getFaculties = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI("faculty", token);
        dispatch({
            type: FACULTY_TYPES.GET_FACULTY,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data },
        });
    }
};
