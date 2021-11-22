import { Link } from 'react-router-dom'
import './notFound.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function NotFound() {

    const { isLoggedIn } = useSelector(state => state.auth)
    const [col, setCol] = useState(9)

    useEffect(() => {
        if (isLoggedIn) {
            setCol(9)
        } else {
            setCol(12)
        }
    }, [isLoggedIn])

    return (
        <div className={`col-span-${col} 2xl:col-span-${col} xl:col-span-${col} lg:col-span-${col} md:col-span-${col + 1} sm:col-span-${col + 1}`}>
            <div className="content flex flex-col items-center space-y-5 text-heading text-center px-5">
                <img className="w-1/2 2xl:w-1/2 xl:w-1/2 lg:w-3/5 md:w-3/4 sm:w-full h-auto"
                    src={process.env.PUBLIC_URL + '/images/404.svg'} alt="" />

                <h1 className="text-7xl 2xl:text-7xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl font-bold hover:text-tertiary ">
                    Page not found !
                </h1>

                <h1 className="text-5xl 2xl:text-5xl xl:text-3xl lg:text-3xl md:text-3xl sm:text-2xl font-semibold" >
                    Opps !
                </h1>
                <p className="msg sm:text-sm">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate aspernatur beatae natus minima eos.
                </p>
                <button className="bg-btn-bg text-btn-text px-7 py-3 rounded-md shadow-md text-xl font-semibold hover:bg-btn-hover md:w-full sm:w-full">
                    <Link to='/' className="btn-back">Back to {isLoggedIn ? 'Home' : 'Login'}</Link>
                </button>
            </div>
        </div>
    )
}

export default NotFound;