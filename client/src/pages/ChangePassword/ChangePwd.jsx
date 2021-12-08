import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../store/actions/globalTypes';

import './changePwd.css'
import { isLength, isMatch, isEmpty } from "../../utils/validation"
import { changePassword } from "../../store/actions/authAction"

function ChangePwd() {

    const dispatch = useDispatch();
    const { token } = useSelector(state => state)

    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        cfNewPassword: "",
        err: ""
    })

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmpty(data.oldPassword) || isEmpty(data.newPassword) || isEmpty(data.cfNewPassword)) {
            return setData({
                ...data,
                err: 'Please fill in all fields!',
            })
        }

        if (isLength(data.oldPassword) || isLength(data.newPassword) || isLength(data.cfNewPassword))
            return setData({
                ...data,
                err: 'Password length must be at least 6 characters and not exceed 20 characters!',
            })
        if (!isMatch(data.newPassword, data.cfNewPassword))
            return setData({
                ...data,
                err: 'New password does not Pmatch !',
            })

        try {
            delete data.err
            delete data.cfNewPassword
            dispatch(changePassword({ data, token }))
            setData({
                oldPassword: "",
                newPassword: "",
                cfNewPassword: "",
                err: ""
            })
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: "Something went wrong !" },
            });
        }

    }
    return (
        <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 px-3 register-page">

            <div className="img px-10 border-r-2">
                <img src={process.env.PUBLIC_URL + '/images/changepwd.svg'} alt="" className="w-full mx-auto" />
            </div>

            <div className="register">
                <form onSubmit={handleSubmit} className="px-10 sm:px-3 space-y-6">
                    <h1 className="text-center text-3xl font-semibold text-heading">Change password</h1>

                    {/* Show error message */}
                    {data.err &&
                        (<h1 className="text-center text-red-500 font-semibold text-lg">{data.err}</h1>)
                    }

                    {/*Old Password */}
                    <div>
                        <label htmlFor="old-password" className="lb">Old password:</label>
                        <div className="flex items-center border-b-2 border-stroke">
                            <i className="fas fa-key"></i>
                            <input
                                type="password"
                                autoComplete="current-password"
                                id="old-password"
                                className="ip"
                                placeholder="************"
                                onChange={handleChangeInput}
                                value={data.oldPassword}
                                name="oldPassword"
                            />
                        </div>
                    </div>

                    {/*New Password */}
                    <div>
                        <label htmlFor="new-password" className="lb">New password:</label>
                        <div className="flex items-center border-b-2 border-stroke">
                            <i className="fas fa-key"></i>
                            <input
                                type="password"
                                autoComplete="current-password"
                                id="new-password"
                                className="ip"
                                placeholder="************"
                                onChange={handleChangeInput}
                                value={data.newPassword}
                                name="newPassword"
                            />
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label htmlFor="confirm-password" className="lb">Confirm new password:</label>
                        <div className="flex items-center border-b-2 border-stroke">
                            <i className="fas fa-spell-check"></i>
                            <input
                                type="password"
                                autoComplete="current-password"
                                id="confirm-password"
                                className="ip"
                                placeholder="************"
                                onChange={handleChangeInput}
                                name="cfNewPassword"
                                value={data.cfNewPassword}
                            />
                        </div>
                    </div>



                    {/* Button submit */}
                    <div>
                        <button className="btn w-full" type="submit">Change</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default ChangePwd