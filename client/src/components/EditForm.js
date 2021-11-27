import moment from "moment";
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
        birthday: "",
        faculty: "",
        major: "",
        class: "",
    };

    const [userData, setUserData] = useState(initialState);
    const { username, birthday, faculty, major, class: classID } = userData;

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
        setUserData({ ...user });

        if (user.role === 2) {
            getDataAPI(`faculty`)
                .then((res) => setFaculties(res.data))
                .catch((err) => console.log(err));
        }
    }, [auth.user, user]);
    return (
        <form
            onSubmit={updateInfo}
            className="detail w-full relative px-3 rounded-lg"
        >
            <h1 className="text-2xl font-bold my-3 xl:text-left lg:text-center md:text-center sm:text-center">
                Introduction
            </h1>
            {isEdit && (
                <i
                    v-if="isEdit"
                    className="fas fa-times-circle absolute top-12 right-0 text-xl text-black cursor-pointer"
                    title="Close"
                    onClick={() => setIsEdit(!isEdit)}
                ></i>
            )}
            <ul className="flex flex-col text-sm">
                <li className="flex items-center">
                    <div className="key w-1/3">
                        <i className="w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/6 sm:w-1/6 fas fa-user"></i>
                        <span className="text-base italic">Name:</span>
                    </div>
                    <div className="value">
                        <h1
                            className={`text-lg font-semibold ${
                                isEdit ? "hidden" : ""
                            }`}
                        >
                            {user.username}
                        </h1>
                        {isEdit && (
                            <input
                                v-if="isEdit"
                                type="text"
                                className="focus:outline-none text-base px-5 py-2 border-b-2 border-gray-800 w-60"
                                value={username}
                                onChange={handleChangeInput}
                                name="username"
                            />
                        )}
                    </div>
                </li>
                <li className="flex items-center">
                    <div className="key w-1/3">
                        <i className="w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/6 sm:w-1/6 fas fa-birthday-cake"></i>
                        <span className="text-base italic">Birth:</span>
                    </div>
                    <div className="value">
                        <h1
                            className={`text-lg font-semibold ${
                                isEdit ? "hidden" : ""
                            }`}
                        >
                            {moment(user.birthday).format("YYYY-MM-DD")}
                        </h1>
                        {isEdit && (
                            <input
                                v-if="isEdit"
                                type="date"
                                className="focus:outline-none text-sm px-3 py-2 border-b-2 border-gray-800 w-60
                            "
                                // @input="onDateSelected"
                                value={moment(birthday).format("YYYY-MM-DD")}
                                onChange={handleChangeInput}
                                name="birthday"
                            />
                        )}
                    </div>
                </li>
                <li className="flex items-center">
                    <div className="key w-1/3">
                        <i className="w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/6 sm:w-1/6 fas fa-graduation-cap"></i>
                        <span className="text-base italic">Faculty:</span>
                    </div>
                    <div className="value">
                        {user.role === 2 && (
                            <h1
                                className={`text-lg font-semibold ${
                                    isEdit ? "hidden" : ""
                                }`}
                                v-if=""
                            >
                                {user.faculty ? user.faculty.name : ""}
                            </h1>
                        )}

                        {user.role === 1 && (
                            <select
                                className="w-full focus:outline-none focus:ring-2 focus:ring-primary py-1 rounded-md px-2 text-center"
                                value={faculty}
                            >
                                <option value="" disabled hidden selected>
                                    ---List role---
                                </option>

                                {user.listRolePost.map((faculty) => (
                                    <option
                                        v-for="faculty in getUser.listRolePost"
                                        key={faculty._id}
                                        value={faculty._id}
                                    >
                                        {faculty.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {user.role === 2 && isEdit && (
                            <select
                                className="w-60 focus:outline-none focus:ring-2 focus:ring-primary py-1 rounded-md px-2 text-center "
                                // v-if="user.role === 2 && isEdit"
                                value={faculty}
                                onChange={handleChangeInput}
                                name="faculty"
                            >
                                <option value="" disabled hidden selected>
                                    ---List faculty---
                                </option>

                                {faculties.map((faculty) => (
                                    <option
                                        v-for="faculty in getAllFaculties"
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
                <li className="flex items-center" v-if="getUser.role === 2">
                    <div className="key w-1/3">
                        <i className="w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/6 sm:w-1/6 fas fa-book-open"></i>
                        <span className="text-base italic">Major:</span>
                    </div>
                    <div className="value">
                        <h1
                            className={`text-lg font-semibold ${
                                isEdit ? "hidden" : ""
                            }`}
                        >
                            {user.major}
                        </h1>
                        {isEdit && (
                            <input
                                v-if="isEdit"
                                type="text"
                                className="focus:outline-none border-b-2 border-gray-800 w-60 text-base px-5 py-2"
                                value={major}
                                onChange={handleChangeInput}
                                name="major"
                            />
                        )}
                    </div>
                </li>
                <li className="flex items-center" v-if="getUser.role === 2">
                    <div className="key w-1/3">
                        <i className="w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/6 sm:w-1/6 fas fa-user-graduate"></i>
                        <span className="text-base italic">Class:</span>
                    </div>
                    <div className="value">
                        <h1
                            className={`text-lg font-semibold ${
                                isEdit ? "hidden" : ""
                            }`}
                            // :className="[isEdit ? 'hidden' : '']"
                        >
                            {user.class}
                        </h1>
                        {isEdit && (
                            <input
                                v-if="isEdit"
                                type="text"
                                className="focus:outline-none border-b-2 border-gray-800 w-60 text-base px-5 py-2"
                                onChange={handleChangeInput}
                                value={classID}
                                name="class"
                            />
                        )}
                    </div>
                </li>
            </ul>
            {/* <!-- btn edit --> */}
            {auth.user._id === user._id && (
                <div v-if="$route.params.id === getUser._id">
                    {isEdit ? (
                        <button
                            v-if="isEdit"
                            type="submit"
                            className="text-lg font-semibold w-full mt-5 px-5 py-2 bg-blue-200 rounded-xl hover:bg-blue-300"
                        >
                            Update
                        </button>
                    ) : (
                        <div
                            onClick={() => setIsEdit(!isEdit)}
                            className="text-lg text-center cursor-pointer font-semibold w-full mt-5 px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
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
