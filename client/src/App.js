import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Body from "./components/Body/Body";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client"

import { fetchUser, LoginSuccessfull } from "./store/actions/authAction";
import Alert from "./components/Alert/Alert";
import { getPosts } from "./store/actions/postAction";
import { getFaculties } from "./store/actions/facultyAction";
import { getUsers } from "./store/actions/usersAction";
import { getNotifications, getNotifyUnread } from "./store/actions/notifyAction";
import { getDataAPI } from "./utils/fetchData"
import { GLOBALTYPES } from "./store/actions/globalTypes"

function App() {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const { token } = useSelector((state) => state);

    const socket = useRef();


    useEffect(() => {
        socket.current = io("ws://localhost:8080");
    }, []);

    useEffect(() => {
        
        socket.current.on('broadcast-notify', () => {
            getDataAPI('notification/new')
                .then(res => {
                    dispatch({
                        type: GLOBALTYPES.ALERT,
                        payload: { news: res.data },
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: GLOBALTYPES.ALERT,
                        error: err
                    })
                })

        })
    }, [dispatch, socket])

    // Get Access Token
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            const getToken = async () => {
                const res = await axios.post("/user/get-access-token", null);

                dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
            };
            getToken();
        }
    }, [isLoggedIn, dispatch]);

    // GetUserInfo
    useEffect(() => {
        if (token) {
            const getUser = () => {
                return fetchUser(token).then((res) => {
                    dispatch(LoginSuccessfull(res.data.resource));
                });
            };
            getUser();
        }
    }, [token, dispatch]);

    // Get posts
    useEffect(() => {
        if (token) dispatch(getPosts(token));
    }, [dispatch, token]);

    // Get faculty
    useEffect(() => {
        if (token) dispatch(getFaculties(token));
    }, [dispatch, token]);

    // Get users
    useEffect(() => {
        if (token) dispatch(getUsers(token));
    }, [dispatch, token]);

    // Get notifies
    useEffect(() => {
        if (token) dispatch(getNotifications(token));
    }, [dispatch, token]);

    // Get notify unread
    useEffect(() => {
        if (token && user) dispatch(getNotifyUnread({
            _id: user._id,
            token
        }));
    }, [dispatch, token, user]);

    return (
        <Router>
            <Alert />
            <div className="2xl:container grid grid-cols-12 min-h-screen">
                {isLoggedIn && <SideBar />}
                <Body />
            </div>
        </Router>
    );
}

export default App;
