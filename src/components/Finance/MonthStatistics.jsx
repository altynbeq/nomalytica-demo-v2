import React from 'react'
import { IoIosMore } from 'react-icons/io';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';

const MonthStatistics = (monthFinanceData) => {
    const { currentColor, currentMode } = useStateContext();
    const data = monthFinanceData.monthFinanceData;
    const bestAvgCheckWorker = { id: null, avgCheck: 0, sales: 0, count: 0 };
    const avgCheck = 0;
    // for (let workerId in data.workersStats) {
    //     const { count, sales } = data.workersStats[workerId];
    //     const avgCheck = sales / count;

    //     if (avgCheck > bestAvgCheckWorker.avgCheck) {
    //         bestAvgCheckWorker.id = workerId;
    //         bestAvgCheckWorker.avgCheck = Math.round(avgCheck);
    //         bestAvgCheckWorker.sales = sales;
    //         bestAvgCheckWorker.count = count;
    //     }
    // }
    const weeklyStats = [
        {
            icon: <FiShoppingCart />,
            amount: `${Math.round(data.bestSale.OPPORTUNITY) > 0 ? Math.round(data.bestSale.OPPORTUNITY) : 0} тг`,
            title: 'Топ сделка',
            desc: `Сотрудник ${data.bestSale.ASSIGNED_BY_ID ? data.bestSale.ASSIGNED_BY_ID : 'Пусто'}`,
            iconBg: '#FB9678',
            pcColor: 'green-600',
        },
        {
            icon: <FiStar />,
            amount: `${data.bestWorker.sales} продаж`,
            title: 'Топ продаж',
            desc: `Сотрудник ${data.bestWorker.id ? data.bestWorker.id : 'Пусто'}`,
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
            icon: <FiStar />,
            amount: `${data.bestWorker.totalSales} тг`,
            title: 'Топ прибыль',
            desc: `Сотрудник ${data.bestWorker.id ? data.bestWorker.id : 'Пусто'}`,
            iconBg: 'rgb(254, 201, 15)',
            pcColor: 'green-600',
        },
        {
            icon: <BsChatLeft />,
            amount: `${data.bestDay.y ? data.bestDay.y : 0} тг`,
            title: 'Лучший день',
            desc: `${data.bestDay.x ? data.bestDay.x + ' число' : 'Пусто'}`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <BsChatLeft />,
            amount: 0,
            // `${data.bestDay.y ? data.bestDay.y : 0} тг`,
            title: 'Топ конверсия',
            desc: 'WHO',
            // `${data.bestDay.x ? data.bestDay.x : 'Пусто'}`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
        {
            icon: <BsChatLeft />,
            amount: `${data.bestAvgCheck.avgCheck ? data.bestAvgCheck.avgCheck : 0} тг`,
            title: 'Топ средний чек',
            desc: `${data.bestAvgCheck.id ? data.bestAvgCheck.id : 'Пусто'}`,
            iconBg: '#00C292',
            pcColor: 'green-600',
        },
    ];

    return (
        <div className="bg-white dark:text-gray-200 justify-center align-center text-center dark:bg-secondary-dark-bg p-1 ml-1 w-[90%] md:w-[30%] rounded-2xl">
            <div className="flex flex-wrap justify-center">
                <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                <div className="flex justify-between">
                    <p className="text-xl font-semibold">Месячная статистика</p>
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
                    {/* <div className="mt-4">
                    <SparkLine currentColor={currentColor} id="area-sparkLine" height="160px" type="Area" data={SparklineAreaData}  color="rgb(242, 252, 253)" />
                    </div> */}
                </div>
                </div>
            </div>
        </div>
    )
}

export default MonthStatistics