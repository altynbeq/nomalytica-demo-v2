import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Button } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const SkladStats = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-1 p-4 rounded-2xl   ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">За неделю</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>12-19 Мая 2024</span>
              </p>
            </div>
          </div>
          
          <div className="mt-10 flex gap-10 flex-row w-fit p-4 ml-10 justify-center">
            <div className="  border-color m-8  ">
              <div>
                <div className='flex justify-center flex-col text-center'>
                    <p>
                        <span className="text-3xl font-semibold">4 500</span>
                        <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                            23%
                        </span>
                    </p>
                    <p className="text-gray-500 mt-1">Сумма списания</p>
                </div>
              </div>
              <div className="mt-8 gap-2 flex flex-row justify-between">
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-3xl font-semibold">7 шт</p>
                    <p className="text-gray-500 mt-1">Спискано</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-3xl text-green-400 font-semibold">2%</p>
                    <p className="text-gray-500 mt-1">Спискано</p>
                </div>
                <div className='flex justify-center flex-col text-center'>
                    <p className="text-3xl font-semibold">2</p>
                    <p className="text-gray-500 mt-1">Пополнения</p>
                </div>
              </div>
              <div className="mt-8">
                <div>
                    <div className='flex justify-center flex-col text-center'>
                        <Button
                        color="white"
                        bgColor={currentColor}
                        text="Скачать отчет"
                        borderRadius="10px" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default SkladStats