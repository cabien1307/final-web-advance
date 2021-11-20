import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../store/actions/globalTypes";
import { createPost } from "../../store/actions/postAction";
import { LIST_ICONS_POST } from "../../utils/staticData";
import './status.css'

const Status = () => {
    const { auth, token } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [faculty, setFaculty] = useState("");
    const [title, setTitle] = useState("");
    const [images, setImages] = useState([]);


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

        // if (images.length === 0)
        //     return dispatch({
        //         type: GLOBALTYPES.ALERT,
        //         payload: { error: "Please add your photo!" },
        //     });

        dispatch(createPost({ title, images, faculty, auth, token }));

        setTitle("");
        setImages([]);
    };

    return (
        <div>
            <form
                className="form py-2 flex flex-col justify-between rounded-md border-2 m-2 shadow"
                onSubmit={handleSubmit}
            >
                <div className="content flex justify-between px-3">
                    <img
                        src={auth.user.profilePic ? auth.user.profilePic : process.env.PUBLIC_URL + '/images/male_avatar.svg'}
                        className="w-12 h-12 rounded-full"
                        alt=""
                    />
                    <input
                        type="text"
                        className="flex-1 mx-4 px-3 focus:outline-none border-b-2 border-gray-700"
                        placeholder={`What's on your mind ${auth.user.username} ?`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Preview image before share */}
                <div className="show_images">
                    {
                        images.map((img, index) => (
                            <div key={index} className="relative w-full h-full">
                                <img className="block object-contain w-full h-full max-h-24" src={URL.createObjectURL(img)} alt="images" />
                                <i
                                    className="fas fa-times-circle absolute -top-1 right-0 text-xl text-red-500 cursor-pointer"
                                    onClick={() => deleteImages(index)}
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
                                <i className="fas fa-photo-video text-red-600 mx-2" />
                                <span className="md:hidden sm:hidden xs:hidden">
                                    Photo or video
                                </span>
                            </label>
                        </li>

                        {
                            (auth.user.role === 2 || auth.user.role === 0 )&&
                            <div className="flex" >
                                {
                                    LIST_ICONS_POST.map((item, index) => (
                                        <li
                                            key={index}
                                            className="cursor-pointer py-2 px-2 rounded-xl hover:bg-blue-100"
                                        >
                                            <label className="cursor-pointer">
                                                <i className={`mx-1 ${item.icon}`}></i>
                                                <span className="md:hidden sm:hidden xs:hidden">{item.name}</span>
                                            </label>
                                        </li>
                                    ))
                                }

                            </div>
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
                                className="py-2 px-5 text-white font-semibold rounded-lg shadow-lg bg-green-400 hover:bg-green-500"
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
