import { useEffect, useRef } from 'react';
import './toast.css'

function Toast({ closeToast, toast }) {

    const toastRef = useRef()

    useEffect(() => {
        const icons = {
            success: 'fas fa-check-circle',
            warning: 'far fa-question-circle',
            info: 'fas fa-exclamation-circle',
            error: 'fas fa-skull-crossbones',
        }
        const icon = icons[toast.type]
        // Set type
        toastRef.current.className = `toast toast--${toast.type}`
        toastRef.current.children[0].children[0].className = icon

        // Calc delay
        const delay = (toast.duration / 1000).toFixed(2);
        toastRef.current.style.animation = `sildeInLeft ease-in .4s, fadeOut linear 1s ${delay}s forwards;`

        setTimeout(() => {
            closeToast()
        }, toast.duration + 1000)

    }, [closeToast, toast.duration, toast.type])

    return (
        // title type duration msg
        <div className="" ref={toastRef}>
            <div className="toast_icon">
                <i className="fas fa-check"></i>
            </div>
            <div className="toast_body">
                <h3 className="toast_title">{toast.title}</h3>
                <p className="toast_msg">
                    {
                        toast.msg
                            ? toast.msg
                            : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet.'
                    }
                </p>
            </div>
            <div className="toast_close" onClick={closeToast}>
                <i className="fas fa-times"></i>
            </div>
        </div>
    )
}
export default Toast;

// SET IN COMPONENT PARENT

// const [isShow, setIsShow] = useState(false)
// const [toast, setToast] = useState(null)

// const handleClickSuccess = () => {
//     setIsShow(true)
//     setToast({
//         title: "Success",
//         type: 'success',
//         msg: '',
//         duration: 3000
//     })
// }

// const handleClose = () => {
//     setIsShow(false)
// }

// { isShow && <Toast closeToast={() => handleClose()} toast={toast} /> }