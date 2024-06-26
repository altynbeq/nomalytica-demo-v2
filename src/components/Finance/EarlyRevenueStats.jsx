import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Button } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider';

const WeekRevenueStats = (weekFinanceData) => {
  const { currentColor, currentMode } = useStateContext();
  const data = weekFinanceData.weekFinanceData;
  
  return (
    <div className="bg-white dark:text-gray-200 justify-center text-center align-center dark:bg-secondary-dark-bg m-5 md:m-1 p-4 rounded-2xl m5 w-[90%] md:w-[30%]   ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Доходы за неделю</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>2024</span>
              </p>
            </div>
          </div>
          
          <div className="mt-10 flex gap-10 flex-row p-4 md:ml-10 justify-center">
            <div className="  border-color m-8  ">
              <div>
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="text-3xl font-semibold">{data.totalSum}тг</span>
                        <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                            23%
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1">Прибыль</p>
                </div>
              </div>
              <div className="mt-8 gap-2 w-full flex flex-row justify-between">
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-1xl md:text-3xl font-semibold">{data.leadsCount}</p>
                    <p className="text-gray-500 mt-1">Покупок</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-1xl md:text-3xl font-semibold">?</p>
                    <p className="text-gray-500 mt-1">Скидок</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-1xl md:text-3xl font-semibold">?</p>
                    <p className="text-gray-500 mt-1">Cписание</p>
                </div>
              </div>
              <div className="mt-8">
                <div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="text-3xl font-semibold">{data.avgCheck} тг</span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                7%
                            </span>
                        </p>
                        <p className="text-gray-500 mt-1">Средний чек</p>
                    </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Скачать отчет"
                  borderRadius="10px"
                />
              </div>
            </div>
          </div>
        </div>
  )
}

export default WeekRevenueStats