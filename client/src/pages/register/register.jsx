import { useState } from 'react'
import {
    isEmpty,
    isLength,
    isMatch,
    isEmail,
} from "../../utils/validation";
import './register.css';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../store/actions/globalTypes';
import { createUsers } from "../../store/actions/usersAction"

const initialState = {
    username: "",
    email: "",
    password: "",
    cf_password: "",
    listRolePost: "",
    err: "",
};

function Register() {

    const dispatch = useDispatch();

    const [data, setData] = useState(initialState);
    const { username, email, password, cf_password, listRolePost, err } = data

    const { faculties } = useSelector(state => state.faculty)
    const { token } = useSelector(state => state)

    // Validate and submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEmpty(username) || isEmpty(email) || isEmpty(password))
            return setData({
                ...data,
                err: 'Please fill in all fields!',
                success: false,
            });

        if (!isEmail(email))
            return setData({
                ...data,
                err: 'Invalid email !',
                success: false

            })


        if (isLength(password))
            return setData({
                ...data,
                err: 'Password length must be at least 6 characters and not exceed 20 characters!',
                success: false
            })

        if (!isMatch(password, cf_password))
            return setData({
                ...data,
                err: 'Password does not match !',
                success: false
            })

        if (isEmpty(listRolePost))
            return setData({
                ...data,
                err: "Choose one faculty for user ?"
            })


        try {

            data.role = 1
            delete data.cf_password
            delete data.err

            dispatch(createUsers({ data, token }))
            setData({
                username: "",
                email: "",
                password: "",
                cf_password: "",
                listRolePost: "",
                err: "",
            })

        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: "Something went wrong !" },
            });
        }
    }


    // Input change
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        });
    }

    return (
        <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 px-3 register-page">

            <div className="img px-10 border-r-2">
                <img src={process.env.PUBLIC_URL + '/images/add_user.svg'} alt="" className="w-full mx-auto" />
            </div>

            <div className="register">
                <form onSubmit={handleSubmit} className="px-10 sm:px-3 space-y-6">
                    <h1 className="text-center text-3xl font-semibold text-heading">Add user</h1>

                    {/* Show error message */}
                    {err &&
                        (<h1 className="text-center text-red-500 font-semibold text-lg">{err}</h1>)
                    }

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="lb">Username:</label>
                        <div className="flex items-center border-b-2 border-stroke">
                            <i className="far fa-user"></i>
                            <input
                                type="text"
                                autoComplete="username"
                                id="username"
                                className="ip"
                                placeholder="Nguyen Van A"
                                onChange={handleChangeInput}
                                value={data.username}
                                name="username"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="lb">Email:</label>
                        <div className="flex items-center border-b-2 border-stroke">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                autoComplete="email"
                                id="email"
                                className="ip"
                                placeholder="example@gmail.com"
                                onChange={handleChangeInput}
                                value={data.email}
                                name="email"
                            />
                        </div>
                    </div>

                    {/* Faculty */}
                    <div>
                        <label htmlFor="faculty" className="lb">Faculty:</label>
                        <div className="flex items-center border-b-2 border-stroke">
                            <i className="fas fa-braille"></i>
                            <select
                                id="faculty"
                                className="appearance-none"
                                onChange={handleChangeInput}
                                name="listRolePost"
                                value={data.listRolePost}
                            >
                                <option defaultValue>---- Choose faculty: ----</option>
                                {
                                    faculties.map((item, index) => (
                                        <option key={index} value={item._id}>{item.name}</option>
                                    ))
                                }

                            </select>
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="lb">Password:</label>
                        <div className="flex items-center border-b-2 border-stroke">
                            <i className="fas fa-key"></i>
                            <input
                                type="password"
                                autoComplete="current-password"
                                id="password"
                                className="ip"
                                placeholder="************"
                                onChange={handleChangeInput}
                                value={data.password}
                                name="password"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm-password" className="lb">Confirm password:</label>
                        <div className="flex items-center border-b-2 border-stroke">
                            <i className="fas fa-spell-check"></i>
                            <input
                                type="password"
                                autoComplete="current-password"
                                id="confirm-password"
                                className="ip"
                                placeholder="************"
                                onChange={handleChangeInput}
                                name="cf_password"
                                value={data.cf_password}
                            />
                        </div>
                    </div>



                    {/* Button submit */}
                    <div>
                        <button className="btn w-full" type="submit">Create</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Register;