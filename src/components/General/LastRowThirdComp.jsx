import React from 'react'
import { IoIosMore } from 'react-icons/io';

import { Button } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import product9 from '../../data/product9.jpg';



const LastRowThirdComp = () => {
    const { currentColor, currentMode } = useStateContext();

    return (
        <div className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl w-[90%] md:w-[25%] p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Дневные активности</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10">
            <img
              className="md:w-96 h-50 "
              src={product9}
              alt=""
            />
            <div className="mt-8">
              <p className="font-semibold text-lg">Новости аналитики: Приближение React 18!</p>
              <p className="text-gray-400">Автор: Джонатан Доу</p>
              <p className="mt-8 text-sm text-gray-400">
                Здесь будет небольшое описание новостей по аналитике. Ожидается появление React 18, что принесет много интересной информации для разработчиков. Будут внесены значительные изменения и улучшения, о которых стоит узнать больше.
              </p>
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Подробнее"
                  borderRadius="10px"
                />
              </div>
            </div>
          </div>
        </div>
    )
}

export default LastRowThirdComp