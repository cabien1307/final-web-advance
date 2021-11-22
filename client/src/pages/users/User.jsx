import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';

import { GLOBALTYPES } from "../../store/actions/globalTypes";
import { updateUserRole, deleteUser } from "../../store/actions/usersAction"
import './user.css';

function User() {

    const modal = useSelector(state => state.modal)
    const { faculties } = useSelector(state => state.faculty)
    const { users } = useSelector(state => state.users)
    const { token } = useSelector(state => state)
    const dispatch = useDispatch();

    const [data, setData] = useState({
        _id: "",
        username: "",
        email: "",
        listRolePost: []
    })

    const [isAdmin, setIsAdmin] = useState(false)

    const handleModal = (user) => {
        dispatch({
            type: GLOBALTYPES.MODAL,
            payload: !modal
        })
        setIsAdmin(user.role === 0)
        setData({
            _id: user._id,
            username: user.username,
            email: user.email,
            listRolePost: user.listRolePost
        })
    }

    const handleUpdateRole = (e) => {
        e.preventDefault();
        if (isAdmin) delete data.listRolePost
        dispatch(updateUserRole({ _id: data._id, data, token }))
        dispatch({
            type: GLOBALTYPES.MODAL,
            payload: !modal
        })
    }

    // Checked
    const handleCheck = (id) => {
        setData(pre => {
            const isChecked = data.listRolePost.includes(id)
            if (isChecked) {
                return {
                    ...pre,
                    listRolePost: data.listRolePost.filter(item => item !== id)
                }
            } else {
                return {
                    ...data,
                    listRolePost: [...data.listRolePost, id]
                }

            }
        })
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleDelete = (user) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure to delete ${user.username} ?`)) {
            dispatch(deleteUser({ _id: user._id, token }))
        }
    }

    return (
        <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 px-3 py-3">
            <h1 className="text-heading text-2xl font-semibold">Permission</h1>
            <hr />

            {/* Table users */}
            <div className="flex relative top-1/4 justify-center h-full">
                <div className="w-full">
                    <table className="table-user w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Operations</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users &&
                                users.map((user, index) => (

                                    <tr key={index}>
                                        <td className="font-semibold">{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.role === 0 ? "ADMIN" : "TEACHER"}</td>
                                        <td className="space-x-4">
                                            <button className="bg-transparent" onClick={() => handleModal(user)}>
                                                <span>Edit</span>
                                                <i className="far fa-edit hidden text-heading"></i>
                                            </button>
                                            <button className="bg-tertiary text-btn-text" onClick={() => handleDelete(user)}>
                                                <span>Delete</span>
                                                <i className="far fa-trash-alt hidden text-red-500"></i>
                                            </button>
                                        </td>
                                    </tr>

                                ))}

                        </tbody>


                    </table>
                </div>
            </div>

            {/* Modal create notify */}
            {modal &&
                (
                    <div className="modal fixed top-0 left-0 right-0 bottom-0 flex">

                        {/* Overlay */}
                        <div className="modal__overlay" onClick={handleModal}></div>

                        {/* Body */}
                        <div className="modal__body relative">
                            <div className="create__form bg-background rounded-2xl">
                                <div className="create__form_container">

                                    <form onSubmit={handleUpdateRole}>
                                        {/* Heading */}
                                        <div className="heading_form mb-5">
                                            <h1 className="text-card-heading text-3xl text-center">Update user role</h1>
                                            <i className="fas fa-times absolute right-3 top-3 text-2xl hover:text-active cursor-pointer" onClick={handleModal}></i>
                                        </div>

                                        {/* Content */}
                                        <div className="content_form px-5 md:px-2 sm:px-2 space-y-5">

                                            {/* ID */}
                                            <div className="title border-b-2 border-stroke">
                                                <label htmlFor="txtTitle" className="block text-heading text-lg font-semibold">ID: </label>
                                                <input
                                                    type="text"
                                                    id="txtID"
                                                    className="txtID w-full py-2 bg-transparent  rounded-sm text-secondary outline-none pointer-events-none"
                                                    placeholder="Enter title ..."
                                                    name="id"
                                                    value={data._id}
                                                    disabled
                                                />
                                            </div>

                                            {/* email */}
                                            <div className="title border-b-2 border-stroke">
                                                <label htmlFor="txtTitle" className="block text-heading text-lg font-semibold">Email: </label>
                                                <input
                                                    type="email"
                                                    className="txtID w-full py-2 bg-transparent  rounded-sm text-secondary outline-none pointer-events-none"
                                                    placeholder="Enter title ..."
                                                    name="id"
                                                    value={data.email}
                                                    disabled
                                                />
                                            </div>

                                            {/* Username */}
                                            <div className="title border-b-2 border-stroke">
                                                <label htmlFor="txtUsername" className="block text-heading text-lg font-semibold">Username: </label>
                                                <input
                                                    type="text"
                                                    id="txtUsername"
                                                    className="txtUsername w-full py-2 bg-transparent  rounded-sm text-card-heading outline-none"
                                                    placeholder="Enter title ..."
                                                    name="username"
                                                    onChange={handleChangeInput}
                                                    value={data.username}
                                                />
                                            </div>

                                            {/* List role */}
                                            {
                                                !isAdmin &&
                                                (
                                                    <div className="checkboxOptions py-2">
                                                        <h1 className="font-bold w-full text-gray-700">Options:</h1>
                                                        <div className="w-full py-1.5 text-gray-700 space-y-1">
                                                            {
                                                                faculties.map((item, index) => (
                                                                    <label className="input-group" key={index}>
                                                                        <input
                                                                            type="checkbox"
                                                                            name="listRolePost"
                                                                            onChange={() => handleCheck(item._id)}
                                                                            checked={data.listRolePost.includes(item._id)}
                                                                            value={item._id}
                                                                        />
                                                                        <span className="checkmark"></span>
                                                                        {item.name}
                                                                    </label>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>


                                        {/* Control */}
                                        <div className="control_form px-5 mt-4 flex justify-end space-x-3">
                                            <button className="ctr_btn rounded-md md:w-full md:rounded-3xl sm:w-full sm:rounded-3xl">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
        </div >
    )
}

export default User