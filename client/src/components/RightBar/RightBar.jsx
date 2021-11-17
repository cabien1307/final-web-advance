import './rightBar.css';
import { Link } from "react-router-dom";
import { listNotity } from '../../dummyData'

function RightBar() {
    return (
        <div className="col-span-3 2xl:col-span-3 xl:col-span-3 lg:hidden md:hidden sm:hidden py-4 px-2 border-l-2">
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
                    listNotity.map((notify, index) => {
                        return (
                            <Link to="/notify/id" className="notify" key={index}>
                                <h1 className="title-notify">{notify.title}</h1>
                                <h3 className="date-create">{notify.createdAt}</h3>
                            </Link>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default RightBar;