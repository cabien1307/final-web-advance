import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { format } from "timeago.js";
import { createComment } from "../../store/actions/commentAction";
import { GLOBALTYPES } from "../../store/actions/globalTypes";
import { deletePost, likePost, unLikePost, updatePost } from "../../store/actions/postAction";
import Carousel from "../Carousel/Carousel";
import CommentCart from "../Comment/CommentCart";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import "./post.css"
import { matchYoutubeUrl } from "../../utils/validation"
const Post = ({ post }) => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch();
    const inputEmbedRef = useRef()

    const [isLiked, setIsLiked] = useState(false)
    const [loadLike, setLoadLike] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [isShowComment, setIsShowComment] = useState(false)
    const [contentComment, setContentComment] = useState("")
    const [titleEdit, setTitleEdit] = useState("")
    const [imagesEdit, setImagesEdit] = useState([]);
    const [videosEdit, setVideosEdit] = useState([]);
    const [showEmbed, setShowEmbed] = useState(false);

    const handleEditPost = () => {
        setTitleEdit(post.title)
        setImagesEdit(post.img)
        setVideosEdit(post.videos)
        setIsEdit(!isEdit)
    }

    const deleteImagesEdit = (index) => {
        const newArr = [...imagesEdit];
        newArr.splice(index, 1);
        setImagesEdit(newArr);
    };

    const deleteVideoEdit = (index) => {
        const newArr = [...videosEdit];
        newArr.splice(index, 1);
        setVideosEdit(newArr);
    };

    const handleDeletePost = () => {
        if (window.confirm("Do you want to delete this post!!!")) {
            dispatch(deletePost({ post, auth }))
        } else {
            return;
        }
    }

    const handleUpdatePost = (e) => {
        e.preventDefault();

        if (isEdit) dispatch(updatePost({
            title: titleEdit,
            images: imagesEdit,
            auth,
            post,
            videos: videosEdit
        }));
        setTitleEdit("");
        setImagesEdit([]);
        setIsEdit(false)
    }

    const handleChangeImagesEdit = (e) => {
        const files = [...e.target.files];
        let err = "";
        let newImages = [];

        files.forEach((file) => {
            if (!file) return (err = "File does not exist!");

            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                return (err = "Image format is incorrect!");
            }

            return newImages.push(file);
        });

        if (err) if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setImagesEdit([...imagesEdit, ...newImages]);
    };

    const handleLiked = async () => {
        if (loadLike) return;

        setLoadLike(true);
        if (isLiked) {
            await dispatch(unLikePost({ post, auth }))
        } else {
            await dispatch(likePost({ post, auth }))
        }
        setLoadLike(false);
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        if (post.likes.find((like) => like._id === auth.user._id)) {
            setIsLiked(true);
        }
    }, [post.likes, auth.user._id]);

    const handleComment = (e) => {
        e.preventDefault();

        if (!contentComment.trim())
            return;

        const newComment = {
            content: contentComment,
            userID: auth.user,
            createdAt: new Date().toISOString(),
        };

        dispatch(createComment(post, newComment, auth))

        setContentComment("")
    }

    const timeAgo = (time) => {
        return format(time);
    }

    const addEmbed = () => {
        const url = matchYoutubeUrl(inputEmbedRef.current.value)
        const isDuplicate = videosEdit.some((video) => video === url)

        if (url && !isDuplicate) {
            setVideosEdit([...videosEdit, url])
        } else {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    warning: "The video isn't in the queue or the url isn't available yet !"
                }
            })
        }
        inputEmbedRef.current.value = ''
    }
    return (
        <div className="wrapper shadow rounded-md border-2 my-4 mx-2">
            {/* <!-- Img createdAt --> */}
            <div className="top flex justify-between items-center mx-2 px-3 py-2 relative">
                <div className="profile h-12 flex justify-between items-center">
                    <img
                        src={post.userID.profilePic
                            ? post.userID.profilePic
                            : process.env.PUBLIC_URL + '/images/male_avatar.svg'
                        }
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover border-2 shadow-lg"
                    />
                    <div className="owner ml-2 mt-2">
                        <Link
                            to={`/profile/${post.userID._id}`}
                            className="owner-post text-base font-semibold"
                        >
                            {post.userID.username}
                        </Link>
                        <p className="text-sm italic">{timeAgo(post.createdAt)}</p>

                        {/* <!-- If teacher then show --> */}
                        {
                            post.userID.role === 0 &&
                            (
                                <div className="text-xs font-mono" v-if="post.faculty">
                                    <i className={"fas fa-user-cog"}></i>
                                    <span className="ml-2">
                                        admin
                                    </span>
                                </div>
                            )
                        }

                        {
                            post.userID.role === 1 &&
                            (
                                <div className="text-xs font-mono" v-if="post.faculty">
                                    <i className={"fas fa-university"}></i>
                                    <span className="ml-2">
                                        {post.faculty.name}
                                    </span>
                                </div>
                            )
                        }

                    </div>
                </div>

                {/* <!-- Check post of user is a current user --> */}
                {
                    auth.user._id === post.userID._id &&
                    <div className="space-x-2">
                        <i
                            className="fas fa-edit cursor-pointer text-blue-500"
                            onClick={handleEditPost}
                        ></i>
                        <i
                            className="fas fa-trash cursor-pointer text-red-600"
                            onClick={handleDeletePost}
                        ></i>
                    </div>
                }
            </div>

            {/* <!-- Content --> */}
            <div className="content my-2 mx-2 block">
                {
                    !isEdit
                        ? <h1 className="ml-3 mb-2 font-semibold">
                            {post.title}
                        </h1>
                        : <form onSubmit={handleUpdatePost}
                        >
                            <div className="title flex">
                                <input
                                    type="text"
                                    className="px-3 py-2 bg-gray-300 w-full focus:outline-none rounded-2xl my-2"
                                    value={titleEdit}
                                    onChange={(e) => setTitleEdit(e.target.value)}
                                />

                                <i
                                    className="fas fa-times cursor-pointer hover:text-red-500"
                                    onClick={() => setIsEdit(false)}
                                ></i>
                            </div>

                            {/* Youtube */}
                            {
                                showEmbed &&
                                (
                                    <div className="px-3 mt-4 block space-y-2 relative">

                                        <div className="list-embed">
                                            <div className="flex items-end justify-between">
                                                <input
                                                    className="w-3/4 px-3 py-2 focus:outline-none border-b-2 border-gray-700"
                                                    type="text"
                                                    placeholder="Enter link youtube video ..."
                                                    ref={inputEmbedRef}
                                                />
                                                <div className="space-x-2 cursor-pointer text-xl hover:text-btn-hover" onClick={addEmbed}>
                                                    <span>Add</span>
                                                    <i className="fab fa-telegram-plane"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <i
                                            className="fas fa-times-circle absolute -top-5 right-3 text-red-500 cursor-pointer"
                                            onClick={() => setShowEmbed(false)}
                                        />

                                    </div>
                                )
                            }
                            {/* Preview image before share */}
                            <div className="show_images">
                                {
                                    imagesEdit.map((img, index) => (
                                        <div key={index} className="relative w-full h-full">
                                            <img className="block object-contain w-full h-full max-h-24"
                                                src={
                                                    img.url
                                                        ? img.url
                                                        : URL.createObjectURL(img)
                                                }
                                                alt="images" />
                                            <i
                                                className="fas fa-times-circle absolute -top-1 right-0 text-xl text-red-500 cursor-pointer"
                                                onClick={() => deleteImagesEdit(index)}
                                            />
                                        </div>
                                    ))
                                }

                                {
                                    videosEdit.map((video, index) => (
                                        <div key={index} className="relative w-full h-20">
                                            <YoutubeEmbed embedId={video} />
                                            <i
                                                className="fas fa-times-circle absolute -top-1 right-0 text-xl text-red-500 cursor-pointer"
                                                onClick={() => deleteVideoEdit(index)}
                                            />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="img-post mt-2 px-3">
                                <input
                                    type="file"
                                    multiple="multiple"
                                    id="isPhotoIdEdit"
                                    accept=".png,.jpeg,.jpg,.jfif"
                                    hidden
                                    onChange={handleChangeImagesEdit}
                                />
                                <ul className="flex justify-between items-center">
                                    <li className="py-2 px-2 rounded-xl hover:bg-blue-100">
                                        <label htmlFor="isPhotoIdEdit" className="cursor-pointer">
                                            <i className="far fa-images text-red-600 mx-2" />
                                            <span className="md:hidden sm:hidden xs:hidden">
                                                Photos
                                            </span>
                                        </label>
                                    </li>
                                    <li className="py-2 px-2 rounded-xl hover:bg-blue-100">
                                        <label className="cursor-pointer"
                                            onClick={() => setShowEmbed(!showEmbed)}
                                        >
                                            <i className="fab fa-youtube text-red-600 mx-2" />
                                            <span className="md:hidden sm:hidden xs:hidden">
                                                Videos
                                            </span>
                                        </label>
                                    </li>
                                    <button
                                        type="submit"
                                        className="px-2 py-1 text-white text-sm font-semibold bg-blue-500 hover:bg-blue-400 rounded-md mb-2 float-right mx-2"
                                    >
                                        UPDATE
                                    </button>
                                </ul>
                            </div>
                        </form>
                }

                {
                    post.img &&
                    <div className="img-post w-full" v-if="post.img">
                        <Carousel images={post.img} id={post._id} videos={post.videos} />
                    </div>
                }
            </div>

            {/* <!-- Interact --> */}
            <div className="interact mx-2">
                <div className="interact-info border-b-2 py-2">
                    {/* <!-- Like heart comment detail--> */}
                    <div className="like flex justify-between">
                        <div className="btn-like px-2 flex items-center">
                            <i
                                className="w-6 h-6 text-sm text-white flex justify-center items-center rounded-full fas fa-thumbs-up bg-blue-600"
                            ></i>
                            <i
                                className="w-6 h-6 mr-2 text-sm text-white flex justify-center items-center rounded-full fas fa-heart bg-red-600"
                            ></i>
                            <p>{post.likes.length} others</p>
                        </div>
                        <div className="count-comment mr-3">
                            <p>{post.comments.length} comments</p>
                        </div>
                    </div>
                </div>

                {/* <!-- Button like comment --> */}
                <div className="interact-btn flex justify-between py-1">
                    <button
                        onClick={handleLiked}
                        className={`mx-2 px-12 py-2 hover:bg-gray-100 ${isLiked ? 'text-blue-800' : ''}`}
                    >
                        <div className="icon">
                            <i className="far fa-thumbs-up"></i>
                            Like
                        </div>
                    </button>
                    <button
                        onClick={() => setIsShowComment(!isShowComment)}
                        className="mx-2 px-12 py-2 hover:bg-gray-100"
                    >
                        <i className="fas fa-comment-alt"></i> Comments
                    </button>
                </div>

                {/* <!-- Comment --> */}
                {
                    isShowComment &&
                    <div className="comments px-2 border-t-2" v-if="isShowComment">
                        {/* <!-- Write commet --> */}
                        <div className="write-comment flex mb-3 mt-2">
                            <img
                                src={
                                    auth.user.profilePic
                                        ? auth.user.profilePic
                                        : process.env.PUBLIC_URL + '/images/male_avatar.svg'
                                }
                                alt=""
                                className="avt w-10 h-10 rounded-full shadow-md"
                            />
                            <form onSubmit={handleComment} className="flex-1 ml-3 rounded-3xl px-3 bg-gray-100">
                                <input
                                    type="text"
                                    className="border-none focus:outline-none w-full bg-gray-100 mt-2"
                                    placeholder="Write your comment..."
                                    value={contentComment}
                                    onChange={(e) => setContentComment(e.target.value)}
                                />
                            </form>
                        </div>
                        {/* <!-- List comment --> */}
                        <div className="list-comments pb-2">
                            <ul>
                                {
                                    post.comments.map((comment, index) => (
                                        <CommentCart
                                            key={index}
                                            comment={comment}
                                            index={index}
                                            post={post}
                                            timeAgo={timeAgo}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Post
