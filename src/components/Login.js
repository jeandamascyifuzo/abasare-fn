import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { FiEyeOff } from 'react-icons/fi';
import { MdLockOutline } from 'react-icons/md';
import { FaRegEnvelope, FaRegEye } from 'react-icons/fa';
import axios from '../api/index'
import { ToastContainer } from "react-toastify";
import { useNavigate, NavLink } from 'react-router-dom';
import Notify from "../functions/Notify";
import { setUserSession } from '../Utils/Common';
import Logo from '../assets/image/myechelon-logo.png'

const Login_URL = '/team/login'

const Login = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const tooglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        await axios.post(Login_URL, {
            email: email,
            password: password
        }).then(res => {
            setLoading(false)
            Notify(res.message, "success");
            setUserSession(res.data.token, res.data.user)
            navigate("/dashboard")
            console.log("logged in", res)
        })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="font-mono min-h-screen bg-black md:flex md:flex-col md:items-center md:justify-center w-full  grow  text-center sm:flex sm:flex-row sm:items-center sm:justify-center">
                <div className='py-4'> <span className=" px-3"> <NavLink to="/">
                    <img src={Logo} className="mr-3 h-6 sm:h-12" alt="Logo" />
                </NavLink></span></div>
                <div className="md:rounded-2xl md:shadow-2xl md:flex md:w-2/3 md:max-w-4xl sm:max-w-xl sm:rounded-none sm:shadow-none">
                    <div className="md:w-full xl:w-3/5 md:p-5 sm:w-full sm:p-2 bg-[#191919] lg:rounded-tl-2xl lg:rounded-bl-2xl">
                        <div className="py-10 sm:py-8 ">
                            <h2 className="text-2xl font-bold text-white  ">
                                welcome to Mychelon
                            </h2>
                            <div className="border-2 w-28 bg-white border-white inline-block mb-2" />
                            <p className="text-gray-400 my-3  ">
                                Sign in to your account
                            </p>
                            <div className="flex flex-col items-center">
                                <form onClick={handleLogin}>
                                    <div className="bg-gray-100 w-64 p-2 flex rounded items-center mb-2  ">
                                        <FaRegEnvelope className="text-gray-400 mr-2" />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="bg-gray-100 outline-none text-sm flex-1 text-gray-400 "
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    {error && <div className='text-red-500 text-left'>{error}</div>}
                                    <div className="bg-gray-100 w-64 p-2 flex items-center rounded mb-2  ">
                                        <MdLockOutline className="text-gray-400 mr-2 " />
                                        <input
                                            placeholder="Password"
                                            type={passwordShown ? 'text' : 'password'}
                                            className="bg-gray-100 outline-none text-sm flex-1 text-gray-400"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className="text-gray-400 cursor-pointer onClick= {()=> handleShowPassword}">
                                            {passwordShown ? (
                                                <FaRegEye onClick={tooglePassword} />
                                            ) : (
                                                <FiEyeOff onClick={tooglePassword} />
                                            )}
                                        </div>
                                    </div>
                                    {error && <div className='text-red-500 text-left -mb-8'>{error}</div>}
                                    <div className="flex w-64 justify-between rounded mb-5 mt-5">
                                        <Link
                                            to="/reset"
                                            className="text-xs text-white "
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="w-full justify-center">
                                        <input
                                            type="submit"
                                            className="border-2 w-1/2 py-2 inline-block rounded-full md:font-semibold sm:mt-2 sm:font-medium text-white"
                                            value={loading ? "loading..." : "Log In"}
                                            disabled={loading}
                                        >
                                        </input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-2/5 bg-white text-black  lg:rounded-tr-2xl lg:rounded-br-2xl md:py-16 md:px-12 sm:w-full sm:rounded-none sm:px-12 sm:py-4 lg:block hidden  ">
                        <h2 className="lg:text-3xl md:text-xl md:font-bold md:mb-2 ">
                            Hello, Friend!
                        </h2>
                        <div className="border-2 w-28 border-black inline-block mb-2" />
                        <p className="lg:mb-10 lg:text-center md:text-medium sm:text-center sm:mb-2 sm:text-sm md:text-center  ">
                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
