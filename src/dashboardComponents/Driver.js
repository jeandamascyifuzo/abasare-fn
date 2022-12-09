import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import DropZone from "react-dropzone";
import axiosRequest from "../api/index";
import Axios from "axios";
import Notify from "../functions/Notify";
import axios from "axios";

const Leaders = () => {
  const [createTeamModel, setCreateTeamModel] = useState(false);
  const [deleteTeamModel, setDeleteTeamModel] = useState(false);
  const [updateTeamModel, setUpdateTeamModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({
    isProfile: false,
    isBackSide: false,
    isFrontSide: false,
  });

  const profileStatus = () => {
    setUploadStatus({
      isProfile: true,
      isBackSide: false,
      isFrontSide: false,
    });
  };
  const frontSideStatus = () => {
    setUploadStatus({
      isProfile: false,
      isFrontSide: true,
      isBackSide: false,
    });
  };
  const backSideStatus = () => {
    setUploadStatus({
      isProfile: false,
      isFrontSide: false,
      isBackSide: true,
    });
  };

  const [fullName, setFullName] = useState("");
  // const [userType, setUserType] = useState('')

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [status, setStatus] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [cityName, setCityName] = useState("");

  const [images, setImages] = useState({
    avatar: "",
    fontSide: "",
    backSide: "",
  });
  const [cdata, setCdata] = useState({
    avatarImage: "",
    fontSideImage: "",
    backSideImage: "",
  });
  console.log("cdata", cdata);

  console.log("images", images);
  // console.log("🚀 ~ file: Driver.js:61 ~ Leaders ~ avatar", avatar)

  // const [fontSide, setFontSide] = useState('');
  // console.log("🚀 ~ file: Driver.js:63 ~ Leaders ~ fontSide", fontSide)

  // const [backSide, setBackSide] = useState('');
  // console.log("🚀 ~ file: Driver.js:65 ~ Leaders ~ backSide", backSide)

  const [acceptingBooking, setAcceptingBooking] = useState("");
  const [yearExperience, setYearExperience] = useState("");
  const [rides, setRides] = useState("");
  const [cost, setCost] = useState("");

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

  const GetDrivers = () => {
    const url = "drivers/profile";
    setLoading(true);
    axiosRequest
      .get(url)
      .then((response) => {
        setLoading(false);
        const result = response.data;
        console.log("<><>", result.data);
        const { status, message, data } = result;
        if (status !== "SUCCESS") {
          setData(data);
        } else {
          setData(data);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.code !== "ERR_NETWORK") {
          Notify(error.response.data.message, "error");
        } else {
          Notify(error.message, "error");
        }
      });
  };

  const handleSubmite = (e) => {
    e.preventDefault();
    const url = "driver";
    const formData = new FormData();

    if (uploadStatus.isProfile) {
      formData.append("file", cdata.avatarImage);
    } else if (uploadStatus.isFrontSide) {
      formData.append("file", cdata.fontSideImage);
    } else if (uploadStatus.isBackSide) {
      formData.append("file", cdata.backSideImage);
    } else {
      return;
    }

    formData.append("upload_preset", "f27dmwgz");
    setLoading(true);
    Axios.post(
      "https://api.cloudinary.com/v1_1/andela-rwanda-kigali/image/upload",
      formData
    ).then((response) => {
      console.log("response", response);
      setLoading(false);
      if (uploadStatus.isProfile) {
        setImages({ ...images, avatar: response.data.secure_url });
      } else if (uploadStatus.isFrontSide) {
        setImages({ ...images, fontSide: response.data.secure_url });
      } else if (uploadStatus.isBackSide) {
        setImages({ ...images, backSide: response.data.secure_url });
      } else {
        return;
      }
      const Credentials = {
        email: email,
        fullName: fullName,
        address: address,
        cityName: cityName,
        phoneNumber: phoneNumber,
        alternatePhoneNumber: alternatePhoneNumber,
        gender: gender,
        avatar: images.avatar,
        licenseNumber: licenseNumber,
        fontSide: images.fontSide,
        backSide: images.backSide,
        status: status,
        acceptingBooking: acceptingBooking,
        yearExperience: yearExperience,
        rides: rides,
        cost: cost,
        latitude: latitude,
        longitude: longitude,
      };
      setLoading(true);
      axiosRequest
        .post(url, Credentials)
        .then((response) => {
          setLoading(false);
          const result = response.data;

          Notify(result.message, "success");
          const { status, message, data } = result;
          if (status !== "SUCCESS") {
            GetDrivers();
          } else {
            console.log(message);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.code !== "ERR_NETWORK") {
            Notify(error.response.data.message, "error");
          } else {
            Notify(error.message, "error");
          }
        });
    });
  };

  useEffect(() => {
    GetDrivers();
  }, []);

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

      {/* =========================== Start:: CreateDriverModel =============================== */}
      <div
        className={`h-screen w-full bg-gray-600 bg-opacity-30 backdrop-blur-sm mt-[90%] lg:mt-12 absolute flex items-center justify-center px-4 ${
          createTeamModel === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white w-screen sm:w-3/4 md:w-3/4  xl:w-full rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-semibold text-sm text-center uppercase text-gray-900">
              Add a Driver
            </h3>
            <hr className="bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3">
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="John deo"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="kigali gasabo"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  City Name
                </label>
                <input
                  type="text"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="kabeza"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Telephone Number
                </label>
                <input
                  type="Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="0788788765"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Alternate Telephone Number
                </label>
                <input
                  type="Number"
                  value={alternatePhoneNumber}
                  onChange={(e) => setAlternatePhoneNumber(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="0730788765"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="Male"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  onClick={profileStatus}
                  onChange={(e) =>
                    setCdata({ ...cdata, avatarImage: e.target.files[0] })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  License Number
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="123ewd3456"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  BackSide of licenseImage
                </label>
                <input
                  type="file"
                  onClick={backSideStatus}
                  onChange={(e) => {
                    setCdata({ ...cdata, backSideImage: e.target.files[0] });
                  }}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  FrontSide of licenseImage
                </label>
                <input
                  type="file"
                  onClick={frontSideStatus}
                  onChange={(e) => {
                    setCdata({ ...cdata, fontSideImage: e.target.files[0] });
                  }}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="Active"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Accepting Booking
                </label>
                <input
                  type="text"
                  value={acceptingBooking}
                  onChange={(e) => setAcceptingBooking(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="false"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  last Location Latitude
                </label>
                <input
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="0.09876787"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Location Longitude
                </label>
                <input
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="0.09876787"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Location UpdatedAt
                </label>
                <input
                  type="text"
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="0.09876787"
                />
              </div>
              <div className="md:pr-2">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Commission
                </label>
                <input
                  type="number"
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="90000"
                />
              </div>
            </form>
            <div className="w-full px-44 flex justify-between">
              <button
                className="py-2 mr-4 w-[40%] md:w-44 bg-gray-300 rounded border border-gray-800 font-sans text-sm text-gray-900"
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
                className="py-2 w-[40%] md:w-44 rounded  bg-[#2563eb] border border-gray-800 text-white focus:ring-4 focus:outline-none"
                onClick={handleSubmite}
              >
                Save
              </button>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
      {/* =========================== End::  CreateDriverModel =============================== */}

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
                  <span className="italic text-black">DiverName</span> from the
                  Drivers?
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
              Update <span className="italic text-black">DriverName</span> Info
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
        className="overflow-x-auto bg-gray-900 pb-10 min-h-screen lg:ml-44 px-2 lg:px-10"
        id="contact-section"
      >
        <div className="flex items-left px-4 lg:px-7 pt-14 pb-8">
          <div className="space-x-8">
            <button
              className="font-serif bg-[#2563eb] hover:bg-transparent border border-[#2563eb] hover:text-black hover:bg-white font-medium rounded-lg text-base px-5 py-2.5 mt-8 text-center mr-3 md:mr-0 cursor-pointer"
              onClick={removeModel}
            >
              Driver +
            </button>
          </div>
        </div>
        <div className="md:px-22">
          <div className="bg-white shadow-lg lg:px-5 py-8 rounded-md w-full lg:w-fit ">
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
                      {Data.map((item) => (
                        <tr key={item._d}>
                          <td className="px-5 py-3 border-b border-gray-200 text-sm">
                            <img
                              className="w-10 h-10 rounded-full shadow-lg object-cover"
                              src={item.profilePicture}
                              alt="Bonnie"
                            />
                          </td>
                          <td className="p-3 border-b border-gray-200 text-sm">
                            <div className="flex items-center">
                              <div>
                                <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                  {item.fullName}
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
                              {item.phoneNumber}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200  text-sm">
                            <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                              {item.alternatePhoneNumber}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200  text-sm">
                            <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                              {item.gender}
                            </p>
                          </td>

                          <td className="px-5 py-3 border-b border-gray-200  text-sm">
                            <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                              {item.licenseNumber}
                            </p>
                          </td>
                          <td className="px-5 border-b border-gray-200  text-sm">
                            <img
                              className="rounded-full h-10 w-10 object-cover"
                              src={item.licenseImage[0].fontSide}
                              alt="images"
                            />
                          </td>
                          <td className="px-5 border-b border-gray-200  text-sm">
                            <img
                              className="rounded-full h-10 w-10 object-cover"
                              src={item.licenseImage[0].backSide}
                              alt="images"
                            />
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200  text-sm">
                            <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                              {item.status}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200  text-sm">
                            <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                              true
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
                                  300
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 text-sm">
                            <div className="flex items-center">
                              <div>
                                <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                  {item.address}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 text-sm">
                            <div className="flex items-center">
                              <div>
                                <p className="text-gray-900 whitespace-no-wrap font-bold font-sans">
                                  {item.cityName}
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
                      ))}
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
