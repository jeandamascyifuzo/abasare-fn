import React, { useEffect, useState } from 'react'
import Divider from '../assets/image/divider.png'
import { axiosRequest } from '../api/index'
import { ToastContainer } from "react-toastify";
import Notify from "../functions/Notify";
const Service_URL = "service"

const Service = () => {

    const [Data, setData] = useState([]);

    const GetServices = () => {
        axiosRequest.get(Service_URL)
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
        GetServices();
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
            <div className="unslate_co--section" id="services-section">
                <div className="container">
                    <div className="section-heading-wrap text-center mb-5 pt-10">
                        <h2 className="heading-h2 text-center divider"><span className="gsap-reveal">Our Services</span></h2>
                        <span className="gsap-reveal"><img src={Divider} alt="divider" width="76" /></span>
                    </div>
                    <div className="row gutter-v3 xl:pl-24 xl:pr-20">
                        {Data.slice(0, 3).map((item) => (
                            <div className="col-md-6 col-lg-4 mb-4 text-white" key={item._id}>
                                <div className="feature-v1" data-aos="fade-up" data-aos-delay="100">
                                    <div className="wrap-icon px-56 md:px-0 mb-3">
                                        <img src={item.icon} alt="Icon" className='rounded-full' width="45" />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service
