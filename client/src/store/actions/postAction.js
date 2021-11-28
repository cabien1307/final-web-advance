import {
    deleteDataAPI,
    getDataAPI,
    patchDataAPI,
    postDataAPI,
    putDataAPI,
} from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { GLOBALTYPES } from "./globalTypes";

export const POST_TYPES = {
    CREATE_POST: "CREATE_POST",
    LOADING_POST: "LOADING_POST",
    GET_POSTS: "GET_POSTS",
    UPDATE_POST: "UPDATE_POST",
    GET_POST: "GET_POST",
    DELETE_POST: "DELETE_POST",
    ADDED_POSTS: "ADDED_POSTS",
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
                payload: { success: "Post success" },
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

export const getPostsByFaculty =
    ({ token, slug }) =>
    async (dispatch) => {
        try {
            dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
            const res = await getDataAPI(`post/faculty/${slug}`, token);
            dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });

            dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };

export const updatePost =
    ({ title, images, auth, post }) =>
    async (dispatch) => {
        let media = [];
        const imgNewUrl = images.filter((img) => !img.url);
        const imgOldUrl = images.filter((img) => img.url);

        if (
            post.title === title &&
            imgNewUrl.length === 0 &&
            imgOldUrl.length === post.img.length
        )
            return;
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);
            const res = await patchDataAPI(
                `post/${post._id}`,
                {
                    title,
                    img: [...imgOldUrl, ...media],
                    userID: post.userID._id,
                },
                auth.token
            );

            dispatch({
                type: POST_TYPES.UPDATE_POST,
                payload: res.data.newPost,
            });
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: res.data.msg },
            });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };

export const likePost =
    ({ post, auth }) =>
    async (dispatch) => {
        const newPost = { ...post, likes: [...post.likes, auth.user] };
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

        try {
            await putDataAPI(
                `post/${post._id}/liked`,
                { userID: auth.user._id },
                auth.token
            );
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };

export const unLikePost =
    ({ post, auth }) =>
    async (dispatch) => {
        const newPost = {
            ...post,
            likes: post.likes.filter((like) => like._id !== auth.user._id),
        };
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

        try {
            await putDataAPI(
                `post/${post._id}/liked`,
                { userID: auth.user._id },
                auth.token
            );
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };

export const deletePost =
    ({ post, auth }) =>
    async (dispatch) => {
        dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

        try {
            await deleteDataAPI(
                `post/${post._id}`,
                { userID: auth.user._id },
                auth.token
            );
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: "Delete post successfully !" },
            });
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg },
            });
        }
    };
