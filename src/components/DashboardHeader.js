import React, { useState } from 'react';
import Sidebar from './SideBar';
import { Link, NavLink } from 'react-router-dom';

import { HiMenu, HiOutlineX } from "react-icons/hi"
// import { logout, selectUser } from "../redux/reducers/login";
import { useDispatch, useSelector } from 'react-redux';

const DashboardHeader = () => {



    // const user = useSelector(selectUser)
    // const dispatch = useDispatch()
    const [menu, setMenu] = useState(false);
    const handleClick = () => setMenu(!menu);
    const [open, setOpen] = useState(false)
    const handleDropDown = () => setOpen(!open);

    const handleLogout = (e) => {
        e.preventDefault()
        // dispatch(logout())
    }

    return (
        <div className="w-screen h-[8vh] z-10 mb-44 bg-[#2563eb] fixed border-b">
            <div className="px-3 flex items-center w-full h-full justify-between">
                <div className='h-10 w-10 pt-2.5 text-white lg:hidden'
                    onClick={handleClick}
                >
                    {!menu ? <HiMenu /> : <HiOutlineX />}
                </div>
                <div className="flex items-center">
                    <img src="https://cdn.pixabay.com/photo/2015/01/05/11/02/wordpress-589121__480.jpg" alt="logo"
                        className='absolute ml-[40%] rounded-full object-cover md:ml-[50%] lg:ml-6 h-6 w-6 sm:h-10 sm:w-10 mr-2' />
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white"></span>
                </div>
                <div className="flex items-center justify-center h-full lg:w-full">
                    <div className="relative">
                        <h1 className="hidden lg:flex text-center lg:ml-8 lg:mt-2 text-white" >Hi UserName</h1>
                        <h1 className="hidden lg:flex text-center lg:ml-8 lg:mt-2 text-white" >Welcome Back</h1>
                    </div>
                </div>
                <img
                    className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400 object-cover"
                    src="https://cdn.pixabay.com/photo/2019/03/21/20/29/eyewear-4071870__480.jpg"
                    alt="avatar"
                    onClick={handleDropDown}
                />
                <div className={!open ? 'hidden' : 'w-58 mt-48 rounded-lg shadow border absolute bg-[#191919] justify-end right-0'} onClick={handleDropDown}>
                    <ul className="space-y-3">
                        <li className="font-medium">
                            <a href="#link" className="flex text-white items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700">
                                <div className="mr-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                                Update profile
                            </a>
                        </li>
                        <li className="font-medium">
                            <Link to={"/login"}
                                className="flex text-white items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                                onClick={handleLogout}
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
                <Sidebar style="flex pt-4 h-[92%]" />
            </ul>
        </div>
    );
};
export default DashboardHeader
