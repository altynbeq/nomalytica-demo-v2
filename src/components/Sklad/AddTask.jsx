import React from 'react'
import { MdOutlineCancel } from 'react-icons/md';
import { FaPlus } from "react-icons/fa";

const AddTask = ({taskAddActive, setTaskAddActive}) => {
  return (
    <div className=" absolute flex mt-5  justify-end   nav-item ">
        <div className=" flex-col flex justify-center border-2 rounded-2xl float-right h-full w-full duration-1000 ease-in-out dark:text-gray-700 transition-all dark:bg-[#484B52] bg-white  p-8">
          <div className="flex justify-center">
            <div className='flex justify-center'>
              <p className="font-semibold text-lg">Новая задача</p>
            </div>

            <div className=' right-0'>
              <button className="p-2" onClick={() => setTaskAddActive(!taskAddActive)} >
                <MdOutlineCancel />
              </button>
            </div>
            
            
          </div>
            <div className='p-2 flex flex-row justify-center align-center gap-4'>
                <input
                    id="email-address"
                    name="email"
                    type="text-field"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Название"
                />
                <button type="button" className='' >
                    <div className='flex text-1xl mt-1'>
                        <FaPlus />
                    </div>
                </button>
            </div>
                
        </div>
    </div>
  )
}

export default AddTask