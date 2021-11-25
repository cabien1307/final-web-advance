import './rightBar.css';
import { Link } from "react-router-dom";

function RightBar({ notifications }) {

    return (
        <div className="col-span-3 2xl:col-span-3 xl:col-span-3 lg:hidden md:hidden sm:hidden py-4 px-2">
            {/* Top */}
            <div className="top">
                <div className="text-4xl space-x-5">
                    <i className="far fa-newspaper border-b-4 border-tertiary"></i>
                    <span className="text-tertiary">Notify</span>
                </div>
            </div>
            {/* List notify */}
            <div className="main-notify mt-5 space-y-1">

                {
                    notifications.length
                        ? notifications.map((notify, index) => {
                            return (
                                <Link to={`/notify/${notify._id}/detail`} className="notify" key={index}>
                                    <h1 className="title-notify">{notify.title}</h1>
                                    <h3 className="date-create">{new Date(
                                        notify.createdAt
                                    ).toLocaleDateString()}</h3>
                                </Link>
                            )
                        })
                        : (
                            <div className="">
                                <img src="https://res.cloudinary.com/dlzptxhoe/image/upload/v1636772694/Images/lxggxe3aqpjzios350gv.svg" alt="" />
                                <h1 className="text-center text-sm my-2 font-semibold">There are currently no announcements. Please come back later </h1>
                            </div>
                        )
                }


            </div>
        </div>
    )
}

export default RightBar;