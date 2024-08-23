import React from 'react'
import { IoIosMore } from 'react-icons/io';
import { useStateContext } from '../../contexts/ContextProvider';
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";
import { ExportToExcel } from '../'

const ProductsStats = ({ idcomp, title, excelData, spisanie, products1C, isOnSkald}) => {
    const numberOfItemsSold = products1C.itemName ? Object.keys(products1C.itemName).length : 0;
    const weeklyStats = [
        {
            id: '1',
            icon: <FaDollarSign />,
            amount: products1C.mostSoldSum && products1C.mostSoldSum.totalSum ? products1C.mostSoldSum.totalSum + ' тг' : 0  + ' тг',
            title: 'Топ выручка',
            desc: products1C.mostSoldSum && products1C.mostSoldSum.name ? products1C.mostSoldSum.name : '',
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            id: '2',
            icon: <FaMoneyBill />,
            amount: products1C.mostSoldItem && products1C.mostSoldItem.count ? products1C.mostSoldItem.count + ' шт' : 0  + ' шт',
            title: 'Топ продаж',
            desc: products1C.mostSoldItem && products1C.mostSoldItem.name ? products1C.mostSoldItem.name : '',
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            id: '3',
            icon: <FaMoneyBillAlt />,
            amount: products1C.leastSoldItem && products1C.leastSoldItem.count ? products1C.leastSoldItem.count + ' шт' : 0  + ' шт',
            title: 'Худший продаж',
            desc: products1C.leastSoldItem && products1C.leastSoldItem.name ? products1C.leastSoldItem.name : '',
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            id: '7',
            icon: <FaMoneyBillAlt />,
            amount: products1C.leastSoldSum && products1C.leastSoldSum.totalSum ? products1C.leastSoldSum.totalSum + ' тг' : 0  + ' тг',
            title: 'Худшая выручка',
            desc: products1C.leastSoldSum && products1C.leastSoldSum.name ? products1C.leastSoldSum.name : '',
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        // {
        //     id: '5',
        //     icon: <FaFilter />,
        //     amount: '%',
        //     title: 'Конверсия',
        //     desc: 'Bitrix',
        //     iconBg: 'rgb(254, 201, 15)',
        //     pcColor: 'green-600',
        // },
        {
            icon: <FaChartBar />,
            amount: numberOfItemsSold,
            title: 'Продано товаров',
            desc: 'Уникальных товаров ',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
    ];
    if(isOnSkald){
        weeklyStats.push({
                id: '10',
                icon: <FaBox />,
                amount: spisanie.totalAmountSpisanie + ' шт',
                title: 'Списаний',
                desc: Object.keys(spisanie.itemsSpisanie).length > 1 ? Object.keys(spisanie.itemsSpisanie).length + ' товаров' : Object.keys(spisanie.itemsSpisanie).length + ' товар',
                iconBg: 'rgb(254, 201, 15)',
                pcColor: 'green-600',
        })
    }
    return (
        <div className="bg-white dark:text-gray-200 justify-center align-center text-center dark:bg-secondary-dark-bg  ml-1 w-[90%] md:w-[29%] rounded-2xl subtle-border">
            <div className="flex flex-wrap justify-center">
                <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
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
                    
                    <div className='mt-2'>
                        <ExportToExcel title={title} data={excelData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsStats
