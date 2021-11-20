import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { GLOBALTYPES } from "./globalTypes";

export const POST_TYPES = {
    CREATE_POST: "CREATE_POST",
    LOADING_POST: "LOADING_POST",
    GET_POSTS: "GET_POSTS",
    UPDATE_POST: "UPDATE_POST",
    GET_POST: "GET_POST",
};

export const createPost =
    ({ title, images, faculty, auth, token }) =>
    async (dispatch) => {
        let media = [];
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            if (images.length > 0) media = await imageUpload(images);

            const data = { userID: auth.user._id, title, img: media, faculty };

            if (auth.user.role === 2 || auth.user.role === 0) {
                delete data.faculty;
            }

            if (!media.length) {
                delete data.img;
            }
            const res = await postDataAPI("post", data, token);

            dispatch({
                type: POST_TYPES.CREATE_POST,
                payload: { ...res.data.newPost, userID: auth.user },
            });

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: "Post sucess" },
            });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };

export const getPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
        const res = await getDataAPI("post", token);
        dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: error.response.data.msg },
        });
    }
};
