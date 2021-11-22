import { Route, Link } from 'react-router-dom'
import './sideBar.css'
import { useSelector } from 'react-redux'

import HoverLogout from './HoverLogout';
import { useState } from 'react';
import { menus } from "../../constant"

function NavBar() {

    const [isShow, setIsShow] = useState(false)

    const user = useSelector(state => state.auth.user)

    const MenuLink = ({ label, to, activeWhenExact, icon }) => {
        return (
            <Route
                path={to}
                exact={activeWhenExact}
                children={({ match }) => {
                    return (
                        <Link to={to} className="text-heading">
                            <div className={match ? 'nav-link text-active' : 'nav-link'}>
                                <div className="relative">
                                    {
                                        to === '/notify'
                                        && (<span className="uncount">2</span>)
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
                            <img src={user.profilePic ? user.profilePic : process.env.PUBLIC_URL + '/images/male_avatar.svg'} className="rounded-full border-2 border-stroke" alt="" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="info max-w-full flex-shrink xl:hidden lg:hidden md:hidden sm:hidden">
                        <div className="mx-3 max-w-full w-36">
                            {/* Username */}
                            <div className="name">
                                <span className="text-wrap text-md font-semibold">{user.username}</span>
                            </div>

                            {/* Email*/}
                            <div className="email">
                                <div className="text-wrap">
                                    <span className="text-sm italic text-paragraph min-w-0 max-w-full">{user.email}</span>
                                </div>
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
