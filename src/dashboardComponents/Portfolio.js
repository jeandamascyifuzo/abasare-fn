import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { portfolioData } from '../dummyData/Data';
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import { getUser } from '../Utils/Common';
import axios from 'axios';
import Notify from "../functions/Notify";


const Portfolio = () => {
  const [createPortfolioModel, setCreatePortfolioModel] = useState(false);
  const [deletePortfolioModel, setDeletePortfolioModel] = useState(false);
  const [updatePortfolioModel, setUpdatePortfolioModel] = useState(false);
  const [loading, setLoading] = useState(false)
  const [Delete, setDelete] = useState(false)
  const [RowData, SetRowData] = useState([])
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
  const user = getUser()

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [image, setImage] = useState("")
  
  const removeModel = () => {
    let newState = !createPortfolioModel;
    setCreatePortfolioModel(newState);
  }
  const removeDeleteModel = () => {
    let newState = !deletePortfolioModel;
    setDeletePortfolioModel(newState);
  }

  const updatePortfoliosModel = () => {
    let newState = !updatePortfolioModel;
    setUpdatePortfolioModel(newState);
  };

  const GetPortifolio = () => {
    const url = 'http://localhost:5000/api/v1/portifolio'
    axios.get(url)
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
        if (error.code !== "ERR_NETWORK") {
          Notify(error.response.data.message, "error");
        }
        else {
          Notify(error.message, "error");
        }
      })
  }

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  const handleSubmite = (e) => {
    e.preventDefault()
    const url = 'http://localhost:5000/api/v1/portifolio/create'
    const Credentials = { title, desc, image }
    setLoading(true)
    axios.post(url, Credentials)
      .then(response => {
        setLoading(false)
        const result = response.data;
        Notify(result.message, "success");
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          GetPortifolio();
          setCreatePortfolioModel(false)
        }
        else {
          console.log(message)
        }
      })
      .catch(error => {
        setLoading(false)
        if (error.code !== "ERR_NETWORK") {
          Notify(error.response.data.message, "error");
        }
        else {
          Notify(error.message, "error");
        }
      })
  }


  const handleUpdate = (e) => {
    e.preventDefault()
    const url = `http://localhost:5000/api/v1/portifolio/${id}`
    const Credentials = { title, desc, image }
    setLoading(true)
    axios.put(url, Credentials)
      .then(response => {
        setLoading(false)
        const result = response.data;
        Notify(result.message, "success");
        const { status, message } = result;
        if (status !== 'SUCCESS') {
          GetPortifolio();
          setUpdatePortfolioModel(false)
        }
        else {
          console.log(message)
        }
      })
      .catch(error => {
        setLoading(false)
        if (error.code !== "ERR_NETWORK") {
          Notify(error.response.data.message, "error");
        }
        else {
          Notify(error.message, "error");
        }
      })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    const url = `http://localhost:5000/api/v1/portifolio/${id}`
    axios.delete(url)
      .then(response => {
        const result = response.data;
        Notify(result.message, "success");
        const { status, message } = result;
        if (status !== 'SUCCESS') {
          GetPortifolio();
          setDeletePortfolioModel(false)
        }
        else {
          console.log(message)
        }
      })
      .catch(error => {
        if (error.code !== "ERR_NETWORK") {
          Notify(error.response.data.message, "error");
        }
        else {
          Notify(error.message, "error");
        }
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

      {/* =========================== Start:: CreatePortfolioModel =============================== */}
      <div className={`fixed h-screen w-screen bg-gray-600 bg-opacity-30 backdrop-blur-sm flex items-center justify-center px-4 ${createPortfolioModel === true ? 'block' : 'hidden'}`}>
        <div className="bg-white w-full sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className='font-bold text-sm text-center w-11/12 uppercase'>
              Add Portfolio
            </h3>
            <hr className=' bg-primary border-b my-3 w-full' />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8">
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded outline-none px-2 pb-10 font-sans text-xs py-2 w-full"
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <textarea
                    type="text"
                    name="name"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    id="imgUpload"
                    accept="image/*"
                    type="file"
                    onChange={handleProductImageUpload}
                    className=" border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Image"
                  />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <button className='py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-gray-800 font-sans text-sm text-gray-900' onClick={(e) => removeModel(e.preventDefault())}>Cancel</button>
                <button className='py-2 w-[40%] md:w-1/3 rounded  bg-gray-300 hover:bg-transparent border border-gray-800 hover:text-black hover:bg-white focus:ring-4 focus:outline-none' onClick={handleSubmite}>{loading ? "loading..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  CreatePortfolioModel =============================== */}

      {/* =========================== Start::  deletePortfolioModel =============================== */}
      <div className={`h-screen w-screen bg-gray-600 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${deletePortfolioModel === true ? 'block' : 'hidden'}`}>
        <div className="bg-white w-full sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className='font-bold text-sm text-center w-11/12 uppercase'>
              Remove Portfolio
            </h3>
            <hr className=' bg-primary border-b my-3 w-full' />
          </div>
          <div className="card-body">
            <form className=" px-8" >
              <div>
                <h2 className='text-base m-4'>Do you really want to remove this <span className='italic text-black'>Portfolio</span> from the List?</h2>
              </div>
              <div className="w-full flex justify-between">
                <button className='py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-gray-800 font-sans text-sm' onClick={(e) => removeDeleteModel(e.preventDefault())}>Cancel</button>
                <button className='text-white py-2 w-[40%] md:w-1/3 bg-red-700 rounded' onClick={handleDelete}>Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  deletePortfolioModel =============================== */}

      {/* =========================== Start::  updateTeamModel =============================== */}
      <div className={`h-screen w-screen bg-gray-600 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${updatePortfolioModel === true ? 'block' : 'hidden'}`}>
        <div className="bg-white w-full sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className='font-bold text-sm text-center w-11/12 uppercase'>
              Update Portfolio
            </h3>
            <hr className=' bg-primary border-b my-3 w-full' />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8" >
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="title"
                    defaultValue={RowData.title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded outline-none px-2 pb-10 font-sans text-xs py-2 w-full"
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <textarea
                    type="text"
                    name="desc"
                    defaultValue={RowData.desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="file"
                    name="image"
                    defaultValue={RowData.image}
                    onChange={handleProductImageUpload}
                    className="border py-2 rounded outline-none px-2 font-sans text-xs w-full"
                  />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <button className='py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-gray-800 font-sans text-sm text-gray-900'
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdatePortfolioModel(false)
                  }}>Cancel
                </button>
                <button className='py-2 w-[40%] md:w-1/3 rounded  bg-gray-300 hover:bg-transparent border border-gray-800 hover:text-black hover:bg-white focus:ring-4 focus:outline-none' onClick={handleUpdate}>{loading ? "loading..." : "Update"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  updateTeamModel =============================== */}

      <div className="bg-black pb-10 min-h-screen lg:ml-56 px-2 lg:px-10">
        <div className="flex items-left px-7 pt-14 pb-8">
          {user[0]?.isAdmin ? (
            <div className="space-x-8">
              <button className="text-gray-800 font-serif bg-gray-300 hover:bg-transparent border border-gray-800 hover:text-black hover:bg-white font-medium rounded-lg text-base px-5 py-2.5 mt-8 text-center mr-3 md:mr-0 cursor-pointer" onClick={removeModel}>Portfolio +</button>
            </div>
          ) : ""}
        </div>
        <div className="px-3 md:px-22">
          <div className="bg-[#191919] shadow-lg px-5 py-8 rounded-md w-full lg:w-[90%] ">
            <div className=" flex items-center justify-between pb-6">
              <div>
                <h2 className="font-sans text-xl text-white font-semibold px-10 hover:underline">Available Portfolio</h2>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap ml-0 xl:ml-10 overflow-x-auto">
                {Data.map((item) => (

                  <div className="w-full sm:w-[40%] md:w-[30%] xl:w-2/5 bg-white rounded-lg border border-gray-200 md:mx-2 xl:mr-14 mx-2 mb-4 shadow-md" key={item._id}>

                    <div className="flex flex-col items-left pb-6">

                      <img className="mb-3 rounded-lg shadow-lg h-[200px]  sm:h-[150px] xl:h-[300px]" src={item.image} alt="Bonniimage" />
                      <h6 className="py-2 text-xl font-medium font-serif px-3">{item.title}</h6>
                      <span className="text-sm text-gray-800 text-left px-3">{item.desc}</span>

                      <div className='px-2'>
                        {user[0]?.isAdmin ? (
                          <div className="flex mt-4 justify-between space-x-3 lg:mt-6">
                            <Link to="#link" className="inline-flex items-center py-2 px-3  text-xs font-medium text-center hover:bg-transparent hover:text-black border text-black bg-gray-300 rounded-lg" onClick={() => updatePortfoliosModel(SetRowData(item), setId(item._id))}>Edit</Link>
                            <Link to="#link" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-black font-serif bg-red-500 hover:bg-transparent border border-red-500 hover:text-red-500 hover:bg-white rounded" onClick={() => removeDeleteModel(SetRowData(item), setId(item._id), setDelete(true))}>Delete</Link>
                          </div>)
                          : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Portfolio
