import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const Leaders = () => {
  const [createTeamModel, setCreateTeamModel] = useState(false);
  const [deleteTeamModel, setDeleteTeamModel] = useState(false);
  const [updateTeamModel, setUpdateTeamModel] = useState(false);

  const removeModel = () => {
    let newState = !createTeamModel;
    setCreateTeamModel(newState);
  };

  const removeDeleteModel = () => {
    let newState = !deleteTeamModel;
    setDeleteTeamModel(newState);
  };

  const updateMemberModel = () => {
    let newState = !updateTeamModel;
    setUpdateTeamModel(newState);
  };


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
      <div
        className={`h-screen w-screen bg-gray-600 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
          createTeamModel === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white w-full sm:w-3/4 md:w-1/2  xl:w-4/5 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-bold text-sm text-center w-11/12 uppercase">
              Add a Driver
            </h3>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="name"
                    className="border border-gray-300 rounded outline-none px-2 pb-10 font-sans text-xs py-2 w-full"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="address"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="email"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Email: example@gmail.com"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="number"
                    name="cityName"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="City Name"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="number"
                    name="phoneNumber"
                    className=" border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Telephone Number"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="number"
                    name="telephoneNumber"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Alternate Telephone Number"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="gender"
                    className="border border-gray-300 rounded outline-none px-2 pb-10 font-sans text-xs py-2 w-full"
                    placeholder="Gender"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="file"
                    name="avatar"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Profile Image"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="licenseNumber"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="License Number"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="file"
                    name="licenseImageFont"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="FontSide of licenseImage"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="file"
                    name="licenseImageBack"
                    className=" border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="BackSide of licenseImage"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="status"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Status"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="acceptingBooking"
                    className="border border-gray-300 rounded outline-none px-2 pb-10 font-sans text-xs py-2 w-full"
                    placeholder="Accepting Booking"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="lastLocationLatitude"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="last Location Latitude"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="lastLocationLongitude"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Last Location Longitude"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="lastLocationUpdatedAt"
                    className="border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Last Location UpdatedAt"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 md:pr-2">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="commission"
                    className=" border border-gray-300 py-2 pb-10 rounded outline-none px-2 font-sans text-xs w-full"
                    placeholder="Commission"
                  />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <button
                  className="py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-gray-800 font-sans text-sm text-gray-900"
                  onClick={(e) => removeModel(e.preventDefault())}
                >
                  Cancel
                </button>
                {/* {loading ? (
                  <Button variant="dark" disabled className="w-[40%] md:w-1/2">
                    <Spinner
                      as="span"
                      variant="light"
                      size="sm"
                      role="status"
                      aria-hidden="false"
                      animation="border"
                    />
                    Processing...
                  </Button>
                ) : ( */}
                  <button
                    className="py-2 w-[40%] md:w-1/3 rounded  bg-gray-300 hover:bg-transparent border border-gray-800 hover:text-black hover:bg-white focus:ring-4 focus:outline-none"
                    // onClick={handleSubmite}
                  >
                    Save
                  </button>
                {/* )} */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  CreateTeamModel =============================== */}

      {/* =========================== Start::  deleteTeamModel =============================== */}
      <div
        className={`min-h-full w-screen z-30 bg-gray-500 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
          deleteTeamModel === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white w-full sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-bold text-sm text-center w-11/12">
              Remove Driver
            </h3>
            <hr className=" bg-primary border-b w-full" />
          </div>
          <div className="card-body">
            <form className=" px-8">
              <div>
                <h2 className="text-base m-4">
                  Do you really want to remove{" "}
                  <span className="italic text-black">DiverName</span>{" "}
                  from the Drivers?
                </h2>
              </div>
              <div className="w-full flex justify-between">
                <button
                  className="py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-gray-800 font-sans text-sm"
                  onClick={(e) => removeDeleteModel(e.preventDefault())}
                >
                  Cancel
                </button>
                {/* {loading ? (
                  <Button variant="dark" disabled className="w-[40%] md:w-1/2">
                    <Spinner
                      as="span"
                      variant="light"
                      size="sm"
                      role="status"
                      aria-hidden="false"
                      animation="border"
                    />
                    Processing...
                  </Button>
                ) : ( */}
                  <button
                    className="text-white py-2 w-[40%] md:w-1/3 bg-red-700 rounded"
                    // onClick={handleDelete}
                  >
                    Delete
                  </button>
                {/* )} */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  deleteTeamModel =============================== */}

      {/* =========================== Start::  updateTeamModel =============================== */}
      <div
        className={`min-h-full w-screen z-30 bg-gray-500 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
          updateTeamModel === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-bold text-sm text-gray-700 text-center w-11/12">
              Update <span className="italic text-black">DriverName</span>{" "}
              Info
            </h3>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form className=" px-8">
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="name"
                    className="border rounded outline-none  px-2 font-sans text-xs py-2 w-full"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="email"
                    className=" border py-2 rounded cursor-not-allowed outline-none px-2 font-sans text-xs w-full"
                    disabled
                    readOnly
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="number"
                    name="telephone"
                    className="border py-2 rounded outline-none px-2 font-sans text-xs w-full"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="title"
                    className="border py-2 rounded outline-none  px-2 font-sans text-xs w-full"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    type="text"
                    name="title"
                    className="border py-2 rounded outline-none  px-2 font-sans text-xs w-full"
                  />
                </div>
              </div>
              <div className="input my-3 h-9 ">
                <div className="grouped-input flex items-center h-full w-full rounded-md">
                  <input
                    name="image"
                    type="file"
                    className="border py-2 rounded outline-none px-2 font-sans text-xs w-full"
                    disabled
                  />
                </div>
              </div>
              <div className="w-full flex justify-between">
                <button
                  className="py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-gray-800 font-sans text-sm text-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdateTeamModel(false);
                  }}
                >
                  Cancel
                </button>
                {/* {loading ? (
                  <Button variant="dark" disabled className="w-[40%] md:w-1/2">
                    <Spinner
                      as="span"
                      variant="light"
                      size="sm"
                      role="status"
                      aria-hidden="false"
                      animation="border"
                    />
                    Processing...
                  </Button>
                ) : ( */}
                  <button
                    className="py-2 w-[40%] md:w-1/3 rounded  bg-gray-300 hover:bg-transparent border border-gray-800 hover:text-black hover:bg-white focus:ring-4 focus:outline-none"
                    // onClick={handleUpdate}
                  >
                    Update
                  </button>
                {/* )} */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  updateTeamModel =============================== */}

      <div
        className="overflow-x-auto bg-[#38434e] pb-10 min-h-screen lg:ml-44 px-2 lg:px-10"
        id="contact-section"
      >
        <div className="flex items-left px-4 lg:px-7 pt-14 pb-8">
          <div className="space-x-8">
            <button
              className="font-serif bg-[#072081] hover:bg-transparent border border-[#072081] hover:text-black hover:bg-white font-medium rounded-lg text-base px-5 py-2.5 mt-8 text-center mr-3 md:mr-0 cursor-pointer"
              onClick={removeModel}
            >
              Driver +
            </button>
          </div>
        </div>
        <div className="md:px-22">
          <div className="bg-white shadow-lg px-5 py-8 rounded-md w-full lg:w-full ">
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="font-sans text-xl text-black font-semibold px-1 hover:underline">
                  Available Drivers
                </h2>
              </div>
            </div>
            <div>
              <div className="-mx-12 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block lg:min-w-full shadow rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          Image
                        </th>
                        <th className="font-lexend p-6 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          names
                        </th>
                        <th className="font-lexend px-5  border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          Email
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          Telephone
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          other Telephone
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          gender
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          licenseNumber
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          fontside licenseImage
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          backside licenseImage
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          status
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          acceptingBooking
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          latitude
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          longitude
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          lastLocationUpdatedAt
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          commission
                        </th>
                        <th className="font-lexend p-6 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          address
                        </th>
                        <th className="font-lexend p-6 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          city
                        </th>
                        <th className="font-lexend px-5 py-3 border-b-2 text-black border-gray-200 bg-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <img
                            className="w-10 h-10 rounded-full shadow-lg object-cover"
                            src="https://cdn.pixabay.com/photo/2022/10/09/04/28/deer-7508187__340.jpg"
                            alt="Bonnie"
                          />
                        </td>
                        <td className="p-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                name
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            email
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            telephone
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            other Telephone
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            gender
                          </p>
                        </td>

                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            licenseNumber
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            fontside licenseImage
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            backside licenseImage
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            status
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            acceptingBooking
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            latitude
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            longitude
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            lastLocationUpdatedAt
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                commission
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                Address
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                city
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-gray-500 cursor-pointer text-lg">
                          <div className="flex">
                            <div
                              className="cursor-pointer mr-2 text-gray-500"
                              onClick={() => updateMemberModel()}
                            >
                              <FaEdit />
                            </div>
                            <div
                              className="cursor-pointer text-[#FF3D3D]"
                              onClick={() => removeDeleteModel()}
                            >
                              <FaTrash />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <img
                            className="w-10 h-10 rounded-full shadow-lg object-cover"
                            src="https://cdn.pixabay.com/photo/2022/10/09/04/28/deer-7508187__340.jpg"
                            alt="Bonnie"
                          />
                        </td>
                        <td className="p-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                name
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            email
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            telephone
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            other Telephone
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            gender
                          </p>
                        </td>

                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            licenseNumber
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            fontside licenseImage
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            backside licenseImage
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            status
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            acceptingBooking
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            latitude
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            longitude
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200  text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                            lastLocationUpdatedAt
                          </p>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                commission
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                Address
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                city
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-gray-500 cursor-pointer text-lg">
                          <div className="flex">
                            <div
                              className="cursor-pointer mr-2 text-gray-500"
                              onClick={() => updateMemberModel()}
                            >
                              <FaEdit />
                            </div>
                            <div
                              className="cursor-pointer text-[#FF3D3D]"
                              onClick={() => removeDeleteModel()}
                            >
                              <FaTrash />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaders;
