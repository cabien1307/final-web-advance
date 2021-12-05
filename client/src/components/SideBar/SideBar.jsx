import { Route, Link } from 'react-router-dom'
import './sideBar.css'
import { useSelector } from 'react-redux'

import HoverLogout from './HoverLogout';
import { useState } from 'react';

function NavBar() {

    const { auth } = useSelector(state => state)

    const menus = [
        {
            name: "Home",
            to: "/",
            exact: true,
            icon: "fas fa-home",
            role: [3],
        },
        {
            name: "Faculty",
            to: "/faculty",
            exact: false,
            icon: "far fa-list-alt",
            role: [3],
        },
        {
            name: "Add user",
            to: "/register",
            exact: false,
            icon: "fas fa-plus",
            role: [0],
        },
    
        {
            name: "Users",
            to: "/users",
            exact: false,
            icon: "fas fa-users",
            role: [0],
        },
        {
            name: "Notification",
            to: "/notify",
            exact: false,
            icon: "far fa-bell",
            role: [3],
        },
        {
            name: "Profile",
            to: `/profile/${auth.user._id}`,
            exact: false,
            icon: "far fa-user",
            role: [1, 2],
        },
        {
            name: "More",
            to: "/more",
            exact: false,
            icon: "fas fa-ellipsis-h",
            role: [3],
        },
    ];
    
    // 0 admin
    // 1 teacher
    // 2 student
    // 3 all

    const [isShow, setIsShow] = useState(false)

    const user = useSelector(state => state.auth.user)
    const { unread } = useSelector(state => state.notify)

    const MenuLink = ({ label, to, activeWhenExact, icon }) => {
        return (
            <Route
                path={to}
                exact={activeWhenExact}
                children={({ match }) => {
                    return (
                        <Link to={to} className="text-heading wrapper-link">
                            <div className={match ? 'nav-link text-active' : 'nav-link'}>
                                <div className="relative">
                                    {
                                        (to === '/notify' && user.role === 2) &&
                                        (

                                            <span className="uncount">{unread}</span>
                                        )


                                    }
                                    <i className={icon}></i>
                                </div>
                                <div className="ml-5 min-w-0 xl:hidden lg:hidden md:hidden sm:hidden">
                                    <span>{label}</span>
                                </div>
                            </div>
                        </Link>
                    )
                }}
            />
        )
    }

    const RenderSideBar = (menus) => {
        const reduceRole = menus.reduce((acc, cur) => {
            if (cur.role.includes(user.role) || cur.role.includes(3)) {
                acc.push(cur)
            }
            return acc
        }, [])
        return reduceRole
    }



    return (
        <div className="col-span-3 2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-2 sm:col-span-2 flex flex-col px-2 py-4 border-r-2">

            {/* Main */}
            <div className="main">
                {/* Logo */}
                <div className="logo mb-5">
                    <h1 className="text-4xl font-semibold mx-3 lg:text-2xl md:text-xl">Logo</h1>
                </div>

                {/* Menu */}
                <div className="menu">
                    <nav>
                        {
                            RenderSideBar(menus).map((menu, index) =>
                            (<MenuLink
                                key={index}
                                label={menu.name}
                                to={menu.to}
                                activeWhenExact={menu.exact}
                                icon={menu.icon}
                            />)
                            )
                        }
                    </nav>
                </div>
            </div>

            {/* Profile */}
            <div className="profile mb-10 cursor-pointer relative" onClick={() => setIsShow(!isShow)}>
                <div className="flex-item-profile flex items-center px-3 my-3">

                    {/* Image */}
                    <div className="profilePic">
                        <div className="h-10 w-10">
                            <img src={user.profilePic ? user.profilePic : process.env.PUBLIC_URL + '/images/male_avatar.svg'} className="rounded-full border-2 border-stroke object-cover h-10 w-10" alt="" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="info max-w-full flex-shrink xl:hidden lg:hidden md:hidden sm:hidden">
                        <div className="mx-3 max-w-full w-36">
                            {/* Username */}
                            <div className="name text-wrapp">
                                <span className="text-md font-semibold">{user.username}</span>
                            </div>

                            {/* Email*/}
                            <div className="email text-wrapp">
                                <span className="text-sm italic text-paragraph">{user.email}</span>

                            </div>

                        </div>
                    </div>

                    {/* Option */}
                    <div className="option flex-grow items-end xl:hidden lg:hidden md:hidden sm:hidden">
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                </div>

                {isShow && <HoverLogout />}

            </div>
        </div >
    )
}

export default NavBar;
