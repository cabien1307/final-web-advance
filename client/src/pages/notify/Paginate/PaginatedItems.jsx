import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import './PaginatedItems.css'

// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
function Items({ currentItems, sendDataEdit, sendDataDelete }) {

    const { user } = useSelector(state => state.auth)

    const editNotify = (data) => {
        sendDataEdit(data)
    }
    const deleteNotify = (data) => {
        sendDataDelete(data)
    }

    return (
        <>
            {
                (currentItems && currentItems.length > 0) &&
                (

                    currentItems.map((notify, index) => (
                        <div className="notify-item my-3 px-3 py-2 border-l-2 border-stroke space-y-6" key={index}>
                            {/* Heading notify */}
                            <div className="heading flex">
                                <Link
                                    to={`/notify/${notify._id}/detail`}
                                    className="title-heading text-base sm:text-sm"
                                >
                                    <h1>{notify.title}</h1>
                                </Link>
                                <div className="space-x-3 flex items-center ml-4">
                                    {
                                        (user.role !== 2 && notify.userID === user._id) &&
                                        (
                                            <>
                                                <i
                                                    className="far fa-edit cursor-pointer text-blue-500"
                                                    title="Edit"
                                                    onClick={() => editNotify(notify)}
                                                >
                                                </i>
                                                <i
                                                    className="far fa-trash-alt cursor-pointer text-red-500"
                                                    title="Delete"
                                                    onClick={() => deleteNotify(notify)}
                                                >
                                                </i>
                                            </>
                                        )

                                    }

                                    {(!notify.read.includes(user._id) && user.role === 2) &&
                                        (
                                            <i className="far fa-bookmark cursor-pointer text-yellow-500" title="Unread"></i>
                                        )
                                    }


                                </div>
                            </div>
                            {/* Footer */}
                            <div className="footer-notify flex justify-end italic">
                                <span className="text-paragraph text-sm sm:text-xs">{notify.faculty.name} | Date created: {new Date(
                                    notify.createdAt
                                ).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))

                )
            }
        </>
    );
}

function PaginatedItems({ itemsPerPage, items, edit, deleted }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, items, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    const middleEdit = (data) => {
        edit(data);
    }

    const middleDelete = (data) => {
        deleted(data);
    }

    return (
        <>
            <div className="flex justify-end py-3">
                <ReactPaginate
                    nextLabel="&#10097; &#10097;"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="&#10096; &#10096;"
                    renderOnZeroPageCount={null}
                    className="paginate flex space-x-3"
                />
            </div>

            <div className="list-notify border-b-2">
                <Items currentItems={currentItems} sendDataEdit={middleEdit} sendDataDelete={middleDelete} />
            </div>

        </>
    );
}

export default PaginatedItems