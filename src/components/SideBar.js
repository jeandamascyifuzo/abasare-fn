import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineShoppingCart, HiCog } from "react-icons/hi"

const SideBar = ({ style }) => {
    return (
        <div
            className={`${style} flex-col fixed mt-[2px] h-[100vh] xl:mt-16 left-0 bg-[#38434e] px-4 pt-6`}>
            <div className="list-none pr-8">
                <li className="mb-4 hover:text-primary">
                    <a
                        href="#link"
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-lg ">Drivers</span>
                    </a>
                </li>
                <li className="mb-4 hover:text-primary">
                    <a
                        href="team"
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-lg ">Content 0</span>
                    </a>
                </li>
                <li className="mb-4 hover:text-primary">
                    <a
                        href="team"
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-lg ">Content 1</span>
                    </a>
                </li>
                <li className="mb-4 hover:text-primary">
                    <a
                        href="team"
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-lg ">Content 2</span>
                    </a>
                </li>
                <li className="mb-4 hover:text-primary">
                    <a
                       href="team"
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-lg ">Content 3</span>
                    </a>
                </li>
                <li className="mb-4 hover:text-primary">
                    <NavLink
                        to={"team"}
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-lg ">
                        Content 4
                        </span>
                    </NavLink>
                </li>
                <li className="mb-4 hover:text-primary">
                    <a
                        href="team"
                        className="flex flex-row text-white">
                         <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-lg ">
                        Content 5
                        </span>
                    </a>
                </li>
            </div>
        </div>
    );
};

export default SideBar
