// import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/actions/authAction";
import { getDataAPI } from "../utils/fetchData";

const EditForm = ({ user }) => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);
    const [faculties, setFaculties] = useState(null);

    const initialState = {
        username: "",
        faculty: "",
        major: "",
        class: "",
    };

    const [userData, setUserData] = useState(initialState);
    const { username, faculty, major, class: classID } = userData;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const updateInfo = (e) => {
        e.preventDefault();
        dispatch(updateUser({ user: auth.user, data: userData }));
        setIsEdit(false);
    };

    useEffect(() => {

        if (user || user.length) {
            setUserData({
                username: user.username,
                faculty: user.faculty ? user.faculty : "",
                major: user.major || "",
                class: user.class || ""
            });
        }


        if (user.role === 2) {
            getDataAPI(`faculty`)
                .then((res) => setFaculties(res.data))
                .catch((err) => console.log(err));
        }
    }, [auth.user, user]);

    return (
        <form
            onSubmit={updateInfo}
            className="detail w-full relative px-2 rounded-lg"
        >
            <h1 className="text-2xl font-bold my-3 xl:text-left lg:text-center md:text-center sm:text-center">
                Introduction
            </h1>
            {isEdit && (
                <i
                    className="fas fa-times-circle absolute top-0 right-0 text-xl text-black cursor-pointer"
                    title="Close"
                    onClick={() => setIsEdit(!isEdit)}
                ></i>
            )}
            <ul className="flex flex-col text-sm space-y-2">
                {/* Username */}
                <li className="flex items-center">
                    <div className="key flex items-center max-w-0">
                        <i className="max-w-0 fas fa-user"></i>
                        <span className="text-base italic ml-4">Name:</span>
                    </div>
                    <div className="value ml-20">
                        <h1
                            className={`text-sm font-semibold ${isEdit ? "hidden" : ""
                                }`}
                        >
                            {user.username}
                        </h1>
                        {isEdit && (
                            <input
                                v-if="isEdit"
                                type="text"
                                className="focus:outline-none text-base px-2 py-2 border-b-2 border-gray-800 w-full"
                                value={username}
                                onChange={handleChangeInput}
                                name="username"
                            />
                        )}
                    </div>
                </li>

                {/* Faculty */}
                {user.role !== 0 && (
                    <li className="flex items-center">
                        <div className="key flex items-center max-w-0">
                            <i className="max-w-0 fas fa-graduation-cap"></i>
                            <span className="text-base italic ml-4">
                                Faculty:
                            </span>
                        </div>
                        <div className="value ml-20">
                            {user.role === 2 && (
                                <h1
                                    className={`text-sm font-semibold ${isEdit && "hidden"
                                        }`}
                                >
                                    {user.faculty && user.faculty.name}
                                </h1>
                            )}

                            {user.role === 1 && (
                                <select className="focus:outline-none focus:ring-2 focus:ring-primary py-1 rounded-md px-2 text-center">
                                    {user.listRolePost.map((faculty) => (
                                        <option
                                            key={faculty._id}
                                            value={faculty._id}
                                        >
                                            {faculty.name}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {(user.role === 2 && isEdit) && (
                                <select
                                    className="focus:outline-none focus:ring-2 focus:ring-primary py-1 rounded-md text-left w-full"
                                    value={faculty || ""}
                                    onChange={handleChangeInput}
                                    name="faculty"
                                >
                                    <option defaultValue>
                                        ---List faculty---
                                    </option>

                                    {faculties.map((faculty) => (
                                        <option
                                            key={faculty._id}
                                            value={faculty._id}
                                        >
                                            {faculty.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </li>
                )}

                {/* Major */}
                {user.role === 2 && (
                    <>
                        <li className="flex items-center">
                            <div className="key flex items-center max-w-0">
                                <i className="max-w-0 fas fa-book-open"></i>
                                <span className="text-base italic ml-4">
                                    Major:
                                </span>
                            </div>
                            <div className="value ml-20">
                                <h1
                                    className={`text-sm font-semibold ${isEdit ? "hidden" : ""
                                        }`}
                                >
                                    {user.major}
                                </h1>
                                {isEdit && (
                                    <input
                                        v-if="isEdit"
                                        type="text"
                                        className="focus:outline-none border-b-2 border-gray-800 text-base px-2 py-2 w-full"
                                        value={major}
                                        onChange={handleChangeInput}
                                        name="major"
                                    />
                                )}
                            </div>
                        </li>
                        <li className="flex items-center">
                            <div className="key flex items-center max-w-0">
                                <i className="max-w-0 fas fa-user-graduate"></i>
                                <span className="text-base italic ml-4">
                                    Class:
                                </span>
                            </div>
                            <div className="value ml-20">
                                <h1
                                    className={`text-sm font-semibold ${isEdit && "hidden"
                                        }`}
                                >
                                    {user.class}
                                </h1>
                                {isEdit && (
                                    <input
                                        type="text"
                                        className="focus:outline-none border-b-2 border-gray-800 text-base px-2 py-2 w-full"
                                        onChange={handleChangeInput}
                                        value={classID}
                                        name="class"
                                    />
                                )}
                            </div>
                        </li>
                    </>
                )}
            </ul>
            {/* <!-- btn edit --> */}
            {auth.user._id === user._id && (
                <div>
                    {isEdit ? (
                        <button className="text-base font-semibold w-full mt-2 px-5 py-2 bg-btn-bg text-btn-text rounded-xl hover:bg-btn-hover">
                            Update
                        </button>
                    ) : (
                        <div
                            onClick={() => setIsEdit(!isEdit)}
                            className="text-base text-center cursor-pointer font-semibold w-full mt-2 px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                        >
                            Edit detail
                        </div>
                    )}
                </div>
            )}
        </form>
    );
};

export default EditForm;
