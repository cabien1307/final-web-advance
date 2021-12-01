import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCover, updateProfile } from "../../store/actions/authAction";
import { GLOBALTYPES } from "../../store/actions/globalTypes";

const ProfileHeader = ({ user }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [urlCoverPic, setUrlCoverPic] = useState(null);
    const [urlProfilePic, setUrlProfilePic] = useState(null);

    const onCoverChange = (e) => {
        const file = e.target.files[0];
        let err = "";

        if (!file) return (err = "File does not exist!");

        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            return (err = "Image format is incorrect!");
        }

        if (err)
            if (err)
                dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setUrlCoverPic(file);
    };

    const onProfileChange = (e) => {
        const file = e.target.files[0];
        let err = "";

        if (!file) return (err = "File does not exist!");

        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            return (err = "Image format is incorrect!");
        }

        if (err)
            if (err)
                dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        setUrlProfilePic(file);
    };

    const updateCoverPic = (e) => {
        e.preventDefault();

        dispatch(updateCover({ user, images: [urlCoverPic] }));
        closePreview();
    };

    const updateProfilePic = (e) => {
        e.preventDefault();

        dispatch(updateProfile({ user, images: [urlProfilePic] }));
        closePreview();
    };

    const closePreview = () => {
        setUrlCoverPic(null);
        setUrlProfilePic(null);
    };
    return (
        // <!-- Avatar -->
        <div className="col-span-12 h-auto pb-24 border-b-2">
            <div className="coverPic relative right-0 xs:px-2">
                {/* <!-- Cover picture --> */}
                <img
                    src={
                        user.coverPic
                            ? user.coverPic
                            : process.env.PUBLIC_URL + "/images/tdtu.jpg"
                    }
                    className="w-full object-cover h-80 xs:ml-4"
                    alt=""
                />

                {/* <!-- Preview Cover --> */}
                {urlCoverPic && (
                    <div className="absolute top-0 w-full">
                        <img
                            className="w-full object-cover h-80 xs:ml-4"
                            src={URL.createObjectURL(urlCoverPic)}
                            alt=""
                        />
                        <i
                            className="fas fa-times-circle absolute top-0 right-3 text-2xl text-white cursor-pointer"
                            onClick={closePreview}
                        ></i>
                    </div>
                )}
                {/* <!-- Update cover picture --> */}
                {auth.user._id === user._id && (
                    <form
                        onSubmit={updateCoverPic}
                        v-if="$route.params.id === getUser._id"
                        className="update-cover absolute right-2 bottom-2 py-2 px-4 bg-white rounded-lg text-base font-semibold cursor-pointer"
                    >
                        {!urlCoverPic ? (
                            <label className="flex items-center justify-center cursor-pointer">
                                <i className="fas fa-camera mr-2"></i>
                                <h3>Update cover picture</h3>
                            </label>
                        ) : (
                            <button
                                type="submit"
                                className="flex items-center space-x-2 font-semibold"
                            >
                                <i
                                    className="fas fa-check cursor-pointer"
                                    title="Update"
                                ></i>
                                <h3>Update</h3>
                            </button>
                        )}
                        <input
                            type="file"
                            multiple="multiple"
                            id="isCoverId"
                            onChange={onCoverChange}
                            accept=".png,.jpeg,.jpg,.jfif"
                            hidden
                        />
                    </form>
                )}

                {/* <!-- Profile picture --> */}
                <div className="profilePic bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-44 h-44 rounded-full ">
                    <img
                        className="w-44 h-44 rounded-full object-contain border-4"
                        src={
                            user.profilePic
                                ? user.profilePic
                                : process.env.PUBLIC_URL +
                                  "/images/profile_pic.svg"
                        }
                        alt=""
                    />

                    {/* <!-- Preview profile --> */}
                    {urlProfilePic && (
                        <div className="absolute top-0" v-if="urlProfilePic">
                            <img
                                className="w-44 h-44 object-cover rounded-full"
                                src={URL.createObjectURL(urlProfilePic)}
                                alt=""
                            />
                            <i
                                className="fas fa-times-circle absolute top-0 right-3 text-2xl text-white cursor-pointer"
                                onClick={closePreview}
                            ></i>
                        </div>
                    )}

                    {/* <!--Form Update profile picture --> */}
                    {auth.user._id === user._id && (
                        <form
                            onSubmit={updateProfilePic}
                            className="update-profile absolute right-4 bottom-2 text-xl w-9 h-9 bg-gray-300 hover:bg-gray-100 rounded-full flex justify-center items-center cursor-pointer"
                        >
                            {!urlProfilePic ? (
                                <label>
                                    <i className="fas fa-camera cursor-pointer"></i>
                                </label>
                            ) : (
                                <button v-else type="submit">
                                    <i
                                        className="fas fa-check cursor-pointer"
                                        title="Update"
                                    ></i>
                                </button>
                            )}

                            <input
                                type="file"
                                multiple="multiple"
                                id="isProfileId"
                                onChange={onProfileChange}
                                accept=".png,.jpeg,.jpg,.jfif"
                                hidden
                            />
                        </form>
                    )}
                </div>
                {/* <!-- Name of user --> */}
                <h1 className="text-center text-3xl font-semibold w-full absolute -bottom-20 xl:-bottom-20 lg:-bottom-20 md:-bottom-24 sm:-bottom-28 xs:-bottom-28 left-1/2 transform -translate-x-1/2 ">
                    {user.username ? user.username : user.name}
                </h1>
            </div>
        </div>
    );
};

export default ProfileHeader;
