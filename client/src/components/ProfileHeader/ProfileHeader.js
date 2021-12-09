import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCover, updateProfile } from "../../store/actions/authAction";
import { GLOBALTYPES } from "../../store/actions/globalTypes";
import "./ProfileHeader.css";

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
        <>
            <div className="coverPic relative">
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
                        className="update-cover"
                    >
                        {!urlCoverPic ? (
                            <label
                                htmlFor="isCoverId"
                                className="cursor-pointer flex items-center space-x-2"
                            >
                                <i className="fas fa-camera"></i>
                                <h3 className="md:hidden sm:hidden">
                                    Update cover picture
                                </h3>
                            </label>
                        ) : (
                            <button
                                type="submit"
                                className="flex items-center space-x-2 font-semibold "
                            >
                                <i
                                    className="fas fa-check cursor-pointer"
                                    title="Update"
                                ></i>
                                <h3 className="md:hidden sm:hidden">Update</h3>
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
                <div className="profilePic bg-white absolute left-1/2 transform -translate-x-1/2 bottom-12 w-44 h-44 rounded-full">
                    <img
                        className="w-44 h-44 rounded-full object-cover border-4"
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
                        <div className="absolute top-0">
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
                            className="update-profile"
                        >
                            {!urlProfilePic ? (
                                <label htmlFor="isProfileId">
                                    <i className="fas fa-camera"></i>
                                </label>
                            ) : (
                                <button type="submit">
                                    <i
                                        className="fas fa-check"
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

                <h1 className="text-center text-3xl font-semibold mt-3">
                    {user.username ? user.username : user.name}
                </h1>
            </div>
        </>
    );
};

export default ProfileHeader;
