import { useState } from 'react';
import './login.css';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { LoginFailure, LoginSuccessfull } from '../../store/actions/authAction'
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { GLOBALTYPES } from '../../store/actions/globalTypes';

function TeacherForm({ login }) {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const inputChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        login({ type: 0, data })
    }

    return (
        <form onSubmit={onSubmit} className="px-10">
            <h1 className="text-center text-3xl font-semibold">Login</h1>

            {/* Email */}
            <div className="form-group">
                <label htmlFor="email" className="label">Email:</label>
                <div className="flex items-center border-b-4 border-stroke">
                    <i className="fas fa-envelope"></i>
                    <input
                        type="email"
                        autoComplete="email"
                        id="email"
                        className="input"
                        required
                        name="email"
                        placeholder="example@gmail.com"
                        onChange={inputChange}
                    />
                </div>
            </div>

            {/* Password */}
            <div className="form-group">
                <label htmlFor="password" className="label">Password</label>
                <div className="flex items-center border-b-4 border-stroke">
                    <i className="fas fa-key"></i>
                    <input
                        type="password"
                        autoComplete="current-password"
                        id="password"
                        name="password"
                        className="input"
                        required placeholder="************"
                        onChange={inputChange}
                    />
                </div>
            </div>

            {/* Remember / forget password */}
            <div className="form-group flex justify-between">
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember-me" className="transform scale-125" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <span className="italic cursor-pointer hover:text-tertiary">Forget password ?</span>
            </div>

            {/* Button submit */}
            <div className="form-group">
                <button className="btn w-full" type="submit">Login</button>
            </div>

        </form>
    )
}



function Login() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [typeLogin, setTypeLogin] = useState(0)
    const [isChoose, setIsChoose] = useState(false)

    const responseGoogle = async (response) => {
        console.log("CLick login");
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            const res = await axios.post("/user/auth/google", {
                access_token: response.accessToken,
            });

            localStorage.setItem("firstLogin", true);

            dispatch(LoginSuccessfull(res.data.user))
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            history.push("/");
        } catch (error) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Something went wrong !" },
            });
            dispatch(LoginFailure())
        }
    };

    const handleLogin = async ({ type, data }) => {
        const { email, password } = data
        // Teacher login with email
        try {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
            const res = await axios.post("/user/sign-in", {
                email, password
            })

            localStorage.setItem("firstLogin", JSON.stringify(true));
            dispatch(LoginSuccessfull(res.data.user))
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
            history.push("/");
        } catch (error) {
            // Catch
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Incorrect username/password !" },
            });
            dispatch(LoginFailure())
        }

    }
    const setType = (type) => {
        setTypeLogin(type ? 1 : 0)
        setIsChoose(!isChoose)
    }

    return (
        <div className="login-page col-span-12 flex items-center">
            <div className="brand my-auto px-10  border-r-2">
                <img src={process.env.PUBLIC_URL + '/images/login.svg'} alt="" className="w-3/4 mx-auto" />
            </div>

            <div className="login">
                {/* Introduction */}
                <div className="intro text-heading text-center space-y-4 lg:mt-10 md:mt-10 sm:mt-10">
                    <h1 className="text-5xl font-bold">Social App</h1>
                    <h1 className="text-3xl font-semibold">Welcome back to website !</h1>
                    <p className="text-base italic text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quasi exercitationem cum libero soluta veritatis .</p>
                </div>

                <div className="w-full px-5 py-2 flex flex-col items-center">
                    <h1 className="text-3xl text-heading">Who are you ?</h1>
                    <div className="my-3 flex justify-around w-full">
                        <button className="btn w-2/5" onClick={() => setType(true)}>Student</button>
                        <button className="btn w-2/5" onClick={() => setType()}>Teacher</button>
                    </div>
                </div>

                {isChoose && (<hr className="my-2" />)}

                {
                    isChoose
                    && (typeLogin === 0
                        ? <TeacherForm login={handleLogin} />
                        : (

                            <div className="form-group px-10 space-y-3">
                                <h1 className="text-center text-3xl font-semibold">Login</h1>
                                {/* Update login with google button */}

                                <GoogleLogin
                                    render={renderProps => (
                                        <button className="btn w-full" onClick={renderProps.onClick}>
                                            <i className="fab fa-google mr-2"></i>
                                            Sign in with google
                                        </button>
                                    )}
                                    clientId="701019100399-ni5bt8ra0kd257fv44luubgrn36dfs53.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"}
                                />
                            </div>

                        ))
                }
            </div>
        </div>
    )
}

export default Login