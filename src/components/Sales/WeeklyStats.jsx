import React from 'react'
import { IoIosMore } from 'react-icons/io';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { FaDollarSign, FaMoneyBillAlt, FaMoneyBill, FaBox, FaFilter, FaChartBar } from "react-icons/fa";

const WeeklyStats = ({ weekFinanceData, title }) => {
    const { currentColor, currentMode } = useStateContext();

    // const newTotalSum = new Intl.NumberFormat('en-US').format(sales1C.totalSum);
    // const avgCheck = new Intl.NumberFormat('en-US').format(Math.round(sales1C.totalSum/sales1C.totalNumberSales));
    // const numberOfItemsSold = products1C.itemName ? Object.keys(products1C.itemName).length : 0;

    // const bestAvgCheckWorker = { id: null, avgCheck: 0, sales: 0, count: 0 };
   
    
    const weeklyStats = [
        {
            icon: <FaDollarSign />,
            amount: 'XXX',
            // newTotalSum + ' тг',
            title: 'Выручка',
            // desc: 'XX',
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <FaMoneyBill />,
            amount: 'XXX',
            // avgCheck + ' тг',
            title: 'Средний чек',
            // desc: `Сотрудник ${data.bestWorker && data.bestWorker.id ? data.bestWorker.id : 'Пусто'}`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <FaMoneyBillAlt />,
            amount: `? тг`,
            title: 'Макс чек',
            desc: `?`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <FaBox />,
            amount: 'XXX',
            // products1C.mostSoldItem.count,
            title: 'Топ товар',
            desc: 'XXX',
            // products1C.mostSoldItem.name,
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
            icon: <FaFilter />,
            amount: 0,
            title: 'Конверсия',
            desc: 'Bitrix',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
            icon: <FaChartBar />,
            amount: 'XXX',
            // numberOfItemsSold,
            title: 'Продано товаров',
            desc: 'DESCC',
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

                    <div className="mt-2">
                        {weeklyStats.map((item) => (
                        <div key={item.id} className="flex justify-between mt-4 w-full">
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
