import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { Button, Spinner } from "react-bootstrap";
import axiosRequest from "../api/index";
import Notify from "../functions/Notify";
import axios from "axios";

const Leaders = (props) => {
  let temporaryType;
  const [createTeamModel, setCreateTeamModel] = useState(false);
  const [deleteTeamModel, setDeleteTeamModel] = useState(false);
  const [updateTeamModel, setUpdateTeamModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [RowData, SetRowData] = useState([]);
  const [Delete, setDelete] = useState(false);
  const [id, setId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [Data, setData] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    gender: "",
    licenseNumber: "",
    status: "",
    latitude: "",
    longitude: "",
    address: "",
    cityName: "",
    acceptingBooking: "",
    yearExperience: "",
    rides: "",
    cost: "",
    avatar: "",
    fontSide: "",
    backSide: "",
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      const renamedAcceptedFiles = acceptedFiles.map(
        (file) =>
          new File([file], `${file.name}_${+new Date()}`, {
            type: file.type,
          })
      );
      const newFile = renamedAcceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      // setProfile(newFile[0].preview);
      const formDataUpload = new FormData();
      formDataUpload.append("file", newFile[0]);
      formDataUpload.append("upload_preset", "f27dmwgz");

      console.log("temporaryType", temporaryType);

      setLoading(true);
      axios
        .post(
          "https://api.cloudinary.com/v1_1/andela-rwanda-kigali/image/upload",
          formDataUpload
        )
        .then((response) => {
          console.log(response.data.secure_url);

          switch (temporaryType) {
            case "avatar":
              formData.avatar = response.data.secure_url;
              break;
            case "fontSide":
              formData.fontSide = response.data.secure_url;
              break;
            case "backSide":
              formData.backSide = response.data.secure_url;
              break;
            default:
              formData = formData;
          }
          // let avatarImage = formData.avatar
          console.log("Final FormData", formData.avatar);
          setLoading(false);
        });
    },
  });

  const onSubmits = async () => {
    const url = "driver";
    setLoading(true);
    await axiosRequest.post(url, formData).then((res) => {
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
        gender: "",
        licenseNumber: "",
        status: "",
        latitude: "",
        longitude: "",
        address: "",
        cityName: "",
        acceptingBooking: "",
        yearExperience: "",
        rides: "",
        cost: "",
        avatar: "",
        fontSide: "",
        backSide: "",
      });
      setLoading(false);
      // Notify(res.message, "success");
      const { status, message } = res;
      if (status !== "SUCCESS") {
        GetDrivers();
        setCreateTeamModel(false);
      } else {
        console.log(message);
      }
    });

    console.log("UploadResult ", props.uploadFile);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const url = `drivers/profile/${id}`;
    setLoading(true);
    axiosRequest
      .delete(url)
      .then((response) => {
        setLoading(false);
        const result = response.data;
        // Notify(result.message, "success");
        const { status, message } = result;
        if (status !== "SUCCESS") {
          GetDrivers();
          setDeleteTeamModel(false);
        } else {
          console.log(message);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.code !== "ERR_NETWORK") {
          // Notify(error.response.data.message, "error");
        } else {
          // Notify(error.message, "error");
        }
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `drivers/profile/${driverId}`;
    setLoading(true);
    axiosRequest
      .put(url, formData)
      .then((response) => {
        setLoading(false);
        const result = response.data;
        Notify(result.message, "success");
        const { status, message } = result;
        if (status !== "SUCCESS") {
          setFormData({
            fullName: "",
            email: "",
            phoneNumber: "",
            alternatePhoneNumber: "",
            gender: "",
            licenseNumber: "",
            status: "",
            latitude: "",
            longitude: "",
            address: "",
            cityName: "",
            acceptingBooking: "",
            yearExperience: "",
            rides: "",
            cost: "",
            avatar: "",
            fontSide: "",
            backSide: "",
          });
          GetDrivers();
          setUpdateTeamModel(false);
        } else {
          setFormData("");
          console.log(message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  };

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
        console.log("🚀 ~ file: Driver.js:230 ~ .then ~ result", result);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm();

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
        className={`h-screen w-full bg-gray-600 bg-opacity-30 backdrop-blur-sm mt-[15%] md:mt-0 absolute md:fixed z-10 flex items-center justify-center md:px-4 ${
          createTeamModel === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-gray-200 w-full sm:w-3/4 md:w-full m-auto xl:w-full rounded-lg md:p-4 py-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-semibold text-sm text-center uppercase text-gray-900">
              Add a Driver
            </h3>
            <hr className="bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form
              className=" py-3 px-8 grid grid-cols-1 md:grid-cols-4"
              action="#"
              onSubmit={handleSubmit(onSubmits)}
            >
              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName", {
                    required: "FullName is required",
                  })}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="John deo"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="Kanomber"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="example@gmail.com"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  City Name
                </label>
                <input
                  type="text"
                  {...register("cityName", {
                    required: "City  name is required",
                  })}
                  value={formData.cityName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cityName: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="kabeza"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Telephone Number
                </label>
                <input
                  type="Number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="0788788765"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Alternate Telephone Number
                </label>
                <input
                  type="Number"
                  {...register("alternatePhoneNumber", {
                    required: "Alternate Phone Number is required",
                  })}
                  value={formData.alternatePhoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      alternatePhoneNumber: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="0730788765"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  className="bg-gray-50 my-3 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value,
                    })
                  }
                  required
                >
                  <option defaultValue>--select--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Say nothing">Say nothing</option>
                </select>
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  License Number
                </label>
                <input
                  type="text"
                  {...register("licenseNumber", {
                    required: "License Number is required",
                  })}
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      licenseNumber: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="123ewd3456"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <select
                  id="status"
                  {...register("status", {
                    required: "Status is required",
                  })}
                  className="bg-gray-50 my-3 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  required
                >
                  <option defaultValue>--select--</option>
                  <option value="Active">Active</option>
                  <option value="Not Active">Not Active</option>
                </select>
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Accepting Booking
                </label>
                <select
                  id="booking?"
                  {...register("acceptingBooking", {
                    required: "Accepting Booking is required",
                  })}
                  className="bg-gray-50 my-3 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5"
                  value={formData.acceptingBooking}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acceptingBooking: e.target.value,
                    })
                  }
                  required
                >
                  <option defaultValue>--select--</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  last Location Latitude
                </label>
                <input
                  type="number"
                  {...register("latitude", {
                    required: "Latitude is required",
                  })}
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      latitude: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="0.09876787"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Location Longitude
                </label>
                <input
                  type="number"
                  {...register("longitude", {
                    required: "Longitude is required",
                  })}
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      longitude: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="0.09876787"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Location UpdatedAt
                </label>
                <input
                  type="text"
                  {...register("lastLocationUpdatedAt", {
                    required: "Longitude is required",
                  })}
                  value={formData.lastLocationUpdatedAt}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastLocationUpdatedAt: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="0.09876787"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Commission
                </label>
                <input
                  type="number"
                  {...register("commission", {
                    required: "Longitude is required",
                  })}
                  value={formData.commission}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commission: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  placeholder="10000"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Experience
                </label>
                <input
                  type="text"
                  {...register("yearExperience", {
                    required: "yearExperience is required",
                  })}
                  value={formData.yearExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearExperience: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="3 Years"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  rides
                </label>
                <input
                  type="text"
                  {...register("rides", {
                    required: "rides is required",
                  })}
                  value={formData.rides}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rides: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="15 Rides"
                  required
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cost
                </label>
                <input
                  type="text"
                  {...register("cost", {
                    required: "cost is required",
                  })}
                  value={formData.cost}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cost: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5 focus:outline-none"
                  placeholder="15000"
                  required
                />
              </div>

              <div onClick={() => (temporaryType = "avatar")}>
                <div>
                  <label
                    htmlFor="first_image"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Profile Photos
                    {loading ? (
                      <Icon
                        icon="eos-icons:bubble-loading"
                        color="blue"
                        className="w-6 h-6"
                      />
                    ) : (
                      <img
                        className="h-16 w-14 object-cover"
                        htmlFor="first_image"
                        src={
                          formData.avatar
                            ? formData.avatar
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vfpa4YGU7dPzQuRdnelFVO2mJ0UTznsB7g&usqp=CAU"
                        }
                        alt=""
                      />
                    )}
                  </label>
                  <input
                    {...getRootProps()}
                    className="hidden"
                    id="first_image"
                  />
                </div>
              </div>

              <div onClick={() => (temporaryType = "fontSide")}>
                <div>
                  <label
                    htmlFor="second_image"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Profile Photos
                    {loading ? (
                      <Icon
                        icon="eos-icons:bubble-loading"
                        color="blue"
                        className="w-6 h-6"
                      />
                    ) : (
                      <img
                        className="h-16 w-14 object-cover"
                        htmlFor="second_image"
                        src={
                          formData.fontSide
                            ? formData.fontSide
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vfpa4YGU7dPzQuRdnelFVO2mJ0UTznsB7g&usqp=CAU"
                        }
                        alt=""
                      />
                    )}
                  </label>
                  <input
                    {...getRootProps()}
                    className="hidden"
                    id="second_image"
                  />
                </div>
              </div>

              <div onClick={() => (temporaryType = "backSide")}>
                <div>
                  <label
                    htmlFor="last_image"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Profile Photos
                    {loading ? (
                      <Icon
                        icon="eos-icons:bubble-loading"
                        color="blue"
                        className="w-6 h-6"
                      />
                    ) : (
                      <img
                        className="h-16 w-14 object-cover"
                        htmlFor="last_image"
                        src={
                          formData.backSide
                            ? formData.backSide
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vfpa4YGU7dPzQuRdnelFVO2mJ0UTznsB7g&usqp=CAU"
                        }
                        alt=""
                      />
                    )}
                  </label>
                  <input
                    {...getRootProps()}
                    className="hidden"
                    id="last_image"
                  />
                </div>
              </div>

              <div className="w-full flex justify-around items-center md:col-span-4 mt-16">
                <button
                  className="py-2 w-[40%] md:w-52 bg-transparent rounded border border-gray-800 font-sans text-sm text-gray-900"
                  onClick={(e) => removeModel(e.preventDefault())}
                >
                  Cancel
                </button>
                {loading ? (
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
                ) : (
                  <button
                    type="submit"
                    className="py-2 w-[40%] md:w-52 rounded text-white bg-blue-500 border border-white hover:text-black focus:ring-4 focus:outline-none"
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  CreateDriverModel =============================== */}

      {/* =========================== Start::  deleteDriverModel =============================== */}
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
                  className="py-2 w-[40%] md:w-1/3 bg-transparent rounded border border-white font-sans text-sm"
                  onClick={(e) => removeDeleteModel(e.preventDefault())}
                >
                  Cancel
                </button>
                {loading ? (
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
                ) : (
                  <button
                    className="text-white py-2 w-[40%] md:w-1/3 bg-red-700 rounded"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* =========================== End::  deleteDriverModel =============================== */}

      {/* =========================== Start::  updateDriverModel =============================== */}
      <div
        className={`h-screen w-full bg-gray-600 bg-opacity-30 backdrop-blur-sm mt-[15%] md:mt-0 absolute md:fixed z-10 flex items-center justify-center md:px-4 ${
          updateTeamModel === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white w-full sm:w-3/4 md:w-full m-auto xl:w-full rounded-lg md:p-4 py-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-semibold text-sm text-center uppercase text-gray-900">
              update a Driver
            </h3>
            <hr className="bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <form className=" py-3 px-8 grid grid-cols-1 md:grid-cols-4">
              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={formData.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullName: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  defaultValue={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  defaultValue={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                  disabled
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  City Name
                </label>
                <input
                  type="text"
                  defaultValue={formData.cityName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cityName: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Telephone Number
                </label>
                <input
                  type="Number"
                  defaultValue={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Alternate Telephone Number
                </label>
                <input
                  type="Number"
                  defaultValue={formData.alternatePhoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      alternatePhoneNumber: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
                <input
                  type="text"
                  defaultValue={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  License Number
                </label>
                <input
                  type="text"
                  defaultValue={formData.licenseNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      licenseNumber: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Status
                </label>
                <input
                  type="text"
                  defaultValue={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Accepting Booking
                </label>
                <input
                  type="text"
                  defaultValue={formData.acceptingBooking}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acceptingBooking: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  last Location Latitude
                </label>
                <input
                  type="number"
                  defaultValue={formData.latitude}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      latitude: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Location Longitude
                </label>
                <input
                  type="number"
                  defaultValue={formData.longitude}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      longitude: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Location UpdatedAt
                </label>
                <input
                  type="text"
                  defaultValue={formData.lastLocationUpdatedAt}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastLocationUpdatedAt: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Commission
                </label>
                <input
                  type="number"
                  defaultValue={formData.commission}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commission: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Experience
                </label>
                <input
                  type="number"
                  defaultValue={formData.yearExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearExperience: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Rides
                </label>
                <input
                  type="number"
                  defaultValue={formData.rides}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rides: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div className="md:pr-2">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cost
                </label>
                <input
                  type="number"
                  defaultValue={formData.cost}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cost: e.target.value,
                    })
                  }
                  className="border border-gray-300 text-sm rounded w-full p-2.5"
                />
              </div>

              <div onClick={() => (temporaryType = "avatar")}>
                <div>
                  <label
                    htmlFor="first_image"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Profile Photos
                    {loading ? (
                      <Icon
                        icon="eos-icons:bubble-loading"
                        color="blue"
                        className="w-6 h-6"
                      />
                    ) : (
                      <img
                        className="h-16 w-14 object-cover"
                        htmlFor="first_image"
                        src={
                          formData.avatar
                            ? formData.avatar
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vfpa4YGU7dPzQuRdnelFVO2mJ0UTznsB7g&usqp=CAU"
                        }
                        alt=""
                      />
                    )}
                  </label>
                  <input
                    {...getRootProps()}
                    className="hidden"
                    id="first_image"
                  />
                </div>
              </div>

              <div onClick={() => (temporaryType = "fontSide")}>
                <div>
                  <label
                    htmlFor="second_image"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Profile Photos
                    {loading ? (
                      <Icon
                        icon="eos-icons:bubble-loading"
                        color="blue"
                        className="w-6 h-6"
                      />
                    ) : (
                      <img
                        className="h-16 w-14 object-cover"
                        htmlFor="second_image"
                        src={
                          formData.fontSide
                            ? formData.fontSide
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vfpa4YGU7dPzQuRdnelFVO2mJ0UTznsB7g&usqp=CAU"
                        }
                        alt=""
                      />
                    )}
                  </label>
                  <input
                    {...getRootProps()}
                    className="hidden"
                    id="second_image"
                  />
                </div>
              </div>

              <div onClick={() => (temporaryType = "backSide")}>
                <div>
                  <label
                    htmlFor="last_image"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Profile Photos
                    {loading ? (
                      <Icon
                        icon="eos-icons:bubble-loading"
                        color="blue"
                        className="w-6 h-6"
                      />
                    ) : (
                      <img
                        className="h-16 w-14 object-cover"
                        htmlFor="last_image"
                        src={
                          formData.backSide
                            ? formData.backSide
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-vfpa4YGU7dPzQuRdnelFVO2mJ0UTznsB7g&usqp=CAU"
                        }
                        alt=""
                      />
                    )}
                  </label>
                  <input
                    {...getRootProps()}
                    className="hidden"
                    id="last_image"
                  />
                </div>
              </div>
            </form>
            <div className="w-full px-8 pt-6 md:pt-0 md:px-44 flex justify-between">
              <button
                className="py-2 mr-4 w-[40%] md:w-44 bg-gray-300 rounded border border-white font-sans text-sm text-gray-900"
                onClick={(e) => {
                  e.preventDefault();
                  setUpdateTeamModel(false);
                }}
              >
                Cancel
              </button>
              {loading ? (
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
              ) : (
                <button
                  type="submit"
                  className="py-2 w-[40%] md:w-44 rounded  bg-[#2563eb] border border-white text-white focus:ring-4 focus:outline-none"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* =========================== End::  updateDriverModel =============================== */}

      <div className="flex items-left px-4 xl:mt-12 lg:px-7 lg:ml-36 py-8">
        <div className="space-x-8">
          <button
            className="font-serif bg-[#2563eb] hover:bg-transparent border border-[#2563eb] hover:text-black hover:bg-white font-medium rounded-lg text-base px-5 py-2.5 mt-8 text-center mr-3 md:mr-0 cursor-pointer"
            onClick={removeModel}
          >
            Driver +
          </button>
        </div>
      </div>
      <div className="overflow-x-auto relative lg:ml-40">
        <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                names
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Telephone
              </th>
              <th scope="col" className="py-3 px-6">
                other Telephone
              </th>
              <th scope="col" className="py-3 px-6">
                gender
              </th>
              <th scope="col" className="py-3 px-6">
                licenseNumber
              </th>
              <th scope="col" className="py-3 px-6">
                status
              </th>
              <th scope="col" className="py-3 px-6">
                acceptingBooking
              </th>
              <th scope="col" className="py-3 px-6">
                latitude
              </th>
              <th scope="col" className="py-3 px-6">
                longitude
              </th>
              <th scope="col" className="py-3 px-6">
                lastLocationUpdatedAt
              </th>
              <th scope="col" className="py-3 px-6">
                commission
              </th>
              <th scope="col" className="py-3 px-6">
                address
              </th>
              <th scope="col" className="py-3 px-6">
                city
              </th>
              <th scope="col" className="py-3 px-6">
                Experience
              </th>
              <th scope="col" className="py-3 px-6">
                Rides
              </th>
              <th scope="col" className="py-3 px-6">
                Cost
              </th>
              <th scope="col" className="py-3 px-6">
                fontside licenseImage
              </th>
              <th scope="col" className="py-3 px-6">
                backside licenseImage
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full shadow-lg object-cover"
                    src={item.avatar}
                    alt="Bonnie"
                  />
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.fullName}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.email}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.phoneNumber}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.alternatePhoneNumber}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.gender}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.licenseNumber}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.status}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  true
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.lastLocation[0].latitude}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.lastLocation[0].longitude}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.lastLocationUpdatedAt}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.commission}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.address}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.cityName}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.yearExperience}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.rides}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.cost}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="rounded-full h-10 w-10 object-cover"
                    src={item.licenseImage[0].fontSide}
                    alt="images"
                  />
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="rounded-full h-10 w-10 object-cover"
                    src={item.licenseImage[0].backSide}
                    alt="images"
                  />
                </td>
                <td className="px-5 py-3 text-gray-500 cursor-pointer text-lg">
                  <div className="flex">
                    <div
                      className="cursor-pointer mr-2 text-gray-500"
                      onClick={() =>
                        updateMemberModel(
                          setFormData(item),
                          setDriverId(item.driverId)
                        )
                      }
                    >
                      <FaEdit />
                    </div>
                    <div
                      className="cursor-pointer text-[#FF3D3D]"
                      onClick={() =>
                        removeDeleteModel(
                          SetRowData(item),
                          setId(item._id),
                          setDelete(true)
                        )
                      }
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
    </>
  );
};

export default Leaders;
