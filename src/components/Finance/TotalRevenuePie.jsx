import React from 'react'
import { ecomPieChartData } from '../../data/ecomData';
import { Pie } from '../../components';
import HalfPie from '../ReCharts/HalfPieChart';

const TotalRevenuePie = () => {
  return (
    <div className="bg-white dark:text-gray-200  dark:bg-secondary-dark-bg rounded-2xl p-4 m-3 flex flex-col  items-center  subtle-border">
       
        <div className="w-full h-[120px] mt-5">
          <HalfPie />
        {/* <Pie id="pie-chart" data={ecomPieChartData} legendVisiblity={false} height="180px" /> */}
        </div>
          <p className="text-gray-400">Годовой заработок</p>
          <p className="text-2xl font-semibold ">$43,246</p>
    </div>
  )
}

export default TotalRevenuePie