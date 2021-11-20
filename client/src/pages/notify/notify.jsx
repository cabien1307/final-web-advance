import { useState } from 'react'
import './notify.css'

function Notify() {

    const [modal, setModal] = useState(false);
    const [data, setData] = useState({
        title: '',
        content: '',
        faculty: '',
        attachment: ''
    })

    const inputChange = (e) => {
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

    return (
        <div className="col-span-9 2xl:col-span-9 xl:col-span-10 lg:col-span-10 md:col-span-10 sm:col-span-10 px-3">

            <button onClick={() => setModal(true)}>Show Modal</button>


            {/* Modal create notify */}
            {
                modal &&
                (
                    <div className="modal fixed top-0 left-0 right-0 bottom-0 flex">

                        {/* Overlay */}
                        <div className="modal__overlay w-full h-full absolute"></div>

                        {/* Body */}
                        <div className="modal__body bg-background relative rounded-md">
                            <div className="create__form bg-card-bg rounded-md">
                                <div className="create__form_container">

                                    <form onSubmit={handleCreateNotify}>
                                        {/* Heading */}
                                        <div className="heading_form">
                                            <h1 className="text-card-heading text-3xl text-center">Create notify</h1>
                                            <i className="fas fa-times absolute -right-3 -top-5 text-3xl hover:text-active cursor-pointer" onClick={() => setModal(false)}></i>
                                        </div>

                                        {/* Content */}
                                        <div className="content_form px-5 md:px-2 sm:px-2 space-y-5">
                                            {/* Title */}
                                            <div className="title border-b-2 border-stroke">
                                                <label htmlFor="txtTitle" className="block text-heading text-lg font-semibold">Title:</label>
                                                <input
                                                    type="text"
                                                    id="txtTitle"
                                                    className="w-full py-2 bg-transparent  rounded-sm text-card-heading outline-none"
                                                    placeholder="Enter title ..."
                                                    name="title"
                                                    onChange={inputChange}
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
                                                    onChange={inputChange}
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
                                                        onChange={inputChange}
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
                                                    onChange={inputChange}
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
                )
            }

        </div>
    )
}

export default Notify