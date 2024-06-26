import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go';
import { Stacked } from '../../components';
import { stackedCustomSeriesMonthly, stackedPrimaryXAxis, stackedPrimaryYAxis } from '../../data/salesData';


const MonthlyTotalSalesChart = () => {
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl ">
        <div className="flex justify-between items-center gap-2 mb-10">
        <p className="text-xl font-semibold">Продажи за месяц</p>
        <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
            <span>
                <GoPrimitiveDot />
            </span>
            <span>Май 2024</span>
            </p>
        </div>
        </div>
        <div className="md:w-full overflow-auto">
        <Stacked stackedCustomSeries={stackedCustomSeriesMonthly} stackedPrimaryXAxis={stackedPrimaryXAxis} stackedPrimaryYAxis={stackedPrimaryYAxis} width="550px" />
        </div>
    </div>
  )
}

export default MonthlyTotalSalesChart