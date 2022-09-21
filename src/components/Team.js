import React, { useEffect, useState } from 'react'
import Divider from '../assets/image/divider.png'
import axios from '../api/index'
import { ToastContainer } from "react-toastify";
import Notify from "../functions/Notify";
const Team_URL = "/team"

const Team = () => {
    const [Data, setData] = useState([]);

    const GetTeamMembers = () => {
        axios.get(Team_URL)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    setData(data)
                }
                else {
                    setData(data)
                }
            })
            .catch(error => {
                Notify(error.message, "error");
            })
    }

    useEffect(() => {
        GetTeamMembers();
    }, [])

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
            <div className="section-heading-wrap text-center mb-5 pt-10">
                <h4 className="md:heading-h2 heading-h3 text-center divider"><span className="gsap-reveal">Get in touch with our team</span></h4>
                <span className="gsap-reveal">
                    <img src={Divider} alt="divider" width="76" />
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:px-28 sx:px-16 px-14">
                {Data.map((item) => (
                    <div className="flex flex-col items-center justify-center bg-gray-200 p-4 shadow rounded-lg" key={item._id}>
                        <div className='block'>
                            <div className='justify-center items-left'>
                                <div className="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-36 w-36 mb-12">
                                    <img src={item.image}
                                        alt=""
                                        className="h-full w-full" />
                                </div>
                            </div>
                        </div>
                        <div className='py-8'>
                            <div className='px-8'>
                                <hr className="solid" />
                                <h2 className="mt-4 font-bold text-xl text-center">{item.names}</h2>
                                <hr className="solid" />
                                <h5 className="text-xl text-center mt-3">
                                    {item.title}
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Team
