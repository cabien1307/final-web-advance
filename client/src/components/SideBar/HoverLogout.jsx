import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../store/actions/authAction'
import { useHistory } from "react-router-dom"
import axios from "axios";

function HoverLogout() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.auth.user)

    const handleLogout = async () => {
        try {
            await axios.post('/user/log-out')
            localStorage.removeItem('firstLogin')
            history.push('/')
            dispatch(Logout())
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="hover-container w-72 bg-card-bg px-2 py-2 rounded-lg shadow-xl flex flex-col z-50">
            <div className="flex-item-profile flex items-center px-3 my-3">

                {/* Image */}
                <div className="profilePic">
                    <div className="h-12 w-12">
                        <img src={user.profilePic ? user.profilePic : process.env.PUBLIC_URL + '/images/male_avatar.svg'} className="h-12 w-12 rounded-full object-cover border-2 border-stroke" alt="" />
                    </div>
                </div>

                {/* Info */}
                <div className="max-w-full flex-shrink">
                    <div className="mx-3 max-w-full">
                        {/* Username */}
                        <div className="name">
                            <span className=" text-lg font-semibold">{user.username}</span>
                        </div>

                        {/* Email*/}
                        <div className="email">
                            <div className="text-wrap">
                                <span className="text-sm italic text-paragraph min-w-0 max-w-full">{user.email}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <hr />
            <div className="logout flex items-center px-3 my-3 text-heading">
                <span className="text-xl font-semibold" onClick={handleLogout}>Logout</span>
            </div>
        </div>
    )
}

export default HoverLogout