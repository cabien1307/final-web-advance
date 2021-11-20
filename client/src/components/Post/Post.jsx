// import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { format } from "timeago.js";
import "./post.css"

const Post = ({post}) => {

    const {auth} = useSelector(state => state)

    // const [isLiked, setIsLiked] = useState(false)
    // const [isEdit, setIsEdit] = useState(false)
    // const [isShowComment, setIsShowComment] = useState(false)
    // const [contentComment, setContentComment] = useState("")
    // const [titleUpdated, setTitleUpdated] = useState("")


    const timeAgo = (time) => {
        return format(time);
    }
    return (
        <div className="wrapper w-full shadow-lg rounded-lg my-5">
        {/* <!-- Img createdAt --> */}
        <div className="top flex justify-between items-center mx-2 px-3 py-2 relative">
            <div className="profile h-12 flex justify-between items-center">
                <img
                src={   post.userID.profilePic 
                            ? post.userID.profilePic 
                            : process.env.PUBLIC_URL + '/images/male_avatar.svg'
                    }
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 shadow-lg"
                />
                <div className="owner ml-2">
                    <Link
                        to={`/profile/${post.userID._id}`}
                        className="owner-post text-base font-semibold"
                        >
                            { post.userID.username }
                    </Link>
                    <p className="text-sm italic">{ timeAgo(post.createdAt) }</p>

                    {/* <!-- If teacher then show --> */}
                    <div className="text-xs font-mono" v-if="post.faculty">
                        <i className="fas fa-university"></i>
                        <span className="ml-2">{ post.faculty.name }</span>
                    </div>
                </div>
            </div>

            {/* <!-- Check post of user is a current user --> */}
            <div v-if="getUser._id === post.userID._id" className="space-x-2">
                <i
                    className="fas fa-edit cursor-pointer text-blue-500"
                    // @click="isEditForm"
                ></i>
                <i
                    className="fas fa-trash cursor-pointer text-red-600"
                    // @click="deletePost"
                ></i>
            </div>
        </div>

        {/* <!-- Content --> */}
        <div className="content my-2 mx-2">
            <h1 v-if="!isEdit" className="ml-3 mb-2 font-semibold">
                { post.title }
            </h1>
            {/* <form 
            // v-else 
            // @submit.prevent="updateTitle"
            >
                <div className="title flex">
                    <input
                        type="text"
                        className="px-3 py-2 bg-gray-300 w-full focus:outline-none rounded-2xl my-2"
                        // v-model="titleUpdated"
                    />
                    <i
                        className="fas fa-times cursor-pointer hover:text-red-500"
                        // @click="isEdit = false"
                    ></i>
                </div>
                <button
                    type="submit"
                    className="px-2 py-1 text-white text-sm font-semibold bg-blue-500 hover:bg-blue-400 rounded-md mb-2 float-right mx-2"
                >
                    UPDATE
                </button>
            </form> */}
            <div className="img-post w-full" v-if="post.img">
                <img
                    className="w-full h-auto rounded-lg"
                    src={post.img[0].url}
                    alt="post"
                />
            </div>
        </div>

        {/* <!-- Interact --> */}
        <div className="interact mx-2">
            <div className="interact-info border-b-2 py-2">
                {/* <!-- Like heart comment detail--> */}
                <div className="like flex justify-between">
                    <div className="btn-like px-2 flex items-center">
                        <i
                            // @click="handleLiked"
                            className="cursor-pointer w-6 h-6 text-sm text-white flex justify-center items-center rounded-full fas fa-thumbs-up bg-blue-600"
                        ></i>
                        <i
                            // @click="handleLiked"
                            className="cursor-pointer w-6 h-6 mr-2 text-sm text-white flex justify-center items-center rounded-full fas fa-heart bg-red-600"
                        ></i>
                        <p>{ post.likes.length } others</p>
                    </div>
                    <div className="count-comment mr-3">
                        <p>{ post.comments.length } comments</p>
                    </div>
                </div>
            </div>

            {/* <!-- Button like comment --> */}
            <div className="interact-btn flex justify-between py-1">
                <button
                    className="mx-2 px-12 py-2 hover:bg-gray-100"
                    // @click="handleLiked(post._id)"
                    // className="[isLiked ? 'text-blue-800' : '']"
                >
                    <div className="icon">
                        <i className="far fa-thumbs-up"></i>
                        Like
                    </div>
                </button>
                <button
                    // @click="isShowCommentBox"
                    className="mx-2 px-12 py-2 hover:bg-gray-100"
                >
                    <i className="fas fa-comment-alt"></i> Comments
                </button>
            </div>

            {/* <!-- Comment --> */}
            <div className="comments px-2 border-t-2" v-if="isShowComment">
                {/* <!-- Write commet --> */}
                <div className="write-comment flex mb-5 mt-2">
                    <img
                        src={
                            auth.user.profilePic
                                ? auth.user.profilePic
                                : process.env.PUBLIC_URL + '/images/male_avatar.svg'
                        }
                        alt=""
                        className="avt w-10 h-10 rounded-full shadow-md"
                    />

                    <input
                        // @keyup.enter.prevent="comment"
                        type="text"
                        className="flex-1 ml-3 border-none bg-gray-100 focus:outline-none rounded-3xl px-5"
                        placeholder="Write your comment..."
                        v-model="contentComment"
                    />
                </div>
                {/* <!-- List comment --> */}
                <div className="list-comments pb-2">
                    <ul>
                        {
                            post.comments.map(comment => (
                                <li
                                    className="my-5 pl-2"
                                    v-for="comment in post.comments"
                                    key="comment._id"
                                    // className={`
                                    //     ${comment.userID._id === getUser._id
                                    //         ? 'border-l-2 border-green-500'
                                    //         : ''}
                                    // `}
                                >
                                    <div className="user-commemt flex items-center">
                                        <img
                                            className="w-8 h-8 mr-4 rounded-full"
                                            // src="
                                            //     comment.userID.authType === 'local'
                                            //         ? comment.userID.profilePic
                                            //             ? PF + comment.userID.profilePic
                                            //             : PF + 'profile_pic.svg'
                                            //         : comment.userID.authType ===
                                            //               'google' &&
                                            //           comment.userID.profilePic.includes(
                                            //               'https://'
                                            //           )
                                            //         ? comment.userID.profilePic
                                            //         : PF + comment.userID.profilePic //If wether gg/fb type
                                            // "
                                            alt=""
                                        />
                                        <div
                                            className="content px-3 py-2 bg-blue-100 rounded-xl relative w-auto mb-1"
                                        >
                                            <div>
                                                <h5
                                                    className="text-base font-semibold pr-5"
                                                >
                                                    { comment.userID.username }
                                                </h5>
                                                {/* <!-- Comment --> */}
                                                <p className="text-sm">
                                                    { comment.content }
                                                </p>
                                            </div>
                                            <span
                                                className="absolute italic text-xs right-0 -bottom-4"
                                            >
                                                { timeAgo(comment.createdAt) }
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Post
