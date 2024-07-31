import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Button } from '../../components'
import { useStateContext } from '../../contexts/ContextProvider';

const WeekRevenueStats = (weekFinanceData) => {
  const { currentColor, currentMode } = useStateContext();
  const data = weekFinanceData.weekFinanceData;
  
  return (
    <div className="bg-white dark:text-gray-200 justify-center text-center align-center dark:bg-secondary-dark-bg m-5 md:m-1 p-4 rounded-2xl w-[90%] md:w-[30%] subtle-border">
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
          
          <div className="flex gap-10 flex-row text-center align-center  md:ml-10 justify-center">
            <div className=" my-8 gap-8 flex flex-col ">
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
              <div className=" gap-2 text-center align-center  flex flex-row justify-between">
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-2xl md:text-3xl font-semibold">{data.leadsCount}</p>
                    <p className="text-gray-500 mt-1">Покупок</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-2xl md:text-3xl font-semibold">?</p>
                    <p className="text-gray-500 mt-1">Скидок</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-2xl md:text-3xl font-semibold">?</p>
                    <p className="text-gray-500 mt-1">Лидов</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-2xl md:text-3xl font-semibold">?</p>
                    <p className="text-gray-500 mt-1">Cписание</p>
                </div>
              </div>
              <div className=" flex flex-row gap-4">
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
              <div className=" flex flex-row gap-4 justify-evenly">
                <div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="text-3xl font-semibold">210</span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                7%
                            </span>
                        </p>
                        <p className="text-gray-500 mt-1">Продано товаров</p>
                    </div>
                </div>
                <div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="text-3xl font-semibold">21</span>
                        </p>
                        <p className="text-gray-500 mt-1">Доставок</p>
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