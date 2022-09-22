import React, { useEffect, useState } from 'react'
import Zoom from 'react-reveal/Zoom';
import axios, { axiosRequest } from '../api/index'
import { ToastContainer } from "react-toastify";
import Notify from "../functions/Notify";
const Portfolio_URL = "portifolio"

const Portfolio = () => {
    const [Data, setData] = useState([]);

    const GetPortifolio = () => {
        axiosRequest.get(Portfolio_URL)
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
        GetPortifolio();
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
            <div className="unslate_co--section" id="portfolio-section">
                <div className="container">
                    <div className="relative"><div className="loader-portfolio-wrap"><div className="loader-portfolio"></div></div> </div>
                    <div id="portfolio-single-holder"></div>
                    <div className="portfolio-wrapper xl:px-24">
                        <div className="d-flex align-items-center mb-4 gsap-reveal gsap-reveal-filter">
                            <Zoom>
                                <h2 className="mr-auto heading-h2"><span className="gsap-reveal text-white">Portfolio</span></h2>
                            </Zoom>
                        </div>
                        <div id="posts" className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3 md:gap-0">
                            {Data.slice(0, 10).map((item) => (
                                <div className="item web branding isotope-mb-2" key={item._id}>
                                    <a href="portfolio-single-1.html" className="portfolio-item ajax-load-page isotope-item gsap-reveal-img" data-id="1">
                                        <div className="overlay">
                                            <span className="wrap-icon icon-link2"></span>
                                            <div className="portfolio-item-content">
                                                <h3>{item.title}</h3>
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                        <img src={item.image} className="lazyload  w-[400px] h-[100px] md:w-[100%] sm:h-[200px] xl:h-[300px]" alt="Images" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Portfolio
