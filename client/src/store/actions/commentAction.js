import {
    deleteDataAPI,
    patchDataAPI,
    postDataAPI,
} from "../../utils/fetchData";
import { EditData, GLOBALTYPES } from "./globalTypes";
import { POST_TYPES } from "./postAction";

export const createComment = (post, newComment, auth) => async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
        const data = {
            ...newComment,
            postID: post._id,
            postUserId: post.userID._id,
            userID: auth.user._id,
        };

        delete data.createdAt;
        const res = await postDataAPI("comment", data, auth.token);

        const newData = { ...res.data.newComment, userID: auth.user };
        const newPost = { ...post, comments: [...post.comments, newData] };
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: error.message },
        });
    }
};

export const updateComment =
    ({ comment, post, content, auth }) =>
    async (dispatch) => {
        const newComments = EditData(post.comments, comment._id, {
            ...comment,
            content,
        });
        const newPost = { ...post, comments: newComments };

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

        try {
            patchDataAPI(
                `comment/${comment._id}`,
                {
                    content,
                    userID: auth.user._id,
                    postID: post._id,
                    postUserId: post.userID._id,
                },
                auth.token
            );
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: "Update comment success !" },
            });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };

export const deleteComment =
    ({ post, comment, auth }) =>
    async (dispatch) => {
        const newPost = {
            ...post,
            comments: post.comments.filter((cm) => cm._id !== comment._id),
        };

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

        try {
            deleteDataAPI(
                `comment/${comment._id}`,
                { userID: auth.user._id, postID: post._id },
                auth.token
            );
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: "Delete comment success !" },
            });
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error.response.data.msg },
            });
        }
    };
