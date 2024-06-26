import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';

import { Button } from '../../components';
import { earningData } from '../../data/ecomData';
import { useStateContext } from '../../contexts/ContextProvider';



const FirstRowStats = () => {
    const { currentColor, currentMode } = useStateContext();
    return (
        <div className="flex  justify-center  w-full">
            <div className="flex flex-col sm:flex-row m-3  gap-4 justify-center items-center">
                {earningData.map((item) => (
                    <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg sm:w-[85%] md:w-[30%] lg:w-[50%]  p-4 pt-9 rounded-2xl flex-shrink-0">
                        <button
                        type="button"
                        style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                        className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                        >
                            {item.icon}
                        </button>
                        <p className="mt-3">
                        <span className="text-lg font-semibold">{item.amount}</span>
                        <span className={`text-sm text-${item.pcColor} ml-2`}>
                            {item.percentage}
                        </span>
                        </p>
                        <p className="text-sm text-gray-400 mt-1">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FirstRowStats