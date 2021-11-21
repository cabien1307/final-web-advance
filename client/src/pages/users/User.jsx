import './user.css';
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../store/actions/globalTypes";
import { useState } from 'react';

function User() {
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch();
    const [data, setData] = useState({
        username: 'Nguyen Van A',
        listRolePost: []
    })

    const handleModal = () => {
        dispatch({
            type: GLOBALTYPES.MODAL,
            payload: !modal
        })
    }

    const handleUpdateRole = (e) => {
        e.preventDefault();
        console.log("Update");
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
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
                            <tr>
                                <td className="font-semibold">0</td>
                                <td>admin</td>
                                <td>TEACHER</td>
                                <td className="space-x-4">
                                    <button className="bg-transparent" onClick={() => handleModal()}>
                                        <span>Edit</span>
                                        <i className="far fa-edit hidden text-heading"></i>
                                    </button>
                                    <button className="bg-tertiary text-btn-text">
                                        <span>Delete</span>
                                        <i className="far fa-trash-alt hidden text-red-500"></i>
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className="font-semibold">1</td>
                                <td>admin</td>
                                <td>TEACHER</td>
                                <td className="space-x-4">
                                    <button className="bg-transparent" onClick={() => handleModal()}>
                                        <span>Edit</span>
                                        <i className="far fa-edit hidden text-heading"></i>
                                    </button>
                                    <button className="bg-tertiary text-btn-text">
                                        <span>Delete</span>
                                        <i className="far fa-trash-alt hidden text-red-500"></i>
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className="font-semibold">2</td>
                                <td>admin</td>
                                <td>TEACHER</td>
                                <td className="space-x-4">
                                    <button className="bg-transparent" onClick={() => handleModal()}>
                                        <span>Edit</span>
                                        <i className="far fa-edit hidden text-heading"></i>
                                    </button>
                                    <button className="bg-tertiary text-btn-text">
                                        <span>Delete</span>
                                        <i className="far fa-trash-alt hidden text-red-500"></i>
                                    </button>
                                </td>
                            </tr>

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
                                            {/* Title */}
                                            <div className="title border-b-2 border-stroke">
                                                <label htmlFor="txtTitle" className="block text-heading text-lg font-semibold">Username:</label>
                                                <input
                                                    type="text"
                                                    id="txtTitle"
                                                    className="txtTitle w-full py-2 bg-transparent  rounded-sm text-card-heading outline-none"
                                                    placeholder="Enter title ..."
                                                    name="title"
                                                    onChange={handleChangeInput}
                                                    value={data.username}
                                                />
                                            </div>
                                        </div>


                                        {/* Control */}
                                        <div className="control_form px-5 mt-4 flex justify-end space-x-3">
                                            <button className="ctr_btn rounded-md md:w-full md:rounded-3xl sm:w-full sm:rounded-3xl">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default User