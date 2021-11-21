import { Link } from "react-router-dom"
import "./faculty.css"
function Faculty() {
    return (
        <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 px-3 py-3 space-y-5">
            <h1 className="text-heading text-2xl font-semibold">List faculties</h1>
            <hr />
            <div className="grid grid-cols-12 gap-4">

                <div className="card col-span-4">
                    <div className="circle">
                        <img className="cart-image" src="https://res.cloudinary.com/dlzptxhoe/image/upload/v1636772791/Images/leow9qpj5bu2hwry40i7.svg" alt="" />
                    </div>
                    <Link to="/">
                        Faculty of Infomation of tecnology
                    </Link>
                </div>

                <div className="card col-span-4">
                    <div className="circle">
                        <img className="cart-image" src="https://res.cloudinary.com/dlzptxhoe/image/upload/v1636772791/Images/leow9qpj5bu2hwry40i7.svg" alt="" />
                    </div>
                    <Link to="/">
                        Faculty of Infomation of tecnology
                    </Link>
                </div>

                <div className="card col-span-4">
                    <div className="circle">
                        <img className="cart-image" src="https://res.cloudinary.com/dlzptxhoe/image/upload/v1636772791/Images/leow9qpj5bu2hwry40i7.svg" alt="" />
                    </div>
                    <Link to="/">
                        Faculty of Infomation of tecnology
                    </Link>
                </div>

                <div className="card col-span-4">
                    <div className="circle">
                        <img className="cart-image" src="https://res.cloudinary.com/dlzptxhoe/image/upload/v1636772791/Images/leow9qpj5bu2hwry40i7.svg" alt="" />
                    </div>
                    <Link to="/">
                        Faculty of Infomation of tecnology
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Faculty