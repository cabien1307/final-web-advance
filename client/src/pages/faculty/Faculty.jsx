import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import "./faculty.css"

function Faculty() {
    const { faculties } = useSelector(state => state.faculty)

    return (
        <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 px-3 py-3 space-y-5">
            <h1 className="text-heading text-2xl font-semibold">List faculties</h1>
            <hr />
            <div className="list-faculty px-1 py-3">
                <div className="grid grid-cols-12 gap-3">
                    {
                        faculties.length > 0 && faculties.map((faculty, index) => (
                            <div className="card col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12" key={index}>
                                <div className="circle">
                                    <img className="cart-image" src={faculty.profilePic} alt={faculties.slug} />
                                </div>
                                <Link to={`/faculty/${faculty.slug}`}>
                                    {faculty.name}
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Faculty