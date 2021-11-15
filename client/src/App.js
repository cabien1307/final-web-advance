import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Body from "./components/Body/Body";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { fetchUser, LoginSuccessfull } from "./store/actions/authAction";

function App() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);

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

    useEffect(() => {
        if (token) {
            const getUser = () => {
                return fetchUser(token).then((res) => {
                    dispatch(LoginSuccessfull(res.data.user));
                });
            };
            getUser();
        }
    }, [token, dispatch]);

    return (
        <Router>
            <div className="2xl:container xl:container grid grid-cols-12 gap-1 py-2 min-h-screen">
                {isLoggedIn && <SideBar />}
                <Body />
            </div>
        </Router>
    );
}

export default App;
