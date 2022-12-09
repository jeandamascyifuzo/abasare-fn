import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineShoppingCart, HiCog } from "react-icons/hi"

const SideBar = ({ style }) => {
    return (
        <div
            className={`${style} flex-col fixed h-[100%] mt-[2px] xl:mt-[8vh] left-0 bg-[#191919] border-r px-4 pt-4`}
        >
            <div className="list-none pr-8 mt-8">
                <li className="mb-4 hover:text-primary">
                    <NavLink
                        to="driver"
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-base ">Driver</span>
                    </NavLink>
                </li>
                <li className="mb-4 hover:text-primary">
                    <NavLink
                        // to="contents"
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-base ">Contents</span>
                    </NavLink>
                </li>
                <li className="mb-4 hover:text-primary">
                    <NavLink
                        // to="contents"
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-base ">
                            Contents
                        </span>
                    </NavLink>
                </li>
                <li className="mb-4 hover:text-primary">
                    <NavLink
                        // to="contents"
                        className="flex flex-row text-white">
                        <HiOutlineShoppingCart className="w-5 mr-2 mt-1" />
                        <span className="text-base ">
                            Contents
                        </span>
                    </NavLink>
                </li>
            </div>
        </div>
    );
};

export default SideBar
