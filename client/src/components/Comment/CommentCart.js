const CommentCart = ({ comment, index, auth, timeAgo }) => {
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
                    <div>
                        <h5 className="text-base font-semibold pr-5">
                            {comment.userID.username}
                        </h5>
                        {/* <!-- Comment --> */}
                        <p className="text-sm">{comment.content}</p>
                    </div>
                    <span className="absolute italic text-xs right-0 -bottom-4">
                        {timeAgo(comment.createdAt)}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default CommentCart;
