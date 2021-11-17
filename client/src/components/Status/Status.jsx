import { useState } from "react";
import { useSelector } from "react-redux";
import { LIST_ICONS_POST } from "../../utils/staticData";

const Status = () => {
    const { auth } = useSelector((state) => state);
    const [images, setImages] = useState([]);
    return (
        <div>
            <form
                className="form py-2 flex flex-col justify-between rounded-md border-b-2"
            >
                {/* Preview image before share */}
                <div className="previewContainer relative mb-2 px-3">
                    {
                        images.map((img, index) => (
                            <>
                                <img className="w-full object-cover" src={URL.createObjectURL(img)} alt="images" />
                                <i
                                    className="fas fa-times-circle absolute top-0 right-3 text-2xl text-white cursor-pointer"
                                ></i>
                            </>
                        ))
                    }

                </div>

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
                        v-model="title"
                    />
                </div>
                <div className="img-post mt-2 px-3">
                    <input
                        type="file"
                        multiple="multiple"
                        id="isPhotoId"
                        accept=".png,.jpeg,.jpg,.jfif"
                        hidden
                    />
                    <ul className="flex justify-around items-center">
                        <li>
                            <label htmlFor="isPhotoId">
                                <i className="fas fa-photo-video text-red-600 mx-2" />
                                <span className="md:hidden sm:hidden xs:hidden">
                                    Photo or video
                                </span>
                            </label>
                        </li>
                        <div className="flex" style={{ display: 'none' }}>
                            {
                                LIST_ICONS_POST.map((item, index) => (
                                    <li
                                        key={index}
                                        className="cursor-pointer py-2 px-5 rounded-xl hover:bg-blue-100"
                                    >
                                        <label>
                                            <i className="mx-2"></i>
                                            <span className="md:hidden sm:hidden xs:hidden">{item.name}</span>
                                        </label>
                                    </li>
                                ))
                            }

                        </div>

                        <li>
                            <select
                                className="w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent py-1 px-2"
                                required
                            >
                                <option defaultValue disabled>
                                    ---Select faculty---
                                </option>

                                <option value="1">
                                    Faculty 1
                                </option>

                                <option value="2">
                                    Faculty 2
                                </option>
                            </select>
                        </li>

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
