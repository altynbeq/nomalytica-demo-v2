import React, { useState } from 'react'
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";
import { Dropdown } from 'primereact/dropdown';

const WeeklyStats = ({ idcomp, title }) => {
    
    const [ selectedStore, setSelectedStore ] = useState('Все магазины');
    const stores = [ "Все магазины", "Алматы", "Сатпаева", "Панфилова" ];
  
    const handleStoreChange= (e) => {
        setSelectedStore(e);
    };

    const weeklyStats = [
        {
            id: '1',
            icon: <FaDollarSign />,
            amount: '7 400 000 тг',
            title: 'Выручка',
            // desc: 'XX',
            iconBg: '#1e4db6',
            pcColor: 'green-600',
        },
        {
            id: '2',
            icon: <FaMoneyBill />,
            amount: '17 500тг',
            title: 'Средний чек',
            iconBg: '#1e4db6',
            pcColor: 'green-600',
        },
        {
            id: '3',
            icon: <FaMoneyBillAlt />,
            amount: 180,
            title: 'Продаж',
            // desc: `?`,
            iconBg: '#1e4db6',
            pcColor: 'green-600',
        },
        {
            id: '4',
            icon: <FaBox />,
            amount: '320 шт',
            title: 'Списаний',
            desc: '30 товаров',
            iconBg: '#1e4db6',
            pcColor: 'green-600',
        },
        {
            id: '5',
            icon: <FaFilter />,
            amount: '33%',
            title: 'Конверсия',
            desc: 'Bitrix',
            iconBg: '#1e4db6',
            pcColor: 'green-600',
        },
        {
            icon: <FaChartBar />,
            amount: 19,
            title: 'Продано товаров',
            desc: 'Уникальных товаров ',
            iconBg: '#1e4db6',
            pcColor: 'green-600',
        },
    ];

    return (
        <div className="bg-white dark:text-gray-200 justify-center align-center text-center dark:bg-secondary-dark-bg p-1 ml-1 w-[90%] md:w-[30%] rounded-2xl subtle-border">
            <div className="flex flex-wrap justify-center">
                <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 mx-3">
                    <div className="flex flex-col  justify-between ">
                        <p className="text-xl font-semibold">{title}</p>
                        <Dropdown 
                            value={selectedStore} 
                            onChange={(e) => handleStoreChange(e.value)} 
                            options={stores} 
                            optionLabel="name" 
                            placeholder="Выберите магазин" 
                            className="w-full md:w-14rem" /> 
                    </div>
                       
                    <div className="mt-0">
                        {weeklyStats.map((item) => (
                        <div key={idcomp + item.id} className="flex justify-between mt-4 w-full">
                            <div className="flex gap-4">
                            <button
                                type="button"
                                style={{ background: item.iconBg }}
                                className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                            >
                                {item.icon}
                            </button>
                            <div>
                                <p className="text-md font-semibold">{item.title}</p>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                            </div>

                            <p className={`text-${item.pcColor}`}>{item.amount}</p>
                        </div>
                        ))}
                        
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default WeeklyStats
