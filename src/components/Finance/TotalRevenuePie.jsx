import React from 'react'
import { ecomPieChartData } from '../../data/ecomData';
import { Pie } from '../../components';

const TotalRevenuePie = () => {
  return (
    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl  p-8 m-3 flex justify-center items-center gap-10">
        <div>
        <p className="text-2xl font-semibold ">$43,246</p>
        <p className="text-gray-400">Годовой заработок</p>
        </div>

        <div className="w-60">
        <Pie id="pie-chart" data={ecomPieChartData} legendVisiblity={true} height="180px" />
        </div>
    </div>
  )
}

export default TotalRevenuePie