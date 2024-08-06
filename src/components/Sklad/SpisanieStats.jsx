import React from 'react';
import { IoIosMore } from 'react-icons/io';
import { ExportToExcel } from '../'; 
import { FaFileAlt } from "react-icons/fa";

const SpisanieStats = ({ idcomponent, title, spisanie }) => {
    const listObject = spisanie.itemsSpisanie;

    // Convert object to array
    const listArray = Object.entries(listObject).map(([title, amount]) => ({
        title,
        amount
    }));

    return (
        <div className="bg-white dark:text-gray-200 justify-center align-center text-center dark:bg-secondary-dark-bg p-1 ml-1 w-[90%] md:w-[29%] rounded-2xl subtle-border">
            <div className="flex flex-wrap justify-center">
                <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 h-[400px] overflow-y-auto">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">{title}</p>
                        <button type="button" className="text-xl font-semibold text-gray-500 border-2 rounded-2xl p-2">
                            <FaFileAlt />
                        </button>
                    </div>
                    <div className="mt-10">
                        {listArray && listArray.length > 0 ? (
                            listArray.map((item, index) => (
                                <div key={index} className="flex justify-between mt-4 w-full">
                                    <div className="flex gap-4">
                                        
                                            <p className="text-md font-semibold">{item.title}</p> 
                                    </div>

                                    <p className="text-gray-500">{item.amount} шт</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Нету списаний</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpisanieStats;
