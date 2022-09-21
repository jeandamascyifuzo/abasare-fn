import React, { useState } from 'react'
import { FiEyeOff } from 'react-icons/fi';
import { MdLockOutline } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import axios from 'axios';
import Notify from '../functions/Notify';

const ChangePassword = () => {

  const [updateTeamModel, setUpdateTeamModel] = useState(false);
  const [loading, setLoading] = useState(false)
  const [RowData, SetRowData] = useState([])
  const [Data, setData] = useState([]);
  const [id, setId] = useState("");
 

    const [passwordShown, setPasswordShown] = useState(false);
    const [password, setPassword] = useState("")
    const tooglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const handleUpdate = (e) => {
        e.preventDefault()
        const url = `http://localhost:5000/api/v1/team/${id}`
        const Credentials = { password }
        setLoading(true)
        axios.put(url, Credentials)
          .then(response => {
            setLoading(false)
            const result = response.data;
            Notify(result.message, "success");
            const { status, message } = result;
            if (status !== 'SUCCESS') {
              setUpdateTeamModel(false)
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
    return (
        <section class="bg-black lg:ml-20">
            <div class="flex flex-col justify-center items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-[#191919] p-6 rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8 justify-center text-center items-center">
                    <h2 class="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-white md:text-2xl ">
                        Change Password
                    </h2>
                    <form class="mt-4 px-16 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        <div className="bg-gray-100 px-44 w-64 p-2 flex items-center rounded mb-2 justify-center text-center ">
                            <MdLockOutline className="text-gray-400 mr-2 " />
                            <input
                                placeholder="New Password"
                                type={passwordShown ? 'text' : 'password'}
                                className="bg-gray-100 outline-none text-sm flex-1 text-gray-400"
                                defaultValue={RowData.password}
                                onChange={(e) => setPassword(e.target.value)}
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
