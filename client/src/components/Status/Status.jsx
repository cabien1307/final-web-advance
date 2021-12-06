import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";

import './status.css'
import { GLOBALTYPES } from "../../store/actions/globalTypes";
import { createPost } from "../../store/actions/postAction";
import { matchYoutubeUrl } from "../../utils/validation"

const Status = () => {
    const { auth, token } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [faculty, setFaculty] = useState("");
    const [title, setTitle] = useState("");
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [showEmbed, setShowEmbed] = useState(false);

    const inputEmbedRef = useRef()


    const handleChangeImages = (e) => {
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
        setImages([...images, ...newImages]);
    };

    const deleteImages = (index) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost({ title, images, faculty, auth, token, videos }));

        setTitle("");
        setImages([]);
        setVideos([])
        setShowEmbed(false)
    };

    const deleteVideo = (index) => {
        const newArr = [...videos];
        newArr.splice(index, 1);
        setVideos(newArr);
    }

    const addEmbed = () => {
        const url = matchYoutubeUrl(inputEmbedRef.current.value)
        const isDuplicate = videos.some((video) => video === url)

        if (url && !isDuplicate) {
            setVideos([...videos, url])
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
        <div>
            <form
                className="form py-2 flex flex-col justify-between rounded-md border-2 m-2 shadow"
                onSubmit={handleSubmit}
            >
                <div className="content flex justify-between px-3">
                    <img
                        src={auth.user.profilePic ? auth.user.profilePic : process.env.PUBLIC_URL + '/images/male_avatar.svg'}
                        className="w-12 h-12 object-cover rounded-full border-2"
                        alt=""
                    />
                    <input
                        type="text"
                        className="flex-1 mx-4 px-3 focus:outline-none border-b-2 border-gray-700"
                        placeholder={`What's on your mind ${auth.user.username} ?`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

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
                        images.map((img, index) => (
                            <div key={index} className="relative w-full h-20">
                                <img className="block object-contain w-full h-full max-h-24" src={URL.createObjectURL(img)} alt="images" />
                                <i
                                    className="fas fa-times-circle absolute -top-1 right-0 text-xl text-red-500 cursor-pointer"
                                    onClick={() => deleteImages(index)}
                                />
                            </div>
                        ))
                    }

                    {
                        videos.map((video, index) => (
                            <div key={index} className="relative w-full h-20">
                                <YoutubeEmbed embedId={video} />
                                <i
                                    className="fas fa-times-circle absolute -top-1 right-0 text-xl text-red-500 cursor-pointer"
                                    onClick={() => deleteVideo(index)}
                                />
                            </div>
                        ))
                    }

                </div>

                <div className="img-post mt-2 px-3">
                    <input
                        type="file"
                        multiple="multiple"
                        id="isPhotoId"
                        accept=".png,.jpeg,.jpg,.jfif"
                        hidden
                        onChange={handleChangeImages}
                    />
                    <ul className="flex justify-around items-center">
                        <li className="py-2 px-2 rounded-xl hover:bg-blue-100">
                            <label htmlFor="isPhotoId" className="cursor-pointer">
                                <i className="far fa-images text-red-600 mx-2" />
                                <span className="md:hidden sm:hidden xs:hidden">
                                    Photos
                                </span>
                            </label>
                        </li>

                        <li
                            className="py-2 px-2 rounded-xl hover:bg-blue-100"
                            onClick={() => setShowEmbed(!showEmbed)}>
                            <label className="cursor-pointer">
                                <i className="fab fa-youtube text-red-600 mx-2" />
                                <span className="md:hidden sm:hidden xs:hidden">
                                    Videos
                                </span>
                            </label>
                        </li>



                        {
                            (auth.user.role === 2 || auth.user.role === 0) &&
                            (
                                <>
                                    <li className="py-2 px-2 rounded-xl hover:bg-blue-100">
                                        <label className="cursor-pointer">
                                            <i className="fas fa-location-arrow text-green-600 mx-2" />
                                            <span className="md:hidden sm:hidden xs:hidden">
                                                Location
                                            </span>
                                        </label>
                                    </li>

                                    <li className="py-2 px-2 rounded-xl hover:bg-blue-100">
                                        <label className="cursor-pointer">
                                            <i className="fas fa-tags text-blue-600" />
                                            <span className="md:hidden sm:hidden xs:hidden">
                                                Tag
                                            </span>
                                        </label>
                                    </li>
                                </>
                            )
                        }

                        {
                            (auth.user.role === 1) &&
                            <li className="w-52">
                                <select
                                    className="w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent py-1 px-2"
                                    required
                                    value={faculty}
                                    onChange={(e) => setFaculty(e.target.value)}
                                >
                                    <option value="">
                                        ---Select faculty---
                                    </option>

                                    {
                                        auth.user.listRolePost && auth.user.listRolePost.map(faculty => (
                                            <option value={faculty._id} key={faculty._id}>
                                                {faculty.name}
                                            </option>
                                        ))
                                    }

                                </select>
                            </li>
                        }

                        <li className="cursor-pointer py-2">
                            <button
                                className="py-2 px-3 text-white font-semibold rounded-lg shadow-md bg-green-500 hover:bg-green-400"
                                type="submit"
                            >
                                Share
                            </button>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default Status
