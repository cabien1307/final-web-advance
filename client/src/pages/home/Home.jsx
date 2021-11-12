import { useState } from "react";
import RightBar from "../../components/RightBar/RightBar"
import Toast from "../../components/Toast";

function Home() {

    const [isShow, setIsShow] = useState(false)
    const [toast, setToast] = useState(null)

    const handleClickSuccess = () => {
        setIsShow(true)
        setToast({
            title: "Success",
            type: 'success',
            msg: '',
            duration: 3000
        })
    }

    const handleClose = () => {
        setIsShow(false)
    }

    return (
        <>
            <div className="col-span-6 2xl:col-span-6 xl:col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0 sm:px-1 px-3">
                <h1>Home Page</h1>
                <button className="px-2 py-2 rounded-md bg-green-500 text-btn-text shadow-md hover:bg-btn-hover" onClick={() => handleClickSuccess()}>
                    Success Toast
                </button>


                {isShow && <Toast closeToast={() => handleClose()} toast={toast} />}
            </div>
            <RightBar />
        </>
    )
}

export default Home