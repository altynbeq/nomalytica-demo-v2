import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import HolePie from '../ReCharts/HolePieChart'

const DailyRevenue = () => {
  const { dateRanges } = useStateContext();
  const date = dateRanges[0].bitrixStartDate.split(' ')[0];

  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg my-3 p-4 text-center justify-center align-center w-[90%] md:w-[55%]  rounded-2xl subtle-border">
          <div className="flex justify-between">
            <p className="font-semibold text-1xl">Доходы за день</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>{date}</span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-2 flex-col md:flex-col w-[100%] items-center text-center justify-center">
            <div className='w-[100%] h-[300px]  flex text-center flex-col align-center justify-center'>
                  <HolePie />
            </div>
            <div className=" w-[100%] py-2 border-t-1 pr-2 flex flex-row md:w-[90%] gap-8 justify-center ">
              <div className='md:flex md:flex-row'>
                <div className='flex justify-center  border-color  flex-col text-start md:mr-5'>
                    <p className="text-gray-500 mt-1">Прибыль</p>
                    <span className="text-1xl ">7 450 000 тг</span>
                </div>
                <div className='flex md:border-l-1 border-t-1 md:border-t-0 pl-2 flex-col text-start'>
                    <p className="text-gray-500 mt-1">Покупок</p>
                    <p className="text-[1rem] font-semibold">350</p>
                </div>
              </div>
              <div className='md:flex md:flex-row'>
                <div className='flex justify-center border-l-1  pl-2 flex-col text-start md:mr-5'>
                    <p className="text-gray-500 mt-1">Продано товаров</p>
                    <p className="text-1xl font-semibold">283</p>
                </div>
                <div className='flex justify-center border-t-1 md:border-t-0 border-l-1  pl-2 flex-col text-start'>
                    <p className="text-gray-500 ">Средний чек</p>
                    <span className="text-1xl font-semibold">17 600</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default DailyRevenue