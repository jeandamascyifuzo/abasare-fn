import React, { useEffect, useState, CSSProperties } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
// import { serviceData } from '../dummyData/Data';
import { ToastContainer } from "react-toastify";
import { getUser } from '../Utils/Common';
// import { useDropzone } from "react-dropzone";
// import ClipLoader from "react-spinners/ClipLoader";
import axiosRequest from '../api/index';
import Notify from "../functions/Notify";


const Service = () => {
  const [creaServiceModel, setCreaServiceModel] = useState(false);
  const [deleServiceModel, setDeleServiceModel] = useState(false);
  const [updaServiceModel, setUpdaServiceModel] = useState(false);
  let [loading, setLoading] = useState(false);
  const [Delete, setDelete] = useState(false)
  const [RowData, SetRowData] = useState([])
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
  const user = getUser()

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [icon, setIcon] = useState("")

  const removeModel = () => {
    let newState = !creaServiceModel;
    setCreaServiceModel(newState);
  }

  const removeDeleteModel = () => {
    let newState = !deleServiceModel;
    setDeleServiceModel(newState);
  }

  const updateMemberModel = () => {
    let newState = !updaServiceModel;
    setUpdaServiceModel(newState);
  };

  const GetService = () => {
    const url = 'service'
    axiosRequest.get(url)
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
        setIcon(reader.result);
      };
    } else {
      setIcon("");
    }
  };

  const handleSubmite = (e) => {
    e.preventDefault()
    const url = 'service/create'
    const Credentials = { title, desc, icon }
    setLoading(true)
    axiosRequest.post(url, Credentials)
      .then(response => {
        setLoading(false)
        const result = response.data;
        Notify(result.message, "success");
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          GetService();
          setCreaServiceModel(false)
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
    const url = `service/${id}`
    const Credentials = { title, desc, icon }
    setLoading(true)
    axiosRequest.put(url, Credentials)
      .then(response => {
        setLoading(false)
        const result = response.data;
        Notify(result.message, "success");
        const { status, message } = result;
        if (status !== 'SUCCESS') {
          GetService();
          setUpdaServiceModel(false)
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
    const url = `service/${id}`
    axiosRequest.delete(url)
      .then(response => {
        const result = response.data;
        Notify(result.message, "success");
        const { status, message } = result;
        if (status !== 'SUCCESS') {
          GetService();
          setDeleServiceModel(false)
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
    GetService();
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
      {/* =========================== Start:: CreateTeamModel =============================== */}
      <div className={`h-screen w-screen bg-gray-600 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${creaServiceModel === true ? 'block' : 'hidden'}`}>
        <div className="bg-white w-full sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className='font-bold text-sm text-center w-11/12 uppercase'>
              Add Services
            </h3>
            <hr className=' bg-primary border-b my-3 w-full' />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8" >
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    value={title}
                    name="title"
                    className="border border-gray-300 rounded outline-none px-2 pb-10 font-sans text-xs py-2 w-full"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    value={desc}
                    name="desc"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Description"
                    onChange={(e) => setDesc(e.target.value)}
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
                    name="icon"
                    className=" border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Icon"

                  />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <button className='py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-gray-800 font-sans text-sm text-gray-900' onClick={(e) => removeModel(e.preventDefault())}>Cancel</button>
                <button className='py-2 w-[40%] md:w-1/3 rounded  bg-gray-300 hover:bg-transparent border border-gray-800 hover:text-black hover:bg-white focus:ring-4 focus:outline-none'
                  onClick={handleSubmite}>
                  {loading ? "loading..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  CreateTeamModel =============================== */}

      {/* =========================== Start::  deleteTeamModel =============================== */}
      <div className={`min-h-full w-screen z-30 bg-gray-500 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${deleServiceModel === true ? 'block' : 'hidden'}`}>
        <div className="bg-white w-full sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className='font-bold text-sm text-center w-11/12'>
              Remove Service
            </h3>
            <hr className=' bg-primary border-b w-full' />
          </div>
          <div className="card-body">
            <form className=" px-8" >
              <div>
                <h2 className='text-base m-4'>Do you really want to remove <span className='italic text-black'>Web Design</span> from the our Services?</h2>
              </div>
              <div className="w-full flex justify-between">
                <button className='py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-gray-800 font-sans text-sm' onClick={(e) => removeDeleteModel(e.preventDefault())}>Cancel</button>
                <button className='text-white py-2 w-[40%] md:w-1/3 bg-red-700 rounded' onClick={handleDelete}>remove</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  deleteTeamModel =============================== */}

      {/* =========================== Start::  updateTeamModel =============================== */}
      <div
        className={`min-h-full w-screen z-30 bg-gray-500 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${updaServiceModel === true ? 'block' : 'hidden'
          }`}
      >
        <div className="bg-white sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-bold text-sm text-gray-700 text-center w-11/12">
              Update <span className='italic text-black'>Web Design</span>
            </h3>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form className=" px-8">
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="title"
                    defaultValue={RowData.title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded outline-none  px-2 font-sans text-xs py-2 w-full"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="desc"
                    defaultValue={RowData.desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className=" border py-2 rounded  outline-none px-2 font-sans text-xs w-full"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    name="image"
                    id="imgUpload"
                    accept="image/*"
                    type="file"
                    defaultValue={RowData.icon}
                    onChange={handleProductImageUpload}
                    className="border py-2 rounded outline-none px-2 font-sans text-xs w-full"
                  />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <button className='py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-gray-800 font-sans text-sm text-gray-900'
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdaServiceModel(false)
                  }}>Cancel
                </button>
                <button className='py-2 w-[40%] md:w-1/3 rounded  bg-gray-300 hover:bg-transparent border border-gray-800 hover:text-black hover:bg-white' onClick={handleUpdate}>{loading ? "loading..." : "Update"}</button>
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
              <button className="text-gray-800 font-serif bg-gray-300 hover:bg-transparent border border-gray-800 hover:text-black hover:bg-white font-medium rounded-lg text-base px-5 py-2.5 mt-8 text-center mr-3 md:mr-0 cursor-pointer" onClick={removeModel}>Service +</button>
            </div>
          ) : ""}
        </div>
        <div className="md:px-22">
          <div className="bg-[#191919] shadow-lg px-5 py-8 rounded-md w-full lg:w-full ">
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="font-sans text-xl text-white font-semibold px-1 hover:underline">Available Service</h2>
              </div>
            </div>
            <div>
              <div className="-mx-12 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block lg:min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          className="font-serif px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          Icon
                        </th>
                        <th
                          className="font-serif p-6 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          Title
                        </th>
                        <th
                          className="font-serif px-5  border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          Description
                        </th>
                        {user[0]?.isAdmin ? (
                          <th
                            className="font-serif px-5 py-3 border-b-2 border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                            Action
                          </th>
                        ) : ""}
                      </tr>
                    </thead>
                    <tbody>
                      {Data.map((item, index) => {
                        let rowTheme =
                          index % 2 !== 0
                            ? 'bg-gray-300'
                            : 'bg-white';
                        return (
                          <tr className={`${rowTheme} `} key={index}>
                            <td className="px-5 py-3 border-b border-gray-200 text-sm">
                              <img className="w-10 h-10 rounded-full shadow-lg" src={item.icon} alt="Bonnie" />
                            </td>
                            <td className="p-3 border-b border-gray-200 text-sm">
                              <div className="flex items-center">
                                <div>
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item.title}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 md:px-5 py-3 border-b border-gray-200 text-xs md:text-sm">
                              <p className="text-gray-900 whitespace-no-wrap ">{item.desc}</p>
                            </td>
                            {user[0]?.isAdmin ? (
                              <td className="px-5 py-3 border-b border-gray-200 text-gray-500 cursor-pointer text-lg">
                                <div className='flex'>
                                  <div className="cursor-pointer mr-2 text-gray-500" onClick={() => { updateMemberModel(SetRowData(item), setId(item._id)) }}>
                                    <FaEdit />
                                  </div>
                                  <div className="cursor-pointer text-[#FF3D3D]" onClick={() => { removeDeleteModel(SetRowData(item), setId(item._id), setDelete(true)) }}>
                                    <FaTrash />
                                  </div>
                                </div>
                              </td>
                            ) : ""}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Service
