import React from 'react'
import { IoIosMore } from 'react-icons/io';
import { weeklyStats, SparklineAreaData } from '../../data/ecomData';
import { useStateContext } from '../../contexts/ContextProvider';
import { SparkLine } from '..';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';

const WeeklySalesStats = (weekFinanceData) => {
    const { currentColor, currentMode } = useStateContext();
    const data = weekFinanceData.weekFinanceData;
    const bestAvgCheckWorker = { id: null, avgCheck: 0, sales: 0, count: 0 };
    const avgCheck = 0;

    for (let workerId in data.workersStats) {
        const { count, sales } = data.workersStats[workerId];
        const avgCheck = sales / count;

        if (avgCheck > bestAvgCheckWorker.avgCheck) {
            bestAvgCheckWorker.id = workerId;
            bestAvgCheckWorker.avgCheck = Math.round(avgCheck);
            bestAvgCheckWorker.sales = sales;
            bestAvgCheckWorker.count = count;
        }
    }

    const weeklyStats = [
        {
          icon: <FiShoppingCart />,
          amount:  `${Math.round(data.bestSale.OPPORTUNITY)} тг`,
          title: 'Топ сделка',
          desc: `Сотрудник ${data.bestSale.ASSIGNED_BY_ID}`,
          iconBg: '#FB9678',
          pcColor: 'green-600',
        },
        {
          icon: <FiStar />,
          amount: `${data.bestWorker.salesCount} продаж`,
          title: 'Топ продаж',
          desc: `Сотрудник ${data.bestWorker.id}`,
          iconBg: 'rgb(254, 201, 15)',
          pcColor: 'green-600',
        },
        {
            icon: <FiStar />,
            amount: `${data.bestWorker.totalSales} тг`,
            title: 'Топ прибыль',
            desc: `Сотрудник ${data.bestWorker.id}`,
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
          icon: <BsChatLeft />,
          amount: `${data.bestDay.y} тг`,
          title: 'Лучший день',
          desc: `${data.bestDay.x}`,
          iconBg: '#00C292',
          pcColor: 'green-600',
        },
        {
            icon: <BsChatLeft />,
            amount: `${data.bestDay.y} тг`,
            title: 'Топ конверсия',
            desc: `${data.bestDay.x}`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <BsChatLeft />,
            amount: `${bestAvgCheckWorker.avgCheck} тг`,
            title: 'Топ средний чек',
            desc: `${bestAvgCheckWorker.id}`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
    ];

    return (
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-1 ml-1 rounded-2xl">
            <div className="flex flex-wrap justify-center">
                <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                <div className="flex justify-between">
                    <p className="text-xl font-semibold">Недельная статистика</p>
                    <button type="button" className="text-xl font-semibold text-gray-500">
                    <IoIosMore />
                    </button>
                </div>

                <div className="mt-10 ">
                    {weeklyStats.map((item) => (
                    <div key={item.title} className="flex justify-between mt-4 w-full">
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

export default WeeklySalesStats