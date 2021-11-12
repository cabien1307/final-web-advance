import { useState } from 'react';
import './login.css';
import Toast from '../../components/Toast'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { LoginFailure, LoginSuccessfull } from '../../store/actions/authAction'

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

function StudentForm({ login }) {

    const triggerClick = () => {
        login({
            type: 1, data: {
                email: 'student@gmail.com',
                password: '123456'
            }
        })
    }

    return (
        <div className="form-group px-10 space-y-3">
            <h1 className="text-center text-3xl font-semibold">Login</h1>
            {/* Update login with google button */}
            <button className="btn w-full" onClick={() => triggerClick()}>
                <i className="fab fa-google mr-2"></i>
                Sign in with google
            </button>
        </div>
    )
}

function Login() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [typeLogin, setTypeLogin] = useState(0)
    const [isChoose, setIsChoose] = useState(false)

    // Toast
    const [isShow, setIsShow] = useState(false)
    const [toast, setToast] = useState(null)

    const setType = (type) => {
        setTypeLogin(type)
        setIsChoose(true)
    }

    const handleLogin = ({ type, data }) => {

        // Teacher login with email
        if (type === 0) {
            if (data.email === 'cabien13072000@gmail.com' && data.password === '123456') {
                localStorage.setItem('user', JSON.stringify(data))
                dispatch(LoginSuccessfull(data))
                history.push('/')
            } else {
                // Catch
                dispatch(LoginFailure())
                setIsShow(true)
                setToast({
                    title: "Login failure !",
                    type: 'warning',
                    msg: 'Incorrect username/password !',
                    duration: 3000
                })
            }
        }
        //Student login with google
        else {
            localStorage.setItem('user', JSON.stringify(data))
            dispatch(LoginSuccessfull(data))
            history.push('/')
        }

    }

    // Close Toast
    const handleClose = () => {
        setIsShow(false)
    }

    return (
        <div className="login-page col-span-12 items-center">
            <div className="brand my-auto px-10  border-r-2">
                <img src={process.env.PUBLIC_URL + '/images/bg.svg'} alt="" className="w-3/4 mx-auto" />
            </div>

            {
                isShow && <Toast closeToast={() => handleClose()} toast={toast} />
            }


            <div className="login">
                {/* Introduction */}
                <div className="intro text-heading text-center space-y-4 mb-5">
                    <h1 className="text-5xl font-bold">Social App</h1>
                    <h1 className="text-3xl font-semibold">Welcome back to website !</h1>
                    <p className="text-base italic text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quasi exercitationem cum libero soluta veritatis .</p>
                </div>

                <div className="w-full px-5 py-2 flex flex-col items-center">
                    <h1 className="text-3xl text-heading">Who are you ?</h1>
                    <div className="my-5 flex justify-around w-full">
                        <button className="btn w-2/5" onClick={() => setType(1)}>Student</button>
                        <button className="btn w-2/5" onClick={() => setType(0)}>Teacher</button>
                    </div>
                </div>

                {isChoose && (<hr className="my-6" />)}

                {
                    isChoose
                        ? typeLogin === 0
                            ? <TeacherForm login={handleLogin} />
                            : <StudentForm login={handleLogin} />
                        : false
                }
            </div>
        </div>
    )
}

export default Login