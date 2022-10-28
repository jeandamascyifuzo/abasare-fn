import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HiMenu, HiOutlineX } from "react-icons/hi"
import { logout, selectUser } from "../redux/reducers/login";
import { useDispatch, useSelector } from 'react-redux';
import SideBar from './SideBar';

const DashHeader = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [menu, setMenu] = useState(false);
    const handleClick = () => setMenu(!menu);
    const [open, setOpen] = useState(false)
    const handleDropDown = () => setOpen(!open);

    const handleLogout = (e) =>{
        e.preventDefault()
        dispatch(logout())
    }

    return (
        <>
            <nav className="bg-[#38434e] w-screen px-4 lg:px-6 py-2.5 fixed border-b">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
                    <div className='h-10 w-10 pt-2.5 text-white lg:hidden'
                        onClick={handleClick}
                    >
                        {!menu ? <HiMenu /> : <HiOutlineX />}
                    </div>
                    <a href="https://abasare.com" className="flex xl:-ml-16 items-center">

                        <img
                            src="https://cdn.pixabay.com/photo/2015/01/05/11/02/wordpress-589121__480.jpg"
                            className="h-6 w-6 sm:h-10 sm:w-10 rounded-full object-cover mr-2"
                            alt="Abasare Logo"
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Abasare</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <div className="flex flex-shrink-0 items-center space-x-4 text-white ">
                            <img
                                className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400 object-cover"
                                src="https://cdn.pixabay.com/photo/2019/03/21/20/29/eyewear-4071870__480.jpg"
                                alt="avatar"
                                onClick={handleDropDown}
                            />
                        </div>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
                        <div className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <div className='text-left'>
                                <span className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0" aria-current="page">Hi UserName</span>
                                <span className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0" aria-current="page">Welcome Back</span>
                            </div>
                        </div>
                    </div>
                    <div className={!open ? 'hidden' : 'w-58 mt-48 rounded-lg shadow border absolute bg-[#191919] justify-end right-0'} onClick={handleDropDown}>
                        <ul className="space-y-3 p-2">
                            <li className="font-medium">
                                <span href="#link" className="flex text-white items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                    <div className="mr-3">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                    {/* {user.email} */}
                                </span>
                            </li>
                            <li className="font-medium">
                                <a href="#link" className="flex text-white items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                                >
                                    <div className="mr-3">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    </div>
                                    Update Profile
                                </a>
                            </li>
                            <hr className="text-white" />
                            <li className="font-medium pb-2">
                                <Link to="/login"
                                    className="flex text-white items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                                    onClick={ (e) => handleLogout() }
                                >
                                    <div className="mr-3 text-red-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                    </div>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul
                onClick={handleClick}
                className={
                    !menu ? 'hidden' : 'bg-white cursor-pointer lg:hidden'
                }
            >
                <SideBar style="flex pt-4 h-[92%]" />
            </ul>
            </nav>
        </>
    )
}

export default DashHeader
