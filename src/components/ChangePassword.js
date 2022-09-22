import React, { useEffect, useState } from 'react'
import { FiEyeOff } from 'react-icons/fi';
import { MdLockOutline } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import axiosRequest from '../api/index'
import { removeUserSession } from '../Utils/Common';
import Notify from '../functions/Notify';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

  const [updateTeamModel, setUpdateTeamModel] = useState(false);
  const [loading, setLoading] = useState(false)
  const [RowData, SetRowData] = useState([])
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");

  const navigate = useNavigate()

  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState("")
  const tooglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  console.log(password)

  useEffect(()=> {
    const response = axiosRequest.get(`team/${id}`)
    setPassword(response.data)
  }, [id])

  const handleUpdate = async(e) => {
    e.preventDefault()
    try{
      const response = await axiosRequest.put(`team/6320c055ff4afe02e6160c21`, {
        password
      })
      setPassword(response.data)
      removeUserSession()
        navigate("/login")
    } catch(error){
      console.log(error.message);
    }
  }
  return (
    <section className="bg-black lg:ml-20">
      <div className="flex flex-col justify-center items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-[#191919] p-6 rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8 justify-center text-center items-center">
          <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-white md:text-2xl ">
            Change Password
          </h2>
          <form className="mt-4 px-16 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div className="bg-gray-100 px-44 w-64 p-2 flex items-center rounded mb-2 justify-center text-center ">
              <MdLockOutline className="text-gray-400 mr-2 " />
              <input
                placeholder="New Password"
                type={passwordShown ? 'text' : 'password'}
                className="bg-gray-100 outline-none text-sm flex-1 text-gray-400"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="text-gray-400 cursor-pointer onClick= {()=> handleShowPassword}">
                {passwordShown ? (
                  <FaRegEye onClick={tooglePassword} />
                ) : (
                  <FiEyeOff onClick={tooglePassword} />
                )}
              </div>
            </div>
            <div className="w-full justify-center">
              <input
                type="submit"
                className="border-2 w-1/2 py-2 inline-block rounded-full md:font-semibold sm:mt-2 sm:font-medium text-white"
                value={"Confirm"}
                onClick={handleUpdate}
              >
              </input>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ChangePassword
