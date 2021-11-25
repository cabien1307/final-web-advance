import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { GLOBALTYPES } from "../../../store/actions/globalTypes"

import "./news.css"

function News({ news }) {
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {}
        })
    }

    setTimeout(() => {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {}
        })
    }, 10000)

    return (
        <div className="2xl:container my-1 news">
            <div className="flex items-center justify-between px-5 py-3 bg-green-500 rounded-md shadow-md">
                <div className="flex items-center space-x-5 text-btn-text">
                    <i className="fas fa-info"></i>
                    <Link
                        to={`/notify/${news._id}/detail`}
                        className="hover:no-underline hover:text-gray-200"
                    >
                        {news.title}
                    </Link>
                </div>

                <button className="text-btn-text hover:text-gray-200" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div >

    )
}

export default News