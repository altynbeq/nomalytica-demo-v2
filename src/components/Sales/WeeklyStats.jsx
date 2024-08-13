import React from 'react'
import { IoIosMore } from 'react-icons/io';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";
import ExportToExcel from '../ExportToExcel';

const WeeklyStats = ({ idcomp, title, excelData, kkm, sales1C, products1C, deals, leads }) => {
    const { currentColor, currentMode } = useStateContext();
    
    const newTotalSum = kkm.totalSum ? new Intl.NumberFormat('en-US').format(kkm.totalSum) : 0;
    const avgCheck = kkm.totalSum/kkm.totalNumberSales > 0 ? kkm.totalSum/kkm.totalNumberSales : 0;
    const numberOfItemsSold = products1C.itemName ? Object.keys(products1C.itemName).length : 0;
    const conversion = leads.leadsCount > 0 && deals.dealsCount > 0 ? Math.round((leads.leadsCount / deals.dealsCount) * 100) : 0;

    const weeklyStats = [
        {
            id: '1',
            icon: <FaDollarSign />,
            amount: newTotalSum + 'тг',
            title: 'Выручка',
            // desc: 'XX',
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            id: '2',
            icon: <FaMoneyBill />,
            amount: Math.round(avgCheck) + 'тг',
            title: 'Средний чек',
            // desc: `Сотрудник ${data.bestWorker && data.bestWorker.id ? data.bestWorker.id : 'Пусто'}`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            id: '3',
            icon: <FaMoneyBillAlt />,
            amount: `?тг`,
            title: 'Макс чек',
            desc: `?`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            id: '4',
            icon: <FaBox />,
            amount: products1C.mostSoldItem && products1C.mostSoldItem.count ? products1C.mostSoldItem.count + ' шт' : 0  + ' шт',
            title: 'Топ товар',
            desc: products1C.mostSoldItem.name,
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
            id: '5',
            icon: <FaFilter />,
            amount: conversion+'%',
            title: 'Конверсия',
            desc: 'Bitrix',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
            icon: <FaChartBar />,
            amount: numberOfItemsSold,
            title: 'Продано товаров',
            desc: 'Уникальных товаров ',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
    ];

    return (
        <div className="bg-white dark:text-gray-200 justify-center align-center text-center dark:bg-secondary-dark-bg p-1 ml-1 w-[90%] md:w-[30%] rounded-2xl subtle-border">
            <div className="flex flex-wrap justify-center">
                <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 mx-3">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">{title}</p>
                        <button type="button" className="text-xl font-semibold text-gray-500">
                        <IoIosMore />
                        </button>
                    </div>

                    <div className="mt-2">
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
                    <div className="mt-2 flex justify-center">
                        <ExportToExcel />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default WeeklyStats
