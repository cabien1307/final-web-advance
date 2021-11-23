import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
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
