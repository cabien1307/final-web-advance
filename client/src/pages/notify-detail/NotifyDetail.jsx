import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import './notify-detail.css'
import { readNotify } from "../../store/actions/notifyAction"

const PUBLIC_ATTACHMENT = 'http://localhost:5000/files/'

function NotifyDetail() {
    const dispatch = useDispatch()
    const params = useParams();
    const history = useHistory()
    const [notify, setNotify] = useState({})

    const { user } = useSelector(state => state.auth)
    const { token } = useSelector(state => state)

    useEffect(() => {
        axios.get(`/notification/${params.id}`)
            .then(res => {
                setNotify(res.data);
            })
            .catch(err => {
                history.push('/*')
            })
    }, [params.id, history])

    useEffect(() => {
        dispatch(readNotify({
            _id: user._id,
            params: params.id,
            token

        }))
    }, [dispatch, params.id, token, user])

    return (
        <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 px-5 py-3 border-r-2">
            <div className="wrapper space-y-5">
                {/* Heading */}
                <div className="py-5">
                    <h1 className="text-center font-bold text-3xl sm:text-2xl text-heading">
                        {notify.title}
                    </h1>
                </div>
                {/* Faculty - Date craete */}
                <div className="flex justify-end">
                    <span className="text-sm italic underline text-paragraph sm:text-xs">
                        {notify.faculty && notify.faculty['name']} | Date created: {new Date(
                            notify.createdAt
                        ).toLocaleDateString()}
                    </span>
                </div>

                {/* Content */}
                <div className="space-y-5">
                    <p className="content-n text-base text-paragraph px-2 sm:text-sm whitespace-pre-wrap">
                        {notify.content}
                    </p>

                    <h1 className="text-sm text-tertiary px-2">Trường hợp không đọc được file đính kèm, vui lòng liên hệ nhóm kỹ thuật qua fanpage TDTU Software Engineering
                        <a href="https://www.facebook.com/tdtsoftware/" target="_blank" rel="noreferrer" className="ml-1 text-blue-500">(tại đây)</a>
                    </h1>
                </div>

                {/* Attachment */}
                {
                    (notify.attachment && notify.attachment.length > 0) &&

                    (
                        <div className="space-y-1">
                            <h1 className="text-md font-bold sm:text-sm">Attachments:</h1>
                            <ul className="list-decimal px-10 border-2 border-stroke py-3 bg-card-bg rounded-sm">
                                {
                                    notify.attachment.map((att, index) => (
                                        <li className="attachment text-base sm:text-sm italic text-card-paragraph" key={index}>
                                            <a
                                                href={PUBLIC_ATTACHMENT + att}
                                                target="_blank"
                                                rel="noreferrer">{att}</a>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default NotifyDetail