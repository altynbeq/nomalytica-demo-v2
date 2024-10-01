import React from 'react';
import { useStateContext  } from '../../contexts/ContextProvider';
import BarChartRe from '../ReCharts/BarCharts';

const WeaklyRevenueOverviewStacked = () => {
    const { currentColor } = useStateContext();
    return (
        <div className="rounded-2xl  p-2 mx-3" style={{ backgroundColor: currentColor }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="font-semibold text-white text-2xl">Средний чек</p>

                <div className="mt-4 md:mt-0 text-center md:text-right">
                <p className="text-2xl text-white font-semibold">19 200 тг</p>
                <p className="text-gray-200">За нелелю</p>
                </div>
            </div>

            <div className="mt-4 h-[100px]">
                <BarChartRe />
            </div>
        </div>
    );
}

export default WeaklyRevenueOverviewStacked