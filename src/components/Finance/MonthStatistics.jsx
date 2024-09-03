import React from 'react'
import { IoIosMore } from 'react-icons/io';
import { useStateContext } from '../../contexts/ContextProvider';
import { ExportToExcel } from '../'; 
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";

const MonthStatistics = ({sales1C, products1C, kkm, leads, deals, idcomponent, title, spisanie, excelData}) => {
    const { currentColor, currentMode } = useStateContext();

    const newTotalSum = new Intl.NumberFormat('en-US').format(kkm.totalSum);
    const avgCheck = new Intl.NumberFormat('en-US').format(Math.round(kkm.totalSum/kkm.totalNumberSales));
    const numberOfItemsSold = products1C.itemName ? Object.keys(products1C.itemName).length : 0;
    const bestAvgCheckWorker = { id: null, avgCheck: 0, sales: 0, count: 0 };
    const conversion = leads.leadsCount > 0 && deals.leadsCount > 0 ? Math.round((deals.leadsCount /leads.leadsCount) * 100) : 0;
    const bestSoldSum = products1C.mostSoldSum && products1C.mostSoldSum.totalSum ? new Intl.NumberFormat('en-US').format(Math.round(products1C.mostSoldSum.totalSum)) : 0

    const weeklyStats = [
        {
            icon: <FaDollarSign />,
            amount: newTotalSum + ' тг',
            title: 'Выручка',
            desc: 'Общая',
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <FaMoneyBill />,
            amount: avgCheck + ' тг',
            title: 'Средний чек',
            desc: `Online + Offline`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <FaMoneyBillAlt />,
            amount: spisanie.totalAmountSpisanie ? spisanie.totalAmountSpisanie + ' шт' : 0 + ' шт',
            title: 'Списание',
            desc: Object.keys(spisanie.itemsSpisanie).length > 0 ? Object.keys(spisanie.itemsSpisanie).length + ` товаров` : Object.keys(spisanie.itemsSpisanie).length + 'товар',
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <FaBox />,
            amount: products1C.mostSoldItem && products1C.mostSoldItem.count ? products1C.mostSoldItem.count + ' шт' : 0  + ' шт',
            title: 'Топ продаж',
            desc: products1C.mostSoldItem.name,
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
            icon: <FaChartBar />,
            amount: bestSoldSum + ' тг',
            title: 'Топ выручка',
            desc: products1C.mostSoldSum && products1C.mostSoldSum.name ? products1C.mostSoldSum.name : '',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
            icon: <FaFilter />,
            amount: conversion + '%',
            title: 'Конверсия',
            desc: 'Bitrix',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
    ];
    return (
        <div className="bg-white dark:text-gray-200 justify-center align-center text-center dark:bg-secondary-dark-bg p-1 ml-1 w-[90%] md:w-[30%] rounded-2xl subtle-border">
            <div className="flex flex-wrap justify-center">
                <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">{title}</p>
                        <button type="button" className="text-xl font-semibold text-gray-500">
                        <IoIosMore />
                        </button>
                    </div>

                    <div className="mt-10 justify-items-stretch">
                        {weeklyStats.map((item) => (
                        <div key={item.title + idcomponent} className="flex justify-between mt-4 w-full">
                            <div className="flex justify gap-4">
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
                        {/* <div className="mt-4">
                        <SparkLine currentColor={currentColor} id="area-sparkLine" height="160px" type="Area" data={SparklineAreaData}  color="rgb(242, 252, 253)" />
                        </div> */}
                    </div>
                    <div className='mt-4'>
                        <ExportToExcel title={title} data={excelData} />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MonthStatistics