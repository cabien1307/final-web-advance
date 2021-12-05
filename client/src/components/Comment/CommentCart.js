import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteComment,
    updateComment,
} from "../../store/actions/commentAction";

const CommentCart = ({ comment, post, index, timeAgo }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [onEdit, setOnEdit] = useState(false);
    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(comment.content);
    }, [comment.content]);

    const handleUpdate = () => {
        if (comment.content !== content) {
            dispatch(updateComment({ comment, post, content, auth }));
            setOnEdit(false);
        } else {
            setOnEdit(false);
        }
    };

    const handleRemoveComment = () => {
        if (
            (post.userID._id === auth.user._id ||
                comment.userID._id === auth.user._id) &&
            // eslint-disable-next-line no-restricted-globals
            confirm("Are you sure to delete this comment ?")
        ) {
            dispatch(deleteComment({ post, comment, auth }));
        }
    };

    return (
        <li
            key={index}
            className={`my-3 pl-2 w-full
                ${
                    comment.userID._id === auth.user._id
                        ? "border-l-2 border-green-500"
                        : ""
                }
            `}
            style={{
                opacity: comment._id ? 1 : 0.5,
                pointerEvents: comment._id ? "inherit" : "none",
            }}
        >
            <div className="user-commemt flex items-center">
                <img
                    className="w-8 h-8 mr-4 rounded-full"
                    src={
                        comment.userID.profilePic
                            ? comment.userID.profilePic
                            : process.env.PUBLIC_URL + "profile_pic.svg"
                    }
                    alt=""
                />
                <div className="content px-3 py-2 bg-blue-100 rounded-xl relative mb-1 w-full">
                    <h5 className="text-base font-semibold pr-5">
                        {comment.userID.username}
                    </h5>
                    {/* <!-- Comment --> */}
                    {onEdit ? (
                        <input
                            className="rounded-3xl border-none focus:outline-none w-full bg-blue-200 pl-2"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    ) : (
                        <p className="text-sm">{comment.content}</p>
                    )}
                    <div className="cursor-pointer block absolute right-0 mt-1">
                        <small className="italic text-xs mr-3">
                            {timeAgo(comment.createdAt)}
                        </small>
                        {onEdit ? (
                            <>
                                <small
                                    className="font-weight-bold mr-3"
                                    onClick={handleUpdate}
                                >
                                    update
                                </small>
                                <small
                                    className="font-weight-bold mr-3"
                                    onClick={() => setOnEdit(false)}
                                >
                                    cancel
                                </small>
                            </>
                        ) : (
                            comment.userID._id === auth.user._id && (
                                <>
                                    <small
                                        className="font-weight-bold mr-3"
                                        onClick={() => setOnEdit(true)}
                                    >
                                        edit
                                    </small>
                                    <small
                                        className="font-weight-bold mr-3"
                                        onClick={handleRemoveComment}
                                    >
                                        remove
                                    </small>
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CommentCart;
