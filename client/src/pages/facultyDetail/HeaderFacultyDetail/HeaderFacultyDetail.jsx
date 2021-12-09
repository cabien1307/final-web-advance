import "./HeaderFacultyDetail"

function HeaderFacultyDetail({ user }) {
    return (
        <div className="col-span-12 h-auto">
            <div className="coverPic relative">
                {/* <!-- Cover picture --> */}
                <img
                    src={
                        user.coverPic
                            ? user.coverPic
                            : "https://res.cloudinary.com/dlzptxhoe/image/upload/v1639051957/Images/z93ytrpq5bffycvfw7td.jpg"
                    }
                    className="w-full object-cover h-80 xs:ml-4"
                    alt=""
                />

                {/* <!-- Profile picture --> */}
                <div className="profilePic bg-white absolute left-0 bottom-0 w-40 h-40 rounded-full">
                    <img
                        className="w-40 h-40 rounded-full object-cover border-4 border-stroke"
                        src={
                            user.profilePic
                                ? user.profilePic
                                : process.env.PUBLIC_URL +
                                "/images/profile_pic.svg"
                        }
                        alt=""
                    />

                </div>
                <div className="px-3 py-3 absolute w-full border-b-2 md:border-none sm:border-none">
                    <h1 className="text-2xl font-semibold sm:text-xl">
                        {user.name}
                    </h1>
                    <div className="info w-full flex justify-end space-x-3 text-secondary md:flex-col sm:flex-col md:items-center sm:items-center">
                        <div className="text-base italic">
                            <i className="far fa-envelope max-w-0"></i>
                            <span className="ml-4">{user.email}</span>
                        </div>
                        <div className="text-base italic">
                            <i className="fas fa-phone-volume max-w-0"></i>
                            <span className="ml-4">{user.phone}</span>
                        </div>
                        <div className="text-base italic">
                            <i className="fab fa-facebook-f max-w-0"></i>
                            <span className="ml-4">{user.facebook}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderFacultyDetail