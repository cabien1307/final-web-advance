import { useState } from "react";
import { Link } from "react-router-dom";
import RightBar from "../../components/RightBar/RightBar"
import Status from "../../components/Status/Status";
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
            <div className="col-span-6 -ml-5 mr-1 2xl:col-span-6 xl:col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 sm:gap-0 sm:px-1">
                <Link to='/'>
                    <h1 className="text-xl p-1.5 font-medium">Home</h1>
                    <hr />
                </Link>
                <Status />


                {isShow && <Toast closeToast={() => handleClose()} toast={toast} />}
            </div>
            <RightBar />
        </>
    )
}

export default Home