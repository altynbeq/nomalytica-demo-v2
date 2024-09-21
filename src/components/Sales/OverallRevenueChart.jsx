import React from 'react'

import { Stacked } from '../../components';
import { stackedCustomSeriesYearly, stackedPrimaryYAxisYearly, stackedPrimaryXAxisYearly } from '../../data/salesData';

const OverallRevenueChart = () => {
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6  w-[90%] md:w-[55%]  rounded-2xl  subtle-border">
        <div className="flex justify-between items-center gap-2 mb-10">
        <p className="md:text-xl font-semibold">Продажи за год</p>
        <div className="flex items-center gap-4">
            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
            <span>

            </span>
            <span>2024</span>
            </p>
        </div>
        </div>
          <Stacked id="OverallRevenueChart" stackedCustomSeries={stackedCustomSeriesYearly} stackedPrimaryXAxis={stackedPrimaryYAxisYearly} stackedPrimaryYAxis={stackedPrimaryXAxisYearly}   />
    </div>
  );
}

export default OverallRevenueChart