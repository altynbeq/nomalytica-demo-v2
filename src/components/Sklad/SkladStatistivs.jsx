import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Button, Pie } from '../../components';
import { revenueTypesDataSales } from '../../data/salesData';
import { useStateContext } from '../../contexts/ContextProvider';
import  ExportToExcel  from '../../components/ExportToExcel'

const SkladStatistivs = ({products1C, spisanie}) => {
  const { currentColor, currentMode } = useStateContext();
  return ( 
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 w-[90%] md:w-[38%] rounded-2xl subtle-border ">
            <div className="flex flex-col md:flex-row justify-between">
                <p className="font-semibold  md:text-xl">Обновления по складу</p>
            </div>
            <div className="mt-10 flex flex-col lg:flex-row gap-10 justify-center">

                <div className="md:border-r-1 w-[100%] md:w-[40%] border-color m-4 md:pr-10">
                  <div className='flex justify-center flex-col text-center'>
                      <p>
                          <span className="text-2xl  font-semibold">{products1C.productsSold}</span>
                      </p>
                      <p className="text-gray-500 mt-1">Продаж</p>
                  </div>
                  <div className="mt-8 gap-7 flex flex-row justify-between">
                    <div className='flex justify-center flex-col text-center'>
                        <p className="text-2xl font-semibold">{spisanie.totalAmountSpisanie}</p>
                        <p className="text-gray-500 mt-1">Списаний</p>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="text-2xl  font-semibold">???</span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                7%
                            </span>
                        </p>
                        <p className="text-gray-500 mt-1">???</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div>
                        <div className='flex justify-center flex-col text-center'>
                            <p>
                                <span className="text-2xl font-semibold">??? тг</span>
                                <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                    7%
                                </span>
                            </p>
                        <p className="text-gray-500 mt-1">???</p>
                        </div>
                    </div>
                  </div>
                 
                  
                  <div className="mt-10 flex justify-center">
                      <ExportToExcel
                      
                      />
                  </div>
                </div>
                
                <div className="m-auto w-[60%] lg:m-0">
                      <div className='flex justify-center text-center flex-col'>
                        <h2>Способы оплат</h2>
                      </div>
                  <Pie id="pie-money-flow" data={revenueTypesDataSales} legendVisiblity={false} height="250px"  />
                  <div className='flex flex-row justify-between'>
                  <p className="flex items-center gap-2 text-cyan-600 hover:drop-shadow-xl">
                         <span>
                         <GoPrimitiveDot />
                         </span>
                         <span>Online</span>
                     </p>
                     <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                         <span>
                         <GoPrimitiveDot />
                         </span>
                         <span>Offline</span>
                     </p>
               </div>
                </div>
            </div>
        </div>
  )
}

export default SkladStatistivs