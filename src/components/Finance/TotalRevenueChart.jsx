import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { LineChart } from '../../components';
import { lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/financeData';


const TotalRevenueChart = () => {
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
        <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-xl font-semibold">Общий доход</p>
        <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
            <span>
                <GoPrimitiveDot />
            </span>
            <span>2024 год</span>
            </p>
        </div>
        </div>
        <div className="md:w-full overflow-auto">
        <LineChart lineCustomSeries={lineCustomSeries} LinePrimaryXAxis={LinePrimaryXAxis} LinePrimaryYAxis={LinePrimaryYAxis} />
        </div>
  </div>
  )
}

export default TotalRevenueChart