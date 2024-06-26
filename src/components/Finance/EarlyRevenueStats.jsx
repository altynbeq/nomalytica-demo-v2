import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Pie } from '../../components';
import { ecomPieChartData } from '../../data/ecomData';

const EarlyRevenueStats = (weekFinanceData) => {
  const data = weekFinanceData.weekFinanceData;

  return (
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-1 p-4 px-10 rounded-2xl">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Доход за неделю</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>2024</span>
              </p>
            </div>
          </div>
          
          <div className="mt-2 flex gap-10 flex-row w-fit p-4 ml-10 justify-center">
            <div className="  border-color mb-2  ">
              <div>
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="text-3xl font-semibold">{data.totalSum} тг</span>
                        <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                            23%
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1">Прибыль</p>
                </div>
              </div>
              <div className="mt-4 flex gap-5 text-center align-center flex-row justify-between ">
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-3xl font-semibold">{data.leadsCount}</p>
                    <p className="text-gray-500 mt-1">Покупок</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-3xl font-semibold">00</p>
                    <p className="text-gray-500 mt-1">Скидок</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-3xl font-semibold">00</p>
                    <p className="text-gray-500 mt-1">Cписание</p>
                </div>
              </div>
              <div className="mt-4">
                <div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="text-3xl font-semibold">{data.avgCheck}</span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                7%
                            </span>
                        </p>
                    <p className="text-gray-500 mt-1">Средний чек</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 rounded-2xl" >
              <div>
                <p className="text-gray-400">Доля по сотрудникам за неделю</p>
                <Pie id="pie-chart-three" data={ecomPieChartData} legendVisiblity={true} height="150px" />
              </div>
            </div>

      </div>
        
    
  )
}

export default EarlyRevenueStats