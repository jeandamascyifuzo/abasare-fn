import React from 'react'
import DocumentTitle from '../hook/useDocumentTitle';

const team = () => {
  DocumentTitle('Team');
  return (
    <>
      <div className='flex'>


        <div className=" lg:mt-32 ml-60 w-full h-min  lg:w-7/12 bg-white rounded-md p-4 m-2">
          <div className="w-full">
            <div className="card-header flex items-center justify-between">
              <div className="card-title">
                <div className="title mb-3">
                  <h4 className=' text-primary-500 font-bold text-xl md:text-2xl' >
                    Available drivers
                  </h4>
                </div>
              </div>
            </div>
            <div className="mt-3 mb-10">
              <table className="min-w-full border-collapse border-0"  >
                <thead>
                  <tr className="border-b border-b-secondary-100 text-left" >
                    <th className="text-xs  md:text-md md:font-bold text-mainColor font-sans pt-6 pb-2"  >Name</th>
                    <th className="text-xs  md:text-md md:font-bold text-mainColor font-sans pt-6 pb-2"  >Car Type</th>
                    <th className="text-xs  md:text-md md:font-bold text-mainColor font-sans pt-6 pb-2"  >Plate Number</th>
                    <th className="text-xs  md:text-md md:font-bold text-mainColor font-sans pt-6 pb-2"  >Price</th>
                    <th className="text-xs  md:text-md md:font-bold text-mainColor font-sans pt-6 pb-2"  >action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-16 text-right border-b border-b-secondary-100 cursor-pointer hover:bg-gray-100">
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      Kalisa John
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      TAX
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      RAB 453 C
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      50$
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      <button className='hover:bg-green-500 p-1 rounded-sm'>BookNow</button>
                    </td>
                  </tr>
                  <tr className="h-16 text-right border-b border-b-secondary-100 cursor-pointer hover:bg-gray-100">
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      Kalisa John
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      TAX
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      RAB 453 C
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      50$
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      <button className='hover:bg-green-500 p-1 rounded-sm'>BookNow</button>
                    </td>
                  </tr>
                  <tr className="h-16 text-right border-b border-b-secondary-100 cursor-pointer hover:bg-gray-100">
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      Kalisa John
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      TAX
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      RAB 453 C
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      50$
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      <button className='hover:bg-green-500 p-1 rounded-sm'>BookNow</button>
                    </td>
                  </tr>
                  <tr className="h-16 text-right border-b border-b-secondary-100 cursor-pointer hover:bg-gray-100">
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      Kalisa John
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      TAX
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      RAB 453 C
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      50$
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      <button className='hover:bg-green-500 p-1 rounded-sm'>BookNow</button>
                    </td>
                  </tr>
                  <tr className="h-16 text-right border-b border-b-secondary-100 cursor-pointer hover:bg-gray-100">
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      Kalisa John
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      TAX
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      RAB 453 C
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      50$
                    </td>
                    <td className='text-secondary-200 font-sans text-xs text-left md:text-sm md:font-sans'>
                      <button className='hover:bg-green-500 p-1 rounded-sm'>BookNow</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className=" lg:mt-32 w-full h-min lg:w-4/12 bg-white rounded-md m-2 ">
          <div className="w-full">
            <div className=" flex flex-col items-center justify-center">
              
              {/* <div className="mt-6">
                <div className="profiler-name">
                  <p className=' text-xs font-semibold font-sans md:text-xl text-secondary-300'>Bus Information</p>
                </div>
              </div> */}
              <div className="w-full flex items-center ml-20 justify-between mt-4 px-8 pb-8 pt-4">
                <div className="w-5/6">
                  <img src="https://cdn.pixabay.com/photo/2012/04/13/20/37/car-33556__480.png" alt="Bus" className="w-full h-1/2 flex items-center justify-center bg-primary-100 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default team
