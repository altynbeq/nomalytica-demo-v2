import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Button, Pie } from '../../components';
import { revenueTypesData, weakylRevenue, lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis }  from '../../data/financeData'
import { useStateContext } from '../../contexts/ContextProvider';

const DailySalesStats = ({dayFinanceData, dayLeadsData}) => {
    const { currentColor, currentMode } = useStateContext();
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 w-[90%] md:w-[60%] justify-between rounded-2xl subtle-border">
        
        <div className="flex justify-between">
            <p className="font-semibold text-xl">Доходы за день</p>
            <div className="flex items-center gap-4">
                <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                    <span>
                    <GoPrimitiveDot />
                    </span>
                    <span>24 Мая 2024</span>
                </p>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row   justify-center">
            <div className="flex flex-col justify-left gap-8  text-left md:border-r-1 border-color m-8 md:pr-10">
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="md:text-2xl  font-semibold">{dayFinanceData.leadsCount}</span>
                        <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                            36% 
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1">Продаж</p>
                </div>
                <div className=" gap-7 flex flex-row justify-between">
                    <div className='flex justify-center flex-col text-center'>
                        <p className="md:text-2xl font-semibold">37%</p>
                        <p className="text-gray-500 mt-1">Конверсия</p>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="md:text-2xl  font-semibold">{dayLeadsData.leadsCount}</span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                7%
                            </span>
                        </p>
                        <p className="text-gray-500 mt-1">Лидов</p>
                    </div>
                    
                </div>
                <div className='flex flex-row gap-4'>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="md:text-2xl font-semibold">{dayFinanceData.totalSum}</span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                7%
                            </span>
                        </p>
                        <p className="text-gray-500 mt-1">Выручка</p>
                    </div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="md:text-2xl font-semibold">{dayFinanceData.totalSum}</span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-red-400 ml-3 text-xs">
                                7%
                            </span>
                        </p>
                        <p className="text-gray-500 mt-1">Выручка</p>
                    </div>
                </div>
                
                
                <div className="mt-10 flex justify-center">
                    <Button
                    color="white"
                    bgColor={currentColor}
                    text="Скачать отчет"
                    borderRadius="10px"
                    />
                </div>
            </div>
                
            <div className="m-auto flex flex-col justify-center align-center lg:m-0">
                <div className='flex justify-center text-center flex-col'>
                    <h2>Способы оплат</h2>
                </div>
                <div className='w-100'>
                    <Pie id="pie-money-flow" data={dayLeadsData.leadsSourceSeries} legendVisiblity={false} height="200px" color="red"  />
                </div>
                
                <div className='flex flex-row gap-2 justify-between'>
                    <p className="flex items-center gap-2 text-cyan-600 hover:drop-shadow-xl">
                        <span>
                        <GoPrimitiveDot />
                        </span>
                        <span>Intagram</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                        <span>
                        <GoPrimitiveDot />
                        </span>
                        <span>WhatsApp</span>
                    </p>
                    <p className="flex items-center gap-2 text-blue-600 hover:drop-shadow-xl">
                        <span>
                        <GoPrimitiveDot />
                        </span>
                        <span>Другое</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DailySalesStats