import { Route, Link, useHistory } from 'react-router-dom'
import './sideBar.css'
import { useDispatch } from 'react-redux'
import { Logout } from '../../store/actions/authAction'

function NavBar() {

    const dispatch = useDispatch();
    const history = useHistory();

    const menus = [
        {
            name: 'Home',
            to: '/',
            exact: true,
            icon: 'fas fa-home'
        },
        {
            name: 'Faculty',
            to: '/faculty',
            exact: false,
            icon: 'far fa-list-alt'
        },
        {
            name: 'Notification',
            to: '/notify',
            exact: false,
            icon: 'far fa-bell'
        },
        {
            name: 'Add user',
            to: '/register',
            exact: false,
            icon: 'fas fa-user-plus'
        },
        {
            name: 'Profile',
            to: '/profile/:id',
            exact: false,
            icon: 'far fa-user'
        },
        {
            name: 'More',
            to: '/more',
            exact: false,
            icon: 'fas fa-ellipsis-h'
        }
    ]

    const MenuLink = ({ label, to, activeWhenExact, icon }) => {
        return (
            <Route
                path={to}
                exact={activeWhenExact}
                children={({ match }) => {
                    var baseClass = "flex space-x-5 text-2xl hover:text-btn-hover";
                    return (
                        <li className={match ? baseClass + ' text-active' : baseClass}>
                            <div className="icon">
                                <Link to={to} className="relative">
                                    {to === '/notify'
                                        ? (<span className="absolute w-5 h-5 -top-2 -right-3 border-2 border-stroke rounded-full text-xs text-white font-semibold bg-red-500 flex justify-center items-center ">1</span>)
                                        : null}
                                    <i className={icon} title={label}></i>
                                </Link>
                            </div>
                            <div className="">
                                <Link to={to}>
                                    <span className="block 2xl:block xl:hidden lg:hidden md:hidden sm:hidden">{label}</span>
                                </Link>
                            </div>
                        </li>
                    )
                }}
            />
        )
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        history.push('/')
        dispatch(Logout())
    }

    return (
        <div className="col-span-3 mx-auto flex flex-col justify-between border-r-2 py-7 px-3 2xl:col-span-3 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-2 sm:px-0">

            {/* Main */}
            <div className="main lg:mx-auto md:mx-auto sm:mx-auto">
                <Link to='/'><i className="fab fa-trade-federation text-3xl font-semibold xl:mx-auto lg:mx-auto md:mx-auto text-blue-500"></i></Link>
                <ul className="flex flex-col space-y-7 mt-7">
                    {
                        menus.map((menu, index) => {
                            return (
                                <MenuLink
                                    key={index}
                                    label={menu.name}
                                    to={menu.to}
                                    activeWhenExact={menu.exact}
                                    icon={menu.icon}
                                />
                            )
                        })
                    }
                </ul>
            </div>

            {/* Profile */}
            <div className="profile mb-10 hover:text-btn-bg lg:w-9/12 md:w-9/12 sm:w-9/12 flex items-center space-x-3 cursor-pointer relative">
                <div className="avt w-12 h-12">
                    <img className="rounded-full border-2 border-stroke" src={process.env.PUBLIC_URL + '/images/male_avatar.svg'} alt="" />
                </div>

                <div className="flex items-center justify-around w-full 2xl:flex xl:hidden lg:hidden md:hidden sm:hidden">
                    <div className="info">
                        <h1 className="text-md font-semibold">Doan Nguyen Lam</h1>
                        <p className="text-sm italic text-gray-500 w-36 whitespace-nowrap overflow-hidden overflow-ellipsis">doannguyenlam@gmail.com</p>
                    </div>
                    <div>
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                </div>

                {/* Hover logout */}
                <div className="option bg-background absolute bottom-16 right-0 shadow-xl rounded-2xl py-3 px-5  border-2 hidden xl:left-0 lg:left-0 md:left-0 sm:left-0">

                    <div className="flex items-center">
                        <div className="avt w-12 h-12">
                            <img className="rounded-full border-2 border-stroke" src={process.env.PUBLIC_URL + '/images/male_avatar.svg'} alt="" />
                        </div>

                        <div className="flex items-center justify-around w-full 2xl:flex ">
                            <div className="info">
                                <h1 className="text-md font-semibold">Doan Nguyen Lam</h1>
                                <p className="text-sm italic text-gray-500 w-full whitespace-nowrap overflow-hidden overflow-ellipsis">doannguyenlam@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <hr className="my-3" />

                    <button onClick={handleLogout} className="font-semibold text-lg hover:text-btn-bg">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
