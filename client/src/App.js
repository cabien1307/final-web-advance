import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Body from "./components/Body/Body";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { fetchUser, LoginSuccessfull } from "./store/actions/authAction";
import Alert from "./components/Alert/Alert";
import { getPosts } from "./store/actions/postAction";
import { getFaculties } from "./store/actions/facultyAction";
import { getUsers } from "./store/actions/usersAction";

function App() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { token } = useSelector((state) => state);

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
