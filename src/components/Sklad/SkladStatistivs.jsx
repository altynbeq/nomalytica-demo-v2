import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Button, Pie } from '../../components';
import { revenueTypesDataSales } from '../../data/salesData';
import { useStateContext } from '../../contexts/ContextProvider';

const SkladStatistivs = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Статистика по складу</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Май 2024</span>
              </p>
            </div>
          </div>
          
          <div className="mt-10 flex gap-10 flex-row w-fit justify-center">

            <div className=" border-r-1 border-color m-4 pr-10">
              
              <div className='w-[250px]'>
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="text-3xl font-semibold">310</span>
                    </p>
                    <p className="text-gray-500 mt-1">Товаров</p>
                </div>
              </div>
              <div className="mt-8 gap-7 flex flex-row justify-between">
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-3xl text-green-400 font-semibold">3%</p>
                    <p className="text-gray-500 mt-1">Списание</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="text-3xl font-semibold">14 500</span>
                    </p>
                    <p className="text-gray-500 mt-1">Сумма списания</p>
                </div>
              </div>
              <div className="mt-8">
                <div>
                    <div className='flex justify-center flex-col text-center'>
                        <p>
                            <span className="text-3xl font-semibold">1 104 500 тг</span>
                        </p>
                    <p className="text-gray-500 mt-1">Сумма товаров</p>
                    </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Добавить заказы"
                  borderRadius="10px"
                />
              </div>
            </div>

            <div>
                <div className='flex justify-center'>
                    <h2>Состояние склада</h2>
                </div>
              <Pie id="pie-money-flow" data={revenueTypesDataSales} legendVisiblity={false} height="280px" width="350px"/>
              <div className='flex flex-row justify-between'>
                    <p className="flex items-center gap-2 text-cyan-600 hover:drop-shadow-xl">
                        <span>
                        <GoPrimitiveDot />
                        </span>
                        <span>Заполнено</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                        <span>
                        <GoPrimitiveDot />
                        </span>
                        <span>Пусто</span>
                    </p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default SkladStatistivs