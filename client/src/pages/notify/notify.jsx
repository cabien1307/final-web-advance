import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { GLOBALTYPES } from "../../store/actions/globalTypes"

import './notify.css'
import { listNotity } from "../../dummyData"

function Notify() {

    const user = useSelector(state => state.auth.user)
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch();

    const [data, setData] = useState({
        title: '',
        content: '',
        faculty: '',
        attachment: ''
    })


    const [keyword, setKeyword] = useState("")

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleCreateNotify = (e) => {
        e.preventDefault()
        console.log(data);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(keyword);
    }

    const handleDelete = () => {
        // eslint-disable-next-line no-restricted-globals
        confirm("Are you sure to delete this notify ?")
    }

    const handleEdit = (data) => {
        dispatch({
            type: GLOBALTYPES.MODAL,
            payload: !modal
        })
        setData({
            title: data.title
        })
    }

    const handleModal = () => {
        dispatch({
            type: GLOBALTYPES.MODAL,
            payload: !modal
        })
        setData({
            title: '',
            content: '',
            faculty: '',
            attachment: ''
        })
    }

    return (
        <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 px-3 py-3">

            <div className="wrapper">

                {/* Top */}
                <div className="option space-y-3">

                    {/* Button new */}
                    <div className="flex justify-between items-center space-x-2">
                        <h1 className="text-heading text-2xl font-semibold">List notifications</h1>
                        {user.role !== 2 &&
                            (<button className="px-3 py-2 bg-btn-bg rounded-md text-btn-text hover:bg-btn-hover" onClick={handleModal}>
                                <i className="fas fa-plus mr-2"></i>
                                <span className="font-semibold">New</span>
                            </button>)}
                    </div>

                    <hr />
                    {/* Search */}
                    <form onSubmit={handleSearch}>
                        <div className="flex justify-between">
                            <div className="w-2/3 flex items-center border-b-2 border-stroke">
                                <label htmlFor="seacch">
                                    <i className="fas fa-search"></i>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="w-full focus:outline-none py-2 px-5"
                                    name="search"
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                            <div className="w-1/3 flex justify-end">
                                <button type="submit" className="ctr_btn rounded-md md:w-full md:rounded-3xl sm:w-full sm:rounded-3xl">
                                    <i className="fas fa-search mr-2"></i>
                                    <span>Find</span>
                                </button>
                            </div>
                        </div>
                    </form>

                </div>

                {/* List notify */}
                <div className="list-notify mt-5">

                    {
                        listNotity.map((notify, index) => (
                            <div className="notify-item my-3 px-3 py-2 border-l-2 border-stroke space-y-6" key={index}>
                                {/* Heading notify */}
                                <div className="heading flex">
                                    <Link to={`/notify/${notify.to}`} className="title-heading text-base sm:text-sm">
                                        <h1>{notify.title}</h1>
                                    </Link>
                                    <div className="space-x-3 flex items-center ml-4">
                                        {
                                            user.role !== 2
                                                ? (
                                                    <>
                                                        <i
                                                            className="far fa-edit cursor-pointer text-blue-500"
                                                            title="Edit"
                                                            onClick={() => handleEdit(notify)}
                                                        >
                                                        </i>
                                                        <i
                                                            className="far fa-trash-alt cursor-pointer text-red-500"
                                                            title="Delete"
                                                            onClick={() => handleDelete()}
                                                        >
                                                        </i>
                                                    </>
                                                )
                                                : (
                                                    <i className="far fa-bookmark cursor-pointer text-yellow-500" title="Unread"></i>
                                                )
                                        }


                                    </div>
                                </div>
                                {/* Footer */}
                                <div className="footer-notify flex justify-end italic">
                                    <span className="text-paragraph text-sm sm:text-xs">Faculty of Infomation | Date created: {notify.createdAt}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Modal create notify */}
            {modal &&
                (
                    <div className="modal fixed top-0 left-0 right-0 bottom-0 flex">

                        {/* Overlay */}
                        <div className="modal__overlay"></div>

                        {/* Body */}
                        <div className="modal__body relative">
                            <div className="create__form bg-background rounded-2xl">
                                <div className="create__form_container">

                                    <form onSubmit={handleCreateNotify}>
                                        {/* Heading */}
                                        <div className="heading_form">
                                            <h1 className="text-card-heading text-3xl text-center">Create notify</h1>
                                            <i className="fas fa-times absolute right-3 top-3 text-2xl hover:text-active cursor-pointer" onClick={handleModal}></i>
                                        </div>

                                        {/* Content */}
                                        <div className="content_form px-5 md:px-2 sm:px-2 space-y-5">
                                            {/* Title */}
                                            <div className="title border-b-2 border-stroke">
                                                <label htmlFor="txtTitle" className="block text-heading text-lg font-semibold">Title:</label>
                                                <input
                                                    type="text"
                                                    id="txtTitle"
                                                    className="txtTitle w-full py-2 bg-transparent  rounded-sm text-card-heading outline-none"
                                                    placeholder="Enter title ..."
                                                    name="title"
                                                    onChange={handleChangeInput}
                                                    value={data.title}
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="content border-b-2 border-stroke">
                                                <label htmlFor="txtContent" className="block text-heading text-lg font-semibold">Content:</label>
                                                <textarea
                                                    id="txtContent"
                                                    className="w-full py-2 bg-transparent  rounded-sm text-card-heading outline-none"
                                                    placeholder="Enter content ..."
                                                    cols="20"
                                                    rows="3"
                                                    name="content"
                                                    onChange={handleChangeInput}
                                                    value={data.content}
                                                ></textarea>
                                            </div>

                                            {/* Facalty */}
                                            <div className="facalty border-b-2 border-stroke">
                                                <label htmlFor="txtFacalty" className="block text-heading text-lg font-semibold">Facalty:</label>
                                                <div className="flex items-center">
                                                    <i className="fas fa-braille"></i>
                                                    <select
                                                        id="faculty"
                                                        className="appearance-none bg-transparent"
                                                        name="faculty"
                                                        onChange={handleChangeInput}
                                                        value={data.faculty}
                                                    >
                                                        <option defaultValue disabled>---- Choose faculty: ----</option>
                                                        <option value="saab">Saab</option>
                                                        <option value="vw">VW</option>
                                                        <option value="audi">Audi</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Attachment */}
                                            <div className="Attachment border-b-2 border-stroke">
                                                <label htmlFor="txtAttachment" className="block text-heading text-lg font-semibold">Attachment:</label>
                                                <input
                                                    type="file"
                                                    id="txtAttachment"
                                                    className="w-full py-2 bg-transparent  rounded-sm text-card-heading outline-none"
                                                    name="attachment"
                                                    onChange={handleChangeInput}
                                                    value={data.attachment}
                                                />
                                            </div>
                                        </div>

                                        {/* Control */}
                                        <div className="control_form px-5 mt-4 flex justify-end space-x-3">
                                            <button className="ctr_btn rounded-md md:w-full md:rounded-3xl sm:w-full sm:rounded-3xl">Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

        </div>
    )
}

export default Notify